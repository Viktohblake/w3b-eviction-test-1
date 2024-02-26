import { ethers } from "hardhat";

async function main() {

  const IdentityRegistryFactory = await ethers.getContractFactory("IdentityRegistryFactory");
  const identityRegistryFactory = await IdentityRegistryFactory.deploy();
  await identityRegistryFactory.waitForDeployment();
  console.log("IdentityRegistryFactory deployed to:", identityRegistryFactory.target);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
