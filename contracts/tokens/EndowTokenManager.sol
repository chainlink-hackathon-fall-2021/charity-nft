// SPDX-License-Identifier: MIT

pragma solidity ^0.6.12;

// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.4/contracts/presets/ERC1155PresetMinterPauser.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.4/contracts/utils/Strings.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.4/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/presets/ERC1155PresetMinterPauser.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../aragon/IVoting.sol";

import "../pools/IDonor.sol";

interface ICampaignLauncher {
    function getDonationVote(uint256 _tokenId)  external returns (uint256);
}

/**
 * 1. deploy token contract
 * 2. deploy campiagn launcher
 * 3. set the address of the campiagn launcher in EndowTokenManager Contract
 */
/**
 * @title Endow Token Manager
 * @dev Implements ERC155
 */

contract EndowTokenManager is ERC1155PresetMinterPauser, Ownable {
    uint256 public campaignCount;
    uint256 public podCount;
    uint256 public podRedeemed;
    uint256 public blockNumberDeployed;

    mapping(uint256 => uint256) public tokenTypes; // 1 is  campaign, 2 is pod  
    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => mapping(address => uint256)) redeemedPod;
    mapping(uint256 => uint256) public podToCampaignIds; // used for uri to connect POD to a campaign


    // harcoded voting dao app to simplify hackathon
    IVoting private iVoting = IVoting(0x2c2e5397F336C29a991E9E1759085F9940ACe347);
    
    IDonor private iDonor;

    ICampaignLauncher private iCampaignLauncher;

    struct Campaign {
        bytes32 hash; // hash of campaign name
        string cid; // votingId of 1st vote
        uint256 startDate;
        uint256 endDate;
        uint256 goalAmount;
        address campaignOwner;
    }

    modifier campaignLauncherDonorSet {
        require ((address(iCampaignLauncher) != address(0)) && (address(iDonor) != address(0)));
        _;
    }

    
    event CampaignCreated(uint256 indexed tokenId, bytes32 indexed hash, string cid, uint256 startDate, uint256 endDate, uint256 goalAmount, address indexed campaignerAddress);

    event PodCreated(uint256 indexed tokendId, uint256 indexed podId, address indexed donorAddress, string cid);

    constructor() public ERC1155PresetMinterPauser("https://ipfs.moralis.io:2053/ipfs/{id}.json") {
        blockNumberDeployed = block.number;
        podCount = 0;
        campaignCount = 0;
    }

    function setCampaignLauncherAddress(ICampaignLauncher _campaignLauncher) public onlyOwner {
        iCampaignLauncher= _campaignLauncher;
    }

    function setDonorContractAddress(IDonor _donorContract) public onlyOwner {
        iDonor = _donorContract;
    }

    function mintCampaign(
        address _to,
        uint256 _tokenId,
        bytes32 _campaignHash,
        uint256 _goal,
        uint256 _startDate,
        uint256 _endDate,
        string memory _cid
    ) external campaignLauncherDonorSet{
        require(balanceOf(_msgSender(), _tokenId) == 0, "a token has already been minted for this campaign");
        // mints Campaign token as erc1155
        mint(_to, _tokenId,1,  abi.encodePacked(_campaignHash));
        emit CampaignCreated(_tokenId, _campaignHash, _cid, _startDate, _endDate, _goal, _msgSender());
        // record token type
        tokenTypes[_tokenId] = 1;  
        // record
        campaigns[_tokenId] = Campaign(_campaignHash, _cid, _startDate, _endDate, _goal, _msgSender());
        campaignCount++;
    }

    function mintPod(
        uint256 _tokenId
        ) external campaignLauncherDonorSet {
        address donorAddress = _msgSender(); 
        // call campaign launcher getDonationVote(_) to get donation voteId if vote occured
        uint256 voteId = iCampaignLauncher.getDonationVote(_tokenId);
        require(voteId != 0, "Campaign donations have not yet been finalized");
        // donation votes occured lets check whether donor donated by checking if he donated to a campaign
        IVoting.VoterState voteStatus = iVoting.getVoterState(voteId, donorAddress);
        require(voteStatus == IVoting.VoterState.Yea, "You have not donated to this campaign");
        // now check was money actually donated after the vote
        (bool donated) = iDonor.donated(_tokenId);
        require(donated, "You have not donated to this campaign");   
        // check that donor has not already been issued a pod
        require(redeemedPod[_tokenId][donorAddress] == 0, "You have already been issued a pod");
        // mints PodGrant token as erc115
        mint(donorAddress, voteId, 1, abi.encodePacked(_tokenId, voteId));
        emit PodCreated(voteId, _tokenId, donorAddress, campaigns[_tokenId].cid);
        // record issue of pod and update state
        tokenTypes[_tokenId] = 2;  
        podToCampaignIds[voteId] = _tokenId;
        redeemedPod[_tokenId][donorAddress] = voteId;
        podCount++;
    }

    function getBeneficiary(uint256 _tokenId) external view returns (address) {
        return  address(campaigns[_tokenId].campaignOwner);   
    }

    function getGoalAmount(uint256 _tokenId) external view returns (uint256) {
        return  campaigns[_tokenId].goalAmount;  
    }

    function exists(uint256 _tokenId) external view returns (bool) {
        return tokenTypes[_tokenId] != 0 ;      // returns true if tokenId exists
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }
}
