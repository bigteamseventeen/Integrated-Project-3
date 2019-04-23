import * as $ from "jquery";
import {LatLong} from "./Weather";

const geoNamesApi = ({lat,lng}: LatLong) => `http://api.geonames.org/countryCodeJSON?lat=${lat}&lng=${lng}&username=CallumCarmicheal`;
const countriesNameApi = (country: string) => `https://restcountries.eu/rest/v2/name/${country}?fullText=true`;
const countriesCodeApi = (code: string) => `https://restcountries.eu/rest/v2/alpha/${code}`;

export function GetCountryFromLatLng(location: LatLong, 
	callback: ((response: BasicCountryInformation,status) => void), error: ((jqXHR, exception) => void) = null ) 
{ 
	$.ajax({
		type: "GET",
		url: geoNamesApi(location),	
		success: callback,
		error: error,
		dataType: 'json',
	});
}

export function GetCountryInformation(country: string, 
	callback: ((response: CountryInformation,status) => void), error: ((jqXHR, exception) => void) = null ) 
{ 
	$.ajax({
		type: "GET",
		url: countriesNameApi(country),	
		success: callback,
		error: error,
		dataType: 'json',
	});
}

export function GetCountryInformationFromCode(country: string, 
	callback: ((response: CountryInformation,status) => void), error: ((jqXHR, exception) => void) = null ) 
{ 
	$.ajax({
		type: "GET",
		url: countriesCodeApi(country),	
		success: callback,
		error: error,
		dataType: 'json',
	});
}

export interface BCStatus {
	message: string;
	value: number;
}

export interface BasicCountryInformation {
	countryCode: string;
	countryName: string;
	distance: number;
	languages: string;
	status: BCStatus;
}

export interface Currency {
	code: string;
	name: string;
	symbol: string;
}

export interface Language {
	iso639_1: string;
	iso639_2: string;
	name: string;
	nativeName: string;
}

export interface Translation {
	de: string;
	es: string;
	fr: string;
	ja: string;
	it: string;
	br: string;
	pt: string;
	nl: string;
	hr: string;
	fa: string;
}

export interface RegionalBloc {
	acronym: string;
	name: string;
	otherAcronyms: any[];
	otherNames: any[];
}

export interface CountryInformation {
	name: string;
	topLevelDomain: string[];
	alpha2Code: string;
	alpha3Code: string;
	callingCodes: string[];
	capital: string;
	altSpellings: string[];
	region: string;
	subregion: string;
	population: number;
	latlng: number[];
	demonym: string;
	area: number;
	gini: number;
	timezones: string[];
	borders: string[];
	nativeName: string;
	numericCode: string;
	currencies: Currency[];
	languages: Language[];
	translations: Translation;
	flag: string;
	regionalBlocs: RegionalBloc[];
	cioc: string;
}