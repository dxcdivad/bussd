const express = require('express');
const router = express.Router();
const Route = require('../models/Route');
///not done


router.get('/', (req,res)=>{

 Route
        .find({})
        .then(routes =>  (routes ? (res.status(200).json(routes)) : res.status(404).send()))
        .catch(err => res.status(500).send('An internal server error has occured'));
});

router.get('/:id', (req, res) => {
  var id = req.params.id;
  Route.find(
    { 'RouteId': id },
    ' RouteId RouteLongName RouteType',
    function(err, routes) {
      if (err) return handleError(err);
      console.log(Route.RouteId);
      res.status(200).json(routes);
    }
  );
});

module.exports = router;
