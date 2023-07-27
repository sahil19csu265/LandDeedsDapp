require('dotenv').config();

module.exports = ApiClient = {

  postRequest : async function(url, bodyData) {
    const result = fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${process.env.PINATA_TOKEN}`
      },
      body: JSON.stringify(bodyData),
    });

    return result;
  },

  getRequest : async function(url){
    const result = fetch(url);
    return result;
  },

  deleteRequest : async function(url){
    const result = fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${process.env.PINATA_TOKEN}`
      },
    });

    return result;
  }

};
