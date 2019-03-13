//
// This loads all typescript files for the project
//

// Import libraries
console.info("Importing libraries...");

import Vue from 'vue';
import * as $ from 'jquery';
import * as _ from 'lodash';
import "bootstrap";

import {GlobalApplication} from "./Lib/GlobalApplication";


// Setting global variables
window.App = new GlobalApplication();
window._ = _;
window.jQuery = $;

// Load the vue components
import Router from "./VueBoot";

// We are now finished loading everything so start our vue containers
window.App.Vue = new Vue({
	el: '#app',
	router: Router
});