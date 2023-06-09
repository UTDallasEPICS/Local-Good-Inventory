const appointment = require('express').Router();
const { MongoClient } = require('mongodb');
const mongoClient = new MongoClient(process.env.DB_URL)
mongoClient.connect();

const appointmentsCollection = mongoClient.db('LocalGoodCenter').collection('Appointments');
const familiesCollection = mongoClient.db('LocalGoodCenter').collection('Families');

/**
 * Gets one appointment if full date specified, otherwise a list of appointments for a given month and year
 */
appointment.get('/', (req, res) => {
    if(req.query.date) {
      const day = +req.query.date.split('-')[2];
      const month = +req.query.date.split('-')[1];
      const year = +req.query.date.split('-')[0];
      const query = { date: day, month: month, year: year };
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
  

/**
 * Inserts/updates an appointment
 */
appointment.post('/', (req, res) => {
  if(req.body.eventID && req.body.eventID.length < 24) {
    res.status(400).send('Please include a valid event ID');
    return;
  } else {
    const query = {date: req.body.date, month: req.body.month, year: req.body.year, eventID: req.body.eventID};
    const newValue = { $set: {
      date: req.body.date,
      month: req.body.month,
      year: req.body.year,
      timeslots: req.body.timeslots,
      eventID: req.body.eventID } };
    appointmentsCollection.updateOne(query, newValue, {upsert: true});
    res.status(200);
    console.log(`Appointment for ${req.body.month}-${req.body.date}-${req.body.year} for event ${req.body.eventID} sucessfully updated`);
  }
});

/**
 * Deletes all appointments from the appointments database and from each family
 */
appointment.delete('/all', (req, res) => {
  const query = {};
  appointmentsCollection.deleteMany(query);
  familiesCollection.updateMany({}, {$set: {appointments: []}})
  res.status(200).send("All appointments deleted");
});

module.exports = appointment;