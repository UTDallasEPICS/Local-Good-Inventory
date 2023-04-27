/*  This folder/file is for the server. The server handles hosting the website
 *  as well as connecting to the database.
how to scrape data from a website using JS
 */

require('dotenv').config();
const express = require('express');
const app = express();
const { expressjwt: jwt } = require('express-jwt');
var jwks = require('jwks-rsa');
const cors = require('cors')
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const bodyParser = require('body-parser');

const port = process.env.PORT;

const mongoClient = new MongoClient(process.env.DB_URL)
mongoClient.connect();

const familiesCollection = mongoClient.db('LocalGoodCenter').collection('Families');
const appointmentsCollection = mongoClient.db('LocalGoodCenter').collection('Appointments');
const settingsCollection = mongoClient.db('LocalGoodCenter').collection('Settings');
const reportsCollection = mongoClient.db('LocalGoodCenter').collection('Reports');
const eventsCollection = mongoClient.db('LocalGoodCenter').collection('Events');


const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.JWT_URI
  }),
  audience: process.env.JWT_AUDIENCE,
  issuer: process.env.JWT_ISSUER,
  algorithms: ['RS256']
});


app.use(cors({
  origin: process.env.CORS_ORIGIN,
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  methods: 'GET, POST, PATCH, DELETE, OPTIONS'
}))


app.use(jwtCheck);
app.use(bodyParser.json());

app.use((err, req, res, next) => {
  if(err) {
    if(err.name === "UnauthorizedError") {
      res.status(401).send(err.inner);
      console.log(err);
    } else {
      next(err);
    }
  } else {
    next();
  }
});

app.get('/family', (req, res) => {
  console.log("Get family request");
  
  if(req.query.phoneNumber) {
    const query = { phoneNumber: req.query.phoneNumber };
    familiesCollection.findOne(query).then((family) => {
      res.status(200).json({family});
    });
  } else {
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
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      minors: req.body.minors,
      adults: req.body.adults,
      seniors: req.body.seniors,
      allergies: req.body.allergies,
      phoneNumber: req.body.phoneNumber,
      checkedIn: req.body.checkedIn,
      nextAppointment: req.body.nextAppointment,
      color: req.body.color } };
    if(req.query.date) {
      console.log(`DEBUG: Date requested: ${req.query.date}`);
      const date = new Date();
      const reportsQuery = {month: date.getMonth() + 1, year: date.getFullYear()};
      reportsCollection.updateOne(reportsQuery, {$set: {}}, {upsert: true});
      console.log("DEBUG: Updated reports collection");
      familiesCollection.findOne(query).then((family) => {
        console.log(`DEBUG: family.checkedIn.size == ${family.checkedIn.length}`);
        console.log(`DEBUG: Previous checkin: ${family.checkedIn[family.checkedIn.length - 1]}`);
        if(family.checkedIn.length == 0) { //Case: Family has never checked in before
          reportsCollection.findOneAndUpdate(reportsQuery, 
            {$inc: {
              households: 1,
              individualHouseholds: 1,
              newHouseholds: 1,
              numberOfClients: req.body.adults,
              numberOfYouth: req.body.minors,
              numberOfSeniors: req.body.seniors
            }}
          );
        } else if (
          //If they've already checked in this month
          family.checkedIn[family.checkedIn.length - 1].split('-')[1] == date.getMonth() + 1 &&
          family.checkedIn[family.checkedIn.length - 1].split('-')[2] == date.getFullYear()) {
            // console.log(`DEBUG: Last date: ${family.checkedIn[family.checkedIn.length - 1]}`);
            reportsCollection.findOneAndUpdate(reportsQuery, 
              {$inc: {
                households: 1 // Just increase the total number of households served
              }});
        } else { //They haven't checked in this month
          reportsCollection.findOneAndUpdate(reportsQuery, 
            {$inc: {
              households: 1,
              individualHouseholds: 1,
              numberOfClients: req.body.adults,
              numberOfYouth: req.body.minors,
              numberOfSeniors: req.body.seniors
            }}
          );
        }
      });
    }
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
    const day = +req.query.date.split('-')[2];
    const month = +req.query.date.split('-')[1];
    const year = +req.query.date.split('-')[0];
    const query = { date: day, month: month, year: year };
    appointmentsCollection.findOne(query).then((appointment) => {
      //console.log(`${query}`);
      console.log(query);
      res.status(200).json({
        appointment
      });
    });
  } else if (req.query.month && req.query.year) {
    const query = { month: req.query.month, year: req.query.year };
    appointmentsCollection.find(query).then((appointments) => {
      res.status(200).json({
        appointments
      });
    });
  } else {
    res.status(404);
  }
});

app.post('/appointment', (req, res) => {
    const query = {date: req.body.date, month: req.body.month, year: req.body.year};
    const newValue = { $set: {
      date: req.body.date,
      month: req.body.month,
      year: req.body.year,
      timeslots: req.body.timeslots } };
    appointmentsCollection.updateOne(query, newValue, {upsert: true});
    res.status(201);
    console.log("Post Appointment Successful");
});

app.get('/settings', (req, res) => {
  console.log("Get settings request")
  settingsCollection.findOne().then((settings) => {
    res.status(200).json({
      settings
    });
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

app.get('/report', (req, res) => {
  if(req.query.month && req.query.year) {
    const query = { month: parseInt(req.query.month), year: parseInt(req.query.year)};
    reportsCollection.findOne(query).then((report, err) => {
      if(err) {
        console.log(`ERROR: ${err}`);
      }
      res.status(200).json({
        report
      });
    });
  } else {
    res.status(404);
  }
});

app.post('/event', (req, res) => {
  console.log("Event Posted");
  const newValue = { $set: {
    imageURL: req.body.imageURL,
    eventName: req.body.eventName,
    time: req.body.time,
    info: req.body.info,
    dates: req.body.dates,
    display: req.body.display,
    reservationRequired: req.body.reservationRequired,
    formURL: req.body.formURL
  } };
  const query = {};
  eventsCollection.updateOne(query, newValue, {upsert: true});
  res.status(201);
  console.log("Post Event Successful");
});

app.get('/event', (req, res) => {
  if(req.query.id) {
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
    res.status(404);
  }
});

app.listen(port, async () => {
    console.log(`Listening at http://localhost:${port}`) 
})