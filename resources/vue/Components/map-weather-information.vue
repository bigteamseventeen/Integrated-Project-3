<template>
	<div>
		<div v-if="weather != null">
			<div style="font-weight: bold;">{{title}}</div>
			
			<img :src="'https://' + weather.current.condition.icon" align="left" width="64" height="64">
			<div v-if="weather.current.time != null">Weather time: {{weather.current.time}}</div>
			<div v-else>Local time: {{weather.location.localtime}}</div>

			<div>Conditions: {{weather.current.condition.text}}</div>
			<div>Temperature: {{weather.current.temp_c}}&deg;C, {{weather.current.temp_f}}&deg;F</div>
	
			<div v-if="weather.current.feelslike_c != null">Feels like: {{weather.current.feelslike_c}}&deg;C, {{weather.current.feelslike_f}}&deg;F</div>
			<div v-if="weather.current.gust_mph != null">Gusts: {{weather.current.gust_mph}} MPH, {{weather.current.gust_kph}} KPH</div>
			<div>Winds: <span v-if="weather.current.wind_dir != null">{{weather.current.wind_dir}} with speeds of </span> {{weather.current.wind_mph}} MPH, {{weather.current.wind_kph}} KPH</div>
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
		title: string;

		//
		// ---------- Data ----------

		//
		// ---------- Methods and Computed ----------
		constructor() {
			super();
            // console.log("map-earthquake-item: constructor ", this);
        }

		mounted() { }
		beforeUpdated() {}
    
        getFullDateString(time: any): string {
            let date = new Date(time);

			return date.toLocaleTimeString() + ", " + 
				([	"Sunday", "Monday", "Tuesday", 
					"Wednesday", "Thursday", "Friday", 
					"Saturday" ])[date.getDay()] + 
				" " + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
        }
    }
</script>

<style lang="sass" scoped>

</style>
