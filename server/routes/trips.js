const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');

router.get('/', (req,res)=>{

  Trip
         .find({})
         .then(trips =>  (trips ? (res.status(200).json(trips)) : res.status(404).send()))
         .catch(err => res.status(500).send('An internal server error has occured'));
 });

router.get('/:id', (req, res) => {
  var id = req.params.id;
  Trip.find(
    { 'tripId': id },
    ' tripId routeId tripHeadSign',
    function(err, trips) {
      if (err) return handleError(err);
      console.log(Trip.tripId)
      res.status(200).json(trips);
    }
  );
});





module.exports = router;
