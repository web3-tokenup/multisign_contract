import type { HardhatUserConfig } from "hardhat/config";
import dotenv from "dotenv";
import "@nomicfoundation/hardhat-toolbox";

dotenv.config();

const config: HardhatUserConfig = {
  networks: {
    sepolia: {
      url: `https://ethereum-sepolia-rpc.publicnode.com`,
      chainId: 11155111,
      accounts: ["0xb3b16ba70f6a8a6b36365149f2fd150f699de75159ffa6f5c95f0451ba642480"]
    },
    xonetest: {
      url: `https://rpc-testnet.xone.plus`,
      chainId: 33772211,
      accounts: ["0x1003b26ddb4079b2e25eb99c75ebecf8d006031f1b389e24210f8472b84d9f9a"]
    },
    xonemain: {
      url: `https://rpc.xone.org`,
      chainId: 3721,
    }
  },
  solidity: {
    compilers: [
      {
        version: '0.7.6',
        settings: {
          optimizer: {
            enabled: false,
            runs: 200,
          },
        },
      }
    ],
  },
  etherscan: {
    apiKey: {
      'xonetest': 'empty'
    },
    customChains: [
      {
        network: "xonetest",
        chainId: 33772211,
        urls: {
          apiURL: "https://testnet-dev.xscscan.com/api",
          browserURL: "https://testnet-dev.xscscan.com"
        }
      },
      {
        network: "xonemain",
        chainId: 3721,
        urls: {
          apiURL: "https://xscscan.com/api",
          browserURL: "https://xscscan.com"
        }
      }
    ]
  }
};

export default config;
