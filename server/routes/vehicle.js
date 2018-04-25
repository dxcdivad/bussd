const express = require('express');
const router = express.Router();
// const cache = require('express-redis-cache')({ client: require('redis').createClient(),expire: 20 });
var cache = require('express-redis-cache')({
    host: process.env.REACT_REDIS_HOST, port: process.env.REACT_REDIS_PORT, auth_pass: process.env.REACT_REDIS_PASSWORD, expire: 20
    });
const axios =require('axios');

router.get('/', cache.route(),function(req,res) {
    axios.get(process.env.REACT_REDIS_API)
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
