export const networks = [
  {
    name: "Polygon Mumbai",
    ccipAddress: "0x6237dBe7dfCF7815830DC7207bDb01FE126193a7",
    supportedTokens: [
      {
        name: "CCIP-BnM",
        address: "0xf1E3A5842EeEF51F2967b3F05D45DD4f4205FF40",
      },
    ],
  },
  {
    name:"Avalanche Fuji",
    ccipAddress:"",
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
