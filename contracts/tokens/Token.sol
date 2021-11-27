// SPDX-License-Identifier: MIT

pragma solidity ^0.6.12;

import "./IToken.sol";

// @todo replace with erc1155 token implementation
 contract Token is IToken{
    
    mapping(uint256=>address) public tokens;

    // sample function called from dao after voting funding session
    function mintCampaign(
        address _to,
        uint256 _tokenId,
        bytes memory /*_campaignHash*/
    ) external override {
        // @todo mint token using voteId
        tokens[_tokenId]=_to;
    }
    
    function getBeneficiary(uint256 _tokenId) public override view returns(address beneficiary) {
        beneficiary = tokens[_tokenId];
    }

    function getGoalAmount(uint256 /*_tokenId*/) public override view returns(uint256) {
        return 10**18;
    }
    
    function exists(uint256 _tokenId) external override view returns (bool) {
        return tokens[_tokenId]!=address(0);
    }
    
}