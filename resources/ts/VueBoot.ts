//
// Import dependencies
import {DOCUMENT_DEFAULT_TITLE, DOCUMENT_TITLE_SUFFIX, GMAPS_API_KEY} from "./Lib/Settings";

import Vue from "vue";
import Router from "vue-router";
import * as VueGoogleMaps from "vue2-google-maps";
import GmapCluster from 'vue2-google-maps/dist/components/cluster';

//
// Components
import DocumentNavbar from "../vue/Components/document-navbar.vue";
import DocumentFooter from "../vue/Components/document-footer.vue";

// tslint:disable-next-line: 
Vue.component('document-navbar', DocumentNavbar);
Vue.component('document-footer', DocumentFooter);

//
// Pages
import Home from "../vue/Pages/Home.vue";
import Map from "../vue/Pages/Map.vue";
import Pricing from "../vue/Pages/Pricing.vue";
import TestPage from "../vue/Pages/Test.vue";

//
// Setup the vue libraries
Vue.use(Router);
Vue.use(VueGoogleMaps, {
	load: {
		key: GMAPS_API_KEY,
		libraries: ['places'], // Gmap libraries
	},
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
		{ path: '/testing', name: 'test', component: TestPage, meta: { title: "Tests" } }
	],

	linkActiveClass: "active",
	linkExactActiveClass: "exact-active",
});

// Update the website title on each page
router.afterEach((t, f) =>
	Vue.nextTick(() => document.title = t.meta.title ? t.meta.title + DOCUMENT_TITLE_SUFFIX : DOCUMENT_DEFAULT_TITLE ));

// Export the router
export default router;