const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StopTimeSchema = new Schema({
  tripId: { type: Number, required: true },
  stopId: { type: Number, required: true },
  arrivalTime: {type: Date, required: true},
  departureTime: {type: Date, required:false},

}
);


module.exports = mongoose.model('StopTime', StopTimeSchema);