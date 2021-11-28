// SPDX-License-Identifier: MIT

pragma solidity ^0.6.12;

interface ITokenManager {

    function mint(address _receiver, uint256 _amount) external;
    function burn(address _holder, uint256 _amount) external;
}