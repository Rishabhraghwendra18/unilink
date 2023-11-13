const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const {deployContract} = require("../utils/deploy-contract");
const {approveTokens} = require("../utils/approve-tokens");
const BnMABI= require('../contracts-abi/CCIP-BnM.json');
const { expect } = require("chai");

describe("TokenTransferor",function () {
    let contractAddress;
    this.beforeAll(async ()=>{
        contractAddress= await deployContract();
        console.log("Approving spend")
        // const BnMInstance = await ethers.getContractAt('BurnMintERC677', '0xFd57b4ddBf88a4e07fF4e34C487b99af2Fe82a05');
        await approveTokens('0xFd57b4ddBf88a4e07fF4e34C487b99af2Fe82a05',BnMABI,contractAddress,1000000000000000);
    })
    it("Should perform", async function () {
          console.log("done!!!!!!!!")  
    });
})