import {APIXU_API_KEY} from "../Lib/Settings";
import * as $ from 'jquery';

function getAPIEndpoint(type) {
	return `http://api.apixu.com/v1/${type}.json?key=${APIXU_API_KEY}`;
}

// http://api.apixu.com/v1/current.json?key=YOUR-APIXU-KEY&q=' + lat.toFixed(4) + ',' + lng.toFixed(4)
export function GetCurrentWeather(location: {lat: number, lng: number}, 
		callback: ((weather: WeatherAPIResponse,status) => void), error: ((jqXHR, exception) => void) = null ) 
{
	$.ajax({
        type: "GET",
        url: `${getAPIEndpoint("current")}&q=${location.lat.toFixed(4)},${location.lng.toFixed(4)}`,
        data: {},
		success: callback,
		error: error,
        dataType: 'json',
    });
}

export function GetHistoricWeather(location: {lat: number, lng: number}, date: Date, 
		callback: ((weather,s) => void), error: ((jqXHR, exception) => void) = null) 
{
	let dt = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

	$.ajax({
        type: "GET",
        url: `${getAPIEndpoint("current")}&dt=${dt}&q=${location.lat.toFixed(4)},${location.lng.toFixed(4)}`,
        data: {},
		success: callback,
		error: error,
        dataType: 'json',
    });
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

export interface WeatherAPIResponse {
	location: Location;
	current: WeatherConditions;
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