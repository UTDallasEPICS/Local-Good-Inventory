const appointment = require('express').Router();
const { MongoClient } = require('mongodb');
const mongoClient = new MongoClient(process.env.DB_URL)
mongoClient.connect();

const appointmentsCollection = mongoClient.db('LocalGoodCenter').collection('Appointments');


appointment.get('/', (req, res) => {
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
  
  appointment.post('/', (req, res) => {
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

module.exports = appointment;