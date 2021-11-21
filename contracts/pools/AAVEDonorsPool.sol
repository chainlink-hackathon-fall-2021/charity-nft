// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ILendingPool} from "@aave/protocol-v2/contracts/interfaces/ILendingPool.sol";
import {IAToken} from "@aave/protocol-v2/contracts/interfaces/IAToken.sol";

// this is a basic AAVE donors pool for DAI
// @todo add more documentation
contract AAVEDAIDonorsPool is Context {

    using SafeMath for uint256;
    
    // hardcoding dai for hackathon simplicity
    IERC20 public dai = IERC20(0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F); // 10000000000000000000 => 1$ Dai
    IAToken public aToken = IAToken(0x639cB7b21ee2161DF9c882483C9D55c90c20Ca3e);
    ILendingPool public aaveLendingPool = ILendingPool(0x9198F13B08E299d85E096929fA9781A1E3d5d827);
    
    mapping(address => uint256) public deposits;
    uint256 public tvl;
    uint256 public tvd;
    
    constructor() public {
        dai.approve(address(aaveLendingPool), type(uint256).max);
    }
    
    function deposit(uint256 _amount) external {
        deposits[_msgSender()] = deposits[_msgSender()].add(_amount);
        // send dai from user to this contract
        require(dai.transferFrom(_msgSender(), address(this), _amount), "DAI transfer failed!");
        // then deposit to aave
        aaveLendingPool.deposit(
            address(dai),
            _amount,
            address(this),
            0
          );
        tvl = tvl.add(_amount);
        // @todo add assertions
    }
    
    function withdraw(uint256 _amount) external {
        require(deposits[_msgSender()] >= _amount, "You cannot withdraw more than deposited!");

        aaveLendingPool.withdraw(
            address(dai),
            _amount,
            _msgSender()
          );
        require(dai.transferFrom(address(this), _msgSender(), _amount), "DAI withdraw transfer failed!");
        
        deposits[_msgSender()] = deposits[_msgSender()].sub(_amount);
        tvl = tvl.sub(_amount);
        // @todo add assertions
    } 
}