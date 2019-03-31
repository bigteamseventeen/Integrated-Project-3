<template>
	<a class="earthquake list-group-item list-group-item-action flex-column align-items-start" @click="onClick">
        <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{eq.properties.title}}</h5>
            <small><timeago :datetime="eq.properties.time" :auto-update="60"></timeago></small>
        </div>
        <p class="mb-1">{{eq.properties.place}}</p>
        <small>{{getFullDateString()}}</small>
    </a>
</template>

<script lang="ts">
	import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
    import { Feature } from 'geojson';
    import Maps from '../Pages/Map.vue';

	@Component({})
	export default class MapEarthquakeItem extends Vue {
		//
		// ---------- Properties ----------
        @Prop() /** Earthquake */
        eq: Feature; 

        @Prop()
        map: Maps;

		//
		// ---------- Data ----------
        date: Date;

		//
		// ---------- Methods and Computed ----------
		constructor() {
            super();
            console.log("map-earthquake-item: constructor ", this);
        }

		mounted() {
            console.log("map-earthquake-item: mounted ", this);
            this.date = new Date(this.eq.properties.time);
        }

		beforeUpdated() {}
    
        getFullDateString(): string {
            let date = new Date(this.eq.properties.time);

            return date.toLocaleTimeString() + ", " + 
                ([ "Sunday", "Monday", "Tuesday", 
                    "Wednesday", "Thursday", "Friday", 
                    "Saturday" ])[date.getDay()] + 
                " " + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
        }

        onClick(): void {
            this.map.setProperty('zoom', 12);
            this.map.setProperty('center', {
                lat: this.eq.geometry['coordinates'][1],
                lng: this.eq.geometry['coordinates'][0]
            });
        }
    }
</script>

<style lang="sass" scoped>

.earthquake
    cursor: pointer

</style>
