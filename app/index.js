/*  This folder/file is for the server. The server handles hosting the website
 *  as well as connecting to the database.
 */

const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

const mongoClient = new MongoClient("mongodb+srv://UTDallas:utdallas1@cluster0.76dcy.mongodb.net/?retryWrites=true&w=majority")

mongoClient.connect();

const familiesCollection = mongoClient.db('LocalGoodCenter').collection('Families');

const appointmentsCollection = mongoClient.db('LocalGoodCenter').collection('Appointments');

const settingsCollection = mongoClient.db('LocalGoodCenter').collection('Settings');

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.get('/family', (req, res) => {
  console.log("Get family request");
  
  if(req.query.phoneNumber) {
    const query = { phoneNumber: req.query.phoneNumber };
    familiesCollection.findOne(query).then((family) => {
      res.status(200).json({family});
    });
  } else {
    // familiesCollection.find({}).then((families) => {
    //   res.status(200).json({families});
    // });
    familiesCollection.find({}).toArray().then((families) => {
      res.status(200).json({families});
    })
  }
  res.status(404);
  
});

app.post('/family', (req, res) => {
  if(req.query.phoneNumber) {
    const query = { phoneNumber: req.query.phoneNumber };
    const newValue = { $set: { 
      name: req.body.name,
      members: req.body.members,
      allergies: req.body.allergies,
      phoneNumber: req.body.phoneNumber,
      checkedIn: req.body.checkedIn,
      nextAppointment: req.body.nextAppointment,
      color: req.body.color } };
    familiesCollection.updateOne(query, newValue, {upsert: true});
    res.status(201);
    console.log("Post Family Successful");
  } else {
    res.status(404);
  }

});

app.delete('/family', (req, res) => {
  if(req.query.phoneNumber) {
    const query = { phoneNumber: req.query.phoneNumber };
    familiesCollection.deleteOne(query);
    res.status(201);
  } else {
    res.status(404);
  }
})

app.get('/appointment', (req, res) => {
  console.log("Get appointment request");  
  if(req.query.date) {
    const query = { date: req.query.date };
    appointmentsCollection.findOne(query).then((appointment) => {
      res.status(200).json({
        appointment
      });
    });
  } else {
    res.status(404);
  }
});

app.post('/appointment', (req, res) => {
  if(req.query.date) {
    const query = {date: req.query.date};
    const newValue = { $set: {
      date: req.body.date,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      interval: req.body.interval,
      quantity: req.body.quantity,
      timeslots: req.body.timeslots } };
    appointmentsCollection.updateOne(query, newValue, {upsert: true});
    res.status(201);
    console.log("Post Appointment Successful");
  } else {
    console.log("Post Appointment Unsuccessful");
    res.status(404);
  }
});

app.get('/settings', (req, res) => {
  console.log("Get settings request")
  settingsCollection.findOne().then((settings) => {
    res.status(200).json({
      settings
    });
    console.log("returned: ");
    console.log(settings);
  });
});

app.post('/settings', (req, res) => {
  console.log("Settings Posted");
  const newValue = { $set: {
    dates: req.body.dates,
    interval: req.body.interval,
    quantity: req.body.quantity,
    blockOuts: req.body.blockOuts } };
  const query = {};
  settingsCollection.updateOne(query, newValue, {upsert: true});
  res.status(201);
  console.log("Post Settings Successful");
});

app.listen(port, () => {
    console.log(`Listening at https://localhost:${port}`)
})