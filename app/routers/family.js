const family = require('express').Router();
const { MongoClient } = require('mongodb');
const mongoClient = new MongoClient(process.env.DB_URL)
mongoClient.connect();
const familiesCollection = mongoClient.db('LocalGoodCenter').collection('Families');
const reportsCollection = mongoClient.db('LocalGoodCenter').collection('Reports');

family.get('/', (req, res) => {
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
  
family.post('/', (req, res) => {
    if(req.query.phoneNumber) {
      const query = { phoneNumber: req.query.phoneNumber };
      if(req.body.minors == null)
        req.body.minors = 0;
      if(req.body.adults == null)
        req.body.adults = 0;
      if(req.body.seniors == null)
        req.body.seniors = 0;    
      const newValue = { $set: { 
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        minors: req.body.minors,
        adults: req.body.adults,
        seniors: req.body.seniors,
        allergies: req.body.allergies,
        phoneNumber: req.body.phoneNumber,
        //checkedIn: req.body.checkedIn,
        appointments: req.body.appointments,
        color: req.body.color } };

      if(req.query.date) {
        console.log(`DEBUG: Date requested: ${req.query.date}`);
        const date = new Date();
        const reportsQuery = {month: date.getMonth() + 1, year: date.getFullYear()};
        reportsCollection.updateOne(reportsQuery, {$set: {}}, {upsert: true});
        console.log("DEBUG: Updated reports collection");
        familiesCollection.findOne(query).then((family) => {
          var previouslyCheckedIn = false;
          var checkedInThisMonth = false;
          for(var appointment of family.appointments) {
            if(appointment.checkedIn) {
              previouslyCheckedIn = true;
              appointmentMonth = new Date(Date.parse(appointment.date)).getMonth();
              if(appointmentMonth == date.getMonth()) {
                checkedInThisMonth = true;
              }
            }
          }
          //console.log(`DEBUG: family.checkedIn.size == ${family.checkedIn.length}`);
          //console.log(`DEBUG: Previous checkin: ${family.checkedIn[family.checkedIn.length - 1].date}`);
          if(!previouslyCheckedIn) { //Case: Family has never checked in before
            reportsCollection.findOneAndUpdate(reportsQuery, 
              {$inc: {
                households: 1,
                individualHouseholds: 1,
                newHouseholds: 1,
                numberOfClients: family.adults,
                numberOfYouth: family.minors,
                numberOfSeniors: family.seniors
              }}
            );
          } else if (checkedInThisMonth) {
              reportsCollection.findOneAndUpdate(reportsQuery, 
                {$inc: {
                  households: 1 // Just increase the total number of households served
                }});
          } else { //They haven't checked in this month
            reportsCollection.findOneAndUpdate(reportsQuery, 
              {$inc: {
                households: 1,
                individualHouseholds: 1,
                numberOfClients: family.adults,
                numberOfYouth: family.minors,
                numberOfSeniors: family.seniors
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
  
family.delete('/', (req, res) => {
    if(req.query.phoneNumber) {
      const query = { phoneNumber: req.query.phoneNumber };
      familiesCollection.deleteOne(query);
      res.status(201);
    } else {
      res.status(404);
    }
});

module.exports = family;