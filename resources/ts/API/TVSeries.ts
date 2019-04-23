import {TMDB_API_KEY} from "../Lib/Settings";
import * as $ from 'jquery';

/// <reference path="Modules/TVSeries.ts" />
import * as SeriesList from "SeriesList";
import * as TVID from "TVID";
import * as TVID_Season from "TVID_Season";

function getAPIEndpoint(type, param) {
	return `https://api.themoviedb.org/3/${type}api_key=${TMDB_API_KEY}${param}&language=en-US`;
}

export function GetPopular(callback: ((tvseriesList: SeriesList.RootObject, s) => void), error: ((jqXHR, exception) => void) = null) {
	$.ajax({
		type: "GET",
		url: `${getAPIEndpoint("tv/popular?", "")}`,
		data: {},
		success: callback,
		error: error,
		dataType: 'json',
	});
}

export function GetTopRated(callback: ((tvseriesList: SeriesList.RootObject, s) => void), error: ((jqXHR, exception) => void) = null) {
	$.ajax({
		type: "GET",
		url: `${getAPIEndpoint("tv/top_rated?", "")}`,
		data: {},
		success: callback,
		error: error,
		dataType: 'json',
	});
}

export function GetTVID(showID: number, callback: ((tvInformation: TVID.RootObject, s) => void), error: ((jqXHR, exception) => void) = null) {
	$.ajax({
		type: "GET",
		url: `${getAPIEndpoint("tv/" + showID + "?", "")}`,
		data: {},
		success: callback,
		error: error,
		dataType: 'json',
	});
}

export function GetTVID_Season(showID: number, season: number, callback: ((tvSeason: TVID_Season.RootObject, s) => void), error: ((jqXHR, exception) => void) = null) {
	$.ajax({
		type: "GET",
		url: `${getAPIEndpoint("tv/" + showID + "/season/" + season + "?", "")}`,
		data: {},
		async: false,
		success: callback,
		error: error,
		dataType: 'json',
	});
}

export function QueryTV(query: string, callback: ((tvResults: SeriesList.RootObject, s) => void), error: ((jqXHR, exception) => void) = null) {
	$.ajax({
		type: "GET",
		url: `${getAPIEndpoint("search/tv?", "&query=" + query)}`,
		data: {},
		success: callback,
		error: error,
		dataType: 'json',
	});
}