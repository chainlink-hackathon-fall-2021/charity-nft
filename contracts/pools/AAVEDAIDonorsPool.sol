// SPDX-License-Identifier: MIT

pragma solidity ^0.6.12;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ILendingPool} from "@aave/protocol-v2/contracts/interfaces/ILendingPool.sol";
import {IAToken} from "@aave/protocol-v2/contracts/interfaces/IAToken.sol";
import "../tokens/IToken.sol";
import "./IDonor.sol";


// this is a basic AAVE donors pool for DAI
// @todo add more documentation
contract AAVEDAIDonorsPool is Ownable, IDonor {

    using SafeMath for uint256;
    
    IToken token;
    
    // hardcoding dai for hackathon simplicity
    IERC20 public dai = IERC20(0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F); // 10000000000000000000 => 1$ Dai
    IAToken public aToken = IAToken(0x639cB7b21ee2161DF9c882483C9D55c90c20Ca3e);
    ILendingPool public aaveLendingPool = ILendingPool(0x9198F13B08E299d85E096929fA9781A1E3d5d827);
    
    mapping(address => uint256) public deposits;
    uint256 public tvl;
    uint256 public tvd;
    
    constructor(IToken _token) public {
        dai.approve(address(aaveLendingPool), type(uint256).max);
        token = _token;
    }
    
    function deposit(uint256 _amount) external {
        // send dai from user to this contract
        require(dai.transferFrom(_msgSender(), address(this), _amount), "DAI transfer failed!");
        // then deposit to aave
        aaveLendingPool.deposit(
            address(dai),
            _amount,
            address(this),
            0
          );
        deposits[_msgSender()] = deposits[_msgSender()].add(_amount);
        tvl = tvl.add(_amount); // track principal tvl
        // @todo mint dao token
        // @todo mint share token token
        // @todo add assertions
    }
    
    function withdraw(uint256 _amount) external {
        require(deposits[_msgSender()] >= _amount, "You cannot withdraw more than deposited!");
        (, uint256 shareValue) = getShare();
        deposits[_msgSender()] = deposits[_msgSender()].sub(_amount);
        tvl = tvl.sub(_amount);

        aaveLendingPool.withdraw(
            address(dai),
            shareValue,
            _msgSender()
          );
        // @todo burn dao token if deposited amount goes to zero
        // @todo add assertions
    }
    
    // sends dai to the campaign owner
    function donate(uint256 _tokenId) external override {
        require(token.exists(_tokenId), "Invalid campaign token");
        // @todo calculate pool earnings
        aaveLendingPool.withdraw(
            address(dai),
            1**18, // @todo replace this with pool earnings, $1 sent for testing
            token.getBeneficiary(_tokenId)
          );
        // @todo grant rights to donors to receive PoD tokens
    }

    function getShare() public view returns (uint256 share, uint256 shareValue){
        (share, shareValue) = _getShareOf(_msgSender());
    }

    function getEarnings() public view returns (uint256 earnings) {
        uint256 poolBalance = aToken.balanceOf(address(this));
        (, earnings) = poolBalance.trySub(tvl);
    }

    function _getShareOf(address _user) private view returns (uint256 share, uint256 shareValue){
        uint256 poolBalance = aToken.balanceOf(address(this));
        (, share) = deposits[_user].tryDiv(tvl);
        (, shareValue) = poolBalance.tryMul(share);
    }

    function setTokenInterface(IToken _token) external onlyOwner() {
        token = _token;
    }
}