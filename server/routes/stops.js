const express = require('express');
const router = express.Router();
const Stop = require('../models/Stop');

router.get('/', (req, res) => {
  res.json({
    message: 'STOPS works!'
  });
});

module.exports = router;
