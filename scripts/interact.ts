import { ethers } from "hardhat";

import { IdentityRegistryFactory, IdentityRegistry } from "../typechain-types/contracts";

async function main() {
  const [deployer] = await ethers.getSigners();
  const deployerAddress = await deployer.getAddress();

  console.log("Interacting with Identity Registry contracts with address:", deployerAddress);

  // Deploy IdentityRegistryFactory
  const IdentityRegistryFactory = await ethers.getContractFactory("IdentityRegistryFactory");
  const identityRegistryFactory = await IdentityRegistryFactory.deploy();
  await identityRegistryFactory.deployed();

  console.log("IdentityRegistryFactory deployed to:", identityRegistryFactory.address);

  // Create a new Identity Registry
  await identityRegistryFactory.createRegistry();

  // Get the deployed Identity Registry
  const [deployedRegistry] = await identityRegistryFactory.getDeployedRegistries();
  console.log("Deployed Identity Registry:", deployedRegistry);

  // Interact with the Identity Registry
  const IdentityRegistry = await ethers.getContractFactory("IdentityRegistry");
  const identityRegistryContract = await IdentityRegistry.attach(deployedRegistry);

  // Register an identity
  const name = "Alice";
  const age = 25;
  const country = "Wonderland";
  await identityRegistryContract.registerIdentity(name, age, country);
  console.log(`${name}'s identity registered in the registry`);

  // Verify the registered identity
  await identityRegistryContract.verifyIdentity();
  console.log(`${name}'s identity verified`);

  // Example: Print the balance of the deployer's address after the interaction
  const balance = await ethers.provider.getBalance(deployerAddress);
  console.log("Deployer's balance:", ethers.utils.formatEther(balance));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
