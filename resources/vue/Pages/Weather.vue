<template>
	<div class="container">	
		<h3>Weather</h3>

		<div class="card">
			<div class="card-body">
				<div class="input-group mb-3">
					<label for="txtLocation">Load weather information:</label>
					
					<div class="input-group mb-3">
						<input name="txtLocation" type="text" class="form-control" placeholder="Enter query..." 
							aria-label="Weather query" v-model="query">
						<div class="input-group-append">
							<button class="btn btn-outline-secondary" type="button" @click="loadWeatherInformation_Click()">
								Load weather
							</button>
						</div>
					</div>
					
					<small id="txtLocationHelp" class="form-text text-muted">
						City Name (Glasgow), Post Code (UK: SW1, Canadian: G2J or American: 10001), Lat Lng (eg: 48.8567,2.3508)
					</small>
				</div>
			</div>
		</div>
		
		<div style="margin-top: 15px;">
			<div class="row row-flex" v-if="forecast != null">
				<div class="col-md-4 col-sm-6 col-xs-12" v-for="fc in forecast" v-bind:key="fc.date_epoch" style="margin-bottom: 15px;">
					<div class="card" style="height: 180px">
						<div class="card-body">
							<map-weather-information :title="fc.day" :weather="fc.weather"></map-weather-information>
						</div>
					</div>
				</div>
			</div>
			<div v-else>
				<p>Please enter a location query from above.</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
    import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
	import { WeatherAPIResponse, GetWeatherForecast, WeatherAPIForecastResponse } from '../../ts/API/Weather';

	export class WeatherAPICollection {
		weather: WeatherAPIResponse;
		day: string;
		date: Date;
		date_epoch: number;
	
		constructor(weather: WeatherAPIResponse, day: string, date: Date) {
			this.weather = weather;
			this.day = day;
			this.date = date;
			this.date_epoch = date.getTime() / 1000;

			// setup weather
			this.setupWeather();

			console.log(this);
		}

		setupWeather() {
			let w = this.weather.current;
			w.temp_c = w['avgtemp_c'];		
			w.temp_f = w['avgtemp_f'];
			w.wind_kph = w['maxwind_kph']; 
			w.wind_mph = w['maxwind_mph']; 
		}
	}

	@Component({})
	export default class WeatherPage extends Vue {
		//
		// ---------- Properties ----------

		//
		// ---------- Data ----------
		forecast: WeatherAPICollection[] = null;
		query: string = ""; // glasgow or smtn

		//
		// ---------- Methods and Computed ----------
		constructor() { super(); } // Initialize data here if you cant above
		mounted() { } // On Component Load, use instead of constructor!
		beforeUpdated() { } // Before Render

		loadWeatherInformation_Click(): void {
			let currentDate = new Date();
			let $this = this;

			$this.forecast = null;
			GetWeatherForecast(this.query, 10, currentDate, (w: WeatherAPIForecastResponse,s) => {
				console.log("Weather forecast: ", w);
				$this.forecast = [];
				
				// $this.forecast.push( new WeatherAPICollection( { location: w.location, current: w.current }, "Today", currentDate));
				
				w.forecast.forecastday.forEach(weather => {
					let date = new Date(weather.date);
					let day = $this.getDay(date);
					let dayn = date.getDate();
					let appn = $this.getDayAppendix(dayn);
					let month = $this.getMonthAbbr(date);
					let display = `${day} ${dayn}${appn} ${month}`;
					$this.forecast.push(
						new WeatherAPICollection( { location: w.location, current: weather.day }, 
							display, date )
					)
				});
			});
		}

		getDay(date: Date): string {
			return (["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"])[date.getDay()];
		}

		getMonthAbbr(date: Date): string {
			return (["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", 
				"Oct", "Nov", "Dec"])[date.getMonth()];
		}

		getMonth(date: Date): string {
			return (["January", "February", "March", "April", "May", "June", "July", "August", "September", 
				"October", "November", "December"])[date.getMonth()];
		}

		getDayAppendix(d: number) {
			if (d > 3 && d < 21) return 'th'; 
			switch (d % 10) {
				case 1:  return "st";
				case 2:  return "nd";
				case 3:  return "rd";
				default: return "th";
			}
		}
	}
</script>

<style lang="sass" scoped>

</style>
