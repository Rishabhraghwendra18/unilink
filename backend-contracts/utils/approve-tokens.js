const { ethers } = require("hardhat");

async function approveTokens(contractAddress,abi,spenderAddress,spendAmount) {
    const signer = await ethers.getSigner();
    const contract = new ethers.Contract(contractAddress,abi,signer);
    await contract.approve(spenderAddress,spendAmount);
}
module.exports={
    approveTokens
}