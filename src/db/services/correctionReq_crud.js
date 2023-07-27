const correctionModel = require("../models/correctionRequest");

module.exports = {
  
  add(correctionObject) {
    let promise = correctionModel.create(correctionObject);
    return promise;
  },

  async getAll() {
    const doc = await correctionModel.find();
    if (doc) {
      return doc;
    }
    else{
        return null;
    }
  },

  async delete(pid){
    const doc = correctionModel.deleteOne({ _id: pid }, function (err) {
      if(err){
        console.log(err);
        return {'message' : 'deletion fail'};
      }
      
      return {'message':'successfull deletion !'};
    });
    return {'message':'successfull deletion !'};
  },

};
