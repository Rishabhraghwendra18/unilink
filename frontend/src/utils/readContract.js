import { ethers } from "ethers";

export async function readContractBalance(contractAddress,ABI,userAddress){
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(contractAddress, ABI, provider);
    return await contract.balanceOf(userAddress);
}