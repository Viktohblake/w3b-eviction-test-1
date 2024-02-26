  // Registration tx: 0xaaf58d5514eb9cc3653978cafc02a1d2879be73855a0ba81b44f66f04c3ec043

  // Verification tx: 0xa24b552472d1342d4318c2a4ee3d9b335ba52b26a9d19429363335ff18b815c0

import { ethers } from "hardhat";

async function main() {

  const IdentityRegistryFactory = await ethers.getContractFactory("IdentityRegistryFactory");
  const identityRegistryFactory = await IdentityRegistryFactory.deploy();

  console.log("IdentityRegistryFactory deployed to:", identityRegistryFactory.target);

  // Create a new Identity Registry
  await identityRegistryFactory.createRegistry();
  console.log("Identity Registry created");

  await identityRegistryFactory.waitForDeployment();


// Get the deployed IdentityRegistry contract address
const deployedRegistries = await identityRegistryFactory.getDeployedRegistries();
const identityRegistryAddress = deployedRegistries[0];
console.log("IdentityRegistry address:", identityRegistryAddress);

    // Get the deployed IdentityRegistry contract
    const IdentityRegistry = await ethers.getContractAt("IdentityRegistry", identityRegistryAddress);

  // Register an identity
  const name = "Victor";
  const age = 25;
  const country = "Nigeria";

  const registerTx = await IdentityRegistry.registerIdentity(name, age, country);
  await registerTx.wait(); // Wait for the transaction to be mined

  console.log(`${name}'s identity registered in the registry. Tx Hash: ${registerTx.hash}`);

  // Verify the registered identity
  const verifyTx = await IdentityRegistry.verifyIdentity();
  await verifyTx.wait(); // Wait for the transaction to be mined

  console.log(`${name}'s identity verified. Tx Hash: ${verifyTx.hash}`);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
