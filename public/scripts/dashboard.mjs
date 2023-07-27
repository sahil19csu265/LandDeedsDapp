import ApiClient from '../utils/apiclient.mjs';
import includeFile from '../utils/include.mjs';
import LoadingClient from '../utils/loading.mjs';

window.onload = () => {
    includeFile();
    document.querySelector("#submit-btn").addEventListener("click", initiateMinting);
    document.querySelector("#transfer-req-btn").addEventListener("click",getTransferRequests);
    document.querySelector("#correction-req-btn").addEventListener("click",getCorrectionRequests);
};

  async function initiateMinting() {
    LoadingClient.createLoading();
    let requestBody = {
      walletAddress: document.querySelector("#walletAddress").value,
      nftMetadataURL: document.querySelector("#nft-url").value,
    };
    let result = await ApiClient.postRequest(`/admin/initiate-mint`, requestBody);
  
    let txnhash = await result.json();
    txnhash = txnhash.TransactionHash;
    alertUser(txnhash);
  }
  
  function alertUser(txnhash) {
    LoadingClient.stopLoading();
    let alertDiv = document.querySelector("#alert-box");
    alertDiv.style = "display: show;";
    if (txnhash) {
      console.log(`https://goerli.etherscan.io/tx/${txnhash}`);
      alertDiv.className = "alert alert-success m-3";
      document.querySelector("#alert-message").innerHTML =
        "Successfull Transaction.";
      let alertLink = document.createElement("a");
      alertLink.className = "back-btn";
      alertLink.target = "_blank";
      alertLink.href = `https://goerli.etherscan.io/tx/${txnhash}`;
      alertLink.innerHTML = "Click Here To Verify";
      alertDiv.appendChild(alertLink);
    } else {
      alertDiv.className = "alert alert-danger m-3";
      document.querySelector("#alert-message").innerHTML = "Failed Transaction";
    }
    
    clearFieldsMinting();

    setTimeout(() => {
      let alertDiv = document.querySelector("#alert-box");
      alertDiv.style = "display:none;";
      alertDiv.removeChild(alertDiv.lastChild);
      document.querySelector("#alert-message").innerHTML = "";
    }, 5000);
  }

  function clearFieldsMinting(){
    document.querySelector("#walletAddress").value="";
    document.querySelector("#nft-url").value = "";
  }

  async function getTransferRequests(){
    let result = await ApiClient.getRequest(`/admin/get-transfer-request`);
    let doc = await result.json();
    printTransferRequest(doc.requests.results)
  }

  async function getCorrectionRequests(){
    let result = await ApiClient.getRequest(`/admin/get-correction-request`);
    let doc = await result.json();
    printCorrectionRequest(doc.requests.results);
  }

  function printTransferRequest(result){
      let resultBodyDiv = document.querySelector("#result-body");
      resultBodyDiv.innerHTML = "";
      for(let i in result){
          let row = document.createElement("tr");
          let td1 = document.createElement("td");
          td1.innerHTML = result[i].createdAt.split("T")[0];
          let td2 = document.createElement("td");
          td2.innerHTML = result[i].senderAddress;
          let td3 = document.createElement("td");
          td3.innerHTML = result[i].receiverAddress;
          let td4 = document.createElement("td");
          td4.innerHTML = result[i].tokenID;

          let btn = document.createElement('button');
          btn.style = "color:green";
          btn.addEventListener('click',approveTransfer,false);
          btn.className = "btn btn-sm btn-dark mt-1";
          btn.receiver = td3.innerHTML;
          btn.sender = td2.innerHTML;
          btn.token = td4.innerHTML;
          btn.requestid = result[i]._id;

          btn.innerHTML = "Approve".toUpperCase();

          row.appendChild(td1);
          row.appendChild(td2);
          row.appendChild(td3);
          row.appendChild(td4);
          row.appendChild(btn);
          resultBodyDiv.appendChild(row);
      }
  }

  function printCorrectionRequest(result){
    let resultBodyDiv = document.querySelector("#result-body-correction");
    resultBodyDiv.innerHTML = "";
    for(let i in result){
        let row = document.createElement("tr");
        let td1 = document.createElement("td");
        td1.innerHTML = result[i].createdAt.split("T")[0];
        let td2 = document.createElement("td");
        td2.innerHTML = result[i].walletAddress;
        let td3 = document.createElement("td");
        td3.innerHTML = result[i].description;
        let td4 = document.createElement("td");
        td4.innerHTML = result[i].name;
        let td5 = document.createElement("td");
        td5.innerHTML = result[i].tokenID;

        let btn = document.createElement('button');
        btn.style = "color:green";
        btn.addEventListener('click',updateNFT,false);
        btn.className = "btn btn-sm btn-dark mt-1";
        btn.walletAddress = td2.innerHTML;
        btn.nameValue = td4.innerHTML;
        btn.tokenId = td5.innerHTML;
        btn.requestid = result[i]._id;

        btn.innerHTML = "Remint".toUpperCase();

        row.appendChild(td1);
        row.appendChild(td2);
        row.appendChild(td3);
        row.appendChild(td4);
        row.appendChild(td5);
        row.appendChild(btn);
        resultBodyDiv.appendChild(row);
    }
  }

  async function updateNFT(evt){
    LoadingClient.createLoading();
    let correctionDetails = {
      "walletAddress" : evt.currentTarget.walletAddress,
      "value" : evt.currentTarget.nameValue,
      "tokenId" : parseInt(evt.currentTarget.token),
      "requestId" : evt.currentTarget.requestid
    }
    let result = await ApiClient.postRequest(`/admin/update`,correctionDetails);
    let txnHash = await result.json();
    getCorrectionRequests();
    LoadingClient.stopLoading();
    alertUser(txnHash.TransactionHash);
  }

  async function approveTransfer(evt){
    LoadingClient.createLoading();
      let transferDetails = {
          "senderAddress" : evt.currentTarget.sender,
          "receiverAddress" : evt.currentTarget.receiver,
          "tokenID" : parseInt(evt.currentTarget.token),
          "requestID" : evt.currentTarget.requestid
      }
      let result = await ApiClient.postRequest(`/admin/transfer`,transferDetails);
      let txnHash = await result.json();
      getTransferRequests();
      LoadingClient.stopLoading();
      alertUser(txnHash.TransactionHash);
      
  }