import ApiClient from '../utils/apiclient.mjs';

window.onload = () => {
    includeHTML();
    document.querySelector("#login-btn").addEventListener('click',login);
};

async function login(){
  let requestBody = {
    "email" : document.querySelector("#emailID").value,
    "pwd" : document.querySelector("#password").value
  }
  let result = await ApiClient.postRequest(`/user/login`,requestBody);
  let doc = await result.json();
  localStorage.setItem("wallet", doc.walletAddress);
  if(doc.role == 'ADMIN'){
    window.location.href = "./views/admin/dashboard.html";
  }
  else if(doc.role == 'USER'){
    window.location.href = "./views/users/homepage.html";
  }
  else{
    alert('Wrong ID or Password');
  }
}

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    file = elmnt.getAttribute("include-html");
    if (file) {
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }

  document.getElementsByClassName("common-img")[0].src = "./assets/images/Department-of-Land-Resources-780x470-removebg-preview.png";
  document.getElementsByClassName("common-img")[1].src = "./assets/images/download__1_-removebg-preview.png";
  document.getElementsByClassName("common-img")[2].src = "./assets/images/59e6ea14c00962000198682c_digital-india-corporation.jpg";
}