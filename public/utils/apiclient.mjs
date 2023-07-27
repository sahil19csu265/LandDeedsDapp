const ApiClient = {

  BASE_URL : "http://localhost:3000",

  postRequest : async function(url, bodyData) {
    const result = fetch(this.BASE_URL+url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyData),
    });

    return result;
  },

  getRequest : async function(url){
    const result = fetch(this.BASE_URL+url);
    return result;
  }

};

export default ApiClient;
