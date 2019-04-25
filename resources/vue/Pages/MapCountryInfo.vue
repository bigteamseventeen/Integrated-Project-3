<template>
	<div class="container">
		<div style="margin-top: 56px;">
			<div class="row" style="width:100%;">
				<div class="col-lg-4 col-xs-12">
					<div class="card" style="height: 240px">
						<div class="card-body">
							<h4 class="card-title">Earthquake Information</h4>
							<div><p>Earthquake Time: {{getFullDateString(time)}} </p></div>
							<small><timeago :datetime="time" :auto-update="60"></timeago></small>
						</div>
					</div>
				</div>

				<div class="col-lg-4 col-xs-12" v-if="historicWeather != null">
					<div class="card" style="height: 240px">
						<div class="card-body">
							<map-weather-information :weather="historicWeather" :title="strHistoricWeather"></map-weather-information>
						</div>
					</div>
				</div>

				<div class="col-lg-4 col-xs-12" v-if="currentWeather != null">
					<div class="card" style="height: 240px">
						<div class="card-body">
							<map-weather-information :weather="currentWeather" :title="strCurrentWeather"></map-weather-information>
						</div>
					</div>
				</div>
			</div>

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

	@Component({})
	export default class MapCountryInfo extends Vue {
		//
		// ---------- Properties ----------

		//
		// ---------- Data ----------
		strCurrentWeather = "Current Weather";
		strHistoricWeather = "Weather at time of Earthquake";
		currentWeather: WeatherAPIResponse = null;
		historicWeather: WeatherAPIResponse = null;
		selectedEarthquake: Feature = null;

		basicCountry: BasicCountryInformation = null;
		fullCountry: CountryInformation = null;

		//
		// ---------- URL Queries ----------
		lat: number;
		lng: number;
		time: number;

		//
		// ---------- Methods and Computed ----------
		constructor() { super(); } // Initialize data here if you cant above
		mounted() { 

			// Set our parameters
			this.lat = +this.$route.params.lat;
			this.lng = +this.$route.params.lng;
			this.time = +this.$route.params.time;

			// Vars
			let $this = this;
			let coords = {lat: this.lat, lng: this.lng};

			// Load country information
			this.loadCountryInformation(coords);

			// Load weather information
			this.currentWeather = null;
			GetCurrentWeather(coords, (weather, status) => {
				console.log("Current Weather: ", status, weather);
				$this.currentWeather = weather;
			});

			$this.historicWeather = null;
			GetHistoricWeather(coords, new Date(this.time), (weather, status)=>{
				console.log("Historic Weather: ", status, weather);
				$this.historicWeather = weather;
			});


		}

		loadCountryInformation(coords: {lat: number, lng: number}): void {
			let $this = this;
			this.basicCountry = null;
			this.fullCountry = null;

			// Geolocate the information
			GetCountryFromLatLng(coords, (response, status) => {
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
				});
			}, (error, exception) => {
				// Error handling
				alert("Failed to get country for lat lng");
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
	}
</script>