const mongoose = require('mongoose')

const mongoURL = 'mongodb://localhost:27017/school'

mongoose.connect(mongoURL)

const db = mongoose.connection;

db.on('connected', ()=>{
    console.log("Connected")
})

db.on('disconnected', ()=>{
    console.log("Disconnected")
})

db.on('error', ()=>{
    console.log("Error")
})

module.exports = db;
