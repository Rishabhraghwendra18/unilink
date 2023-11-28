import CCIPMumbaiABI from "../ABI/CCIP-Mumbai.json";
import CCIPBnMMumbaiABI from "../ABI/CCIP-BnMMumbai.json";

export const networks = [
  {
    name:"Ethereum Sepolia",
    ccipAddress:"",
    chainSelector: "14767482510784806043",
    supportedTokens:[
        {
            name:"CCIP-BnM",
        address:"0xD21341536c5cF5EB1bcb58f6723cE26e8D8E90e4",
        },
        {
            name:"CCIP-LnM",
            address:"0x70F5c5C40b873EA597776DA2C21929A8282A3b35",
        }
    ]
  },
  {
    name: "Polygon Mumbai",
    ccipAddress: process.env.NEXT_PUBLIC_CCIP_ADDRESS_MUMBAI,
    abi:CCIPMumbaiABI,
    chainSelector: "12532609583862916517",
    supportedTokens: [
      {
        name: "CCIP-BnM",
        address: "0xf1E3A5842EeEF51F2967b3F05D45DD4f4205FF40",
        abi:CCIPBnMMumbaiABI
      },
    ],
  },
  {
    name:"Avalanche Fuji",
    ccipAddress:"",
    chainSelector: "14767482510784806043",
    supportedTokens:[
        {
            name:"CCIP-BnM",
        address:"0xD21341536c5cF5EB1bcb58f6723cE26e8D8E90e4",
        },
        {
            name:"CCIP-LnM",
            address:"0x70F5c5C40b873EA597776DA2C21929A8282A3b35",
        }
    ]
  },
  {
    name:"Arbitrum",
    ccipAddress:"",
    chainSelector: "14767482510784806043",
    supportedTokens:[
        {
            name:"CCIP-BnM",
        address:"0xD21341536c5cF5EB1bcb58f6723cE26e8D8E90e4",
        },
        {
            name:"CCIP-LnM",
            address:"0x70F5c5C40b873EA597776DA2C21929A8282A3b35",
        }
    ]
  },
  {
    name:"Optimism",
    ccipAddress:"",
    chainSelector: "14767482510784806043",
    supportedTokens:[
        {
            name:"CCIP-BnM",
        address:"0xD21341536c5cF5EB1bcb58f6723cE26e8D8E90e4",
        },
        {
            name:"CCIP-LnM",
            address:"0x70F5c5C40b873EA597776DA2C21929A8282A3b35",
        }
    ]
  },
  {
    name:"BNB Chain",
    ccipAddress:"",
    chainSelector: "14767482510784806043",
    supportedTokens:[
        {
            name:"CCIP-BnM",
        address:"0xD21341536c5cF5EB1bcb58f6723cE26e8D8E90e4",
        },
        {
            name:"CCIP-LnM",
            address:"0x70F5c5C40b873EA597776DA2C21929A8282A3b35",
        }
    ]
  },
  {
    name:"Base",
    ccipAddress:"",
    chainSelector: "14767482510784806043",
    supportedTokens:[
        {
            name:"CCIP-BnM",
        address:"0xD21341536c5cF5EB1bcb58f6723cE26e8D8E90e4",
        },
        {
            name:"CCIP-LnM",
            address:"0x70F5c5C40b873EA597776DA2C21929A8282A3b35",
        }
    ]
  }
];
