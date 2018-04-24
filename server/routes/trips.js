const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');

router.get('/:id', (req, res) => {
  var id = req.params.id;
  Trip.find({ tripId: id })
    .then(trips => (trips ? res.status(200).json(trips) : res.status(404).send()))
    .catch(err => res.status(500).send('An internal server error has occured'));
});

module.exports = router;
