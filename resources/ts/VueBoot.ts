//
// Import dependencies
import {DOCUMENT_DEFAULT_TITLE, DOCUMENT_TITLE_SUFFIX, GMAPS_API_KEY} from "./Lib/Settings";

import Vue from "vue";
import Router from "vue-router";
import VueGoogleMaps from 'vue-googlemaps'
import 'vue-googlemaps/dist/vue-googlemaps.css';

//
// Components
import DocumentNavbar from "../vue/Components/document-navbar.vue";
import DocumentFooter from "../vue/Components/document-footer.vue";

Vue.component('document-navbar', DocumentNavbar);
Vue.component('document-footer', DocumentFooter);

//
// Pages
import Home from "../vue/Pages/Home.vue";
import Map from "../vue/Pages/Map.vue";
import Pricing from "../vue/Pages/Pricing.vue";

//
// Setup the vue libraries
Vue.use(Router);
Vue.use(VueGoogleMaps, {
	load: {
		apiKey: GMAPS_API_KEY,
		libraries: ['places'], //Gmap libraries
		useBetaRenderer: false,
	},
});

//
// Return the router
let router = new Router({
	mode: "hash",

	routes: [
		{ path: '/', name: 'home', component: Home, meta:{title:"Home"} },
		{ path: '/map', name: 'map', component: Map, meta:{title:"Maps"} },
		{ path: '/pricing', name: 'pricing', component: Pricing, meta:{title:"Pricing"} }
	],

	linkActiveClass: "active",
	linkExactActiveClass: "exact-active",
});

router.afterEach((to, from) => {
	Vue.nextTick( () => {
		document.title = to.meta.title ? to.meta.title + DOCUMENT_TITLE_SUFFIX : DOCUMENT_DEFAULT_TITLE;
	});
})

export default router;