<template>
	<div class="container">
		
		<div class="row">
			<div class="col-md-8"> 
				<h3>Map of Earthquakes</h3>


				<div class="container-map">
					<!-- Map -->
					<GmapMap :center="center" :zoom="zoom" style="width:100%;height:100%;">
						<gmap-info-window :options="infoWindow.Options" :position="infoWindow.Position" 
										  :opened="infoWindow.Opened"   @closeclick="infoWindow.Opened=false">
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
				
				<div class="list-group quake-list">
					<map-earthquake-item v-for="(item,index) in recentEarthquakes"
						:key="index" :eq="item" :map="self"></map-earthquake-item>
				</div> 
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import {Component, Vue, Watch} from 'vue-property-decorator';
	import {GetEarthQuakes, EQDateSpan, EQSignificance} from '../../ts/API/EarthQuakes';
	import {Feature, FeatureCollection} from 'geojson';

	class InfomationWindow {
		Position: {lat: number, lng: number} = null;
		Content: string;
		Opened: boolean = false;
		CurrentKey: any = null;
		Options: {
			pixelOffset: {
				width: number,
				height: number
			},
		} = { pixelOffset: {width: 0, height: -35} };
	};

	@Component({})
	export default class Map extends Vue {
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
		self: Map;

		infoWindow: InfomationWindow = {
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

			this.self = this;
			console.log("Constructor");
			this.updateRecentEarthquakes();
		 } // Initialize data here if you cant above

		async mounted() { 
			this.geolocate();


			let $this = this;
			GetEarthQuakes(EQDateSpan.Week, EQSignificance.ALL, async function(response,status) {
				if (status != "success") {
					console.warn("Failed to recieve information from geological API");
					return;
				}

				for (let x=0; x < response.features.length; x++) {
					let eq: Feature = response.features[x];

					let marker = {
						lat: eq.geometry['coordinates'][1],
						lng: eq.geometry['coordinates'][0]
					};

					$this.markers.push({ position: marker, label: eq.properties.mag.toString(), testItem: 22 });
				}
			});
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

			this.infoWindow.Content = "Test";
			this.infoWindow.Position = { lat: 0, lng: 1 }; 
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
		}

		setProperty(prop: string, value: any) {
			this[prop] = value;
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

	.quake-list {
		min-height: 400px;
		max-height: 70vh;
		overflow: auto;
	}
</style>