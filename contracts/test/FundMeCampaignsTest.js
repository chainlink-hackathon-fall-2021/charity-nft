const { expect } = require("chai");

describe("FundMeCampaigns, contract", function () {
    let deployedContract;
    let owner;
    before(async function() {
      [owner] = await ethers.getSigners();
      const FundMeCampaigns = await ethers.getContractFactory("FundMeCampaigns");
      deployedContract = await FundMeCampaigns.deploy();
    });
      

  it("Deployment should assign the contract owner", async function () {
    expect(await deployedContract.owner()).to.equal(owner.address);
  });

  it("Deployment - should start with no campaigns", async function () {
    expect(await deployedContract.campaignCount()).to.equal(0);
    expect(await deployedContract.campaigns.length).to.equal(0);

  });
});