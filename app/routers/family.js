const family = require('express').Router();
const { MongoClient } = require('mongodb');
const appointment = require('./appointment');
const mongoClient = new MongoClient(process.env.DB_URL)
mongoClient.connect();
const familiesCollection = mongoClient.db('LocalGoodCenter').collection('Families');
const reportsCollection = mongoClient.db('LocalGoodCenter').collection('Reports');
const appointmentsCollection = mongoClient.db('LocalGoodCenter').collection('Appointments');
const marketEventID = '000000000000000000000000';

/**
 * Gets all the registered families in the database
 * 
 * @returns {Family[]} Array of all families in the database
 */
family.get('/', (req, res) => {
  familiesCollection.find({}).toArray().then((families) => {
    res.status(200).json({families});
  });
});

/**
 * Gets a specific familiy from the database
 * 
 * @param {number} phoneNumber The phone number of the family
 * @returns {Family} The familiy with the specified phone number
 */
family.get('/:phoneNumber', (req, res) => { // Get one family by phone number 
  if(req.params.phoneNumber.length != 10) {
    res.status(400).send("Please enter a valid 10 digit phone number.");
    return; 
  }
  const query = { phoneNumber: req.params.phoneNumber };
  familiesCollection.findOne(query).then((family) => {
    if(family != null)
      res.status(200).json({family});
    else
      res.status(404).send(`Family with phone number ${req.params.phoneNumber} not found.`)
  });
});

/**
 * Inserts a new family or update a family if a family with the specified phone number
 * already exists
 * 
 * @param {number} phoneNumber The phone number of the family to insert/update
 */
family.put('/:phoneNumber', (req, res) => {
  if(req.params.phoneNumber.length != 10) {
    res.status(400).send("Please enter a valid 10 digit phone number.");
    return;
  }
  if(!req.body.firstName.length > 0) {
    res.status(400).send("Please enter a valid non-empty first name");
    return;
  }
  if(!req.body.lastName.length > 0) {
    res.status(400).send("Please enter a valid non-empty last name");
    return;
  }
  if(!Array.isArray(req.body.allergies)) {
    res.status(400).send("Field 'allergies' must be of type Array");
    return;
  }
  if(!Array.isArray(req.body.appointments)) {
    res.status(400).send("Field 'appointments' must be of type Array");
    return;
  }
  if(req.body.color.length > 0 && (req.body.color != "blue" || req.body.color != "pink")) {
    res.status(400).send("Field 'color' must contain either 'blue' or 'pink'");
    return;
  }

  const query = { phoneNumber: req.params.phoneNumber };

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
    appointments: req.body.appointments,
    color: req.body.color } };

  familiesCollection.updateOne(query, newValue, {upsert: true});
  res.status(201);
  console.log(`Family with phone number ${req.params.phoneNumber} successfully created/updated.`)
});

/**
 * Marks a family as checked in for a specific appointment they have booked. If they are
 * checking into the market, also updates the report document in the database for that month.
 * 
 * @param {number} phoneNumber The phone number of the family to check in
 * @param {string} date The date of the appointment they are checking into
 * @param {string} id The id for the event of the appointment they are checking into
 */
family.post('/:phoneNumber/checkin', (req, res) => {
  if(req.params.phoneNumber.length != 10) {
    res.status(400).send("Please enter a valid 10 digit phone number.");
    return;
  }
  if(!req.query.date || !req.query.id) {
    res.status(400).send("Please include an appointment date and event id in the POST request.");    
    return;
  }
  if(req.query.date.length < 16) {
    res.status(400).send("Please enter a valid date and time of length 16");
    return;
  }
  if(req.query.id.length < 24) {
    res.status(400).send("Please enter a valid id of length 24");
    return;
  }
  
  const query = { phoneNumber: req.params.phoneNumber };
  familiesCollection.findOne(query).then((family) => {
    var previouslyCheckedIn = false;
    var checkedInThisMonth = false;
    var validAppointment = false;
    var date = new Date();
    for(var appointment of family.appointments) {
      if(appointment.checkedIn) {
        previouslyCheckedIn = true;
        appointmentMonth = new Date(Date.parse(appointment.date)).getMonth();
        if(appointmentMonth == date.getMonth()) {
          checkedInThisMonth = true;
        }
      } else if(appointment.date == req.query.date && appointment.id == req.query.id) {
        validAppointment = true;
      }
    }
    if(!validAppointment) {
      res.status(400).send(`Appointment with date ${req.query.date} and event id ${req.query.id} does not exist or is already checked in for family ${req.params.phoneNumber}.`);
      return;
    }

    var appointmentQuery = {appointments: {$elemMatch: {'id': req.query.id, 'date': req.query.date}}};
    familiesCollection.findOneAndUpdate(appointmentQuery, {$set: {'appointments.$.checkedIn': true}}).then((res) => console.log(res.value.appointments));
    
    //If they are checking into the market, update the report.
    if(req.query.id == marketEventID) {

      //Insert a report for this month if it doesn't yet exists 
      const date = new Date(req.query.date);
      const reportsQuery = {month: date.getMonth() + 1, year: date.getFullYear()};
      reportsCollection.updateOne(reportsQuery, {$set: {}}, {upsert: true});

      if(!previouslyCheckedIn) { //Case: Family has never checked into the market before
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
      } else if (!checkedInThisMonth) {  //Case: They haven't checked into the market yet this month
        reportsCollection.findOneAndUpdate(reportsQuery, 
          {$inc: {
            households: 1,
            individualHouseholds: 1,
            numberOfClients: family.adults,
            numberOfYouth: family.minors,
            numberOfSeniors: family.seniors
          }}
        );
      } else { // Case: They've already checked in before this month
        reportsCollection.findOneAndUpdate(reportsQuery, 
          {$inc: {
            households: 1 // Only increase the total number of households served
          }});
      }
    }

  });
  res.status(200);
  console.log(`Sucessfully checked in family for appointment ${req.query.date} and event id ${req.query.id}`);
});

/**
 * Adds/books a new appointment for a family
 * 
 * @param {number} phoneNumber The phone number of the family to add the appointment
 * @param {string} date The date of their new appointment
 * @param {string} id The id of the event of the appointment
 */
family.put('/:phoneNumber/appointment', (req, res) => {
  if(req.params.phoneNumber.length != 10) {
    res.status(400).send("Please enter a valid 10 digit phone number.");
    return;
  }
  if(!req.query.date || !req.query.id) {
    res.status(400).send("Please include an appointment date and event id in the POST request.");
    return;
  }
  if(req.query.date.length < 16) {
    res.status(400).send("Please enter a valid date and time of length 16");
    return;
  }
  if(req.query.id.length < 24) {
    res.status(400).send("Please enter a valid id of length 24");
    return;
  }

  const familyQuery = {phoneNumber: req.params.phoneNumber};
  familiesCollection.findOneAndUpdate(familyQuery, {$push: {appointments: { $each: [{id:req.query.id, date: req.query.date, checkedIn: false}], $sort: {date: 1} }}});
  res.status(201);
  console.log(`Appointment with date ${req.query.date} and id ${req.query.id} sucessfully created.`);
}); 
  
/**
 * Deletes a family from the database
 * WARNING: This data is permanently deleted.
 * 
 * @param {number} phoneNumber The phone number of the family to delete
 */
family.delete('/:phoneNumber', (req, res) => {
  if(req.params.phoneNumber.length != 10) {
    res.status(400).send("Please enter a valid 10 digit phone number.");
    return;
  }

  const familyQuery = { phoneNumber: req.params.phoneNumber };
  familiesCollection.deleteOne(familyQuery);
  res.status(200);
  console.log(`Successfully deleted family with phone number ${req.params.phoneNumber}`);
});

/**
 * Deletes an appointment for a family
 * WARNING: This data is permanently deleted.
 * 
 * @param {number} phoneNumber The phone number of the family containing the appointment to delete
 * @param {string} date The date of the appointment to delete
 * @param {string} id The id of the event of the appointment to delete
 */
family.delete('/:phoneNumber/appointment', (req, res) => {
  if(req.params.phoneNumber.length != 10) {
    res.status(400).send("Please enter a valid 10 digit phone number.");
    return;
  }
  if(!req.query.date || !req.query.id) {
    res.status(400).send("Please include an appointment date and event id in the DELETE request.");
    return;
  }
  if(req.query.date.length < 16) {
    res.status(400).send("Please enter a valid date and time of length 16");
    return;
  }
  if(req.query.id.length < 24) {
    res.status(400).send("Please enter a valid id of length 24");
    return;
  }

  //Remove appointment from family
  const familyQuery = { phoneNumber: req.params.phoneNumber };
  const familyUpdate = { $pull: {appointments: { id: req.query.id, date: req.query.date }}};
  familiesCollection.findOneAndUpdate(familyQuery, familyUpdate);

  //Remove timeslot from appointment database
  const day = +req.query.date.split('T')[0].split('-')[2];
  const month = +req.query.date.split('-')[1];
  const year = +req.query.date.split('-')[0];
  const time = req.query.date.split('T')[1];
  const appointmentQuery= { 
    date: day, 
    month: month, 
    year: year,
    eventID: req.query.id,
    timeslots: {$elemMatch: {
      time: time
    }}
  };
  const appointmentUpdate = {
    $pull: {
      "timeslots.$.phoneNumber" : req.params.phoneNumber
    },
    $inc: {
      "timeslots.$.quantity": -1
    }
  }
  appointmentsCollection.findOneAndUpdate(appointmentQuery, appointmentUpdate);
  res.status(200);
});

module.exports = family;