<template>
	<div class="container">
		<h1>Earth Quakes - Test</h1>

		<div>
			<label>
				<gmap-autocomplete @place_changed="setPlace"></gmap-autocomplete>
				<button class="btn btn-primary" @click="addMarker">Add</button>
			</label>
     		<br/>
    	</div>

		<div class="container-map">
			<!-- Map -->
			<GmapMap :center="center" :zoom="zoom" style="width:100%;  height: 400px;">
				<gmap-info-window :options="infoWindow.Options" :position="infoWindow.Position" 
								  :opened="infoWindow.Opened" @closeclick="infoWindow.Opened=false">
        			{{infoWindow.Content}}
      			</gmap-info-window>

				<GmapCluster>
					<GmapMarker :key="index" v-for="(m, index) in markers"
								:label="m.label"
								:position="m.position"
								:clickable="true" @click="center=m.position;markerClick(index, m)"
					></GmapMarker>
				</GmapCluster>
			</GmapMap>
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
		zoom: number = 2;
      	markers = [];
      	places = [];
		currentPlace = null;

		infoWindow: Object = {
			Position: null,
			Content: null,
			Opened: false,
			CurrentKey: null,
			Options: {
				pixelOffset: {
					width: 0,
					height: -35
				}
			}
		};

		//
		// ---------- Methods and Computed ----------
		constructor() { super(); } // Initialize data here if you cant above

		mounted() { 
			this.geolocate();
		} // On Component Load, use instead of constructor!

		beforeUpdated() { } // Before Render

		// receives a place object via the autocomplete component
		setPlace(place) {
			this.currentPlace = place;
		}

		addMarker() {
			if (this.currentPlace) {
				const marker = {
					lat: this.currentPlace.geometry.location.lat(),
					lng: this.currentPlace.geometry.location.lng()
				};

				this.markers.push({ position: marker, label: "test" });
				this.places.push(this.currentPlace);
				this.center = marker;
				this.currentPlace = null;
			}
		}

		markerClick(index, marker) {
			alert("CLICK!");
			console.log(index, marker);
		}

		geolocate() {
			navigator.geolocation.getCurrentPosition(position => {
				this.center = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};
			});
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