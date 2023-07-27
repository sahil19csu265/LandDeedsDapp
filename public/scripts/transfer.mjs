import ApiClient from '../utils/apiclient.mjs';
import includeFile from '../utils/include.mjs';

window.onload = () => {
    includeFile();
    document.querySelector("#transfer-submit-btn").addEventListener('click',applyForTransfer);
};

async function applyForTransfer(){
    let transferDetails = {
        "senderAdd" : localStorage.getItem("wallet"),
        "receiverAdd" : document.querySelector("#receiverAdd").value,
        "tokenID" : document.querySelector("#tokenID").value
    }
    let result = await ApiClient.postRequest(`/user/add-transfer-request`,transferDetails);
    let doc = await result.json();
    alertUser(doc.message);
}

function alertUser(message){
    let alertDiv = document.querySelector("#alert-box");
    alertDiv.style = "display: show;";
    alertDiv.className="alert alert-success m-3";
    document.querySelector("#alert-message").innerHTML = message;

    clearFields();

    setTimeout(()=>{
        let alertDiv = document.querySelector("#alert-box");
        alertDiv.style="display:none;";
        alertDiv.removeChild(alertDiv.lastChild);
        document.querySelector("#alert-message").innerHTML = "";
    },5000)
}

function clearFields(){
    document.querySelector("#receiverAdd").value = "",
    document.querySelector("#tokenID").value = ""
}

