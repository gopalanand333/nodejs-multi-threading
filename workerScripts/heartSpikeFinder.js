/*jshint esversion: 6*/
const { worker, parentPort, workerData } = require("worker_threads");
console.log("Data recieved form parent method");
const heartRateArray = workerData;

//spike(the heartrate wich is very high than the desired one) filtering
const getSpikesFilter = (element) => element.heartRate <= 55 || element.heartRate >= 100 ? element : null;

//filters only spike values
const getSpikes = (heartData) => {
    return heartData.filter(getSpikesFilter);
};
//this will post data to the parent algorithm
parentPort.postMessage(getSpikes(heartRateArray).length);