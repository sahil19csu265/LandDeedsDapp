const UserModel = require("../models/user");
const encryption = require("../../utils/encrypt");
module.exports = {
  
  register(userObject) {
    userObject.password = encryption.generateHash(userObject.password);
    let promise = UserModel.create(userObject);
    return promise;
  },

  async login({ email, pwd }) {
    const doc = await UserModel.findOne({ emailid: email });
    if (doc) {
      if (encryption.compareHash(doc.password, pwd)) {
        return doc;
      } else {
        return null;
      }
    }
    return null;
  },

};
