const { expect } = require("chai");
const { ethers } = require("hardhat");

// only works using mombai hardhat testnet fork

describe("AAVEDonorsPool", function () {
  
  const DAI = '0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F';
  const FAUCET ='0x0b3C23243106A69449e79C14c58BB49E358f9B10';
  const ATOKEN ='0x639cB7b21ee2161DF9c882483C9D55c90c20Ca3e';

  const mintAmount = ethers.utils.parseUnits("1000", 18);

  let pool;
  let dai;
  let aToken;
  let owner;
  let user;
  
  before(async function () {
    [owner, user] = await ethers.getSigners();

    const faucet = await ethers.getContractAt("Faucet", FAUCET);
    // const faucet = await faucetCF.attach(FAUCET);

    dai = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", DAI);
    // dai = await dai.attach(DAI);

    aToken = await ethers.getContractAt("IAToken", ATOKEN);
    // aToken = await aTokenFC.attach(ATOKEN);
    
    const poolCF = await ethers.getContractFactory("AAVEDonorsPool");
    pool = await poolCF.deploy();
    await pool.deployed();

    // mint 1K to user
    const faucetTx = await faucet.mint(DAI, mintAmount);
    await faucetTx.wait(); // wait until the transaction is mined
    // check dai balance
    expect(await dai.balanceOf(user)).to.equal(mintAmount);
    // approve AAVE pool from usr
    let userDai = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", DAI);
    userDai = await userDaiFC.connect(user);
    // userDai = await userDaiFC.attach(DAI);
    const userDaiApproveTx = await dai.approve(pool.address, mintAmount);
    await userDaiApproveTx.wait(); // wait until the transaction is mined
    expect(await dai.balanceOf(user)).to.equal(mintAmount);
  });

  describe('A user with funds', function(){
    const depositAmount = ethers.utils.parseUnits("10", 18);
    it("Should be able to make a deposit", async function () {
      const depositTx = await pool.deposit(depositAmount);
      await depositTx.wait(); // wait until the transaction is mined
      expect(await dai.balanceOf(user)).to.equal(mintAmount-depositAmount);
      expect(await aToken.balanceOf(pool.address)).to.equal(depositAmount); // 1:1
    });
  
    it("Should be able to withdraw deposited amount", async function () {
      const withdrawTx = await pool.withdraw(depositAmount);
      await withdrawTx.wait(); // wait until the transaction is mined
      expect(await dai.balanceOf(user)).to.equal(mintAmount);
      expect(await aToken.balanceOf(pool.address)).to.equal(0);
    });
  
  });

});