require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const ALCHEMY_MUMBAI_API_KEY = process.env.ALCHEMY_MUMBAI_API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY=process.env.ETHERSCAN_API_KEY;

module.exports = {
  solidity: "0.8.19",
  networks:{
    sepolia:{
      url:ALCHEMY_API_KEY,
    accounts:[PRIVATE_KEY]
    },
    mumbai:{
      url:ALCHEMY_MUMBAI_API_KEY,
      accounts:[PRIVATE_KEY]
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY
  },
  sourcify: {
    // Disabled by default
    // Doesn't need an API key
    enabled: true
  },
  mocha: {
    timeout: 100000000
  },
};
