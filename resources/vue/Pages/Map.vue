<template>
	<div class="container">
		<div style="min-height:500px;">
			<div class="row" style="height: auto;">
				<div class="col-md-8 col-sm-12"> 
					<h3>Map of Earthquakes</h3>
					<div>
						<!-- Map -->
						<GmapMap :center="center" :zoom="zoom" style="height:500px;">
							<gmap-info-window :options="infoWindow.Options" :position="infoWindow.Position" 
											  :opened="infoWindow.Opened"   @closeclick="infoWindow.Opened=false">
								<div v-html="infoWindow.Content"> </div>
							</gmap-info-window>
	
							<GmapCluster>
								<GmapMarker :key="index" v-for="(m, index) in markers"
									:label="m.label"
									:position="m.position"
									:clickable="true" @click="markerClick(index, m)"
								></GmapMarker>
							</GmapCluster>
						</GmapMap>
					</div>
	
					<!-- Debugging -->
					<div style="display:none;">
						<label>
							<gmap-autocomplete @place_changed="setPlace"></gmap-autocomplete>
							<button class="btn btn-primary" @click="addMarker">Add</button>
						</label>
						<br/>
					</div>		
				</div>
				
				<div class="col-md-4 col-sm-12">
					<h3>Recent Earthquakes</h3>
					
					<div class="list-group" style="max-height: 500px; overflow: auto">
						<map-earthquake-item v-for="(item,index) in recentEarthquakes"
							:key="index" :eq="item" :map="self"></map-earthquake-item>
					</div> 
				</div>
			</div>
		</div>

		<div v-if="selectedEarthquake != null" style="margin-top: 56px;">
			<h4 style="margin-bottom:20px; width:100%">
				{{selectedEarthquake.properties.title}}
				<div class="float-right">
					<a :href="selectedEarthquake.properties.url">
						<button class="btn btn-outline-warn">
							View more information at USGS.gov
						</button>
					</a>

					<button class="btn btn-outline-primary" @click="selectedEarthquake = null;">
						<i class="fa fa-remove" aria-hidden="true"></i>
						Clear Active Selection
					</button>
				</div>
			</h4>

			<div class="row" style="width:100%;">
				<div class="col-lg-4 col-xs-12">
					<div class="card" style="height: 240px">
						<div class="card-body">
							<h4 class="card-title">Earthquake Information</h4>
							<div><p>Earthquake Time: {{getFullDateString(selectedEarthquake.properties.time)}} </p></div>
							<small><timeago :datetime="selectedEarthquake.properties.time" :auto-update="60"></timeago></small>
						</div>
					</div>
				</div>

				<div class="col-lg-4 col-xs-12">
					<div class="card" style="height: 240px">
						<div class="card-body">
							<map-weather-information :weather="historicWeather" :title="strHistoricWeather" :map="self"></map-weather-information>
						</div>
					</div>
				</div>

				<div class="col-lg-4 col-xs-12">
					<div class="card" style="height: 240px">
						<div class="card-body">
							<map-weather-information :weather="currentWeather" :title="strCurrentWeather" :map="self"></map-weather-information>
						</div>
					</div>
				</div>
			</div>
			
			<a :href="selectedEarthquake.properties.url">View more details at USGS.gov</a>
		</div>

		<div v-if="selectedEarthquake != null">
			<div v-if="basicCountry != null && fullCountry != null" style="margin-top: 20px;">
				<map-country-information :country="fullCountry" :basic="basicCountry"></map-country-information>
			</div>
			<div v-else>
				<b style="padding-bottom: 50px;">We failed to load the information required to show country statistics</b>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { Component, Vue, Watch } from 'vue-property-decorator';
	import { Feature, FeatureCollection } from 'geojson';

	import { GetEarthQuakes, EQDateSpan, EQSignificance } from '../../ts/API/EarthQuakes';
	import { GetCurrentWeather, WeatherAPIResponse, GetHistoricWeather } from "../../ts/API/Weather";
	import { GetCountryFromLatLng, GetCountryInformationFromCode, CountryInformation, BasicCountryInformation } from "../../ts/API/Geonames";

	import MapEarthquakeItem from '../Components/map-earthquake-item.vue';

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
		center: { lat: number; lng: number } = { lat: 55.866486, lng: -4.250251 };
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

		strCurrentWeather = "Current Weather";
		strHistoricWeather = "Weather at time of Earthquake";
		currentWeather: WeatherAPIResponse = null;
		historicWeather: WeatherAPIResponse = null;
		selectedEarthquake: Feature = null;

		basicCountry: BasicCountryInformation = null;
		fullCountry: CountryInformation = null;

		//
		// ---------- Methods and Computed ----------
		constructor() { 
			super();

			this.self = this;
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

					$this.markers.push({ position: marker, label: eq.properties.mag.toString(), earthquake: eq });
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
			this.loadEarthquakeData(marker.earthquake);
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


		loadEarthquakeData(earthquake: Feature){
			let $this = this;

			this.selectedEarthquake = earthquake;
			this.zoom = 12;
			this.center = {
				lat: earthquake.geometry["coordinates"][1],
				lng: earthquake.geometry["coordinates"][0]
			};

			this.loadCountryInformation(earthquake);
			this.infoWindow.Position = this.center;
			this.infoWindow.Content = earthquake.properties.title + "<br><small>" 
				+ new Date(earthquake.properties.time) + "</small>";
			this.infoWindow.Opened = true;

			this.currentWeather = null;
			GetCurrentWeather(this.center, (weather, status) => {
				console.log("Current Weather: ", status, weather);
				$this.currentWeather = weather;
			});

			$this.historicWeather = null;
			GetHistoricWeather(this.center, new Date(earthquake.properties.time), (weather, status)=>{
				console.log("Historic Weather: ", status, weather);
				$this.historicWeather = weather;
			});
		}

		getFullDateString(time: any): string {
			let date = new Date(time);

			return date.toLocaleTimeString() + ", " + 
				([	"Sunday", "Monday", "Tuesday", 
					"Wednesday", "Thursday", "Friday", 
					"Saturday" ])[date.getDay()] + 
				" " + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
		}

		loadCountryInformation(earthquake: Feature): void {
			let $this = this;
			this.basicCountry = null;
			this.fullCountry = null;

			// Geolocate the information
			GetCountryFromLatLng({
				lat: earthquake.geometry["coordinates"][1],
				lng: earthquake.geometry["coordinates"][0]
			}, (response, status) => {
				$this.basicCountry = response;

				// Country information
				console.log("Basic country information", response, status);

				if (response.status != null && response.status.message == "no country code found") {
					alert("failed to find a country code for the specified location");
					return;
				}

				// Get the advanced country information
				GetCountryInformationFromCode(response.countryCode, (country,s) => {
					$this.fullCountry = country;

					console.log("Advanced country info", country);

					$this.infoWindow.Content += "<br>";
					$this.infoWindow.Content += `<b>${country.name}</b>`;

					let wind = `<div style="float:left;"><img src="${country.flag}" width="100"></img></div><div style="margin: 5px; float:right;">` + $this.infoWindow.Content + "</div>";
					$this.infoWindow.Content = wind;
				}, (er,ex) => {
					alert("Failed to load advanced country information for country code: " + response.countryCode);
					console.error(ex);
				});
			}, (error, exception) => {
				// Error handling
				alert("Failed to get country for lat lng");
			});
		}
	};
</script>

<style scoped>
	.container-map {
		/* min-height: 400px;
		max-height: 70vh;
		display: flex;
		flex-direction: column; */
		max-height: 500px;
	}

	.quake-list {
		/* min-height: 400px;
		max-height: 70vh; */
		overflow: auto;
	}
</style>

<!-- 
JS FEATURE STRUCTURE
{
  "type": "Feature",
  "properties": {
	"mag": 1.27,
	"place": "10km ESE of Anza, CA",
	"time": 1552912986020,
	"updated": 1552913631400,
	"tz": -480,
	"url": "https://earthquake.usgs.gov/earthquakes/eventpage/ci38274015",
	"detail": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/ci38274015.geojson",
	"felt": null,
	"cdi": null,
	"mmi": null,
	"alert": null,
	"status": "automatic",
	"tsunami": 0,
	"sig": 25,
	"net": "ci",
	"code": "38274015",
	"ids": ",ci38274015,",
	"sources": ",ci,",
	"types": ",focal-mechanism,geoserve,nearby-cities,origin,phase-data,",
	"nst": 52,
	"dmin": 0.04138,
	"rms": 0.17,
	"gap": 49,
	"magType": "ml",
	"type": "earthquake",
	"title": "M 1.3 - 10km ESE of Anza, CA"
  },
  "geometry": {
	"type": "Point",
	"coordinates": [
	  -116.5658333,
	  33.528,
	  1.67
	]
  },
  "id": "ci38274015"
}
-->