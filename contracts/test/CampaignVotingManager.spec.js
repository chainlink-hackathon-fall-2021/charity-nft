const { BigNumber } = require("@ethersproject/bignumber");
const { expect } = require("chai");
const { ethers } = require("hardhat");

const { encodeCallScript } = require("./evmUtils");

// only works using mombai hardhat testnet fork
// @todo needs more work
describe.skip("CampaignVotingManager", function () {

  let owner;
  let user;
  let user2;
  let campaignVotingManager;

  before(async function () {
    [owner, user, user2] = await ethers.getSigners();
    const campaignVotingManagerFactory = await ethers.getContractFactory("CampaignVotingManager");
    campaignVotingManager = await campaignVotingManagerFactory.deploy();
    await campaignVotingManager.deployed();
  });

  describe('A user with intentions to create a campaign', function () {

    it("Should be able to open a voting session on dao", async function () {
      // @todo add review by campaign metadata hash
      const tx = await campaignVotingManager.populateTransaction.review(4);
      // console.log('tx', tx);
      const action = { to: '0xD1eC165f01e61A8ef5630451786e47E4D440307F', calldata: tx.data }
      const script = encodeCallScript([action]);

      // expect(await campaignVotingManager.counter(), 1, 'should have executed action');
      console.log('script', script);
    });

  });

});