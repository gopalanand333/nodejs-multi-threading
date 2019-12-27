/*jshint esversion: 6*/
const { Worker, parentPort, workerData } = require("worker_threads");
console.log("Heart Rate data for avg calculation");
const heartRateDataArray = workerData;
// this accepts the accumulator as 0/intial value as 0 and sums with all heartrate values
const heartRateAvg = array => array.reduce((accumulator, value) => accumulator + value.heartRate, 0);
parentPort.postMessage(heartRateAvg(heartRateDataArray)/heartRateDataArray.length);