import includeFile from '../utils/include.mjs';
import LoadingClient from '../utils/loading.mjs';

window.onload = () => {
    includeFile();
    getNFTs();
};

async function getNFTs(){
  LoadingClient.createLoading();
  clearResult();
  let walletAddress = localStorage.getItem("wallet");
  console.log(walletAddress);
  const results = await fetch(`https://testnets-api.opensea.io/api/v1/assets?owner=${walletAddress}`);
  const nfts = await results.json();

  (nfts.assets.length === 0 ) ? printMessage() : printNFts(nfts.assets);
}

function printNFts(assets){
    LoadingClient.stopLoading();
    var resultDiv = document.querySelector('#results');
    let rowDiv = document.createElement('div');
    rowDiv.className = "row justify-content-around";
    
    for(let i in assets){
        if(i != 0 && i % 3 == 0){
            resultDiv.appendChild(document.createElement('br'));
            resultDiv.appendChild(document.createElement('br'));
        }

        let cardDiv = document.createElement('div');
        cardDiv.className = "card m-2";
        cardDiv.style = "width: 25%";
        let imgTag = document.createElement('img');
        imgTag.src = assets[i].image_thumbnail_url;
        imgTag.style = "height : 40%; width : 50%; margin: 2px auto";

        let cardHeading = document.createElement('h5');
        cardHeading.className = "card-title text-center";
        cardHeading.innerHTML = assets[i].name;

        let cardBodyDiv = document.createElement('div');
        cardBodyDiv.className = "card-body";
        cardBodyDiv.style = "margin-bottom : -50px";


        let descriptionTag = document.createElement('p');
        descriptionTag.className = "card-text";
        descriptionTag.innerHTML = "Description : "+assets[i].description;

        let tokenIDTag = document.createElement('p');
        tokenIDTag.className = "card-text";
        tokenIDTag.innerHTML = "<u>Token ID : "+assets[i].token_id+"</u>";
        
        let openSeaBtn = document.createElement('a');
        openSeaBtn.href = assets[i].permalink;
        openSeaBtn.target = "_blank";
        openSeaBtn.style = "margin : 0px 8%";
        openSeaBtn.className = "btn btn-success";
        openSeaBtn.innerHTML = "View Details on OpenSea";

        cardBodyDiv.appendChild(tokenIDTag);
        cardBodyDiv.appendChild(descriptionTag);
        cardBodyDiv.appendChild(openSeaBtn);
        cardDiv.appendChild(imgTag);
        cardDiv.appendChild(cardHeading)
        cardDiv.appendChild(cardBodyDiv);
        rowDiv.appendChild(cardDiv);
    }
    resultDiv.appendChild(rowDiv);
}

function clearResult(){
    var resultDiv = document.querySelector('#results');
    while (resultDiv.firstChild) {
        resultDiv.removeChild(resultDiv.lastChild);
    }
}

function printMessage(){
    var resultDiv = document.querySelector('#results');
    var h2 = document.createElement('h2');
    h2.innerHTML = "No Collections Available for this wallet Address";
    h2.className = "text-center mt-3";
    h2.style = "color:red";
    resultDiv.appendChild(h2);
}
