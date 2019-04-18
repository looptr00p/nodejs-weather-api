const axios = require('axios');
const HttpStatus = require('http-status-codes');

module.exports = {
    getWeather: async(req, res) => {

        const { lat, long } = req.params;

        axios.get(`https://api.darksky.net/forecast/${process.env.SECRETKEY}/${lat},${long}`)
            .then((response) => {
                let weather = JSON.parse(JSON.stringify(response.data.currently));
                return res
                    .status(HttpStatus.OK)
                    .json(weather)
            })
            .catch((error) => {
                return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json(error.message)
            });
    },
};