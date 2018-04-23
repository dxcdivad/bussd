const express = require('express');
const router = express.Router();
const Stop = require('../models/Stop');
///not done

router.get('/', (req,res)=>{

  Stop
         .find({})
         .then(stops =>  (stops ? (res.status(200).json(stops)) : res.status(404).send()))
         .catch(err => res.status(500).send('An internal server error has occured'));
 });




router.get('/:id', (req, res) => {
  var id = req.params.id;
  Stop.find(
    { 'stopId': id },
    ' stopName stopId stopLon stopLat',
    function(err, Stop) {
      if (err) return handleError(err);
      
      res.status(200).json(Stop);
    }
  );
});

module.exports = router;
