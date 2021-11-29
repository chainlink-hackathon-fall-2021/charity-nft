// SPDX-License-Identifier: MIT

pragma solidity ^0.6.12;

// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.2/contracts/access/Ownable.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.2/contracts/math/SafeMath.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.2/contracts/utils/Strings.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "../aragon/IVoting.sol";
import "../tokens/IToken.sol";
import "../pools/IDonor.sol";

// simple infinite circular queue
library QueueLib {
    
    struct Queue {
        mapping(uint256 => uint256) tokenId;
        mapping(uint256 => bytes32) hash;
        uint256 tail;
        uint256 head;
    }

    function push(Queue storage _self, uint256 tokenId, bytes32 hash) public {
        _self.tokenId[_self.tail] = tokenId;
        _self.hash[_self.tail] = hash;
        _self.tail=_self.tail + 1;
    }

    function peek(Queue storage _self) public view returns (uint256 tokenId, bytes32 hash) {
        if(_self.head==_self.tail){
            tokenId = 0;
        }else{
            tokenId = _self.tokenId[_self.head];
            hash = _self.hash[_self.head];
        }
    }

    function shift(Queue storage _self) public returns (uint256 tokenId, bytes32 hash) {
        if(_self.head==_self.tail){
            tokenId = 0;
            hash = bytes32(0);
        }else{
            tokenId = _self.tokenId[_self.head];
            hash = _self.hash[_self.head];
            delete _self.tokenId[_self.head];
            delete _self.hash[_self.head];
            _self.head=_self.head + 1;
        }
    }

    function size(Queue storage _self) public view returns(uint256 length) {
        // @todo check overflow
        length=_self.tail - _self.head;
    }
}

// Contract added to the dao with permissions to create new votes
// for the sake of simplicity, the process to add this contract to the dao is
// out of the scope of this prototype
contract CampaignLauncher is Ownable {

    using QueueLib for QueueLib.Queue;
    
    // harcoded voting dao app to simplify hackathon
    IVoting private voting = IVoting(0x2c2e5397F336C29a991E9E1759085F9940ACe347);
    
    mapping(bytes32=>uint256) public campaigns;
    mapping(uint256=>uint256) public donationVotes;
    
    QueueLib.Queue private reviewQueue;
    QueueLib.Queue private donationQueue;

    uint8 public maxOpenReviews;
    uint8 public maxOpenDonations;

    IToken private token;
    IDonor private donor;

    // chainlink keepers
    address private campaignReviewKeeper;
    address private campaignDonationKeeper;

    modifier onlyOwnerOrReviewKeeper() {
        require(owner() == _msgSender() || campaignReviewKeeper == _msgSender(), "Caller is not the owner nor review keeper");
        _;
    }

    modifier onlyOwnerOrDonationKeeper() {
        require(owner() == _msgSender() || campaignDonationKeeper == _msgSender(), "Caller is not the owner nor donation keeper");
        _;
    }
    
    constructor(IToken _token, IDonor _donor, uint8 _maxOpenReviews, uint8 _maxOpenDonations) public {
        token = _token;
        donor = _donor;
        maxOpenReviews = _maxOpenReviews;
        maxOpenDonations = _maxOpenDonations;
    }

    // @todo add reentrancy check
    // user calls the submit to cast newly created vote
    function submit(string calldata _campaignName, uint256 _goal, uint256 _startDate, uint256 _endDate, string memory _cid) external{
        bytes32 hash = gethash(_campaignName);
        require(campaigns[hash]==0, "Campaign already exists");
        uint256 voteId = voting.newVote(abi.encodePacked(uint32(1)), _campaignName);
        token.mintCampaign(
            _msgSender(),
            voteId,
           hash,
           _goal,
           _startDate,
           _endDate,
           _cid
        );
        reviewQueue.push(voteId, hash);
        campaigns[hash] = voteId;
    }

    // @todo add reentrancy check 
    function review(bytes32 _hash) external onlyOwnerOrReviewKeeper() {
        uint256 tokenId = campaigns[_hash];
        require(tokenId>0, "campaign does not exist");
        // see IVoting interface
        (
            bool open,
            bool executed,
            /*uint64 startDate*/,
            /*uint64 snapshotBlock*/,
            /*uint64 supportRequired*/,
            /*uint64 minAcceptQuorum*/,
            /*uint256 yea*/,
            /*uint256 nay*/,
            /*uint256 votingPower*/,
            /*bytes memory script*/
        ) = voting.getVote(tokenId);
        require(!open, "Campaign still in voting session");
        (uint256 queuedTokenId,)=reviewQueue.shift();
        require(tokenId==queuedTokenId, "Campaign not in review queue");
        require(donationVotes[tokenId]==0, "Campaign already added to donors pool");
        if(executed){
            donationQueue.push(tokenId, _hash);
            uint256 voteId = voting.newVote(abi.encodePacked(uint32(1)), string(abi.encodePacked(bytes("Donate to Campaign #"), Strings.toString(tokenId))));
            donationVotes[tokenId]=voteId;
        }
        delete campaigns[_hash];
    }

    function finalize(uint256 _tokenId) external onlyOwnerOrDonationKeeper() {
        require(token.exists(_tokenId), "Campaign does not exist");
        require(donationVotes[_tokenId]>0, "Campaign not in donors pool");
        (uint256 tokenId,) = donationQueue.shift();
        require(tokenId==_tokenId, "Campaign not in donation queue");
        (
            bool open,
            bool executed,
            /*uint64 startDate*/,
            /*uint64 snapshotBlock*/,
            /*uint64 supportRequired*/,
            /*uint64 minAcceptQuorum*/,
            /*uint256 yea*/,
            /*uint256 nay*/,
            /*uint256 votingPower*/,
            /*bytes memory script*/
        ) = voting.getVote(donationVotes[_tokenId]);
        require(!open, "Campaign still in voting session");
        if(executed){
            donor.donate(_tokenId);
        }
    }

    function getNextReviewCampaign() external view returns (uint256 tokenId, bytes32 hash, uint256 size, uint256 limit){
        (tokenId,hash) = reviewQueue.peek();
        size = reviewQueue.size();
        limit = maxOpenReviews;
    }

    function getNextDonationToken() external view returns (uint256 tokenId, bytes32 hash, uint256 size, uint256 limit){
        (tokenId,hash) = donationQueue.peek();
        size = donationQueue.size();
        limit = maxOpenDonations;
    }

    function getDonationVote(uint256 _tokenId) external view returns (uint256 voteId) {
        voteId = donationVotes[_tokenId];
    }

    function setCampaignReviewKeeper(address _campaignReviewKeeper) external onlyOwner() {
        campaignReviewKeeper = _campaignReviewKeeper;
    }

    function setCampaignDonationKeeper(address _campaignDonationKeeper) external onlyOwner() {
        campaignDonationKeeper = _campaignDonationKeeper;
    }

    function setTokenInterface(IToken _token) external onlyOwner() {
        token = _token;
    }

    function setDonorInterface(IDonor _donor) external onlyOwner() {
        donor = _donor;
    }

    function setMaxOpenReviews(uint8 _maxOpenReviews) external onlyOwner() {
        maxOpenReviews = _maxOpenReviews;
    }

    function setMaxOpenDonations(uint8 _maxOpenDonations) external onlyOwner() {
        maxOpenDonations = _maxOpenDonations;
    }

    function gethash(string memory s) private pure returns (bytes32) {
        return keccak256(bytes(s));
    }
    
}