<template>
	<div>
		<div v-if="weather != null">
			<div style="font-weight: bold;">{{title}}</div>
			<div class="row">
				<div class="col-md-2"> <img :src="weather.current.condition.icon" width="64" height="64"> </div>
				<div class="col-md-8">
					<div>Weather time: {{weather.locoation.localtime}}</div>
					<div>Conditions: {{weather.current.condition.text}}</div>
					<div>Temperature: {{weather.current.temp_c}}&deg;C, {{weather.current.temp_f}}&deg;F</div>
				</div>
			</div>
			
			<div>Feels like: {{weather.current.feelslike_c}}&deg;C, {{weather.current.feelslike_f}}&deg;F</div>
			<div>Gusts: {{weather.current.gust_mph}} MPH, {{weather.current.gust_kph}} KPH</div>
			<div>Winds: {{weather.current.wind_dir}} with speeds of {{weather.current.wind_mph}} MPH, {{weather.current.wind_kph}} KPH</div>
		</div>	
		<div v-else>
			<div style="font-weight: bold;">{{title}}</div>
			<p>No weather data found for location.</p>
		</div>
	</div>
</template>

<script lang="ts">
	import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
	import { Feature } from 'geojson';

	import { GetCurrentWeather, WeatherAPIResponse, GetHistoricWeather } from "../../ts/API/Weather";
    import Maps from '../Pages/Map.vue';

	@Component({})
	export default class MapWeatherInformation extends Vue {
		//
		// ---------- Properties ----------
        @Prop() /** Earthquake */
        weather: WeatherAPIResponse; 

        @Prop() 
		map: Maps;
		
		@Prop()
		title: string;

		//
		// ---------- Data ----------

		//
		// ---------- Methods and Computed ----------
		constructor() {
			super();
            // console.log("map-earthquake-item: constructor ", this);
        }

		mounted() {
			
        }

		beforeUpdated() {}
    
        getFullDateString(time: any): string {
            return this.map.getFullDateString(time);
        }

        onClick(): void {
            this.map.loadEarthquakeData(this.eq);
        }
    }
</script>

<style lang="sass" scoped>

</style>
