const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Route = require('./models/Route');
const Stop = require("./models/Stop");
const StopTime = require("./models/StopTime");
const Trip= require("./models/Trip");
const fs=require('fs');
const csvjson= require('csvjson');
const path = require('path');


mongoose.connect('mongodb://localhost/bussd');
// mongoose.connect('mongodb://jsleague:bussd123@ds249269.mlab.com:49269/bussandiego');
mongoose.Promise = Promise;




const app = express();
const router = express.Router();
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('build'));

var routeData = fs.readFileSync(path.join(__dirname,'DataForTransit/routes.csv'), { encoding : 'utf8'});
var stopTimesData = fs.readFileSync(path.join(__dirname,'DataForTransit/stop_times.csv'), { encoding : 'utf8'});
var stopData = fs.readFileSync(path.join(__dirname,'DataForTransit/stop.csv'), { encoding : 'utf8'});
var tripsData = fs.readFileSync(path.join(__dirname,'DataForTransit/trips.csv'), { encoding : 'utf8'});
var options = {
    delimiter : ',', // optional
    quote     : '"' // optional
  };

var routejson=csvjson.toObject(routeData, options);
var stoptimesjson=csvjson.toObject(stopTimesData, options);
var stopjson=csvjson.toObject(stopData, options);
var tripsjson=csvjson.toObject(tripsData, options);

Route.collection.insert(routejson,function(err,result){
    console.log(result)
});

Stop.collection.insert(stopjson,function(err,result){
    console.log(result)
});

StopTime.collection.insert(stoptimesjson,function(err,result){
    console.log(result)
});

Trip.collection.insert(tripsjson,function(err,result){
    console.log(result)
});





// Route.csvReadStream({}).pipe(
//     fs.createWriteStream('DataForTransit/routes.csv'));

// Route.find({}).exec()
//     .then(function(docs) {
//     Route.csvReadStream(docs)
//         .pipe(fs.createWriteStream('../DataForTransit/routes.csv'));
//     });


// app.use('/api/vehicles', require('./routes/vehicles'));
app.use('/api/stops', require('./routes/stops'));



module.exports = app;
