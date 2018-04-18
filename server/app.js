const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

mongoose.connect('mongodb://localhost/bussd');
mongoose.Promise = Promise;

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.status(200) ? console.log('Everything looks fine...') : console.log("There's an error...");
  res.json({
    message: 'API IS UP'
  });
});

app.use('/api/vehicles', require('./routes/vehicles'));

app.use('/api/stops', require('./routes/stops'));


module.exports = app;
