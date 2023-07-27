require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Any network (default: none)
    },
    goerli:{
      provider: () => new HDWalletProvider(process.env.MNEMONIC,`https://polygon-mainnet.infura.io/v3/${process.env.INFURA_KEY}`),
      network_id: 5,
      gas: 4465030,
      networkCheckTimeout: 10000,
      timeoutBlocks: 200
    }
  },
  compilers: {
    solc: {
      version: "^0.8.0",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}