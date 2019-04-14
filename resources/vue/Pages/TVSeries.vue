<template>
	<div class="container">
		<div style="max-height:500px;">
			<div class="row">
				<div class="col-md-8">
					<nav class="navbar navbar-light navbar-expand-md navigation-clean">
						<div class="container"><h3>TV Series Visualizer</h3><button data-toggle="collapse" data-target="#navcol-1" class="navbar-toggler"><span class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
							<div class="collapse navbar-collapse"
								 id="navcol-1">
								<ul class="nav navbar-nav ml-auto">
									<li role="presentation" class="nav-item">
										<a class="nav-link" @click="changeToLine();" href="#">Line</a></li>
									<li role="presentation" class="nav-item">
										<a class="nav-link" @click="changeToScatter();" href="#">Scatter</a></li>
									<li class="dropdown nav-item">
										<a data-toggle="dropdown" class="dropdown-toggle nav-link">Seasons</a>
										<div role="menu" class="dropdown-menu">
											<a role="presentation" class="dropdown-item" href="#">First Item</a>
											<a role="presentation" class="dropdown-item" href="#">Second Item</a>
											<a role="presentation" class="dropdown-item" href="#">Third Item</a></div>
									</li>
								</ul>
							</div>
						</div>
					</nav>
					<div id="main-chart">
					</div>
				</div>

				<div class="col-md-4">
					<div class="input-group mb-3">
						<input name="txtLocation" type="text" class="form-control" placeholder="Enter show..."
							   aria-label="Show query" v-model="query">
						<div class="input-group-append">
							<button class="btn btn-outline-secondary" type="button" @click="loadTVSeriesQuery_Click()">
								Search
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
	import { GetPopular, GetTopRated, GetTVID, GetTVID_Season, QueryTV } from "../../ts/API/TVSeries";
	/// <reference path="TVSeriesModules.ts" />


	import * as SeriesList from "SeriesList";
	import * as TVID from "TVID";
	import * as TVID_Season from "TVID_Season";

	import TVSeriesItem from '../Components/tvseries-item.vue';

	@Component({})
	export default class TVSeries extends Vue {
		popularShows: SeriesList.Result[] = [];
		self: TVSeries;
		sType: string = "line";
		selectedTVSeries: SeriesList.Result["id"] = 1399;

		query: string = "";

		/*
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
					title: "",
					subtitle: "Sales, Expenses, and Profit: 2014-2017",
					height: '500',
					chartArea: {'width' : '100%', 'height' : '80%', 'left' : '20', },
					legend: {'position': 'bottom'}
				}
			};
		}
		*/

		constructor() {
			super();
			this.self = this;
			this.loadShow(1399);
			this.updateShowList();
		 }

		changeToScatter() : void {
			let $this = this;
			$this.sType = "scatter";
			this.loadShow($this.selectedTVSeries);
		}

		changeToLine() : void {
			let $this = this;
			$this.sType = "line";
			this.loadShow($this.selectedTVSeries);
		}

		loadShow(tvid: SeriesList.Result["id"]) {
			let $this = this;
			this.selectedTVSeries = tvid;
			// Data collection
			let showData = [];

			// Get show ID
			//showID = popularShows["results"][shID]["id"];

			// Get title of show
			//title = popularShows["results"][shID]["name"];

			GetTVID(tvid, function(info ,status) {
				if (status != "success") {
					console.warn("Failed to recieve information from TMDB Api");
					return;
				}

				GetTVID_Season(tvid, (info["seasons"].length-1), function(latestSeason ,status) {
					if (status != "success") {
						console.warn("Failed to recieve information from TMDB Api");
						return;
					}

					//title = currentShow["name"]
					let todaysDate = new Date();
					let title = info["name"];
					let seasonCount = info["seasons"].length;
					let hasSpecials = false;
					hasSpecials = info["seasons"][0]["name"] === "Specials";
					let lastEpisodeAirDate = new Date(latestSeason["episodes"][latestSeason["episodes"].length - 1]["air_date"]);
					if (lastEpisodeAirDate > todaysDate) {
						seasonCount--;
					}

					let i = hasSpecials ? 1 : 0;
					let episodeCount = 0;

					for (i; i < seasonCount; i++) {
						GetTVID_Season(tvid, i, function(response ,status) {
							if (status != "success") {
								console.warn("Failed to recieve information from TMDB Api");
								return;
							}
							let seasonIteration = response;
							for (var j = 0; j < seasonIteration["episodes"].length; j++) {
								showData.push([(i - (hasSpecials ? 1 : 0)) + ((0.8 / (seasonIteration["episodes"].length - 1)) * (j))+ 0.6]);
								var v = hasSpecials ? 1 : 0;
								for (v; v < i; v++) {
									showData[episodeCount].push(null);
									showData[episodeCount].push("S" + i + "E" + (j+1) + " Rating: " + seasonIteration["episodes"][j]["vote_average"])
								}
								showData[episodeCount].push(seasonIteration["episodes"][j]["vote_average"]);
								showData[episodeCount].push("S" + i + "E" + (j+1) + " Rating: " + seasonIteration["episodes"][j]["vote_average"])
								for (var x = i + 1; x < seasonCount; x++) {
									showData[episodeCount].push(null);
									showData[episodeCount].push("S" + i + "E" + (j+1) + " Rating: " + seasonIteration["episodes"][j]["vote_average"])
								}
								episodeCount++;
							}
						});
					}
					google.charts.load('current', {
						packages: ['corechart', 'line']
					});
					google.setOnLoadCallback(function() {
						draw(hasSpecials, seasonCount, showData, title);
					});
				});
			});

			// tv/popular?page=1&language=en-US
			// tv/{tv_id}/season/{season_number}&language=en-US

			function draw(hasSpecials, seasonCount, showData, title) {
				let dataTbl = new google.visualization.DataTable();
				dataTbl.addColumn('number', 'Season');
				let trendLines = [];
				let i = hasSpecials ? 1 : 0;
				for (i; i < seasonCount; i++) {
					dataTbl.addColumn('number', 'Season ' + i);
					dataTbl.addColumn({'type': 'string', 'role': 'tooltip' });
				}
				dataTbl.addRows(showData);

				let options = {
					title: title,
					height: 500,
					chartArea: {'width' : '100%', 'height' : '80%', 'left' : '40', },
					legend : {'position': 'bottom'},
					seriesType : $this.sType,
					explorer: {
						actions: ['dragToZoom', 'rightClickToReset'],
						axis: 'horizontal',
						keepInBounds: true,
						maxZoomIn: 7.0
					}
					//series: {8: {type: 'line'}},
				};

				let chart = new google.visualization.ComboChart(document.getElementById('main-chart'));
				chart.draw(dataTbl, options);
			}
		}

		updateShowList() {
			let $this = this;
			GetTopRated(function(response ,status) {
				if (status != "success") {
					console.warn("Failed to recieve information from TMDB Api");
					return;
				}
				$this.popularShows = response.results;
			});
		}

		loadTVSeriesQuery_Click(): void {
			let $this = this;

			QueryTV(this.query, (queryResult: SeriesList.RootObject, s) => {
				this.popularShows = queryResult.results;
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