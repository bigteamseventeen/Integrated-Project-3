<template>
	<div class="container">
		<h3>Please select a tutorial page:</h3>

		<div class="row row-flex">
			<div class="col-md-4 col-sm-6 col-xs-12" style="margin-bottom: 15px; min-height: 260px">
				<router-link to="/tutorials/weather" class="p-2 custom-card" style="width: 100%">
					<div class="card" style="min-height: 260px">
						<div class="card-body">
							<h5 class="card-title">How to parse and read information from APIXU for Weather</h5>
							<p class="card-text">
								A tutorial on how to use APIXU for retrieving weather forecast's for locations such as post codes, cities and lat,lng coord's.
							</p>
						</div>
						<div class="card-footer text-muted">
							Author: Marc Waugh
						</div>
					</div>
				</router-link>
			</div>

			<div class="col-md-4 col-sm-6 col-xs-12" style="margin-bottom: 15px; min-height: 260px">
				<router-link to="/tutorials/earthquakes" class="p-2 custom-card" style="width: 100%">
					<div class="card" style="min-height: 260px">
						<div class="card-body">
							<h5 class="card-title">How to retrieve earthquake information and display it on maps</h5>
							<p class="card-text">
								A brief introduction on how the information was gathered from the API, How VueJS helped us render the google map without that much overhead with realtime user input and responsiveness.
							</p>
						</div>
						<div class="card-footer text-muted">
							Author: Callum Carmicheal
						</div>
					</div>
				</router-link>
			</div>

			<div class="col-md-4 col-sm-6 col-xs-12" style="margin-bottom: 15px; min-height: 260px">
				<router-link to="/tutorials/tvseries" class="p-2 custom-card" style="width: 100%">
					<div class="card" style="min-height: 260px">
						<div class="card-body">
							<h5 class="card-title">How to create a TV Series Visualizer using API's</h5>
							<p class="card-text">
								This tutorial will walk you through how we created the TV Series visualization, from its basic features to how we have utilized 
								the API to render a Graph.</p>
						</div>
						<div class="card-footer text-muted">
							Author: Thomas Ferns
						</div>
					</div>
				</router-link>
			</div>

			<div class="col-md-4 col-sm-6 col-xs-12" style="margin-bottom: 15px; min-height: 260px">
				<router-link to="/tutorials/movies" class="p-2 custom-card" style="width: 100%">
					<div class="card" style="min-height: 260px">
						<div class="card-body">
							<h5 class="card-title">How to create a visualization of profits from Movie API data.</h5>
							<p class="card-text">
								A walkthrough on how to use the profits/movie visualization and how it was implemented using the themoviedb's api.
							</p>
						</div>
						<div class="card-footer text-muted">
							Author: Marc Millar
						</div>
					</div>
				</router-link>
			</div>

			<div class="col-md-4 col-sm-6 col-xs-12" style="margin-bottom: 15px; min-height: 260px">
				<router-link to="/tutorials/students" class="p-2 custom-card" style="width: 100%">
					<div class="card" style="min-height: 260px">
						<div class="card-body">
							<h5 class="card-title">How to retrieve student statistics about enrolment from the World Bank API</h5>
							<p class="card-text">
								A brief tutorial on how to retrieve information from the World Bank API about Students and how to display it on a graph.
							</p>
						</div>
						<div class="card-footer text-muted">
							Author: Mark Hamill
						</div>
					</div>
				</router-link>
			</div>
			
			<div class="col-md-4 col-sm-6 col-xs-12" style="margin-bottom: 15px; min-height: 260px">
				<router-link to="/tutorials/air" class="p-2 custom-card" style="width: 100%">
					<div class="card" style="min-height: 260px">
						<div class="card-body">
							<h5 class="card-title">How to create a visualization using the Air Quality API</h5>
							<p class="card-text">
								A brief tutorial on how to use the Air Quality API with Google Maps to create a brief marker of what the airquality is for a set location.
							</p>
						</div>
						<div class="card-footer text-muted">
							Author: Amar Khaliq
						</div>
					</div>
				</router-link>
			</div>

			<div class="col-md-4 col-sm-6 col-xs-12" style="margin-bottom: 15px; min-height: 260px">
				<router-link to="/tutorials/geojson" class="p-2 custom-card" style="width: 100%">
					<div class="card" style="min-height: 260px">
						<div class="card-body">
							<h5 class="card-title">What is the purpose of GeoJSON?</h5>
							<p class="card-text">This covers the basic idea's of GeoJSON and why we are using it in this project.</p>
						</div>
						<div class="card-footer text-muted">
							Author: Mark Waugh
						</div>
					</div>
				</router-link>
			</div>

			<div class="col-md-4 col-sm-6 col-xs-12" style="margin-bottom: 15px; min-height: 260px">
				<router-link to="/tutorials/js" class="p-2 custom-card" style="width: 100%">
					<div class="card" style="min-height: 260px">
						<div class="card-body">
							<h5 class="card-title">JavaScript Techniques used during Development</h5>
							<p class="card-text">
								A discussion about what techniques we used during development to structure the site, the code and how all of the
								project's files come together inside the vue files and the API releated classes.
							</p>
						</div>
						<div class="card-footer text-muted">
							Author: Callum Carmicheal
						</div>
					</div>
				</router-link>
			</div>
		</div>
    </div>
</template>

<script lang="ts">
	import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator';

	@Component({})
	export default class TutorialsListPage extends Vue {
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

<style lang="sass" scoped>
.main-content-area 
    margin: 40px
    max-width: 1200px

a.custom-card,
a.custom-card:hover 
    color: inherit
    text-decoration: inherit
</style>