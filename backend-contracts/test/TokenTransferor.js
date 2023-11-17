const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const {deployConfig} = require("../constants");
const {deployContract} = require("../utils/deploy-contract");
const {approveTokens} = require("../utils/approve-tokens");
const BnMABI= require('../contracts-abi/CCIP-BnM.json');
const LnMABI= require('../contracts-abi/cCCIP-LnM.json');
const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens =[
{
  name:"CCIP-BnM",
  address:'0xf1E3A5842EeEF51F2967b3F05D45DD4f4205FF40',
  ABI:BnMABI
},
{
  name:"cCCIP-LnM",
  address:"0xc1c76a8c5bfde1be034bbcd930c668726e7c1987",
  ABI:LnMABI
}
];
const TOKEN_AMOUNT=2000000000000000;
describe("TokenTransferor",function () {
    let tokenTransferor;
    this.beforeAll(async ()=>{
      console.log("=======================Before All Function Starts=============================");
      tokenTransferor= await deployContract();
        console.log("Approving spend")
        for(let i=0;i<tokens.length;i++){
          await approveTokens(tokens[i].address,tokens[i].ABI,tokenTransferor.address,TOKEN_AMOUNT);
        }
        console.log("Approved Spend!");
        await tokenTransferor.allowlistDestinationChain(deployConfig.fuji.CHAIN_SELECTOR,true);
        console.log("Allowed Destination Chain Selector");
        console.log("=======================Before All Function Ends=============================\n");
    })
    it("Transfer CCIP-BnM and CCIP-LnM tokens from mumbai to Avalanche Fuji", async function () {
        const [owner]=await ethers.getSigners();
        const transferTokens =[tokens[0].address];
        const amounts=[1000000000000000];
        const transcationCost = await tokenTransferor.getTotalTranscationFees(deployConfig.fuji.CHAIN_SELECTOR,owner.address,transferTokens,amounts);
        console.log("Transcation Cost: ",ethers.utils.formatEther(transcationCost));
        const transcationRecipt=await tokenTransferor.transferTokensPayNative(deployConfig.fuji.CHAIN_SELECTOR,owner.address,transferTokens,amounts,{value:transcationCost});
        console.log("Transcation Cost and Hash: ",transcationRecipt.transcationHash);
    });
})