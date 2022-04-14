/*  This folder/file is for the server. The server handles hosting the website
 *  as well as connecting to the database.
 */

const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

const mongoClient = new MongoClient("mongodb+srv://user1:UTDallas1@cluster0.yjnoy.mongodb.net/")

mongoClient.connect();

const familiesCollection = mongoClient.db('TestDatabase').collection('CollectionOne');


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Header', 
    'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.use('/family', (req, res) => {
  family = {phoneNumber: "", name: "", members: [] }
  
  if(req.query.phoneNumber) {
    const query = { phoneNumber: req.query.phoneNumber };
    familiesCollection.findOne(query).then((family) => {
      this.family = family;
      console.log(family);
      res.status(200).json({
        family
      });
    });
  } else {
    res.status(404);
  }
  
});

app.listen(port, () => {
    console.log(`Listening at https://localhost:${port}`)
})