// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract IdentityRegistry {
    struct Identity {
        string name;
        uint256 age;
        string country;
        bool isVerified;
    }

    mapping(address => Identity) public identities;
    address[] public registeredAddresses;

    event IdentityRegistered(address indexed user, string name, uint256 age, string country, bool isVerified);

    modifier notRegistered() {
        require(identities[msg.sender].age == 0, "Identity already registered");
        _;
    }

    function registerIdentity(string memory _name, uint256 _age, string memory _country) external notRegistered {
        require(_age > 0, "Age must be greater than 0");

        identities[msg.sender] = Identity({
            name: _name,
            age: _age,
            country: _country,
            isVerified: false
        });

        registeredAddresses.push(msg.sender);

        emit IdentityRegistered(msg.sender, _name, _age, _country, false);
    }

    function verifyIdentity() external {
        require(identities[msg.sender].age > 0, "Identity not registered");
        identities[msg.sender].isVerified = true;
    }
}