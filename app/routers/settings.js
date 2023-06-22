const settings = require('express').Router();
const { MongoClient } = require('mongodb');
const mongoClient = new MongoClient(process.env.DB_URL);
mongoClient.connect();

const settingsCollection = mongoClient.db('LocalGoodCenter').collection('Settings');


settings.get('/', (req, res) => {
    console.log("Get settings request")
    settingsCollection.findOne().then((settings) => {
      res.status(200).json({
        settings
      });
    });
  });
  
  settings.post('/', (req, res) => {
    console.log("Settings Posted");
    const newValue = { $set: {
      dates: req.body.dates,
      interval: req.body.interval,
      quantity: req.body.quantity,
      blockOuts: req.body.blockOuts } };
    const query = {};
    settingsCollection.updateOne(query, newValue, {upsert: true});
    res.status(201).json({message: "Post Settings Successful"});
    //console.log("Post Settings Successful");
  });

module.exports = settings;