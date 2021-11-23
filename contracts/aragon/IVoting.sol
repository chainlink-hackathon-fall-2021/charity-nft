// SPDX-License-Identifier: MIT

pragma solidity ^0.6.12;

interface IVoting {

    /**
    * @notice Create a new vote about "`_metadata`"
    * @param _executionScript EVM script to be executed on approval
    * @param _metadata Vote metadata
    * @return voteId Id for newly created vote
    */
    function newVote(bytes calldata _executionScript, string calldata _metadata) external returns (uint256 voteId);

    /**
    * @dev Return all information for a vote by its ID
    * @param _voteId Vote identifier
    */
    function getVote(uint256 _voteId)
        external
        view
        returns (
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
        );

}