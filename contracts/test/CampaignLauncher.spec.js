const { BigNumber } = require("@ethersproject/bignumber");
const { expect } = require("chai");
const { ethers } = require("hardhat");

const { encodeCallScript } = require("./evmUtils");

// only works using mombai hardhat testnet fork
// @todo needs more work
describe.skip("CampaignLauncher", function () {

  let owner;
  let user;
  let user2;
  let campaignLauncher;

  before(async function () {
    [owner, user, user2] = await ethers.getSigners();
    const campaignLauncherFactory = await ethers.getContractFactory("CampaignLauncher");
    campaignLauncher = await campaignLauncherFactory.deploy();
    await campaignLauncher.deployed();
  });

  describe('A user with intentions to create a campaign', function () {

    it("Should be able to open a voting session on dao", async function () {
      const campaignName = 'Test campaign 1';
      const campaignHash = ethers.utils.id(campaignName);
      const to = '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4';
      // const to = '0xD1eC165f01e61A8ef5630451786e47E4D440307F';
      // @todo add review by campaign metadata hash
      const tx = await campaignLauncher.populateTransaction.review(campaignHash);
      // console.log('tx', tx);
      const action = { to, calldata: tx.data }
      const script = encodeCallScript([action]);

      // expect(await campaignLauncher.counter(), 1, 'should have executed action');
      console.log('script', script);

      //0x000000015b38da6a701c568545dcfcb03fcb875f56beddc4000000249028d8b03170ebb55bfb966da1a96fbc0843e534ae1f6c2e1b5f3b22c73637994a6da5e2
      //0x000000015b38da6a701c568545dcfcb03fcb875f56beddc4000000249028d8b03170ebb55bfb966da1a96fbc0843e534ae1f6c2e1b5f3b22c73637994a6da5e2
    });

  });

});