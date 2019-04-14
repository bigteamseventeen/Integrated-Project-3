<template>
	<div class="container">
		<div class="row">
			<div class ="col-md-12">
				<h1>Monitoring Air Pollution</h1>

				<div class="card">
					<div class="card-body">
						<h4 class="card-title">Load information for location</h4>
						
						<div class="form-group">
						  <label>Latitude</label>
						  <input v-model="Position.lat" type="text" class="form-control" aria-describedby="helpId" placeholder="Lat">
						  <small id="helpIdLat" class="form-text text-muted">Latitude (eg: 24.5321)</small>
						</div>

						<div class="form-group">
						  <label>Longitude</label>
						  <input v-model="Position.lng" type="text" class="form-control" aria-describedby="helpIdLng" placeholder="Lng">
						  <small id="helpIdLng" class="form-text text-muted">Longitude (eg: 24.5321)</small>
						</div>
					</div>
				</div>
				<br />
				<div class="form">
					<p> Selected location: {{Position.lat}},{{Position.lng}} </p>


				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
	// import { } from '../../ts/API/Airquality';


	@Component({})
	export default class AirQuality extends Vue {
		name: 'container'
		//
		// ---------- Properties ----------

		//
		// ---------- Data ----------
		/** Stores the user position (from the form input) */
		Position: {lat: number, lng: number} = {lat: 0, lng: 0};

		//
		// ---------- Methods and Computed ----------
		constructor() { 
			super();
		} // Initialize data here if you cant above


		mounted() { 
			// You put your starting code in here

			// What ever uses Position will be automatically updated with itm
			// show me the current code you have 

		} // On Component Load, use instead of constructor!

		beforeUpdated() { } // Before Render
	}
</script>