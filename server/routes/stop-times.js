const express = require('express');
const router = express.Router();
const StopTime = require('../models/StopTime');
///not done

router.get('/:id', (req, res) => {
  var id = req.params.id;
  StopTime.find({ tripId: id })
    .then(trips => (trips ? res.status(200).json(trips) : res.status(404).send()))
    .catch(err => res.status(500).send('An internal server error has occured'));
});

module.exports = router;
