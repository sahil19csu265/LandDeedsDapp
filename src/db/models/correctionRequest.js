const { Schema, SchemaTypes } = require("../connect");
const mongoose = require("../connect");
const { SCHEMAS } = require("../../utils/config");
const correctionSchema = new Schema(
  {
    walletAddress : { type: SchemaTypes.String, required: true},
    tokenID : { type: SchemaTypes.String, required: true},
    name : { type: SchemaTypes.String, required: true},
    description : { type: SchemaTypes.String, required: true },
  },
  { timestamps: true }
);
const correctionModel = mongoose.model(SCHEMAS.CORRECTION_REQUEST, correctionSchema);
module.exports = correctionModel;
