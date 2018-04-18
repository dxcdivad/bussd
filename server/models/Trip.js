const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TripSchema = new Schema({
  tripId: { type: Number, required: true },
  routeId: { type: Number, required: true, ref:'Route' },
  tripHeadSign: {type: String, required: false}

}, 
{ _id: false },
);

TripSchema.index({tripId:1},{unique:true})

module.exports = mongoose.model('Trip', TripSchema);