const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Route = require('./models/Route');
const Stop = require("models/Stop");

mongoose.connect('mongodb://localhost/bussd');
mongoose.Promise = Promise;

const app = express();
const router = express.Router();


app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('build'));

// app.get('/', (req, res) => {
//   res.status(200) ? console.log('Everything looks fine...') : console.log("There's an error...");
//   res.json({
//     message: 'API IS UP'
//   });
// });



// Route.csvReadStream({}).pipe(
//     fs.createWriteStream('DataForTransit/routes.csv'));

Route.find({}).exec()
    .then(function(docs) {
    User.csvReadStream(docs)
        .pipe(fs.createWriteStream('DataForTransit/routes.csv'));
    });


// app.use('/api/vehicles', require('./routes/vehicles'));
app.use('/api/stops', require('./routes/stops'));



module.exports = app;
