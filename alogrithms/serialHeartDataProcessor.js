/*jshint esversion: 6*/
/**
 * heartData is the real-sample heart data
 * StepsData is the real-sample steps data 
 */
const heartData = require("../sampleData/allHeartRate.json");
const stepsData = require("../sampleData/allSteps.json");

const serialProcessor = (request,response)=>{
try{
    console.time("serial");
    const spikeCounter = getSpikes(heartData.value).length;
    const heartAvg = heartData.value.reduce((acc, value)=>acc+value.heartRate,0);
    const obj = {
        spikeCounter :spikeCounter,
        heartAvg : heartAvg/heartData.value.length
    };
    response.status(200).send(obj);
    console.timeEnd("serial");

}catch(e){
    console.log(e);
    response.status(500).send(e);
}

};
//spike(the heartrate wich is very high than the desired one) filtering
const getSpikesFilter = (element) => element.heartRate <= 55 || element.heartRate >= 100 ? element : null;

//filters only spike values
const getSpikes = (heartData) => {
    return heartData.filter(getSpikesFilter);
};
module.exports={
    serialProcessor : serialProcessor
};