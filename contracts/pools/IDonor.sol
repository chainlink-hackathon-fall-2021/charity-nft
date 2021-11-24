// SPDX-License-Identifier: MIT

pragma solidity ^0.6.12;

// @todo find better name
interface IDonor {
    
    function donate(uint256 _tokenId) external;
}