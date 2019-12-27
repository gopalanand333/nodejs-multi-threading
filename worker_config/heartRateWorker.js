/*jshint esversion: 6*/
const { worker, parentPort, workerData } = require("worker_threads");
console.log("codeblock goes above not sure what " + workerData);
const heartRateArray = workerData;

//spike filtering algorithm
const getSpikesFilter = (element) => element.heartRate <= 55 || element.heartRate >= 100 ? element : null;


const getSpikes = (heartData) => {
    const spikesData = heartData.filter(getSpikesFilter);

};

//this will post data to the parent algorithm
parentPort.postMessage({ fileName: workerData, status: "Done" });