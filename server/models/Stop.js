const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StopSchema = new Schema({
  stopId: { type: Number, required: true },
  stopName: { type: String, required: true },
  stopLon: { type: Number, max: 90.0, min: -120.0, required: true },
  stopLat: { type: Number, max: 90.0, min: -120.0, required: true }
}
);

StopSchema.index({StopId:1},{unique:true})

module.exports = mongoose.model('Stop', StopSchema);
