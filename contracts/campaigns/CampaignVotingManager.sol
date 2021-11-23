// SPDX-License-Identifier: MIT

import "../aragon/IVoting.sol";

pragma solidity ^0.6.12;

contract CampaignVotingManager {

    IVoting private voting = IVoting(0x2c2e5397F336C29a991E9E1759085F9940ACe347);
    
    uint256[] public votes;
    mapping(uint256 => bool) public results;
    mapping(uint256 => uint256) public yes;
    mapping(uint256 => uint256) public no;

    function submit(bytes calldata _executionScript, string calldata _metadata) external{
        uint256 voteId = voting.newVote(_executionScript, _metadata);
        // @todo mint campaign token
        votes.push(voteId);
    }

    function review(uint256 _tokenId) external {
        (
            ,
            bool executed,
            ,
            ,
            ,
            ,
            uint256 yea,
            uint256 nay,
            ,
        ) = voting.getVote(_tokenId);
        results[_tokenId] = executed;
        yes[_tokenId] = yea;
        no[_tokenId] = nay;
    }

    // function _approve() private{

    // }

    // function _reject() private {
        
    // }
    
    function totalVotes() public view returns (uint256 total){
        total = votes.length;
    }
}