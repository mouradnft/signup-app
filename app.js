const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");
const { allowedNodeEnvironmentFlags } = require("process");
const { stringify } = require("querystring");
const { parse } = require("path");
const { STATUS_CODES } = require("http");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get('/',(req,res)=>{

res.sendFile(__dirname + '/singup.html' );

});




app.post('/',(req,res)=>{
const   firstName  =  req.body.Fname ;
const   lastName   =  req.body.Lname;
const   email   = req.body.email;


const data = {
   members :[
    {
      email_address : email,
      status : 'subscribed',
      merge_fields : {
        FNAME: firstName,
        LNAME :lastName
      }
    }
  ]
};

 const JSONdata  =  JSON.stringify(data); 

 const url = "https://us21.api.mailchimp.com/3.0/lists/5f90701896"

 const options = {
  method : "POST",
  auth:"mourad:df169facee8230fe7f45c939ba3ccf84-us21"
 };
   const request = https.request(url,options,(response)=>{
 
    if (response.statusCode === 200){
res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }



response.on('data',(data)=>{
console.log(JSON.parse(data));
})
    });

    request.write(JSONdata);
   

    
    request.end();
});

app.post('/failure',(req,res)=>{
  res.redirect('/');
})


app.post('/success',(req,res)=>{
  res.redirect('/');
})





app.listen(process.env.PORT||3000,()=>{
  console.log('we are in por 3000 welcome !')
});
//api key
//df169facee8230fe7f45c939ba3ccf84-us21

//audiance id
// 5f90701896
