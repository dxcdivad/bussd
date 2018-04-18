const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

mongoose.connect('mongodb://localhost/bussd');
mongoose.Promise = Promise;

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('build'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// app.get('/', (req, res) => {
//   res.status(200) ? console.log('Everything looks fine...') : console.log("There's an error...");
//   res.json({
//     message: 'API IS UP'
//   });
// });

app.use('/api/vehicles', require('./routes/vehicles'));
app.use('/api/stops', require('./routes/stops'));

module.exports = app;
