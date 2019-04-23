import {APIXU_API_KEY} from "../Lib/Settings";
import * as $ from 'jquery';

function getAPIEndpoint(type) {
	return `http://api.apixu.com/v1/${type}.json?key=${APIXU_API_KEY}`;
}

export interface LatLong { lat: number, lng: number }

// http://api.apixu.com/v1/current.json?key=YOUR-APIXU-KEY&q=' + lat.toFixed(4) + ',' + lng.toFixed(4)
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

export function GetHistoricWeather(location: LatLong, date: Date, 
	callback: ((weather,s) => void), error: ((jqXHR, exception) => void) = null) 
{
	GetHistoricWeather_Query(`${location.lat.toFixed(4)},${location.lng.toFixed(4)}`, date, callback, error);
}

export function GetHistoricWeather_Query(qry: String, date: Date, 
	callback: ((weather,s) => void), error: ((jqXHR, exception) => void) = null) 
{
	let dt = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
	$.ajax({
		type: "GET",
		url: `${getAPIEndpoint("history")}&dt=${dt}&q=${qry}`,
		data: {},
		success: ((weather, s) => {
			let responseWeather = null;

			if (s == "success") {
				console.log(weather);
				if (weather.forecast.forecastday.length != 0) {
					// console.log("GetHistoricWeather_Query: weather.forecast.forecastday.length != 0", {location: weather.location, 
					// 	current: weather.forecast.forecastday[0].hour[date.getUTCHours()]});

					responseWeather = JSON.parse(JSON.stringify({
						location: weather.location, 
						current: weather.forecast.forecastday[0].hour[date.getUTCHours()],
						api_response: weather,
						wanted_date: dt,
						wanted_hour: {
							local: date.getHours(),
							utc: date.getUTCHours()
						}
					}));
				} else {
					s = "nocontent";
				}
			}
			
			callback(responseWeather, s);
		}),
		error: error,
		dataType: 'json',
	});
}

export function GetWeatherForecast(qry: String, days: number, date: Date, 
	callback: ((weather: WeatherAPIForecastResponse,s) => void), error: ((jqXHR, exception) => void) = null) 
{
	let dt = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
	
	$.ajax({
		type: "GET",
		url: `${getAPIEndpoint("forecast")}&dt=${dt}&q=${qry}&days=${days}`,
		data: {},
		success: callback,
		error: error,
		dataType: 'json',
	});
}

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

/**
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
 */