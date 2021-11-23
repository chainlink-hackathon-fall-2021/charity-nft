// SPDX-License-Identifier: MIT

import "../aragon/IVoting.sol";

pragma solidity ^0.6.12;

// Contract added to the dao with permissions to create new votes
// for the sake of simplicity, the process to add this contract to the dao is
// out of the scope of this prototype
contract CampaignVotingManager {

    // harcoded voting dao app to simplify hackathon
    IVoting private voting = IVoting(0x2c2e5397F336C29a991E9E1759085F9940ACe347);
    
    mapping(bytes32=>uint256) public votes;

    // @todo add reentrancy check
    // user calls the submit to cast newly created vote
    // _executionScript contains the callback to review(uint256 _tokenId)
    function submit(bytes calldata _executionScript, string calldata _campaignName) external{
        uint256 voteId = voting.newVote(_executionScript, _campaignName);
        votes[hash(_campaignName)] = voteId;
        // @todo mint campaign token using dao voteId as tokenId
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
            _approve(_campaignName);
        }else{
            _reject(_campaignName);
        }
        delete votes[_campaignName];
    }

    function _approve(bytes32 _campaignName) private {
        // @todo add aditional logic to add this campaing to the donors pool
        // @todo create a new vote to allow the campaing to participate in a funding pool
    }

    function _reject(bytes32 _campaignName) private {
        // @todo do something if needed like remove campaing from funding pool
    }
    
    function hash(string memory s) public pure returns (bytes32) {
		return keccak256(bytes(s));
	}
    
}