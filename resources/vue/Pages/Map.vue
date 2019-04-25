<template>
	<div class="container">
		<div style="min-height:500px;">
			<div class="row" style="height: auto;">
				<div class="col-md-8 col-sm-12"> 
					<div>
						<h3 style="display: inline-block">Map of Earthquakes</h3>
						<div class="dropdown pull-right" style="float:right;">
							<button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								Map Options
							</button>
							<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
								<div v-for="(value, key, index) in buttonList" :key="index">
									<div class="dropdown-divider" v-if="index > 0"></div>
									<h6 class="dropdown-header">{{key}}</h6>
									
									<a class="dropdown-item" href="#" 
										v-for="(iv, ik, ii) in value" :key="ii" 
										@click="setOptionsActiveItem(key, iv)" :class="{ 'active': mapOptions[key] == iv }">{{ik}}</a>
								</div>
							</div>
						</div>
					</div>
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

		selectedEarthquake: Feature = null;

		buttonList = {
			"Time Span": {
				"Month": EQDateSpan.Month,
				"Week": EQDateSpan.Week,
				"Day": EQDateSpan.Day,
				"Hour": EQDateSpan.Hour
            },
            "Earthquake Significance": {
				"All": EQSignificance.ALL,
				"Significant": EQSignificance.SIGNIFICANT,
				"Mag 1+": EQSignificance.M1_0_PLUS,
				"Mag 2.5+": EQSignificance.M2_5_PLUS,
				"Mag 4.5+": EQSignificance.M4_5_PLUS,
            }
		};

		mapOptions = {
			"Time Span": EQDateSpan.Month,
			"Earthquake Significance": EQSignificance.ALL
		};

		//
		// ---------- Methods and Computed ----------
		constructor() { 
			super();

			this.self = this;
			this.updateRecentEarthquakes();
		 } // Initialize data here if you cant above


		/**
		 * Load the earthquakes and place them into the marketrs array
		 */
		loadEarthquakesSelection() {
			// Set $this so we can use it in the callback
			let $this = this;

			// Reset our markers
			this.markers = [];

			// Get the new list of earthquakes using the options
			GetEarthQuakes(this.mapOptions["Time Span"], this.mapOptions["Earthquake Significance"], async function(response,status) {
				// EQDateSpan.Week, EQSignificance.ALL
				
				// If we failed to load the earthquakes
				if (status != "success") {
					console.warn("Failed to recieve information from geological API");
					return;
				}
				
				// For each earthquake in the response we want to loop it and make a marker for it and store it in the array
				for (let x=0; x < response.features.length; x++) {
					let eq: Feature = response.features[x];

					// The marker just requires the lat and lng.
					let marker = {
						lat: eq.geometry['coordinates'][1],
						lng: eq.geometry['coordinates'][0]
					};

					// Push the new marker into the array
					$this.markers.push({ position: marker, label: eq.properties.mag.toString(), earthquake: eq });
				}
			});
		}

		async mounted() {
			this.geolocate();
			this.loadEarthquakesSelection();
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
			// this.zoom = this.zoom < 12 ? this.zoom : 12;
			this.zoom = 12;
			this.center = {
				lat: earthquake.geometry["coordinates"][1],
				lng: earthquake.geometry["coordinates"][0]
			};

			// Popup url
			let moreInfoUrl = `#/map/${this.center.lat}/${this.center.lng}/${earthquake.properties.time}`;

			this.loadCountryInformation(earthquake);
			this.infoWindow.Position = this.center;
			this.infoWindow.Content = earthquake.properties.title + "<br><small>" 
				+ new Date(earthquake.properties.time) + "</small>" + 
				'<br><a href="javascript:window.open(\'' + moreInfoUrl + '\',\'popup\', \'location,status,scrollbars,resizable,width=1200, height=800\')">View more information</a>';
			this.infoWindow.Opened = true;
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

			// Geolocate the information
			GetCountryFromLatLng({
				lat: earthquake.geometry["coordinates"][1],
				lng: earthquake.geometry["coordinates"][0]
			}, (response, status) => {

				// Country information
				console.log("Basic country information", response, status);

				if (response.status != null && response.status.message == "no country code found") {
					alert("failed to find a country code for the specified location");
					return;
				}

				// Get the advanced country information
				GetCountryInformationFromCode(response.countryCode, (country,s) => {
					console.log("Advanced country info", country);

					$this.infoWindow.Content += "<br>";
					$this.infoWindow.Content += `<b>${country.name}</b>`;

					let wind = `<div style="float:left;"><img src="${country.flag}" width="120"></img></div><div style="margin: 5px; float:right;">` + $this.infoWindow.Content + "</div>";
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

		setOptionsActiveItem(type, data) {
			this.mapOptions[type] = data;

			// Reload the map 
			this.loadEarthquakesSelection();
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