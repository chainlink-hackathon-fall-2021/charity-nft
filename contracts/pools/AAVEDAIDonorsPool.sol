// SPDX-License-Identifier: MIT

pragma solidity ^0.6.12;

// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.2/contracts/math/SafeMath.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.2/contracts/access/Ownable.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.2/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ILendingPool} from "@aave/protocol-v2/contracts/interfaces/ILendingPool.sol";
import {IAToken} from "@aave/protocol-v2/contracts/interfaces/IAToken.sol";
import "../tokens/IToken.sol";
import "../aragon/ITokenManager.sol";
import "./IDonor.sol";

// this is a basic AAVE donors pool for DAI
// @todo add more documentation
contract AAVEDAIDonorsPool is Ownable, IDonor {
    using SafeMath for uint256;

    // @todo add more documentation
    // hardcoding dai for hackathon simplicity
    IERC20 public dai = IERC20(0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F);
    IAToken public aToken = IAToken(0x639cB7b21ee2161DF9c882483C9D55c90c20Ca3e);
    ILendingPool public aaveLendingPool = ILendingPool(0x9198F13B08E299d85E096929fA9781A1E3d5d827);
    ITokenManager private tokenManager = ITokenManager(0xA6687fe9F472159be142b584D3756634C2A1883a);

    IToken public token;

    mapping(address => uint256) public deposits;
    mapping(address => uint256) public donationPercentages;
    mapping(uint256 => bool) public override donated;

    uint256 public tvl;
    uint256 public tvd;

    uint64 public constant MAX_DONATION_PERCENTAGE = 10**18; // 0% = 0; 1% = 10^16; 100% = 10^18

    constructor(IToken _token) public {
        dai.approve(address(aaveLendingPool), type(uint256).max);
        token = _token;
    }

    function deposit(uint256 _amount, uint256 _donationPercentage) external {
        require(_donationPercentage <= MAX_DONATION_PERCENTAGE, "Invalid donation percentage");
        // send dai from user to this contract
        require(dai.transferFrom(_msgSender(), address(this), _amount), 'DAI transfer failed!');
        // then deposit to aave
        aaveLendingPool.deposit(address(dai), _amount, address(this), 0);
        deposits[_msgSender()] = deposits[_msgSender()].add(_amount);
        donationPercentages[_msgSender()] = _donationPercentage;
        tvl = tvl.add(_amount); // track principal tvl
        tokenManager.mint(_msgSender(), 1);
        // @todo mint share token token
        // @todo add assertions
    }

    function withdraw(uint256 _amount) external {
        require(deposits[_msgSender()] >= _amount, 'You cannot withdraw more than deposited!');
        (, uint256 shareValue) = getShare();
        require(shareValue >= _amount, "Not enough funds");
        uint256 withdrawalShare = div(_amount, deposits[_msgSender()]);
        uint256 withdrawalShareValue = ratio(withdrawalShare, shareValue);
        uint256 donationAmount = ratio(donationPercentages[_msgSender()], shareValue.sub(deposits[_msgSender()]));
        uint256 withdrawalAmount = withdrawalShareValue.sub(donationAmount);
        deposits[_msgSender()] = deposits[_msgSender()].sub(_amount);
        tvl = tvl.sub(_amount);
        aaveLendingPool.withdraw(address(dai), withdrawalAmount, _msgSender());
        if (deposits[_msgSender()] == 0) {
            tokenManager.burn(_msgSender(), 1);
        }
        // @todo burn share token
        // @todo add assertions
    }

    function withdrawAll() external {
        require(deposits[_msgSender()] > 0, "Not enough funds");
        (, uint256 shareValue) = getShare();
        tvl = tvl.sub(deposits[_msgSender()]);
        uint256 donationAmount = ratio(donationPercentages[_msgSender()], shareValue.sub(deposits[_msgSender()]));
        uint256 withdrawalAmount = shareValue.sub(donationAmount);
        deposits[_msgSender()] = 0;
        aaveLendingPool.withdraw(address(dai), withdrawalAmount, _msgSender());
        tokenManager.burn(_msgSender(), 1);
        // @todo burn share token
        // @todo add assertions
    }

    // sends dai to the campaign owner
    function donate(uint256 _tokenId) external override {
        require(token.exists(_tokenId), "Invalid campaign token");
        require(!donated[_tokenId], "Campaign already funded by pool");
        donated[_tokenId] = true;
        uint256 earnings = getEarnings();
        uint256 donation = token.getGoalAmount(_tokenId);
        // only donate with earnings
        // @todo optionaly donate only the yes voted ratio: yeah/votingPower=supportRatio
        if (donation > earnings) {
            // donate half of earnings if there is not enough earnings to cover the goal
            donation = earnings.div(2);
        }
        aaveLendingPool.withdraw(address(dai), donation, token.getBeneficiary(_tokenId));
        tvd = tvd.add(donation);
    }

    function changeDonationPercentage(uint256 _donationPercentage) public {
        require(_donationPercentage <= MAX_DONATION_PERCENTAGE, "Invalid donation percentage");
        donationPercentages[_msgSender()] = _donationPercentage;
    }

    function getShare() public view returns (uint256 share, uint256 shareValue) {
        (share, shareValue) = _getShareOf(_msgSender());
    }

    function getEarnings() public view returns (uint256 earnings) {
        uint256 poolBalance = aToken.balanceOf(address(this));
        (, earnings) = poolBalance.trySub(tvl);
    }

    function _getShareOf(address _user) private view returns (uint256 share, uint256 shareValue) {
        uint256 poolBalance = aToken.balanceOf(address(this));
        share = div(deposits[_user], tvl);
        shareValue = ratio(share, poolBalance);
    }

    function setTokenInterface(IToken _token) external onlyOwner {
        token = _token;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256 c) {
        (, c) = a.mul(10**18).add(b.div(2)).tryDiv(b);
    }

    function ratio(uint256 a, uint256 b) internal pure returns (uint256 c) {
        (, c) = a.mul(b).tryDiv(10**18);
    }
}
