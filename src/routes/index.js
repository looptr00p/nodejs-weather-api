const express = require('express');
const router = express.Router();
const weather = require('./../components/weather/weather.controller');

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/api/getWeather/:lat/:long', weather.getWeather);

module.exports = router;
