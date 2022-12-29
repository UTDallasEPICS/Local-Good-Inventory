/*  This folder/file is for the server. The server handles hosting the website
 *  as well as connecting to the database.
 */

const express = require('express');
const app = express();
const { expressjwt: jwt } = require('express-jwt');
var jwks = require('jwks-rsa');
const cors = require('cors')
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const port = 3000;

const mongoClient = new MongoClient("mongodb+srv://UTDallas:utdallas1@cluster0.76dcy.mongodb.net/?retryWrites=true&w=majority")

mongoClient.connect();

const familiesCollection = mongoClient.db('LocalGoodCenter').collection('Families');

const appointmentsCollection = mongoClient.db('LocalGoodCenter').collection('Appointments');

const settingsCollection = mongoClient.db('LocalGoodCenter').collection('Settings');

const reportsCollection = mongoClient.db('LocalGoodCenter').collection('Reports');


const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-nae568sko2nuectb.us.auth0.com/.well-known/jwks.json'
    //jwksUri: 'https://dev-w3oomddkry5f25to.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://api.localgoodcenter.org',
  //audience: 'http://localhost:3000',
  issuer: 'https://dev-nae568sko2nuectb.us.auth0.com/',
  //issuer: 'https://dev-w3oomddkry5f25to.us.auth0.com/',
  algorithms: ['RS256']
});


app.use(cors({
  origin: 'https://checkin.localgoodcenter.org',
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
    //res.setHeader(
    //  'Access-Control-Allow-Headers', 
    //  );
    //  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
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
    if(req.query.date) {
      console.log(`DEBUG: Date requested: ${req.query.date}`);
      const date = new Date();
      const reportsQuery = {month: date.getMonth() + 1, year: date.getFullYear()};
      reportsCollection.updateOne(reportsQuery, {$set: {}}, {upsert: true});
      console.log("DEBUG: Updated reports collection");
      familiesCollection.findOne(query).then((family) => {
        var numberOfClients = 0, numberOfYouth = 0, numberOfSeniors = 0;
        family.members.forEach(member => { //Get how many family members in each age group 
          switch(member.age) {
            case '0-17': numberOfYouth++;
              break;
            case '18-59': numberOfClients++;
              break;
            case '60+': numberOfSeniors++;
              break;
          }
        });
        console.log(`DEBUG: family.checkedIn.size == ${family.checkedIn.length}`);
        console.log(`DEBUG: Previous checkin: ${family.checkedIn[family.checkedIn.length - 1]}`);
        if(family.checkedIn.length == 0) { //Case: Family has never checked in before
          reportsCollection.findOneAndUpdate(reportsQuery, 
            {$inc: {
              households: 1,
              individualHouseholds: 1,
              newHouseholds: 1,
              numberOfClients: numberOfClients,
              numberOfYouth: numberOfYouth,
              numberOfSeniors: numberOfSeniors
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
              numberOfClients: numberOfClients,
              numberOfYouth: numberOfYouth,
              numberOfSeniors: numberOfSeniors
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
    const query = { date: req.query.date };
    appointmentsCollection.findOne(query).then((appointment) => {
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

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})