import ApiClient from '../utils/apiclient.mjs';
import includeFile from '../utils/include.mjs';

window.onload = () => {
    includeFile();
    document.querySelector("#correction-submit-btn").addEventListener('click',applyForCorrection);
};

async function applyForCorrection(){
    let correctionDetails = {
        "walletAddress" : localStorage.getItem("wallet"),
        "tokenID" : document.querySelector("#propertyID").value,
        "name" : document.querySelector("#name").value,
        "description" : document.querySelector("#description").value
    }
    let result = await ApiClient.postRequest(`/user/add-correction-request`,correctionDetails);
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
    document.querySelector("#propertyID").value = "",
    document.querySelector("#name").value = ""
    document.querySelector("#description").value = "";
}



