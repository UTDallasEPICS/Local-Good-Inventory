const event = require('express').Router();
const { MongoClient } = require('mongodb');
const mongoClient = new MongoClient(process.env.DB_URL)
mongoClient.connect();
const eventsCollection = mongoClient.db('LocalGoodCenter').collection('Events');
const ObjectId = require('mongodb').ObjectId;
const {scrape} = require("../scraper.js");
const marketEventID = '000000000000000000000000';


/**
 * Get a list of all events in the database
 */
event.get('/', (req, res) => {
  const query = {}
  eventsCollection.find(query).toArray().then((events, err) => {
    if(err) {
      console.log(`ERROR: ${err}`);
      res.status(400).send(err);
    } else {
      res.status(200).json({events});
    }
  });
});

/**
 * Inserts a new event
 */
event.put('/', (req, res) => {
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
  res.status(201).json({message: `Sucessfully inserted event with name ${req.body.eventName}`});
  //console.log(`Sucessfully inserted event with name ${req.body.eventName}`);
});

/**
 * Gets all events after a specified date
 */
event.get('/future-events/:date', (req, res) => {
  if(!req.params.date.length >= 10) {
    res.status(400).send(`Invalid date: ${req.params.date}`);
    return;
  }
  const query = { dates: {$gt: req.query.date} }
  eventsCollection.find(query).toArray().then((events, err) => {
    if(err) {
      console.log(`ERROR: ${err}`);
      res.status(400).send(err);
    } else {
      res.status(200).json({events});
    }
  });
});
  
/**
 * Gets the event containing the specified id
 */
event.get('/id/:id', (req, res) => {
  if(req.params.id.length != 24) {
    res.status(400).send("Please enter a valid id of length 24");
    return;
  }
  const query = { _id: ObjectId(req.params.id) }
  eventsCollection.findOne(query).then((event, err) => {
    if(err) {
      console.log(`ERROR: ${err}`)
      res.status(400).send(err);
    } else {
      event.id = event._id;
      res.status(200).json({event});
    }
  });
});

/**
 * Scrapes events from the lgc website and returns an array
 */
event.get('/scrape', (req, res) => {
  events = scrape().then((events, err) => {
    if(err) {
      console.log(`ERROR: ${err}`);
      res.status(400).send(err);    
    } else {
      res.status(200).json({events}); 
    }
  });
});

/**
 * Deletes an event with a specified id
 */
event.delete('/:id', (req, res) => {
  if(req.params.id.length != 24) {
    res.status(400).send("Please enter a valid id of length 24");
    return;
  }
  if(req.params.id == marketEventID) {
    res.status(400).send(`Cannot delete market event with id ${marketEventID}`);
    return;
  }
  const query = { _id: ObjectId(req.params.id) }
  eventsCollection.findOneAndDelete(query);
  res.status(200);
});

module.exports = event;