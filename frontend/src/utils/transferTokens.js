import { ethers } from "ethers";

export async function transferTokens(ccipAddress,ABI,txnParams) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ccipAddress, ABI, signer);
    await contract.transferTokensPayNative(txnParams?.destinationChain,txnParams?.receiver,txnParams?.tokens,txnParams?.amounts,{value:txnParams?.value});
    return contract;
}