const express = require('express');
const router = express.Router();
const StopTime = require('../models/StopTime');
///not done

/* router.get('/:id', (req, res) => {
  var id = req.params.id;
  StopTime.find({ stopId: id }, 'tripId stopId arrivalTime departureTime', function(err, StopTime) {
    if (err) return handleError(err);
    console.log(StopTime.stopId);
    res.status(200).json(StopTime);
  });
}); */

router.get('/:id', (req, res) => {
  let id = req.params.id;
  StopTime.find({ stopId: id }).then((stop, err) => {
    stop ? res.status(200).json(stop) : res.status(404).send(err);
  });
});

module.exports = router;
