const axios = require('axios');
const HttpStatus = require('http-status-codes');
const redis = require('redis');

const client = redis.createClient(6379,process.env.REDIS);

client.on('error', (err) => {
  console.log("Error " + err);
});


module.exports = {
    getWeather: async(req, res) => {
        const { lat, long } = req.params;
        const url = `https://api.darksky.net/forecast/${process.env.SECRETKEY}/${lat},${long}`;

        return client.get(url, (err, result) => {
            if (result) {
              const resultJSON = JSON.parse(result);
              return res.status(200).json(resultJSON);
            } else {
                return axios.get(url)
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
            }
        });
    },
};