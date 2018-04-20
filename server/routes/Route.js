const express = require('express');
const router = express.Router();
const Route = require('../models/Route');
///not done

router.get('/:id', (req, res) => {
    var id = req.params.id;
    Route
        .find({RouteId:id})
        .then(routes =>  (routes ? (res.status(200).json(routes)) : res.status(404).send()))
        .catch(err => res.status(500).send('An internal server error has occured'));
        

});