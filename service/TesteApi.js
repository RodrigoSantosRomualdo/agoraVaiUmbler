const express = require("express");
const app = express();
 
const speedTest = require('speedtest-net');

const speedIsp = () => {
  return new Promise((resolve, reject) => {
    data = speedTest()
    
    resolve(data)
  })
}

module.exports =  speedIsp


/*
const functionSpeed = () => {
  return new Promise((resolve, reject) => {
   resolve(speedTest())
    //reject("Rejeitada")
  })
}

*/