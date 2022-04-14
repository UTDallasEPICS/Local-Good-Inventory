/*  This folder/file is for the server. The server handles hosting the website
 *  as well as connecting to the database.
 */

const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

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
    family = {
      phoneNumber: "5128391223",
      name: "Ross",
      members: [
        { name: "Michael", age: "18-59", allergies: ["nuts"]},
        { name: "Diane", age: "60+", allergies: []}
      ]
    }
  } else {
    family = {
      phoneNumber: "2817443226",
      name: "Villegas",
      members: [
        { name: "Isabelle", age: "18-59", allergies: [] }
      ]
    }
  }
  res.status(200).json({
      family
  });
});

app.listen(port, () => {
    console.log(`Listening at https://localhost:${port}`)
})