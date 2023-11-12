const hre = require("hardhat");
async function approveTokens(name,address,spenderAddress,spendAmount) {
    const contract = await hre.ethers.getContractAt(name,address);
    await contract.approve(spenderAddress,spendAmount);
    console.log("Setted the spend amount");
}
module.exports={
    approveTokens
}