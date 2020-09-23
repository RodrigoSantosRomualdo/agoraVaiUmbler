const express = require("express");
const app = express();
 
const speedTest = require('speedtest-net');

const functionSpeed = () => {

 
  
  return new Promise((resolve, reject) => {
   resolve(speedTest())
    //reject("Rejeitada")
  })
}


module.exports = functionSpeed

/*

const express = require("express");
//const app = express();

//npm install --save speedtest-net

const speedTest = require('speedtest-net');

//speedtest-net [-h|--help] [--accept-license] [--server-id <id>] [--source-ip <ip>]

(async () => {
  try {
    console.log(await speedTest());
   

    //console.log('PING: ' + test.ping.latency);
    //console.log('DOWNLOAD: ' + test.download.bandwidth);
    //console.log('UPLOAD: ' + test.upload.bandwidth);

  } catch (err) {
    console.log(err.message);
  } finally {
    process.exit(0);
  }
})()


*/