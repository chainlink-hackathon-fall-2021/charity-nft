// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/Ownable.sol";
import "../aragon/IVoting.sol";
import "../tokens/IToken.sol";
import "../pools/IDonor.sol";

pragma solidity ^0.6.12;

// Contract added to the dao with permissions to create new votes
// for the sake of simplicity, the process to add this contract to the dao is
// out of the scope of this prototype
contract CampaignLauncher is Ownable {
    
    IToken token;
    IDonor donor;
    
    constructor(IToken _token, IDonor _donor) public {
        token = _token;
        donor = _donor;
    }

    // harcoded voting dao app to simplify hackathon
    IVoting private voting = IVoting(0x2c2e5397F336C29a991E9E1759085F9940ACe347);
    
    mapping(bytes32=>uint256) public votes;

    // @todo add reentrancy check
    // user calls the submit to cast newly created vote
    // _executionScript contains the callback to review(uint256 _tokenId)
    function submit(string calldata _campaignName) external{
        // generate EVMScript
        uint256 voteId = voting.newVote(getReviewScript(address(this),1,_campaignName), _campaignName);
        bytes32 hash = hash(_campaignName);
        votes[hash] = voteId;
        // @todo mint campaign token using dao voteId as tokenId
        token.mintCampaign(
            _msgSender(),
            voteId,
           "" // @todo send hash
        );
    }

    // @todo add reentrancy check 
    // callback function called by the dao voting contract
    function review(bytes32 _campaignName) external {
        require(votes[_campaignName]>0, "campaign does not exists");
        // @todo check somehow if the call comes from the dao
        // user vote information at will, see IVoting interface
        (
            bool open,
            bool executed,
            uint64 startDate,
            uint64 snapshotBlock,
            uint64 supportRequired,
            uint64 minAcceptQuorum,
            uint256 yea,
            uint256 nay,
            uint256 votingPower,
            bytes memory script
        ) = voting.getVote(votes[_campaignName]);
        if(executed){
            _approve(votes[_campaignName]);
        }else{
            _reject(votes[_campaignName]);
        }
        delete votes[_campaignName];
    }

    function _approve(uint256 _tokenId) private {
        // @todo add aditional logic to add this campaing to the donors pool
        // @todo create a new vote to allow the campaing to participate in a funding session
        voting.newVote(getDonateScript(address(donor),1,_tokenId), "campaignName");
    }

    function _reject(uint256 _tokenId) private {
        // @todo do something if needed
    }
    
    // generating EVMScript here for hackathon simplicity
    function getReviewScript(address _to, uint32 _executorId, string memory _data) private pure returns (bytes memory script) {
        bytes32 hash = hash(_data);
        bytes memory payload = abi.encodeWithSignature("review(bytes32)", hash);
        script = abi.encodePacked(_executorId,bytes20(_to),uint32(payload.length), payload);
    }
    
    function getDonateScript(address _to, uint32 _executorId, uint256 _data) private pure returns (bytes memory script) {
        bytes memory payload = abi.encodeWithSignature("donate(uint256)", _data);
        script = abi.encodePacked(_executorId,bytes20(_to),uint32(payload.length), payload);
    }
    
    function hash(string memory s) private pure returns (bytes32) {
		return keccak256(bytes(s));
	}

    function setTokenInterface(IToken _token) external onlyOwner() {
        token = _token;
    }

    function setDonorInterface(IDonor _donor) external onlyOwner() {
        donor = _donor;
    }
    
}