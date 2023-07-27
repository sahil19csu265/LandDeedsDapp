const LoadingClient = {

    createLoading : function(){
        console.log("inside this func");
        document.getElementsByClassName("spinner")[0].style.display = "block";
    },

    stopLoading : function(){
        document.getElementsByClassName("spinner")[0].style.display = "none";
    }
}

export default LoadingClient;