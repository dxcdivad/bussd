const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');

router.get('/', (req, res) => {
  res.json({
    message: 'VEHICLES works!'
  });
});

module.exports = router;
