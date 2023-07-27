const { Schema, SchemaTypes } = require("../connect");
const mongoose = require("../connect");
const { SCHEMAS } = require("../../utils/config");
const transferSchema = new Schema(
  {
    senderAddress: { type: SchemaTypes.String, required: true},
    receiverAddress: { type: SchemaTypes.String, required: true},
    tokenID: { type: SchemaTypes.String, required: true },
  },
  { timestamps: true }
);
const transferModel = mongoose.model(SCHEMAS.TRANSFER_REQUEST, transferSchema);
module.exports = transferModel;
