// Import vue dependencies
import Vue from "vue";
import Router from "vue-router";

// Components
import DocumentNavbar from "../vue/Components/document-navbar.vue";
import DocumentFooter from "../vue/Components/document-footer.vue";

Vue.component('document-navbar', DocumentNavbar);
Vue.component('document-footer', DocumentFooter);

// Pages
import Home from "../vue/Pages/Home.vue";
import Map from "../vue/Pages/Map.vue";
import Pricing from "../vue/Pages/Pricing.vue";

Vue.use(Router);

export default new Router({
	mode: "hash",

	routes: [
		{ path: '/', name: 'home', component: Home},
		{ path: '/map', name: 'map', component: Map},
		{ path: '/pricing', name: 'pricing', component: Pricing}
	],

	linkActiveClass: "active",
	linkExactActiveClass: "exact-active",
});

