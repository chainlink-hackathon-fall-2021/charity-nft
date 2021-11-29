// SPDX-License-Identifier: MIT

pragma solidity ^0.6.12;

// @todo find better name
interface IDonor {
    function donated(uint256 _tokenId) external returns (bool);
    function donate(uint256 _tokenId) external;
}
