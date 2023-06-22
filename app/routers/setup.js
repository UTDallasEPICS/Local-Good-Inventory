const setup = require('express').Router();
const { MongoClient } = require('mongodb');
const mongoClient = new MongoClient(process.env.DB_URL)
mongoClient.connect();
const eventsCollection = mongoClient.db('LocalGoodCenter').collection('Events');
const reportsCollection = mongoClient.db('LocalGoodCenter').collection('Reports');
const settingsCollection = mongoClient.db('LocalGoodCenter').collection('Settings');
const ObjectId = require('mongodb').ObjectId;

setup.post('/events', (req, res) => {
  const query = {
    _id: ObjectId("000000000000000000000000")
  };

  const newValue = { $set: {
    imageURL: "https://gff.com/wp-content/uploads/2022/01/IMG_3830-scaled.jpg",
    eventName: "Local Good Market",
    time: "",
    info: "Local Good Market Check In",
    dates: "",
    display: true,
    reservationRequired: true,
    formURL: ""
  }};

  eventsCollection.updateOne(query, newValue, {upsert: true});
  //console.log("Events Database Initialized");
  res.status(201).json({message: "Events Database Initialized"});
});

setup.post('/settings', (req, res) => {

});

setup.post('/reports', (req, res) => {

});
  
module.exports = setup;