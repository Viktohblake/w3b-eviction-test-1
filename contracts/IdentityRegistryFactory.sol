// AirdropFactory.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "./IdentityRegistry.sol";

contract IdentityRegistryFactory {
    address[] public deployedRegistries;

    function createRegistry() external {
        address newRegistry = address(new IdentityRegistry());
        deployedRegistries.push(newRegistry);
    }

    function getDeployedRegistries() external view returns (address[] memory) {
        return deployedRegistries;
    }
}