/*jshint esversion: 6*/
const lol ="LOL";
const fs = require('fs-extra');
const {Worker, isMainThread, MessageChannel} = require("worker_threads");
const heartData = require("../sampleData/allHeartRate.json");
const stepsData = require("../sampleData/allSteps.json");
const sample = (request,response)=>{
    console.time("concatenation");
    const data = heartData.value.filter(getSpikesFilter);
    console.log(data);
    console.timeEnd("concatenation");
    response.send(data);
};
if(isMainThread){
    const worker = new Worker(``);
}

module.exports={
    sampleFunction : sample
};

