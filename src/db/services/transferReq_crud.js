const transferModel = require("../models/transferRequest");

module.exports = {
  
  add(transferObject) {
    let promise = transferModel.create(transferObject);
    return promise;
  },

  async getAll() {
    const doc = await transferModel.find();
    if (doc) {
      return doc;
    }
    else{
        return null;
    }
  },

  async delete(pid){
    const doc = transferModel.deleteOne({ _id: pid }, function (err) {
      if(err){
        console.log(err);
        return {'message' : 'deletion fail'};
      }
      
      return {'message':'successfull deletion !'};
    });
    return {'message':'successfull deletion !'};
  },

};
