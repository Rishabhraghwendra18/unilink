// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const {deployConfig} = require('../constants.js');
const {verifyContract} = require('../utils/verify-contract.js');

async function main() {
  console.log("Deploying contract....");
  const TokenTransferor = await hre.ethers.getContractFactory("TokenTransferor");
  const tokenTransferor = await TokenTransferor.deploy(deployConfig.sepolia.ROUTER,deployConfig.sepolia.LINK);

  await tokenTransferor.deployed();

  console.log(`TokenTransferor deployed at: `,tokenTransferor.address);
  await tokenTransferor.deployTransaction.wait(5);
  console.log("Verifying contract....");
  await verifyContract(tokenTransferor.address,[deployConfig.sepolia.ROUTER,deployConfig.sepolia.LINK])
  console.log("Verified Contract at: ",tokenTransferor.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
module.exports={
  main
}