const express = require('express');
const router = express.Router();
// const cache = require('express-redis-cache')({ client: require('redis').createClient(),expire: 20 });
var cache = require('express-redis-cache')({host: 'ec2-18-232-216-63.compute-1.amazonaws.com', port: 34379, auth_pass: process.env.REACT_APP_PASSWORD ,expire: 20 }

    );
const axios =require('axios');

router.get('/', cache.route(),function(req,res) {
    axios.get(process.env.REACT_APP_REDIS_API)
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
