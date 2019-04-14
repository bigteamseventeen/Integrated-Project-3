<template>
	<div class="container">
		<div class="row">
			<div class="col-md-8"> 
				<h3>Earth Quakes - Test</h3>

				<div class="container-map">
					<!-- Map -->
					<GmapMap :center="center" :zoom="zoom" style="width:100%;height:100%;">
						<gmap-info-window :options="infoWindow.Options" :position="infoWindow.Position" 
										:opened="infoWindow.Opened" @closeclick="infoWindow.Opened=false">
							{{infoWindow.Content}}
						</gmap-info-window>

						<GmapCluster>
							<GmapMarker :key="index" v-for="(m, index) in markers"
										:label="m.label"
										:position="m.position"
										:clickable="true" @click="center=m.position;markerClick(index, m)"
							></GmapMarker>
						</GmapCluster>
					</GmapMap>
				</div>

				<div>
					<label>
						<gmap-autocomplete @place_changed="setPlace"></gmap-autocomplete>
						<button class="btn btn-primary" @click="addMarker">Add</button>
					</label>
					<br/>
				</div>		
			</div>
			<div class="col-md-4">
				<h3>Recent Earthquakes</h3>

				<button class="btn btn-primary" @click="updateRecentEarthquakes">Refresh recent earthquakes</button> <br> <br>

				<div class="list-group">
					<map-earthquake-item v-for="(item,index) in recentEarthquakes" :key="index" :Data="item"></map-earthquake-item>
				</div> 
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import {Component, Vue, Watch} from 'vue-property-decorator';
	import {GetEarthQuakes, EQDateSpan, EQSignificance} from '../../ts/API/EarthQuakes';
	import {Feature, FeatureCollection} from 'geojson';

	@Component({})
	export default class extends Vue {
		//
		// ---------- Properties ----------

		//
		// ---------- Data ----------
		center: object = { lat: 55.866486, lng: -4.250251 };
		zoom: number = 2;
      	markers = [];
      	places = [];
		currentPlace = null;
		recentEarthquakes: Feature[] = [];

		infoWindow: Object = {
			Position: null,
			Content: null,
			Opened: false,
			CurrentKey: null,
			Options: {
				pixelOffset: {
					width: 0,
					height: -35
				}
			}
		};

		//
		// ---------- Methods and Computed ----------
		constructor() { 
			super();
		 } // Initialize data here if you cant above

		mounted() { 
			this.geolocate();
			this.updateRecentEarthquakes();
		} // On Component Load, use instead of constructor!

		beforeUpdated() { } // Before Render

		// receives a place object via the autocomplete component
		setPlace(place) {
			this.currentPlace = place;
		}

		addMarker() {
			if (this.currentPlace) {
				const marker = {
					lat: this.currentPlace.geometry.location.lat(),
					lng: this.currentPlace.geometry.location.lng()
				};

				this.markers.push({ position: marker, label: "test" });
				this.places.push(this.currentPlace);
				this.center = marker;
				this.currentPlace = null;
			}
		}

		markerClick(index, marker) {
			console.log(index, marker);
		}

		geolocate() {
			navigator.geolocation.getCurrentPosition(position => {
				this.center = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};
			});
		}

		updateRecentEarthquakes() {
			let $this = this;

			GetEarthQuakes(EQDateSpan.Hour, EQSignificance.M1_0_PLUS, function(response,status) {
				if (status != "success") {
					console.warn("Failed to recieve information from geological API");
					return;
				}

				$this.recentEarthquakes = response.features;
			});
		}
		
		@Watch('$route')
		onRouteVisit (to, from) {
			if (to != "map") return;

			// Any specific code for the current page when ever changed to

			this.updateRecentEarthquakes();
		}
	};
</script>

<style scoped>
	.container-map {
		min-height: 400px;
		max-height: 70vh;
		display: flex;
		flex-direction: column;
	}

	.map {
		height: 100%;
	}
</style>