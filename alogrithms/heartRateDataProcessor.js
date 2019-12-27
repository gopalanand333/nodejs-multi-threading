/*jshint esversion: 6*/
const fs = require('fs-extra');
const { Worker, isMainThread, parentPort, workerData } = require("worker_threads");
const os = require("os");
const path = require("path");
/**
 * heartData is the real-sample heart data
 * StepsData is the real-sample steps data 
 */
const heartData = require("../sampleData/allHeartRate.json");
const stepsData = require("../sampleData/allSteps.json");

/**
 * Important varriable declaration 
 */
const numberOfCpuCores = os.cpus().length;
const spikeWorkerPath = path.resolve("./workerScripts/heartSpikeFinder.js");
const avgCalculator = path.resolve("./workerScripts/dailyHeartRateAvg.js");

// get Call defination
const getHeartData = (request, response) => {
    console.time("request");
    getSpikeAndAvg(heartData.value).then(values => {
        console.log("avg values", values);
        console.timeEnd("request");
        response.status(200).send(values);
    }).catch(error => {
        console.log("error occured-",error);
        response.status(500).send(error);
    });
};
/**
 * 
 * @param {*} heartData gets heart data and creates promise array, which calls worker promise to do a parallel processing of data
 * returns a promise which internally creates promises for different set of services, each service will have its own thread
 */
const getSpikeAndAvg = heartData => {
    return new Promise((parentResolve, parentReject) => {
        if (heartData.length < 1) {
            parentReject(1);
        }
        try {
            const promises = [];
            promises.push(heartDataProcessingPromise(heartData, spikeWorkerPath), heartDataProcessingPromise(heartData, avgCalculator));
            Promise.all(promises).then(values => {
                console.log("promise values", values);
                parentResolve(values);
            }).catch(error => {
                console.log(error);
                parentReject(error);
            });
        } catch (error) {
            parentReject(error);
        }
    });

};
/**
 * 
 * @param {*} heartData heart rate data array is passed
 * @param {*} calculationType  type of calucation specifies the path to worker script that will process the data
 */
const heartDataProcessingPromise = (heartData, calculationType) => {
    console.log(calculationType);
    return new Promise((resolve, reject) => {
        const worker = new Worker(calculationType, {
            workerData: heartData
        });
        worker.on("message", resolve);
        worker.on("error", reject);
        worker.on("exit", code => {
            if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
        });
    });
};

/**
 * export the calculation module
 */
module.exports = {
    sampleFunction: getHeartData
};

