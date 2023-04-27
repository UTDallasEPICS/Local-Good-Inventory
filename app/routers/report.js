const report = require('express').Router();
const { MongoClient } = require('mongodb');
const mongoClient = new MongoClient(process.env.DB_URL)
mongoClient.connect();
const reportsCollection = mongoClient.db('LocalGoodCenter').collection('Reports');

report.get('/', (req, res) => {
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

module.exports = report;