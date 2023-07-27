require("dotenv").config();
const { signer, contract } = require("../utils/infura");

const NFTOperations = {

  async mintNFT(mintingDetails) {
    try {
      // Issuing a transaction that calls the `echo` method
      const tx = contract.methods.mintNFT(
        mintingDetails.walletAddress,
        mintingDetails.nftMetadataURL
      );
      const receipt = await tx
        .send({
          from: signer.address,
          gas: await tx.estimateGas(),
        })
        .once("transactionHash", (txhash) => {
          console.log(`Mining transaction ...`);
          console.log(`https://goerli.etherscan.io/tx/${txhash}`);
        });
      // The transaction is now on chain!
      console.log(`Mined in block ${receipt.blockNumber}`);
      return receipt;
    } catch (error) {
      console.log(error);
    }
  },

  async updateNFT(correctionDetails){
    try {
      // Issuing a transaction that calls the `echo` method
      const tx = contract.methods.updateNFT(
        correctionDetails.tokenId,
        correctionDetails.walletAddress,
        correctionDetails.tokenURL
      );

      const receipt = await tx
        .send({
          from: signer.address,
          gas: await tx.estimateGas(),
        })
        .once("transactionHash", (txhash) => {
          console.log(`Mining transaction ...`);
          console.log(`https://goerli.etherscan.io/tx/${txhash}`);
        });
      // The transaction is now on chain!
      console.log(`Mined in block ${receipt.blockNumber}`);
      return receipt.transactionHash;
    } catch (error) {
      console.log(error);
    }
  },

  async transferNFT(transferDetails){
    
    
    try {
      // Issuing a transaction that calls the `echo` method
      const tx = contract.methods.transferNFT(
        transferDetails.senderAddress,
        transferDetails.receiverAddress,
        transferDetails.tokenID
      );

      const receipt = await tx
        .send({
          from: signer.address,
          gas: await tx.estimateGas(),
        })
        .once("transactionHash", (txhash) => {
          console.log(`Mining transaction ...`);
          console.log(`https://goerli.etherscan.io/tx/${txhash}`);
        });
      // The transaction is now on chain!
      console.log(`Mined in block ${receipt.blockNumber}`);
      return receipt.transactionHash;
    } catch (error) {
      console.log(error);
    }
  },

  async createWill(willDetails){

    try {
      const tx = contract.methods.createWill(
        willDetails.createrAddress,
        willDetails.tokenID,
        willDetails.willText,
      );
      const receipt = await tx
        .send({
          from: signer.address,
          gas: await tx.estimateGas(),
        })
        .once("transactionHash", (txhash) => {
          console.log(`Mining transaction ...`);
          console.log(`https://goerli.etherscan.io/tx/${txhash}`);
        });
      // The transaction is now on chain!
      console.log(`Mined in block ${receipt.blockNumber}`);
      return receipt.transactionHash;
    } catch (error) {
      console.log(error);
    }
  },

  async viewWill(address){
    try {
      // Issuing a transaction that calls the `echo` method
      const tx = contract.methods.viewWill(address);
      const receipt = await tx
        .call({
          from: signer.address,
          gas: await tx.estimateGas(),
        })
      return receipt;
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = NFTOperations;
