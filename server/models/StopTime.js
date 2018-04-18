const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StopTimeSchema = new Schema({
  tripId: { type: Number, required: true, ref:'Trip' },
  stopId: { type: Number, required: true, ref:'Stop' },
  arrivalTime: {type: Date, required: true},
  departureTime: {type: Date, required:false},

}, 
{ _id: false },
);
StopTimeSchema.index({tripId:1,stopId: 1},{unique:true})

module.exports = mongoose.model('StopTime', StopTimeSchema);