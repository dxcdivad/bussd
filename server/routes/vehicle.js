const express = require('express');
const router = express.Router();
const cache = require('express-redis-cache')({ client: require('redis').createClient(),expire: 20 });
const axios =require('axios');

router.get('/', cache.route(),function(req,res) {
    axios.get('https://realtime.sdmts.com/api/api/where/vehicles-for-agency/MTS.json?key=ac6279cf-c99b-4e09-8434-5ab4c019479c')
    .then(function (response) {
        res.status(200).json(response.data.data.list);
        console.log(response.data.data.list);
     })
    .catch(function (error) {
    console.log(error);
  });

    console.log('get the api');  
    



});




module.exports = router;
