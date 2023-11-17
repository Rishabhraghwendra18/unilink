import { ethers } from "ethers";

export async function getTokenAmountAfterFee(ccipAddress,ABI,amount) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(ccipAddress, ABI, provider);
    return await contract.calculateFee(ethers.utils.parseUnits(amount,"ether"));
}