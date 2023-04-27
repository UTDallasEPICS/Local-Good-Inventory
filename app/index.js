/*  This folder/file is for the server. The server handles hosting the website
 *  as well as connecting to the database.
 */

require('dotenv').config();
const app = require('express')();
const { expressjwt: jwt } = require('express-jwt');
var jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT;

const familyRouter = require('./routers/family');
const eventRouter = require('./routers/event');
const appointmentRouter = require('./routers/appointment');
const settingsRouter = require('./routers/settings');
const reportRouter = require('./routers/report');


const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.JWT_URI
  }),
  audience: process.env.JWT_AUDIENCE,
  issuer: process.env.JWT_ISSUER,
  algorithms: ['RS256']
});

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  methods: 'GET, POST, PATCH, DELETE, OPTIONS'
}))

app.use(jwtCheck);
app.use(bodyParser.json());

app.use((err, req, res, next) => {
  if(err) {
    if(err.name === "UnauthorizedError") {
      res.status(401).send(err.inner);
      console.log(err);
    } else {
      next(err);
    }
  } else {
    next();
  }
});


app.use('/family', familyRouter);
app.use('/event', eventRouter);
app.use('/appointment', appointmentRouter);
app.use('/settings', settingsRouter);
app.use('/report', reportRouter);


app.listen(port, async () => {
    console.log(`Listening at http://localhost:${port}`) 
})