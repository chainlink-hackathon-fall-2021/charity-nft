const { BigNumber } = require("@ethersproject/bignumber");
const { expect } = require("chai");
const { ethers } = require("hardhat");

// only works using mombai hardhat testnet fork

describe("AAVEDonorsPool", function () {

  const DAI = '0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F';
  const FAUCET = '0x0b3C23243106A69449e79C14c58BB49E358f9B10';
  const ATOKEN = '0x639cB7b21ee2161DF9c882483C9D55c90c20Ca3e';
  const LENDING_POOL = '0x9198F13B08E299d85E096929fA9781A1E3d5d827';

  const mintAmount = ethers.utils.parseUnits("1000", 18);

  let pool;
  let dai;
  let aToken;
  let lendingPool;
  let owner;
  let user;
  let user2;

  before(async function () {
    [owner, user, user2] = await ethers.getSigners();

    let faucet = await ethers.getContractAt("Faucet", FAUCET);

    dai = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", DAI);

    aToken = await ethers.getContractAt("IAToken", ATOKEN);

    lendingPool = await ethers.getContractAt("ILendingPool", LENDING_POOL);

    const poolCF = await ethers.getContractFactory("AAVEDAIDonorsPool");
    pool = await poolCF.deploy();
    await pool.deployed();

    // // mint 1K to users
    await faucet.connect(user).mint(DAI, mintAmount);
    await faucet.connect(user2).mint(DAI, mintAmount);
    // await faucetTx.wait(); // wait until the transaction is mined
    // // check dai balance
    expect(await dai.balanceOf(user.address)).to.equal(mintAmount);
    // approve AAVE pool from user
    await dai.connect(user).approve(pool.address, mintAmount);
    await dai.connect(user2).approve(lendingPool.address, mintAmount);
    expect(await dai.allowance(user.address, pool.address)).to.equal(mintAmount);
  });

  describe('A user with funds', function () {
    const depositAmount = ethers.utils.parseUnits("10", 18);
    this.beforeEach(async function () {
      // force AAVE lending pool state to change
      await lendingPool.connect(user2).deposit(DAI,depositAmount,user2.address,0);
    });
    it("Should be able to make a deposit", async function () {
      console.log('>>>','pool atoken balance', (await aToken.balanceOf(pool.address)).toString());
      console.log('>>>','pool atoken getScaledUserBalanceAndSupply', (await aToken.getScaledUserBalanceAndSupply(pool.address)).toString());
      await pool.connect(user).deposit(depositAmount);
      expect(await dai.balanceOf(user.address)).to.equal(BigNumber.from(mintAmount).sub(BigNumber.from(depositAmount)));
      expect(await aToken.balanceOf(pool.address)).to.equal(depositAmount);
      const [userShare, shareValue] = await pool.connect(user).getShare();
      expect(userShare).to.be.equal(1); // 100%
      expect(shareValue).to.be.equal(depositAmount);
      console.log('<<<','pool atoken balance', (await aToken.balanceOf(pool.address)).toString());
      console.log('<<<','pool atoken getScaledUserBalanceAndSupply', (await aToken.getScaledUserBalanceAndSupply(pool.address)).toString());
      console.log('<<<','user share', (await pool.connect(user).getShare()).toString());
    });

    it("Should be able to withdraw deposited amount", async function () {
      console.log('>>>','pool atoken balance', (await aToken.balanceOf(pool.address)).toString());
      console.log('>>>','pool atoken getScaledUserBalanceAndSupply', (await aToken.getScaledUserBalanceAndSupply(pool.address)).toString());
      console.log('>>>','user share', (await pool.connect(user).getShare()).toString());
      console.log('>>>','pool earnings', (await pool.getEarnings()).toString());
      let [userShare, shareValue] = await pool.connect(user).getShare();
      await pool.connect(user).withdraw(depositAmount);
      // expect(await dai.balanceOf(user.address)).to.equal(shareValue);
      expect(await aToken.balanceOf(pool.address)).to.equal(0);
      [userShare, shareValue] = await pool.connect(user).getShare();
      expect(userShare).to.be.equal(0); // 100%
      expect(shareValue).to.be.equal(0); // remove principal + earnings
      console.log('<<<','pool atoken balance', (await aToken.balanceOf(pool.address)).toString());
      console.log('<<<','pool atoken getScaledUserBalanceAndSupply', (await aToken.getScaledUserBalanceAndSupply(pool.address)).toString());
      console.log('<<<','user share', (await pool.connect(user).getShare()).toString());
      console.log('<<<','user dai balance', (await dai.balanceOf(user.address)).toString());
      console.log('<<<','pool earnings', (await pool.getEarnings()).toString());
    });

  });

});