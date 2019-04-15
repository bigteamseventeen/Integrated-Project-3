<template>
	<div class="document-navbar d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
		<h5 class="my-0 mr-md-auto font-weight-normal">BigTeamSeventeen (Int3)</h5>
		<nav class="my-2 my-md-0 mr-md-3">
			<router-link to="/map" class="p-2 text-dark">Map</router-link>
			<router-link to="/pollution" class="p-2 text-dark">Air Quality</router-link>
			<router-link to="/weather" class="p-2 text-dark">Weather</router-link>
			<router-link to="/student" class="p-2 text-dark">Students</router-link>
			<router-link to="/tvseries" class="p-2 text-dark">TVSeries</router-link>
			<router-link to="/tutorials" class="p-2 text-dark">Tutorials</router-link>
		</nav>
	</div>
</template>

<script lang="ts">
	import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator';

	@Component({})
	export default class extends Vue {
		//
		// ---------- Properties ----------

		//
		// ---------- Data ----------

		//
		// ---------- Methods and Computed ----------
		constructor() {super();}
		mounted() {}
		beforeUpdated() {}
	}
</script>


<style lang="scss" scoped>
	@import "~bootstrap/scss/functions";
	@import "~bootstrap/scss/variables";

	a.exact-active {
		color: $primary !important;
		cursor: pointer;
		text-decoration: none;
	}
</style>