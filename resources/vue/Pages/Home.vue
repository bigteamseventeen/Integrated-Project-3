<template>
	<div class="container">
		<div style="height: 20px;"></div>
		<div class="card">
			<div class="row no-gutters" style="margin-bottom: 20px;">
				<div class="col">
					<div class="card-block px-2">
						<h4 class="card-title" style="margin-top: 10px;">
							Earthquake
						</h4>
						<p class="card-text">
							This page will show a list of earthquakes which is interfaced by google maps .it will be represented by blue - means that thier are very little eartyhquakes in that area, yellow - thier is a modeerate amount and green- thier is a high amount of earth quakes.This will also display a list of recent earthquakes which have happened in real time via a slider at the right of the map.This will aslso show the magnitude of the earth quake which will be displayed as a point value such as 1.2 etc.
						</p>
					</div>
				</div>
			</div>
			<div class="card-footer w-100 text-muted">
				<router-link to="/map" class="p-2 btn btn-primary">Visit Page</router-link>
			</div>
		</div>

		<div style="height: 20px;"></div>
		<div class="card">
			<div class="row no-gutters" style="margin-bottom: 20px;">
				<div class="col">
					<div class="card-block px-2">
						<h4 class="card-title" style="margin-top: 10px;">
							Air Quality
						</h4>
						<p class="card-text">
							This page will show air quailty of areas on google map which the user can navigate via the search section at the top of the page.The user will have to enter both the latitude and longitude if they wish to see the air quaility for ceratain parts of the world.This is colour coded by green meaning good, yellow meaning moderate, orange meaning unhealthy for sensitive groups, red meaning unhealthy, light purple meaning very unhealthy and purple meaning hazardous
						</p>
					</div>
				</div>
			</div>
			<div class="card-footer w-100 text-muted">
				<router-link to="/pollution" class="p-2 btn btn-primary">Visit Page</router-link>
			</div>
		</div>

		<div style="height: 20px;"></div>
		<div class="card">
			<div class="row no-gutters" style="margin-bottom: 20px;">
				<div class="col">
					<div class="card-block px-2">
						<h4 class="card-title" style="margin-top: 10px;">
							Weather
						</h4>
						<p class="card-text">
							This page will allow users to view weather information about various locations such as Glasgow.Once the user enters the location they want to see the weather about it will display what the forecast is for up to a total of 10 days, this various from area to area.It will show information such as the local time, conditions which can be moderate, light rain etc, temprature and winds which will be repreesented in miles per hour
						</p>
					</div>
				</div>
			</div>
			<div class="card-footer w-100 text-muted">
				<router-link to="/weather" class="p-2 btn btn-primary">Visit Page</router-link>
			</div>
		</div>

		<div style="height: 20px;"></div>
		<div class="card">
			<div class="row no-gutters" style="margin-bottom: 20px;">
				<div class="col">
					<div class="card-block px-2">
						<h4 class="card-title" style="margin-top: 10px;">
							Students
						</h4>
						<p class="card-text">
							This page will will display student ststistics in particular it will show the percentage of students that are enrolled within courses for example how many students have enrolled in computing.Thgis will be represented via a bar chart which when hovered over will show a percentage of students enrolled on that specific year, the statistics will show course enrolment from 2009 to 2015.
						</p>
					</div>
				</div>
			</div>
			<div class="card-footer w-100 text-muted">
				<router-link to="/student" class="p-2 btn btn-primary">Visit Page</router-link>
			</div>
		</div>

		<div style="height: 20px;"></div>
		<div class="card">
			<div class="row no-gutters" style="margin-bottom: 20px;">
				<div class="col">
					<div class="card-block px-2">
						<h4 class="card-title" style="margin-top: 10px;">
							TV Series
						</h4>
						<p class="card-text">
							This page will display tv series that the user can can interact with.when the user clicks on one of the shows they wish to view which can be done via the scroll down box or by entering the name of the series into the search bar located directly above it.The information that will be displayed is as follows: the title of the show selected, how many seqasons/episodes have aired,along withn a time stamp of when the first and last aired date was and it will have a brief overview of what the show is about.The ratings of each episode within a season will be displayed on a scatter graph
						</p>
					</div>
				</div>
			</div>
			<div class="card-footer w-100 text-muted">
				<router-link to="/tvseries" class="p-2 btn btn-primary">Visit Page</router-link>
			</div>
		</div>


		<div style="height: 20px;"></div>
		<div class="card">
			<div class="row no-gutters" style="margin-bottom: 20px;">
				<div class="col">
					<div class="card-block px-2">
						<h4 class="card-title" style="margin-top: 10px;">
							Movies
						</h4>
						<p class="card-text">
							This page is the movie camparison page.It will allow the user to enter a fillm name as well as the year of its release in a text field.This year will then be used to cpompare the top 3 films that was out in that year.The user will then hover over the bars in the graph which will display more indeph information about the movies selected.It will also display this inmformation below which will show the poster, title, description and the average rating of the film.They will also be allowed to change the graph byu clicking the view budgets and revenue checkbox which will adapt the bar graph aboth to show the apprpriate information.
						</p>
					</div>
				</div>
			</div>
			<div class="card-footer w-100 text-muted">
				<router-link to="/movies" class="p-2 btn btn-primary">Visit Page</router-link>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator';

	@Component({})
	export default class Home extends Vue {
		//
		// ---------- Properties ----------
		
		//
		// ---------- Data ----------

		//
		// ---------- Methods and Computed ----------
		constructor() { super(); } // Initialize data here if you cant above
		mounted() { } // On Component Load, use instead of constructor!
		beforeUpdated() { } // Before Render
	}
</script>

<style scoped>
	.jumbotron {
		padding-top: 3rem;
		padding-bottom: 3rem;
		margin-bottom: 0;
		background-color: #fff;
	}
	@media (min-width: 768px) {
		.jumbotron {
			padding-top: 6rem;
			padding-bottom: 6rem;
		}
	}

	.jumbotron p:last-child {
		margin-bottom: 0;
	}

	.jumbotron-heading {
		font-weight: 300;
	}

	.jumbotron .container {
		max-width: 40rem;
	}
</style>