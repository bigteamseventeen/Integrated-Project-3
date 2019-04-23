<template>
	<div class="container" style="min-height: 960px">
		<div style="min-height: 560px;">
			<div class="row" style="height: auto">
				<div class="col-md-8 col-sm-12">
					<nav class="navbar navbar-expand-md navigation-clean">
						<div class="container"><h3>TV Series Visualizer</h3><button data-toggle="collapse" data-target="#navcol-1" class="navbar-toggler"><span class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
							<div class="collapse navbar-collapse"
								 id="navcol-1">
								<ul class="nav navbar-nav ml-auto">
									<li role="presentation" class="nav-item">
										<router-link to="/tutorials/tvseries" class="nav-link">Tutorial</router-link></li>
									<li role="presentation" class="nav-item">
										<a class="nav-link" @click="changeToLine();" href="#">Line</a></li>
									<li role="presentation" class="nav-item">
										<a class="nav-link" @click="changeToScatter();" href="#">Scatter</a></li>
									<!--<li class="dropdown nav-item">
										<a data-toggle="dropdown" class="dropdown-toggle nav-link">Seasons</a>
										<div role="menu" class="dropdown-menu">
											<a role="presentation" class="dropdown-item" href="#">First Item</a>
											<a role="presentation" class="dropdown-item" href="#">Second Item</a>
											<a role="presentation" class="dropdown-item" href="#">Third Item</a></div>
									</li>-->
								</ul>
							</div>
						</div>
					</nav>
					<div id="main-chart">
					</div>
				</div>

				<div class="col-md-4 col-sm-12">
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
		<div style="min-height: 500px">
			<div class="row" style="height: auto" >
				<div class="col-md-7 col-sm-12">
					<nav class="navbar navbar-light navbar-expand-md navigation-clean">
						<div class="container">
							<h4>Episode Details</h4>
						</div>
					</nav>
					<div class="d-block" style="max-height: 370px; overflow: auto">
						<tvseries-show :tvS_E="tvSeriesObject" :tvSeries="self"></tvseries-show>
					</div>
				</div>
				<div class="col-md-5 col-sm-12">
					<nav class="navbar navbar-light navbar-expand-md navigation-clean">
						<div class="container">
							<h4>Episode List</h4>
						</div>
					</nav>
					<div class="list-group" style="max-height: 350px; overflow: auto">
						<tvseries-episode v-for="(item,index) in episodeList"
										  :key="index" :tvS="item" :tvSeries="self">
						</tvseries-episode>
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
	import TvseriesEpisode from "../Components/tvseries-episode.vue";
	import TvseriesShow from "../Components/tvseries-show.vue";

	@Component({
		components: {TvseriesShow, TvseriesEpisode, TVSeriesItem}
	})

	export default class TVSeries extends Vue {
		popularShows: SeriesList.Result[] = [];
		self: TVSeries;
		sType: string = "line";
		selectedTVSeries: SeriesList.Result["id"] = 1399;
		tvSeriesObject: TVID.RootObject = {"backdrop_path":"/qsD5OHqW7DSnaQ2afwz8Ptht1Xb.jpg","created_by":[{"id":9813,"credit_id":"5256c8c219c2956ff604858a","name":"David Benioff","gender":2,"profile_path":"/8CuuNIKMzMUL1NKOPv9AqEwM7og.jpg"},{"id":228068,"credit_id":"552e611e9251413fea000901","name":"D. B. Weiss","gender":2,"profile_path":"/caUAtilEe06OwOjoQY3B7BgpARi.jpg"}],"episode_run_time":[60],"first_air_date":"2011-04-17","genres":[{"id":10765,"name":"Sci-Fi & Fantasy"},{"id":18,"name":"Drama"},{"id":10759,"name":"Action & Adventure"}],"homepage":"http://www.hbo.com/game-of-thrones","id":1399,"in_production":true,"languages":["es","en","de"],"last_air_date":"2019-04-14","last_episode_to_air":{"air_date":"2019-04-14","episode_number":1,"id":1551825,"name":"Winterfell","overview":"Arriving at Winterfell, Jon and Daenerys struggle to unite a divided North.","production_code":"","season_number":8,"show_id":1399,"still_path":"/aeLFDgp0J9140lS4nWUgZZRK6Rp.jpg","vote_average":7.5,"vote_count":5},"name":"Game of Thrones","next_episode_to_air":{"air_date":"2019-04-21","episode_number":2,"id":1551826,"name":"Episode 2","overview":"The battle at Winterfell is approaching. Jaime is confronted with the consequences of the past. A tense interaction between Sansa and Daenerys follows.","production_code":"","season_number":8,"show_id":1399,"still_path":"/2Tj1Mcl3NQOj0LBnOpNHpBWuZHU.jpg","vote_average":0,"vote_count":0},"networks":[{"name":"HBO","id":49,"logo_path":"/tuomPhY2UtuPTqqFnKMVHvSb724.png","origin_country":"US"}],"number_of_episodes":73,"number_of_seasons":8,"origin_country":["US"],"original_language":"en","original_name":"Game of Thrones","overview":"Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.","popularity":740.215,"poster_path":"/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg","production_companies":[{"id":76043,"logo_path":"/9RO2vbQ67otPrBLXCaC8UMp3Qat.png","name":"Revolution Sun Studios","origin_country":"US"},{"id":3268,"logo_path":"/tuomPhY2UtuPTqqFnKMVHvSb724.png","name":"HBO","origin_country":"US"},{"id":12525,"logo_path":null,"name":"Television 360","origin_country":""},{"id":5820,"logo_path":null,"name":"Generator Entertainment","origin_country":""},{"id":12526,"logo_path":null,"name":"Bighead Littlehead","origin_country":""}],"seasons":[{"air_date":"2010-12-05","episode_count":16,"id":3627,"name":"Specials","overview":"","poster_path":"/kMTcwNRfFKCZ0O2OaBZS0nZ2AIe.jpg","season_number":0},{"air_date":"2011-04-17","episode_count":10,"id":3624,"name":"Season 1","overview":"Trouble is brewing in the Seven Kingdoms of Westeros. For the driven inhabitants of this visionary world, control of Westeros' Iron Throne holds the lure of great power. But in a land where the seasons can last a lifetime, winter is coming...and beyond the Great Wall that protects them, an ancient evil has returned. In Season One, the story centers on three primary areas: the Stark and the Lannister families, whose designs on controlling the throne threaten a tenuous peace; the dragon princess Daenerys, heir to the former dynasty, who waits just over the Narrow Sea with her malevolent brother Viserys; and the Great Wall--a massive barrier of ice where a forgotten danger is stirring.","poster_path":"/zwaj4egrhnXOBIit1tyb4Sbt3KP.jpg","season_number":1},{"air_date":"2012-04-01","episode_count":10,"id":3625,"name":"Season 2","overview":"The cold winds of winter are rising in Westeros...war is coming...and five kings continue their savage quest for control of the all-powerful Iron Throne. With winter fast approaching, the coveted Iron Throne is occupied by the cruel Joffrey, counseled by his conniving mother Cersei and uncle Tyrion. But the Lannister hold on the Throne is under assault on many fronts. Meanwhile, a new leader is rising among the wildings outside the Great Wall, adding new perils for Jon Snow and the order of the Night's Watch.","poster_path":"/9xfNkPwDOqyeUvfNhs1XlWA0esP.jpg","season_number":2},{"air_date":"2013-03-31","episode_count":10,"id":3626,"name":"Season 3","overview":"Duplicity and treachery...nobility and honor...conquest and triumph...and, of course, dragons. In Season 3, family and loyalty are the overarching themes as many critical storylines from the first two seasons come to a brutal head. Meanwhile, the Lannisters maintain their hold on King's Landing, though stirrings in the North threaten to alter the balance of power; Robb Stark, King of the North, faces a major calamity as he tries to build on his victories; a massive army of wildlings led by Mance Rayder march for the Wall; and Daenerys Targaryen--reunited with her dragons--attempts to raise an army in her quest for the Iron Throne.","poster_path":"/7d3vRgbmnrRQ39Qmzd66bQyY7Is.jpg","season_number":3},{"air_date":"2014-04-06","episode_count":10,"id":3628,"name":"Season 4","overview":"The War of the Five Kings is drawing to a close, but new intrigues and plots are in motion, and the surviving factions must contend with enemies not only outside their ranks, but within.","poster_path":"/jXIMScXE4J4EVHUba1JgxZnWbo4.jpg","season_number":4},{"air_date":"2015-04-12","episode_count":10,"id":62090,"name":"Season 5","overview":"The War of the Five Kings, once thought to be drawing to a close, is instead entering a new and more chaotic phase. Westeros is on the brink of collapse, and many are seizing what they can while the realm implodes, like a corpse making a feast for crows.","poster_path":"/7Q1Hy1AHxAzA2lsmzEMBvuWTX0x.jpg","season_number":5},{"air_date":"2016-04-24","episode_count":10,"id":71881,"name":"Season 6","overview":"Following the shocking developments at the conclusion of season five, survivors from all parts of Westeros and Essos regroup to press forward, inexorably, towards their uncertain individual fates. Familiar faces will forge new alliances to bolster their strategic chances at survival, while new characters will emerge to challenge the balance of power in the east, west, north and south.","poster_path":"/p1udLh0gfqyZFmXBGa393gk8go5.jpg","season_number":6},{"air_date":"2017-07-15","episode_count":7,"id":81266,"name":"Season 7","overview":"The long winter is here. And with it comes a convergence of armies and attitudes that have been brewing for years.","poster_path":"/oX51n32QyHeFP5kErksemJsJljL.jpg","season_number":7},{"air_date":"2019-04-14","episode_count":6,"id":107971,"name":"Season 8","overview":"The Great War has come, the Wall has fallen and the Night King's army of the dead marches towards Westeros. The end is here, but who will take the Iron Throne?","poster_path":"/3OcQhbrecf4F4pYss2gSirTGPvD.jpg","season_number":8}],"status":"Returning Series","type":"Scripted","vote_average":8.2,"vote_count":5547};
		episodeList: TVID_Season.Episode[] = [];
		query: string = "";

		constructor() {
			super();
			this.self = this;
		}

		created() : void {
			window.addEventListener('resize', this.myEventHandler)
			this.myEventHandler();
		}

		destroyed() {
			window.removeEventListener('resize', this.myEventHandler)
		}

		async mounted() {
			this.loadShow(1399);
			this.updateShowList();
		}

		myEventHandler() : void {
			let $this = this;
			this.loadShow($this.selectedTVSeries);
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
			$this.episodeList = [];
			let showData = [];


			GetTVID(tvid, function(info ,status) {
				if (status != "success") {
					console.warn("Failed to recieve information from TMDB Api");
					alert("Failed to recieve information from TMDB Api, TVID");
					return;
				}

				$this.tvSeriesObject = info;

				GetTVID_Season(tvid, (info["seasons"].length-1), function(latestSeason ,status) {
					if (status != "success") {
						console.warn("Failed to recieve information from TMDB Api");
						alert("Failed to recieve information from TMDB Api, TVID_Season")
						return;
					}

					let todaysDate = new Date();
					let title = info["name"];
					let seasonCount = info["seasons"].length
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
								alert("Failed to recieve information from TMDB Api, TVID_Season");
								return;
							}
							let seasonIteration = response;
							for (var j = 0; j < seasonIteration["episodes"].length; j++) {
								$this.episodeList.push(seasonIteration["episodes"][j]);
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
					legend: {'position': 'bottom' as 'bottom'},
					seriesType: $this.sType,
					explorer: {
						actions: ['dragToZoom', 'rightClickToReset'],
						axis: 'horizontal',
						keepInBounds: true,
						maxZoomIn: 7.0
					} as google.visualization.ComboChartOptions
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
					alert("Failed to recieve information from TMDB Api, Top Rated");
					return;
				}
				$this.popularShows = response.results;
			});
		}

		loadTVSeriesQuery_Click(): void {
			QueryTV(this.query, (queryResult: SeriesList.RootObject, s) => {
				this.popularShows = queryResult.results;
				if (s != "success") {
					console.warn("Failed to recieve information from TMDB Api");
					alert("Failed to recieve information from TMDB Api, Query");
					return;
				}
			});
		}
	};
</script>

<style scoped>
	.container {
		max-height: 500px;
	}
</style>