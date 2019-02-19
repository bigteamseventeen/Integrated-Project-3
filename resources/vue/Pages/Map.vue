<template>
	<div class="container">
		<h1>Google Maps test</h1>

		<div class="container-map">
			<!-- Map -->
			<googlemaps-map ref="map" class="map"
				:center.sync="center"
				:zoom.sync="zoom">

				<!-- User Position -->
				<googlemaps-user-position @update:position="setUserPosition" />

				<!-- Marker -->
				<googlemaps-marker
						title="Glasgow Caledonian University"
						:draggable="true"
						:position="{ lat: 55.866486, lng: -4.250251 }" />

			</googlemaps-map>
		</div>
	</div>
</template>

<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator';

	@Component({})
	export default class extends Vue {
		//
		// ---------- Properties ----------

		//
		// ---------- Data ----------
		center: object = { lat: 55.866486, lng: -4.250251 };
		options: object = {};
		userPosition: any = null;
		zoom: number = 12;

		//
		// ---------- Methods and Computed ----------
		constructor() { super(); } // Initialize data here if you cant above

		async mounted() { } // On Component Load, use instead of constructor!
		beforeUpdated() { } // Before Render

		centerOnUser () {
			if (this.userPosition)
				this.center = this.userPosition
		}

		setUserPosition (position) {
			this.userPosition = position
		}
	};
</script>

<style scoped>
	.container-map {
		height: 400px;
		display: flex;
		flex-direction: column;
	}

	.map {
		height: 100%;
	}
</style>