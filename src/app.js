require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {ROOT} = require('./utils/config').ROUTES;
const app = express();
app.use(express.static("public"));
app.use(cors());
app.use(express.json());

app.use(ROOT+"admin",require('./api/routes/Admin'));
app.use(ROOT+"user",require("./api/routes/User"));

const server = app.listen(process.env.PORT || 8080,(err)=>{
  if(err){
    console.log(`Failed to start Server`);
  }
  else{
    console.log(`Server started on port ${server.address().port}`);
  }
})



