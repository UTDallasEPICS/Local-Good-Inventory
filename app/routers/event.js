const event = require('express').Router();
const { MongoClient } = require('mongodb');
const mongoClient = new MongoClient(process.env.DB_URL)
mongoClient.connect();
const eventsCollection = mongoClient.db('LocalGoodCenter').collection('Events');
const ObjectId = require('mongodb').ObjectId;
const {scrape} = require("../scraper.js");

event.post('/', (req, res) => {
  console.log("Event Posted");
  const newValue = {
    imageURL: req.body.imageURL,
    eventName: req.body.eventName,
    time: req.body.time,
    info: req.body.info,
    dates: req.body.dates,
    display: req.body.display,
    reservationRequired: req.body.reservationRequired,
    formURL: req.body.formURL
  };
  eventsCollection.insertOne(newValue);
  res.status(201);
  console.log("Post Event Successful");
});
  
event.get('/', (req, res) => {
  if(req.query.id) {
    console.log("Event id: " + req.query.id);
    const query = { _id: ObjectId(req.query.id) }
    eventsCollection.findOne(query).then((event, err) => {
      if(err) {
        console.log(`ERROR: ${err}`)
        res.status(400);
      } else {
        res.status(200).json({event});
        console.log(event);
      }
    });
  } else if(req.query.date) {
    const query = { dates: {$gt: req.query.date} }
    eventsCollection.find(query).toArray().then((events, err) => {
      if(err) {
        console.log(`ERROR: ${err}`);
        res.status(400);
      } else {
        res.status(200).json({events});
        console.log(events);
      }
    });
  } else {
    const query = {}
    eventsCollection.find(query).toArray().then((events, err) => {
      if(err) {
        console.log(`ERROR: ${err}`);
        res.status(400);
      } else {
        res.status(200).json({events});
        console.log(events);
      }
    });
  }
});

event.get('/scrape', (req, res) => {
  events = scrape().then((events, err) => {
    if(err) {
      console.log(`ERROR: ${err}`);
      res.status(400);    
    } else {
      //console.log(res);
      res.status(200).json({events}); 
    }
  });
});

module.exports = event;