let map = null;
//when page loads this initial map will load data will be added later
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: new google.maps.LatLng(51.5, -0.11)
		// mapTypeId: 'Terrain'   
	});
}


//getting the latitude and longtitude values
// Initialize and add the map
$(document).ready(function () {

	$("#form").submit(function (event) {
		event.preventDefault();
		var lat = $("#lat").val();
		var long = $("#lng").val();
		$.ajax({
			method: "GET",
			url: "https://api.airvisual.com/v2/nearest_city?lat=" + lat + "&lon=" + long + "&key=Y8GFnuPkdWFTytAoP",
			datatype: "JSONP",
			success: eqfeed_callback,
			error: function (request, status, error) {

				alert("Error requesting page. \nResponse from server: " + request.responseText);
			}
		});//ajax
	});//form submit

	function getCircle(magnitude) {
		return {
			path: google.maps.SymbolPath.CIRCLE,
			fillColor: 'red',
			fillOpacity: .2,
			scale: Math.pow(2, magnitude) / 2,
			strokeColor: 'white',
			strokeWeight: .5
		};
	}


	function eqfeed_callback(results) {
		// for (var i = 0; i < results.data.length; i++) {
		// the markers will be coloured using the rules
		//green for 0 - 50, yellow 51 - 100, orange - 101 - 150, red - 151 - 200, lilac 201 - 250, purple 251 -300

		//The valid range of latitude in degrees is -90 and +90 for the southern and northern hemisphere 
		//Longitude is in the range -180 and +180
		var coords = results.data.location.coordinates;
		var latLng = new google.maps.LatLng(coords[1], coords[0]);
		console.log(results.data.current.pollution.aqius);
		var aqi = results.data.current.pollution.aqius;
		var color = '';
		if (aqi <= 0 || aqi <= 50) {
			color = 'green';
			txtColor = 'white';
		}
		else if (aqi >= 51 && aqi <= 100) {
			color = 'yellow';
			txtColor = 'black';
		}
		else if (aqi >= 101 && aqi <= 150) {
			color = 'orange';
			txtColor = 'black';
		}
		else if (aqi >= 151 && aqi <= 200) {
			color = '#ff1919';
			txtColor = 'white';
		}
		else if (aqi >= 201 && aqi <= 250) {
			color = '#b666d2';
			txtColor = 'white';
		}
		else {
			color = 'purple';
		}

		var label = aqi.toString();
		console.log(aqi);

		var marker = new google.maps.Marker({
			position: latLng,
			map: map,
			label: {
				text: label,
				color: txtColor
			},
			icon: {
				path: google.maps.SymbolPath.CIRCLE,
				scale: 20,
				fillColor: color,
				fillOpacity: 1,
				strokeColor: 'black',
				strokeWeight: 0.5,
				// labelContent: aqi
			}
			// label: aqi
		});

		var relocate = new google.maps.LatLng(coords[1], coords[0]);
		map.setCenter(relocate);
	}

	// map.data.setStyle(function(feature) {
	//   var magnitude = feature.getProperty('aqius');
	//   return {
	//     icon: getCircle(magnitude)
	//   };
	// });
	// });//document.ready

});
/*
html code
<!DOCTYPE html>
<html>
	<head>
	<meta name="viewport" content="initial-scale=1.0, user-scalable=no">
	<meta charset="utf-8">
	<title>Air Quality Monitoring Page</title>
	<link rel="stylesheet" href="style/Main.css">
	</head>
	<body>
		<h1>Monitoring Air Pollution</h1>
		<form id="form">
			Latitude: <input type="number" required placeholder="Please enter the latitude" min="-90" max="90" step="any" id="lat" name="lat" />
			<br />
			Longitude: <input type="number" required placeholder="Please enter the longitude" min="-180" max="180" step="any" id="lng" name="lng"/>
			<br />
			<input type="submit" value="Submit" />

		</form>
		<br />
	<div id="map"></div>
	<!--external library
	<script src="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js">
	-->
	<script src="external_files/markerclusterer.js"></script>
	<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD4guyEK5SYIhEB_eagBOtwdR0VIsPKiGY&callback=initMap"></script>
	<script src ="https://code.jquery.com/jquery-3.3.1.min.js"></script>
	<script src = "script/Main.js"></script>
	</body>
</html>
*/