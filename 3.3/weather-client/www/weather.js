document.getElementById('check-weather').onclick = function () {
	document.getElementById('weatherResponse').innerHTML = "<p>Calling Forecast.io ... </p>";

	var x = document.getElementById("geolocation");
	var latlon;

	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition, showError);
		} else {
			x.innerHTML = "Geolocation is not supported by this browser.";
		}
	}

	function showPosition(position) {
		latlon = { lat: position.coords.latitude, lng: position.coords.longitude };
		myMap(latlon);
		fhConn(position);
		x.innerHTML = "Your geolocation<br />" + latlon.lat + " - " + latlon.lng;

	}

	function fhConn(position) {
		$fh.cloud(
			{
				path: 'weather/' + position.coords.latitude + "," + position.coords.longitude,
				method: "GET",
				contentType: "application/json"
			},
			function (res) {
				console.log(res);
				var unit = (res.flags.units == 'si') ? '°C' : '°F';
				document.getElementById('weatherResponse').innerHTML = "<p>" + res.currently.temperature + unit + "</p>";
			},
			function (code, errorprops, params) {
				alert('An error occured: ' + code + ' : ' + errorprops);
			}
		);
	}

	function showError(error) {
		switch (error.code) {
			case error.PERMISSION_DENIED:
				x.innerHTML = "User denied the request for Geolocation."
				break;
			case error.POSITION_UNAVAILABLE:
				x.innerHTML = "Location information is unavailable."
				break;
			case error.TIMEOUT:
				x.innerHTML = "The request to get user location timed out."
				break;
			case error.UNKNOWN_ERROR:
				x.innerHTML = "An unknown error occurred."
				break;
		}
	}

	getLocation();

	function myMap(latlon) {
		var mapProp = {
			center: latlon,
			zoom: 16,
		};
		var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
	}

};
