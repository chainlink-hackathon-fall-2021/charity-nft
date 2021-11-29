// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

//  requires separeted interfaces because of problems with solc versions

interface IVoting {
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

interface ICampaignLauncher {
    function getNextDonationToken()
        external
        view
        returns (
            uint256 tokenId,
            bytes32 hash,
            uint256 size,
            uint256 limit
        );

    function getDonationVote(uint256 _tokenId) external view returns (uint256 voteId);

    function finalize(uint256 _tokenId) external;
}

// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.2/contracts/access/Ownable.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.7/KeeperCompatible.sol";

contract CampaignDonationKeeper is KeeperCompatibleInterface, Ownable {
    /**
     * Public counter variable
     */
    uint256 public counter;

    /**
     * Use an interval in seconds and a timestamp to slow execution of Upkeep
     */
    uint256 public lastTimeStamp;
    // harcoded voting dao app to simplify hackathon
    IVoting private voting = IVoting(0x2c2e5397F336C29a991E9E1759085F9940ACe347);
    ICampaignLauncher private campaignLauncher;

    constructor(ICampaignLauncher _campaignLauncher) {
        lastTimeStamp = block.timestamp;
        counter = 0;
        campaignLauncher = _campaignLauncher;
    }

    function checkUpkeep(
        bytes calldata /* checkData */
    ) external view override returns (bool upkeepNeeded, bytes memory performData) {
        // upkeepNeeded = (block.timestamp - lastTimeStamp) > interval;
        // We don't use the checkData in this example. The checkData is defined when the Upkeep was registered.
        (
            uint256 tokenId, /*bytes32 hash*/ /*uint256 size*/ /*uint256 limit*/
            ,
            ,

        ) = campaignLauncher.getNextDonationToken();
        if (tokenId > 0) {
            uint256 voteId = campaignLauncher.getDonationVote(tokenId);
            if (voteId > 0) {
                // see IVoting interface
                (
                    bool open, /*bool executed*/ /*uint64 startDate*/ /*uint64 snapshotBlock*/
                    ,
                    ,
                    ,
                    ,
                    ,
                    ,
                    ,
                    ,

                ) = /*uint64 supportRequired*/
                    /*uint64 minAcceptQuorum*/
                    /*uint256 yea*/
                    /*uint256 nay*/
                    /*uint256 votingPower*/
                    /*bytes memory script*/
                    voting.getVote(voteId);
                upkeepNeeded = !open;
                if (upkeepNeeded) {
                    performData = abi.encodePacked(tokenId);
                }
            }
        }
    }

    function performUpkeep(bytes calldata performData) external override {
        lastTimeStamp = block.timestamp;
        counter = counter + 1;
        uint256 tokenId = abi.decode(performData, (uint256));
        campaignLauncher.finalize(tokenId);
    }

    function setCampaignLuncherInterface(ICampaignLauncher _campaignLauncher) external onlyOwner {
        campaignLauncher = _campaignLauncher;
    }
}
