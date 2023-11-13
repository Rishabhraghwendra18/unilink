const { ethers } = require("hardhat");

async function approveTokens(contractAddress,abi,spenderAddress,spendAmount) {
    const provider= new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API_KEY);
    
    const contract = await ethers.Contract(contractAddress,abi,provider);
    // await contract.approve(spenderAddress,spendAmount);
    console.log("Setted the spend amount");
}
module.exports={
    approveTokens
}