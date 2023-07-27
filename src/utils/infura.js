const Web3 = require("web3");
require("dotenv").config();

const fs = require("fs");
const { abi } = JSON.parse(fs.readFileSync("build/contracts/MyNFT.json"));

// Configuring the connection to an Ethereum node
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_KEY}`
  )
);
// Creating a signing account from a private key
const signer = web3.eth.accounts.privateKeyToAccount(
  `${process.env.PRIVATE_KEY}`
);

web3.eth.accounts.wallet.add(signer);
// Creating a Contract instance
const contract = new web3.eth.Contract(
  abi,
  // Replace this with the address of your deployed contract
  `${process.env.CONTRACT_ADDRESS}`
);

console.log("Contract Initialised Successfully...");

module.exports = {signer,contract};
