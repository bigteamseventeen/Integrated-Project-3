//
// Import dependencies
import {DOCUMENT_DEFAULT_TITLE, DOCUMENT_TITLE_SUFFIX, GMAPS_API_KEY} from "./Lib/Settings";

import Vue from "vue";
import Router from "vue-router";
import * as VueGoogleMaps from "vue2-google-maps";
import GmapCluster from 'vue2-google-maps/dist/components/cluster';
import VueTimeago from 'vue-timeago'

//
// Components
import DocumentNavbar from "../vue/Components/document-navbar.vue"; // <document-navbar></document-navbar>
import DocumentFooter from "../vue/Components/document-footer.vue"; // <document-footer></document-footer> 
import MapEarthquakeItem from "../vue/Components/map-earthquake-item.vue"; // <map-earthquake-item :eq="earthquake" :map="mapPagee"></map-earthquake-item> 
import MapWeatherInformation from "../vue/Components/map-weather-information.vue"; // <map-weather-information :weather="w" :title="strTitle"></map-weather-information>

// tslint:disable-next-line: 
Vue.component('document-navbar', DocumentNavbar);
Vue.component('document-footer', DocumentFooter);
Vue.component('map-earthquake-item', MapEarthquakeItem);
Vue.component('map-weather-information', MapWeatherInformation);

//
// Pages
import Home from "../vue/Pages/Home.vue";
import Map from "../vue/Pages/Map.vue";
import Pricing from "../vue/Pages/Pricing.vue";
import TestPage from "../vue/Pages/Test.vue";
import AirqualityPage from "../vue/Pages/Airquality.vue";
import WeatherPage from "../vue/Pages/Weather.vue";

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

Vue.component('GmapCluster', GmapCluster)

//
// Return the router
const router = new Router({
	mode: "hash",

	routes: [
		{ path: '/', name: 'home', component: Home, meta: {title: "Home" } },
		{ path: '/map', name: 'map', component: Map, meta: {title: "Maps" } },
		{ path: '/pricing', name: 'pricing', component: Pricing, meta: { title: "Pricing" } },
		{ path: '/weather', name: 'weather', component: WeatherPage, meta: { title: "Weather" } },
		{ path: '/pollution', name: 'pollution', component: AirqualityPage, meta: { title: "Pollution levels" } },
		{ path: '/test', name: 'test', component: TestPage, meta: { title: "Test Developer Page" } }
	],

	linkActiveClass: "active",
	linkExactActiveClass: "exact-active",
});

// Update the website title on each page
router.afterEach((t, f) =>
	Vue.nextTick(() => document.title = t.meta.title ? t.meta.title + DOCUMENT_TITLE_SUFFIX : DOCUMENT_DEFAULT_TITLE ));

// Export the router
export default router;