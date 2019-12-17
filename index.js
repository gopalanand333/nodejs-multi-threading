/*jshint esversion: 6*/
const app = require("express")();
const helmet = require("helmet");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
/** app configuration for parsing payloads and wildcard urls */
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.all("*",(req,res)=>{
    res.status(404).send("The asked resource is lost somewhere.. ps. check for typos");
});
app.listen(port,()=>{
console.info(`App is running at your host with port ${port}`);
});
app.get("/",(request,response)=>{
    response.send("Test Test! if you see this your server is upp and running");
});
/** the Real logic goes here */