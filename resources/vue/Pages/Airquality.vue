<template>
	<div class="container">
		<div class="row">
			<div class ="col-md-12">
				<h1>Monitoring Air Pollution</h1>

				<div class="card">
					<div class="card-body">
						<h4 class="card-title">Load information for location</h4>
						
						<div class="form-group">
						  <label>Latitude</label>
						  <input v-model="FormPosition.lat" type="text" class="form-control" aria-describedby="helpId" placeholder="Lat">
						  <small id="helpIdLat" class="form-text text-muted">Latitude (eg: 24.5321)</small>
						</div>

						<div class="form-group">
						  <label>Longitude</label>
						  <input v-model="FormPosition.lng" type="text" class="form-control" aria-describedby="helpIdLng" placeholder="Lng">
						  <small id="helpIdLng" class="form-text text-muted">Longitude (eg: 24.5321)</small>
						</div>

						<button class="btn btn-primary" @click="btnLoadAir_Click">Load air quality</button>
					</div>
				</div>
				<br />
				<div class="form">
					<p> Selected location: {{Position.lat}},{{Position.lng}}</p>
				</div>
				<div class="map-container">
					<GmapMap ref="gmap" style="width:100%;height:100%;" :center="Position" :zoom="ZoomLevel">
							<GmapMarker :key="index" v-for="(m, index) in markers"
									:label="m.label"
									:icon="m.icon"
									:position="m.position"
									:clickable="false"
							></GmapMarker>

					</GmapMap>
				</div>
				<div class="legend">
					<table>
						<tr>
							<th>Colour</th>
							<td><div class="green"></div></td>
							<td><div class="yellow"></div></td>
							<td><div class="orange"></div></td>
							<td><div class="red"></div></td>
							<td><div class="lilac"></div></td>
							<td><div class="purple"></div></td>
						</tr>
					
						<tr>
							<th>Category</th>	
							<td>good</td>
							<td>moderate</td>
							<td><br />unhealthy <br /> for sensitive <br /> groups</td>
							<td>unhealthy</td>
							<td>very unhealthy</td>
							<td>hazardous</td>
						</tr>
						
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
	// import { } from '../../ts/API/Airquality';

	import * as $ from "jquery";

	@Component({})
	export default class AirQuality extends Vue {
		name: 'container'
		//
		// ---------- Properties ----------

		//
		// ---------- Data ----------
		/** Stores the user position (from the form input) */
		FormPosition: {lat: number, lng: number} = {lat: 55.8643, lng: -4.2550};
		Position: {lat: number, lng: number} = {lat: 0, lng: 0}; // default pos
		ZoomLevel: number = 4;
		url:"";

		markers: google.maps.Marker[] = [];

		//
		// ---------- Methods and Computed ----------
		constructor() { 
			super();
		} // Initialize data here if you cant above


		mounted() { 
		} // On Component Load, use instead of constructor!

		beforeUpdated() { } // Before Render

		// On form click
		btnLoadAir_Click(): void {
			this.Position = this.FormPosition;

			console.log("Button click", this);
			// this.map.setCenter(new google.maps.LatLng(this.FormPosition.lat, this.FormPosition.lng));

			var lat = this.FormPosition.lat;
			var long = this.FormPosition.lng;
			$.ajax({
				method: "GET",
				url: "https://api.airvisual.com/v2/nearest_city?lat=" + lat + "&lon=" + long + "&key=Y8GFnuPkdWFTytAoP",
				dataType: "json",
				success: this.eqfeed_callback,
				error: function (request, status, error) {
					alert("Error requesting page. \nResponse from server: " + request.responseText);
				}
			});
		}	

		getCircle(magnitude) {
			return {
				path: google.maps.SymbolPath.CIRCLE,
				fillColor: 'red',
				fillOpacity: .2,
				scale: Math.pow(2, magnitude) / 2,
				strokeColor: 'white',
				strokeWeight: .5
			};
		}


		eqfeed_callback(results): void {
			console.log("eqfeed_callback", results);

			// for (var i = 0; i < results.data.length; i++) {
			// the markers will be coloured using the rules
			//green for 0 - 50, yellow 51 - 100, orange - 101 - 150, red - 151 - 200, lilac 201 - 250, purple 251 -300

			//The valid range of latitude in degrees is -90 and +90 for the southern and northern hemisphere 
			//Longitude is in the range -180 and +180
			let coords = results.data.location.coordinates;
			let latLng = new google.maps.LatLng(coords[1], coords[0]);
			this.Position = {lat: coords[1], lng: coords[0]};
			console.log(results.data.current.pollution.aqius);
			
			let aqi = results.data.current.pollution.aqius;
			let color = '';
			let txtColor = '';
			
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

			this.markers.push(new google.maps.Marker({
				position: latLng,
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
				
			}));
		}
	}
</script>
<style scoped>
 .green{
	 height: 50px;
  width: 50px;
  background-color: green;
 }
 .yellow{
	 height: 50px;
  width: 50px;
  background-color: yellow;
 }
 .orange{
	 height: 50px;
  width: 50px;
  background-color: orange;
 }
 .red{
	 height: 50px;
  width: 50px;
  background-color: #ff1919;
 }
 .lilac{
	 height: 50px;
  width: 50px;
  background-color: #b666d2;
 }
 .purple{
	 height: 50px;
  width: 50px;
  background-color: purple;
 }
 th, td {
  padding-right: 5%;
  padding-top:5px;
  text-align: left;
}
table{
	margin-top:2%;
	border: 1px solid black;
}

</style>
