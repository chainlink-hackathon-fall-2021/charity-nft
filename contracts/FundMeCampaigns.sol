// // SPDX-License-Identifier: MIT

// pragma solidity ^0.8.7;

// import "@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/utils/Strings.sol";

// /**
//  * @title FundMeCampaign
//  * @dev Implements ERC155
//  */
// contract FundMeCampaigns is ERC1155PresetMinterPauser, Ownable {
//     uint256 public campaignCount;

//     struct Campaign {
//         // key attributes for any campaign
//         uint256 uid;
//         string name;
//         string description;
//         string sponsorLegalName;
//         string sponsorContact;
//         uint256 startDate;
//         uint256 endDate;
//         uint256 fundingTarget;
//         uint256 fundsCommitted;
//         bool approvedCampaign;
//         bool active;
//     }

//     // Campaign[] public campaigns;
//     Campaign[] public campaigns;
//     // mapping(uint => Campaign) public campaigns;

//     mapping(uint256 => string) private _uris;

//     constructor() public ERC1155PresetMinterPauser("") {
//         campaignCount = 0;
//     }

//    function uri(uint256 _campaignTokenId) override public view returns (string memory) {
//      return(_uris[_campaignTokenId]);
//    }

//    function setTokenUri(uint256 _campaignTokenId, string memory _uri) public onlyOwner {
//        require(bytes(_uris[_campaignTokenId]).length == 0, "Cannot change campaign metadata twice");
//        _uris[_campaignTokenId] = _uri;
//    }

//     function addNewCampaign(
//         string memory _name,
//         string memory _description,
//         string memory _sponsorLegalName,
//         string memory _sponsorContact,
//         uint256 _startDate,
//         uint256 _endDate,
//         uint256 _fundingTarget,
//         uint256 _fundsCommitted
//     ) external {
//         campaignCount++;
//         uint256 campaignTokenId = campaignCount;
//         Campaign memory campaign = Campaign(
//             campaignCount,
//             _name,
//             _description,
//             _sponsorLegalName,
//             _sponsorContact,
//             _startDate,
//             _endDate,
//             _fundingTarget,
//             _fundsCommitted,
//             false,
//             false
//         );
//         campaigns.push(campaign);
//         campaigns[campaignCount] = campaign;
//         _mint(msg.sender, campaignTokenId, 1, "");
//     }
// }
