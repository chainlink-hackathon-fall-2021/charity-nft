// SPDX-License-Identifier: MIT

pragma solidity ^0.6.12;

// @todo interface to call erc1155 token implementation
interface IToken {
    
    function mintCampaign(
        address _to,
        uint256 _tokenId,
        bytes32 _campaignHash,
        uint256 _goal,
        uint256 _startDate,
        uint256 _endDate,
        string memory _cid
    ) external;
    function getBeneficiary(uint256 _tokenId) external view returns(address);
    function getGoalAmount(uint256 _tokenId) external view returns(uint256);    
    function exists(uint256 _tokenId) external view returns (bool);

}