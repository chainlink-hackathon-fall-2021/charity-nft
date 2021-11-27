// SPDX-License-Identifier: MIT

pragma solidity ^0.6.12;

// @todo interface to call erc1155 token implementation
interface IToken {
    
    function mintCampaign(
        address _to,
        uint256 _,
        bytes calldata /*_campaignHash*/
    ) external;
    
    function getBeneficiary(uint256 _tokenId) external view returns(address);
    function getGoalAmount(uint256 _tokenId) external view returns(uint256);    
    function exists(uint256 _tokenId) external view returns (bool);
    
}