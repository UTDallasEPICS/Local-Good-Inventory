/*  This folder/file is for the server. The server handles hosting the website
 *  as well as connecting to the database.
 */

const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/family', (req, res) => {
    const family = {
        phoneNumber: "5128391223",
        name: "Ross",
        members: [
          { name: "Michael", age: "18-59", allergies: ["nuts"]},
          { name: "Diane", age: "60+", allergies: []}
        ]
      }
    res.status(200).json({
        family
    });
});

app.listen(port, () => {
    console.log(`Listening at https://localhost:${port}`)
})