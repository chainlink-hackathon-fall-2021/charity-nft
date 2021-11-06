
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzepplin/contracts/token/ERC721/extensions/ERC721Storage.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";



/**
 * @title The FundMeCampaign contract
 * @notice Each Campaign is an NFT
 */

contract FundMeCampaigns is ERC721Storage, VRFConsumerBase {

  // variables needed for chainlink

  AggregatorV3Interface internal priceFeed;
  bytes32 internal keyHash;
  uint256 internal fee;
  address public VRFCoordinator;
  address public LinkToken;

  struct Campaign {
   // key attributes for any campaign
   string name;
   string description;
   uint startDate;
   uint endDate;
   uint256 fundingTarget;
   uint256 fundsCommitted;
   bool approvedCampaign;  
   string sponsorLegalName;
   string sponsorContact;    
  }

  Campaigns[] public campaigns;

  constructor(address _VRFCoordinator, address _LinkToken, bytes32 _kehash, address _priceFeed) 
  public
  VRFConsumerBase(_VRFCoordinator, _LinkToken)
  ER721("FundMeCampaign", "FMC")
  {
     VRFCoordinator = _VRFCoordinator;
     priceFeed = AggregatorV3Interface(_priceFeed);
     LinkToken = _LinkToken;
     keyhash = _keyhash;
     fee = 0.1 * 10**18; //0.1 Link
  }


}


