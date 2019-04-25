//
// Import dependencies
import {DOCUMENT_DEFAULT_TITLE, DOCUMENT_TITLE_SUFFIX, GMAPS_API_KEY} from "./Lib/Settings";

import Vue from "vue";
import Router from "vue-router";
import * as VueGoogleMaps from "vue2-google-maps";
import GmapCluster from 'vue2-google-maps/dist/components/cluster';
import VueTimeago from 'vue-timeago'
import VueMarkdown from 'vue-markdown'

//
// Components
import DocumentNavbar from "../vue/Components/document-navbar.vue"; // <document-navbar></document-navbar>
import DocumentFooter from "../vue/Components/document-footer.vue"; // <document-footer></document-footer> 
import MapEarthquakeItem from "../vue/Components/map-earthquake-item.vue"; // <map-earthquake-item :eq="earthquake" :map="mapPagee"></map-earthquake-item> 
import MapWeatherInformation from "../vue/Components/map-weather-information.vue"; // <map-weather-information :weather="w" :title="strTitle"></map-weather-information>
import MapCountryInformation from "../vue/Components/map-country-information.vue"; // <map-country-information :basic="" :country=""></map-country-information>
import TVSeriesItem from "../vue/Components/tvseries-item.vue"; // <map-weather-information :weather="w" :title="strTitle"></map-weather-information>

// tslint:disable-next-line: 
Vue.component('document-navbar', DocumentNavbar);
Vue.component('document-footer', DocumentFooter);
Vue.component('map-earthquake-item', MapEarthquakeItem);
Vue.component('map-weather-information', MapWeatherInformation);
Vue.component('map-country-information', MapCountryInformation);
Vue.component('tvseries-item', TVSeriesItem);

//
// Pages
import HomePage from "../vue/Pages/Home.vue";
import MapPage from "../vue/Pages/Map.vue";
import AuthorsPage from "../vue/Pages/Authors.vue";
import PricingPage from "../vue/Pages/Pricing.vue";
import TestPage from "../vue/Pages/Test.vue";
import AirqualityPage from "../vue/Pages/Airquality.vue";
import WeatherPage from "../vue/Pages/Weather.vue";
import StudentPage from "../vue/Pages/Student.vue";
import TVSeries from "../vue/Pages/TVSeries.vue";
import MoviesPage from "../vue/Pages/Movies.vue";
import MapCountryInfo from "../vue/Pages/MapCountryInfo.vue";

// 
// Tutorial pages
import TutorialListPage from "../vue/Tutorials/Tutorials.vue";
import WeatherTutorial from "../vue/Tutorials/WeatherTutorial.vue";
import MoviesTutorial from "../vue/Tutorials/MoviesTutorial.vue";
import TvSeriesTutorial from "../vue/Tutorials/TVSeriesTutorial.vue";
import EarthquakesTutorial from "../vue/Tutorials/EarthquakesTutorial.vue";
import StudentsTutorial from "../vue/Tutorials/StudentsTutorial.vue";
import AirQualityPage from "../vue/Tutorials/AirQualityTutorial.vue";

import GeoJSONTutorial from "../vue/Tutorials/GeoJSONTutorial.vue";
import JavascriptTechniquesTutorial from "../vue/Tutorials/JavascriptTechniques.vue";

//
// Setup the vue libraries
Vue.use(Router);
Vue.use(VueGoogleMaps, {
	load: {
		key: GMAPS_API_KEY,
		libraries: ['places'], // Gmap libraries
	},
});


Vue.use(VueTimeago, {
	name: 'Timeago', // Component name, `Timeago` by default
	locale: 'en', 	 // Default locale
});

Vue.component('vue-markdown', VueMarkdown)
Vue.component('GmapCluster', GmapCluster)

//
// Return the router
const router = new Router({
	mode: "hash",

	routes: [
	// ------
		{ path: '/', name: 'home', component: HomePage, meta: {title: "Home" } },
		{ path: '/authors', name: 'authors', component: AuthorsPage, meta: {title: "Authors" } },

	// ------ Pages
		{ path: '/map', name: 'map', component: MapPage, meta: {title: "Maps" } },
		{ path: '/map/:lat/:lng/:time', name: 'countryInfo', component: MapCountryInfo, meta: { title: "Country information" } },
		{ path: '/weather', name: 'weather', component: WeatherPage, meta: { title: "Weather" } },
		{ path: '/pollution', name: 'pollution', component: AirqualityPage, meta: { title: "Pollution levels" } },
		{ path: '/student', name: 'student', component: StudentPage, meta: { title: "Students" } },
		{ path: '/tvseries', name: 'tvseries', component: TVSeries, meta: { title: "TV Series" } },
		{ path: '/movies', name: 'movies', component: MoviesPage, meta: {title: "Movies", author: "Marc" } },

	// ------ Tutorials 
		{ path: '/tutorials', name: 'tutorials', component: TutorialListPage, meta: { title: "Tutorials" } },
		{ path: '/tutorials/weather', name: 'weatherTutorial', component: WeatherTutorial, meta: { title: "Weather tutorial" } },
		{ path: '/tutorials/movies', name: 'moviesTutorial', component: MoviesTutorial, meta: { title: "Movies tutorial" } },
		{ path: '/tutorials/tvseries', name: 'tvSeriesTutorial', component: TvSeriesTutorial, meta: { title: "TV Series tutorial" } },
		{ path: '/tutorials/earthquakes', name: 'EarthquakesTutorial', component: EarthquakesTutorial, meta: { title: "Earthquake tutorial" } },
		{ path: '/tutorials/students', name: 'studentsTutorial', component: StudentsTutorial, meta: { title: "TV Series tutorial" } },
		{ path: '/tutorials/air', name: 'airTutorial', component: AirQualityPage, meta: { title: "Air Quality Tutorial" } },

	// ------ Abstract tutorials
		{ path: '/tutorials/js', name: 'jsTechniques', component: JavascriptTechniquesTutorial, meta: { title: "Javascript Techniques" } },
		{ path: '/tutorials/geojson', name: 'geojsonTutorial', component: GeoJSONTutorial, meta: { title: "GeoJSON Tutorial" } }
	],

	linkActiveClass: "active",
	linkExactActiveClass: "exact-active",
});

// Update the website title on each page
router.afterEach((t, f) =>
	Vue.nextTick(() => document.title = t.meta.title ? t.meta.title + DOCUMENT_TITLE_SUFFIX : DOCUMENT_DEFAULT_TITLE ));

// Export the router
export default router;