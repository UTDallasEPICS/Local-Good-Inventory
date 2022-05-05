/*  This folder/file is for the server. The server handles hosting the website
 *  as well as connecting to the database.
 */

const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

const mongoClient = new MongoClient("mongodb+srv://user1:UTDallas1@cluster0.yjnoy.mongodb.net/")

mongoClient.connect();

const familiesCollection = mongoClient.db('TestDatabase').collection('CollectionOne');

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
  console.log("Get request");
  family = {phoneNumber: "", name: "", members: [] }
  
  if(req.query.phoneNumber) {
    const query = { phoneNumber: req.query.phoneNumber };
    familiesCollection.findOne(query).then((family) => {
      this.family = family;
      res.status(200).json({
        family
      });
    });
  } else {
    res.status(404);
  }
  
});

app.post('/family', (req, res) => {
  if(req.query.phoneNumber) {
    const query = { phoneNumber: req.query.phoneNumber };
    const newValue = { $set: { checkedIn: req.body.checkedIn, nextAppointment: req.body.nextAppointment } };
    familiesCollection.updateOne(query, newValue);
    res.status(201);
  } else {
    res.status(404);
  }

});

app.listen(port, () => {
    console.log(`Listening at https://localhost:${port}`)
})