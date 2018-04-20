const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TripSchema = new Schema({
  tripId: { type: Number, required: true },
  routeId: { type: Number, required: true },
  tripHeadSign: {type: String, required: false}

}
);



module.exports = mongoose.model('Trip', TripSchema);