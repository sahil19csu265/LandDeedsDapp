const correctionReq_crud = require("../db/services/correctionReq_crud");
const transferReq_crud = require("../db/services/transferReq_crud");
const NFTOperations = require("../services/NFTOperations");
const ApiClient  = require("../utils/apiclient");
const {SUCCESS,NOT_FOUND,SERVER_ERROR,FILE_NOT_FOUND} = require("../utils/config").STATUS_CODES;

module.exports = adminController = {

    async mintNFT(request,response){

        const mintingDetails = {
            "walletAddress" : request.body.walletAddress,
            "nftMetadataURL" : request.body.nftMetadataURL
        }

        const txhash =  await NFTOperations.mintNFT(mintingDetails);
        
        try{
            if(txhash.transactionHash){
                response.status(SUCCESS).json({"TransactionHash" : txhash.transactionHash});
            }
            else{
                response.status(NOT_FOUND).json("Minting Failed");
            }
        }
        catch(error){
            response.status(SERVER_ERROR).json({"err" : error});
        }
    },

    async transfer(request,response){

        const transferDetails = {
            "senderAddress" : request.body.senderAddress,
            "receiverAddress" : request.body.receiverAddress,
            "tokenID" : request.body.tokenID,
            "requestID" : request.body.requestID
        }

        
        const txhash =  await NFTOperations.transferNFT(transferDetails);
        
        try{
            if(txhash){
                const doc = await transferReq_crud.delete(transferDetails.requestID);
                response.status(SUCCESS).json({"TransactionHash" : txhash});
            }
            else{
                response.status(NOT_FOUND).json("Minting Failed");
            }
        }
        catch(error){
            response.status(SERVER_ERROR).json({"err" : error});
        }
    },

    async getTransferRequests(request, response) {
        try {
          const doc = await transferReq_crud.getAll();
          if (doc) {
            response
              .status(SUCCESS)
              .json({"requests": {results : doc}});
          } else {
            response
              .status(NOT_FOUND)
              .json({ message: "No Request Found" });
          }
        } catch (err) {
          response
            .status(SERVER_ERROR)
            .json({ message: "Unable to reach server."});
        }
      },

    async getCorrectionRequests(request, response) {
        try {
          const doc = await correctionReq_crud.getAll();
          if (doc) {
            response
              .status(SUCCESS)
              .json({"requests": {results : doc}});
          } else {
            response
              .status(NOT_FOUND)
              .json({ message: "No Request Found" });
          }
        } catch (err) {
          response
            .status(SERVER_ERROR)
            .json({ message: "Unable to reach server."});
        }
      },
    
    async update(request,response){

        const correctionDetails = {
            "walletAddress" : request.body.walletAddress,
            "tokenId" : request.body.tokenId,
            "value" : request.body.value,
            "requestId" : request.body.requestId,
        }

        const result = await ApiClient.getRequest(`https://testnets-api.opensea.io/api/v1/assets?owner=${correctionDetails.walletAddress}&token_ids=${correctionDetails.tokenId}`);
        const asset = await result.json();
        const ipfsHash = asset.assets[0].token_metadata.split("/")[4];

        const pFile = await ApiClient.getRequest(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`);
        const oldFile = await pFile.json();

        oldFile["name"] = correctionDetails.value;

        const requestBody = {
            "pinataOptions": {
                "cidVersion": 1
              },
              "pinataMetadata": {
                "name": correctionDetails.value,
              },
              "pinataContent": oldFile
        }

        const deleteResult = await ApiClient.deleteRequest(`https://api.pinata.cloud/pinning/unpin/${ipfsHash}`);

        const postResult = await ApiClient.postRequest(`https://api.pinata.cloud/pinning/pinJSONToIPFS`,requestBody);
        const newFileData = await postResult.json();
        correctionDetails["tokenURL"] = "https://gateway.pinata.cloud/ipfs/"+newFileData.IpfsHash;
        console.log(correctionDetails);
        
        const doc = await correctionReq_crud.delete(correctionDetails.requestId);
        return response.status(SUCCESS).json({"message" : "ok"});
        // const txhash =  await NFTOperations.updateNFT(correctionDetails);
        
        // try{
        //     if(txhash){
        //         const doc = await correctionReq_crud.delete(correctionDetails.requestId);
        //         response.status(SUCCESS).json({"TransactionHash" : txhash});
        //     }
        //     else{
        //         response.status(NOT_FOUND).json("Minting Failed");
        //     }
        // }
        // catch(error){
        //     response.status(SERVER_ERROR).json({"err" : error});
        // }
    },

};