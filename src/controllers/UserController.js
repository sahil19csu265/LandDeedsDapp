const { SUCCESS, SERVER_ERROR, NOT_FOUND } =require("../utils/config").STATUS_CODES;
const transferReq_crud = require("../db/services/transferReq_crud");
const correctionReq_crud = require("../db/services/correctionReq_crud");
const userOperations = require("../db/services/user_crud");
const NFTOperations = require("../services/NFTOperations");

const userController = {
  async login(request, response) {
    const user = request.body;
    try {
      const doc = await userOperations.login(user);
      if (doc) {
        response
          .status(SUCCESS)
          .json({
            message: "login successfull",
            role: doc.role,
            walletAddress: doc.walletAddress,
          });
      } else {
        response.status(NOT_FOUND).json({ message: "invalid user" });
      }
    } catch (err) {
      response
        .status(SERVER_ERROR)
        .json({ message: "Unable to reach server." });
    }
  },

  register(request, response) {
    let userObject = {
      emailid: request.body.email,
      password: request.body.pwd,
      walletAddress: request.body.walletAddress,
      role : request.body.role
    };
    const promise = userOperations.register(userObject);
    promise
      .then((doc) => {
        response
          .status(SUCCESS)
          .json({ message: "user registered successfully", doc: doc });
      })
      .catch((err) => {
        response
          .status(SERVER_ERROR)
          .json({ message: "failed to register user", err });
      });
  },

  addTransferRequest(request, response) {
    let transferObject = {
      senderAddress: request.body.senderAdd,
      receiverAddress: request.body.receiverAdd,
      tokenID: request.body.tokenID,
    };
    const promise = transferReq_crud.add(transferObject);
    promise
      .then((doc) => {
        response
          .status(SUCCESS)
          .json({ message: "Transfer Requested Successfully !" });
      })
      .catch((err) => {
        response
          .status(SERVER_ERROR)
          .json({ message: "Failed to add transfer request", err });
      });
  },

  addCorrectionRequest(request, response) {
    let correctionObject = {
      walletAddress: request.body.walletAddress,
      tokenID: request.body.tokenID,
      name: request.body.name,
      description: request.body.description,
    };
    const promise = correctionReq_crud.add(correctionObject);
    promise
      .then((doc) => {
        response
          .status(SUCCESS)
          .json({ message: "Correction Requested Successfully !" });
      })
      .catch((err) => {
        response
          .status(SERVER_ERROR)
          .json({ message: "Failed to add correction request", err });
      });
  },

  async createWill(request, response) {
    const willDetails = {
      createrAddress : request.body.address,
      tokenID: request.body.tokenID,
      willText: request.body.willText,
    };

    const txhash = await NFTOperations.createWill(willDetails);

    try {
      if (txhash) {
        response.status(SUCCESS).json({ TransactionHash: txhash });
      } else {
        response.status(NOT_FOUND).json("Minting Failed");
      }
    } catch (error) {
      response.status(SERVER_ERROR).json({ err: error });
    }
  },

  async viewWill(request, response) {
    
    const willResult = await NFTOperations.viewWill(request.body.address);

    try {
      if (willResult) {
        response.status(SUCCESS).json({ WillDetails: willResult });
      } else {
        response.status(NOT_FOUND).json("Minting Failed");
      }
    } catch (error) {
      response.status(SERVER_ERROR).json({ err: error });
    }
  },
};

module.exports = userController;
