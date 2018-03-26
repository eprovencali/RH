var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var request = require('request');


function weatherRoute() {
	var weather = new express.Router();
	weather.use(cors());
	weather.use(bodyParser());

	weather.get('/:geo', function (req, res) {
		console.log("Geolocal:" + req.params.geo);
		const params = "exclude=minutely,hourly,daily,alerts&units=auto"

		const url = 'https://api.forecast.io/forecast/513032a80a62442396a4bb0a1d751f9f/' + req.params.geo + "?" + params;

		request(url, function (error, response, body) {
			res.json(JSON.parse(body));
		});
	});
	return weather;
}

module.exports = weatherRoute;
