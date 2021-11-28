// SPDX-License-Identifier: MIT

pragma solidity ^0.6.12;

import "./IToken.sol";

// @todo replace with erc1155 token implementation
 contract Token is IToken{
    
    mapping(uint256=>address) public tokens;
    mapping(uint256=>uint256) public goals;

    // sample function called from dao after voting funding session
    function mintCampaign(
        address _to,
        uint256 _tokenId,
        bytes32 /*_campaignHash*/,
        uint256 _goal,
        uint256 /*_startDate*/,
        uint256 /*_endDate*/,
        string memory /*_cid*/
    ) public override {
        // @todo mint token using voteId
        tokens[_tokenId]=_to;
        goals[_tokenId]=_goal;
    }
    
    function getBeneficiary(uint256 _tokenId) public override view returns(address beneficiary) {
        beneficiary = tokens[_tokenId];
    }

    function getGoalAmount(uint256 _tokenId) public override view returns(uint256) {
        return goals[_tokenId];
    }
    
    function exists(uint256 _tokenId) external override view returns (bool) {
        return tokens[_tokenId]!=address(0);
    }
    
}