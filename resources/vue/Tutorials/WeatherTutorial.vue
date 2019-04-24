<template>
	<div class="container" style="padding: 10px;">
		<h1>Table of Contents</h1>
		<div v-html="tocHtml" style="margin-bottom: 50px;"></div>

<vue-markdown :toc="true" v-on:toc-rendered="tocRenderered">
# 1. How to parse and read information from APIXU for Weather

## 1.1. How to register for the service(s)
For the weather API we used the APIXU service, that allowed us to get gather weather and get a forecast for a given Lat, Long. This allows us to forecast an area from a map or a pre-specified location.

To register for this service head over to the [official website and register](https://www.apixu.com/). After registering and confirming your website you can get visit the documentation and get your api key from [the api page](https://www.apixu.com/api.aspx).

Inside the [docs](docs) you will get the documentation for the api, like calls for the current weather. 

## Wrapping the API into useful interfaces
After we have gained access to the API we can make a call and see what the returned JSON file is 
```js
{
	"location":{
		"name":"Petersville",
		"region":"Alaska",
		"country":"United States of America",
		"lat":62.28,
		"lon":-150.83,
		"tz_id":"America/Anchorage",
		"localtime_epoch":1554123674,
		"localtime":"2019-04-01 5:01"
	},
	"current":{
		"last_updated_epoch":1554123619,
		"last_updated":"2019-04-01 05:00",
		"temp_c":-3.3,
		"temp_f":26.1,
		"is_day":0,
		"condition":{
			"text":"Clear",
			"icon":"//cdn.apixu.com/weather/64x64/night/113.png",
			"code":1000
		},
		"wind_mph":0,
		"wind_kph":0,
		"wind_degree":0,
		"wind_dir":"N",
		"pressure_mb":1034,
		"pressure_in":31,
		"precip_mm":0,
		"precip_in":0,
		"humidity":81,
		"cloud":0,
		"feelslike_c":-3.3,
		"feelslike_f":26.1,
		"vis_km":16,
		"vis_miles":9,
		"uv":0,
		"gust_mph":5.1,
		"gust_kph":8.3
	}
}
```

By taking this json file we can then turn it into a collection of interfaces, this process can be automated through tools in an code editor like visual studio code, the command is `> Convert json clipboard to TypeScript interfaces`. After doing that you will get a generated list of responses, you will want to go through this and manually check if the data is correct and rename any class names that don't make sense.

```js
export interface Astro {
	moonrise: string; //"08:10 AM"
	moonset: string; // "11:50 PM"
	sunrise: string; // "06:30 AM"
	sunset: string; // "08:08 PM"
}

export interface Location {
	name: string;
	region: string;
	country: string;
	lat: number;
	lon: number;
	tz_id: string;
	localtime_epoch: number;
	localtime: string;
}

export interface WeatherIcon {
	text: string;
	icon: string;
	code: number;
}

export interface WeatherConditions {
	last_updated_epoch: number;
	last_updated: string;
	temp_c: number;
	temp_f: number;
	is_day: number;
	condition: WeatherIcon;
	wind_mph: number;
	wind_kph: number;
	wind_degree: number;
	wind_dir: string;
	pressure_mb: number;
	pressure_in: number;
	precip_mm: number;
	precip_in: number;
	humidity: number;
	cloud: number;
	feelslike_c: number;
	feelslike_f: number;
	vis_km: number;
	vis_miles: number;
	uv: number;
	gust_mph: number;
	gust_kph: number;
}

export interface WeatherForecast {
	forecastday: DayForecast[];
}

export interface DayForecast {
	astro: Astro;
	date: string;
	date_epoch: number;
	day: WeatherConditions;
}

export interface WeatherAPIResponse {
	location: Location;
	current: WeatherConditions;
}

export interface WeatherAPIForecastResponse {
	current: WeatherConditions;
	location: Location;
	forecast: WeatherForecast;
}

export interface LatLong { lat: number, lng: number }
```

## 1.2. Calling the API
Now that we can parse information from the API with help of your selected text editor's language server, We will want to call the API functions. To do that we will refer to the docs and create a function that will wrap up the ajax request.

The pattern for the requests for the api is `http://api.apixu.com/v1/{type}.json?key={key}&{...}`. 
| type | This is the type of request, eg: forecast, current, history etc.                                          |
|------|-----------------------------------------------------------------------------------------------------------|
| key  | This is the user's api key that we had gotten earlier, this will allow us to authenticate with the server |
| ...  | These are any additional arguments defined for the api call                                               |

```js
const APIXU_API_KEY = "...";
function getAPIEndpoint(type) {
	return `http://api.apixu.com/v1/${type}.json?key=${APIXU_API_KEY}`;
}
```
Using this function we can automatically generate the URL of the request for what we need should it be the forecast, history etc by passing it into the paramater (type).

We now have to call the api, using the interfaces we created earlier we can define the callback for the ajax response by setting the response data type to the interface `(weather: WeatherAPIResponse, status:any) => void`

| callback | This is the function definition name                                                |
|----------|-------------------------------------------------------------------------------------|
| weather  | This is the response data from the API, adding the interface allows for suggestions |
| status   | This is the request status returned by ajax                                         |

The code for the function looks like this: 
```js
export function GetCurrentWeather(location: LatLong, 
	callback: ((weather: WeatherAPIResponse,status) => void), error: ((jqXHR, exception) => void) = null ) 
{
	let qry = `${location.lat.toFixed(4)},${location.lng.toFixed(4)}`;
	GetCurrentWeather_Query(qry, callback, error);
}

export function GetCurrentWeather_Query(qry: string, 
	callback: ((weather: WeatherAPIResponse,status) => void), error: ((jqXHR, exception) => void) = null ) 
{
	$.ajax({
		type: "GET",
		url: `${getAPIEndpoint("current")}&q=${qry}`,
		data: {},
		success: callback,
		error: error,
		dataType: 'json',
	});
}
```

And we can call the function like this 
```js
// this.center = {lat: -21, lng: 20}
GetCurrentWeather(this.center, (weather, status) => {
	console.log("Current Weather: ", status, weather);
	// Do something with the weather information
	// ...
});
```

Using that information you can create websites making use of weather statistics.

For our usage we had just created a for each of the custom html component `map-weather-information` like this
```html
&lt;map-weather-information :title=&quot;fc.day&quot; :weather=&quot;fc.weather&quot;&gt;&lt;/map-weather-information&gt;
```
`:title` Sets the title of the card and

`:weather` Sets the weather object that the component will then render.



</vue-markdown>
	</div>
</template>

<script lang="ts">
	import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
    declare var Prism: any;

	@Component({})
	export default class WeatherTutorial extends Vue {
		tocHtml: string = "";
		tocRenderered(tocHtml: string) {
			this.tocHtml = tocHtml;
		}

		updated() {
			Prism.highlightAll();
		}
	}
</script>
