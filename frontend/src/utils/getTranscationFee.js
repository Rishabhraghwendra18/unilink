import { ethers } from "ethers";

export async function getTranscationFee(ccipAddress,ABI,txnParams) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(ccipAddress, ABI, provider);
    return await contract.getTotalTranscationFees(txnParams?.destinationChain,txnParams?.receiver,txnParams?.tokens,txnParams?.amounts);

}