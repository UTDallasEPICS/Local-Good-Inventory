/*  This folder/file is for the server. The server handles hosting the website
 *  as well as connecting to the database.
 */

const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.use(express.static(path.join(__dirname, '../client/build')));

app.use((req, res) => {
   res.send('Hello world!');
});

app.listen(port, () => {
    console.log(`Listening at https://localhost:${port}`)
})