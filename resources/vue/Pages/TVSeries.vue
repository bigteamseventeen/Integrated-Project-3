<template>
	<div class="container">
		<div style="max-height:500px;">
			<div class="row">
				<div class="col-md-8">
					<h3>TV Series Visualizer</h3>
					<div>
						<GChart
						type="LineChart"
						:data="chartData"
						:options="chartOptions"
						@ready="onChartReady"
						/>
					</div>
				</div>

				<div class="col-md-4">
					<div class="input-group mb-3">
						<input name="txtLocation" type="text" class="form-control" placeholder="Enter show..."
							   aria-label="Show query" v-model="query">
						<div class="input-group-append">
							<button class="btn btn-outline-secondary" type="button" @click="loadShowInformation_Click()">
								Load Show
							</button>
						</div>
					</div>

					<div class="list-group" style="height: 500px; overflow: auto">
						<tvseries-item v-for="(item,index) in popularShows"
											 :key="index" :tvS="item" :tvSeries="self"></tvseries-item>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { Component, Vue, Watch } from 'vue-property-decorator';
	import { GetPopular, GetTopRated, GetTVID, GetTVID_Season } from "../../ts/API/TVSeries";
	/// <reference path="TVSeriesModules.ts" />
	import * as SeriesList from "SeriesList";
	import * as TVID from "TVID";
	import * as TVID_Season from "TVID_Season";

	import TVSeriesItem from '../Components/tvseries-item.vue';

	@Component({})
	export default class TVSeries extends Vue {
		popularShows: SeriesList.Result[] = [];
		self: TVSeries;
		selectedTVSeries: SeriesList.Result = null;
		query: string = "";

		data() {
			return {
				// Array will be automatically processed with visualization.arrayToDataTable function
				chartData: [
					["Season", "1", "2", "3"],
					[{v: "1", f: "1"}, 6.5, 7, 9],
					["2", 3.5, 4, 3],
					["3", 9, 7, 8],
					["4", 5, 5, 6]
				],
				chartOptions: {
					title: "Company Performance",
					subtitle: "Sales, Expenses, and Profit: 2014-2017",
					height: '500',
					chartArea: {'width' : '100%', 'height' : '80%', 'left' : '20', },
					legend: {'position': 'bottom'}
				}
			};
		}


		constructor() {
			super();
			this.self = this;
			this.updateShowList();
			this.data();
			console.log("here");
			console.log(this.data());
		 }

		async mounted() {
			/*
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
			*/
		} // On Component Load, use instead of constructor!

		loadShowInformation_Click(): void {
			let $this = this;


		}

		loadShow(tvid: SeriesList.Result) {
			let $this = this;

			this.selectedTVSeries = tvid;
		}

		updateShowList() {
			let $this = this;
			GetPopular(function(response ,status) {
				if (status != "success") {
					console.warn("Failed to recieve information from TMDB Api");
					return;
				}
				$this.popularShows = response.results;
			});
		}

		/*
		loadEarthquakeData(earthquake: Feature){
			let $this = this;

			this.selectedEarthquake = earthquake;
			this.zoom = 12;
			this.center = {
				lat: earthquake.geometry["coordinates"][1],
				lng: earthquake.geometry["coordinates"][0]
			};

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
		*/
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