<template>
	<div class="container">
		<h3>Please select a tutorial page:</h3>

		<div><router-link to="/tutorials/weather" class="p-2">How to parse and read information from APIXU for Weather</router-link></div>
		<div><router-link to="/tutorials/earthquakes" class="p-2">How to retrieve earthquake information and display it on maps</router-link></div>
		<div><router-link to="/tutorials/tvseries" class="p-2">How to create a TV Series Visualizer using API's</router-link></div>
		<div><router-link to="/tutorials/movies" class="p-2">How to create a visualization of profits from Movie API data.</router-link></div>
		<div><router-link to="/tutorials/students" class="p-2">Students Tutorial</router-link></div>

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
</style>