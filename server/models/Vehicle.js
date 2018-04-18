const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
  vehicleId: { type: Number, required: true },
  tripId: { type: Number, required: true },
  routeId: { type: Number, required: true, ref:'Route' },
  id: { type: Number, required: true },
  vehicleLon: { type: Number, max: 90.0, min: -120.0, required: true },
  vehicleLat: { type: Number, max: 90.0, min: -120.0, required: true },
  timestamp: { type: Number, required: true }
},{ _id: false },
);

VehicleSchema.index({vehicleId:1},{unique:true})

module.exports = mongoose.model('Vehicle', VehicleSchema);
