const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RouteSchema = new Schema({
    RouteId:{ type: Number, required: true},
    RouteLongName:{type: String, required: true},
    RouteType: {typed: String, required: true},
    
  
});

// RouteSchema.index({RouteId:1},{unique:true})

module.exports = mongoose.model('Route', RouteSchema);
