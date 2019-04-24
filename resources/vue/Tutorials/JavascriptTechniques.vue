<template>
	<div class="container" style="padding: 10px;">
		<h1>Table of Contents</h1>
		<div v-html="tocHtml" style="margin-bottom: 50px;"></div>

<vue-markdown :toc="true" v-on:toc-rendered="tocRenderered">
## JavaScript Techniques
During development we made use of various techniques to make development easier and speed up the process of writing code. These techniques ranged from using enum's to define object arrays, 

### Typescript and WebPack
One of the techniques we made use out of the bat was using TypeScript and WebPack giving us the idea of creating a single page web application.
This was simply setup by creating a `package.json` file which defined all of the libraries that we will be using, first we included typescript, vue, webpack, bootstrap and laravel mix.

After doing that we jrust need to run the command to install all of the required packages `root $ npm install`. This will create the `node_modules` folder containing all of our code. We will then create a `webpack.mix.js` file that will tell the compiler what files to compile.
```js
/**
 * This file handles the rules in compiling preprocessed scripts and styles
 * like: Typescript, Javascript, Vue.js
 * like: Scss / Sass.
 */

/**
 * Load laravel mix!
 * @type {*|Api}
 */
const mix = require('laravel-mix');

// Tell laravel-mix to only display a notification on a error
mix.disableNotifications();

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
    .sass('resources/sass/app.scss', 'public/assets/css')
    .typeScript('resources/ts/app.ts', 'public/assets/js')
    .sourceMaps()
;
```

This will then compile the following files:
| Original file | Output file |
|-------|--------|
| resources/sass/app.scss | public/assets/css/app.css |
| resources/ts/app.ts | public/assets/js/app.js |

The source maps option will then allow the web browser to know how the file is structured, so we can debug our code in the browser.

This method will compile a single typescript file into a single output file, this looks like we need to compile each file seperately but because typescript allows us to import functions from other files, when ever we make use of a import statement for another file the compiler weill detect and automatically include the file. Using this method we created a single file called app.ts which would bootstrap the whole application which then would include the needed files such as pages, and then if the page uses a class then that file is included. This ensures that all required files are loaded and any files that are not used are excluded from the output javascript file.

The bootstrap application file looks like this:
- First we will load the vue library, jquery, lodash and bootstrap. 
- The GlobalApplication is just a definition file that allows us to store the vue component globally.
- After the imports we will setup the global variables 
- Then we setup the router from the VueBoot.ts file
- After we setup the vue router we will now initalize our vue root object and pass the router
- Now that the page is loaded.

```js
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
```

### Loading Vue and Page setup

Inside the VueBoot file we load all our required vue modules, pages, components and tutorial pages.
1. First we load all the libraries
2. Then we import our html components (custom elements)
2.1. We set the components in vue
3. We will now import all of our pages
4. After we imported our pages we will setup the plugins for vue and set any settings
5. Now that we have everything setup in vue we will load our router and create all the required instances
6. Now that the router is created, we want to export it as the default item.

```js
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
import DocumentNavbar from &quot;../vue/Components/document-navbar.vue&quot;; // &lt;document-navbar&gt;&lt;/document-navbar&gt;
import DocumentFooter from &quot;../vue/Components/document-footer.vue&quot;; // &lt;document-footer&gt;&lt;/document-footer&gt; 
import MapEarthquakeItem from &quot;../vue/Components/map-earthquake-item.vue&quot;; // &lt;map-earthquake-item :eq=&quot;earthquake&quot; :map=&quot;mapPagee&quot;&gt;&lt;/map-earthquake-item&gt; 
import MapWeatherInformation from &quot;../vue/Components/map-weather-information.vue&quot;; // &lt;map-weather-information :weather=&quot;w&quot; :title=&quot;strTitle&quot;&gt;&lt;/map-weather-information&gt;
import MapCountryInformation from &quot;../vue/Components/map-country-information.vue&quot;; // &lt;map-country-information :basic=&quot;&quot; :country=&quot;&quot;&gt;&lt;/map-country-information&gt;
import TVSeriesItem from &quot;../vue/Components/tvseries-item.vue&quot;; // &lt;map-weather-information :weather=&quot;w&quot; :title=&quot;strTitle&quot;&gt;&lt;/map-weather-information&gt;

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
```

### How it's all tied together
We have a simple html file that loads all non npm libraries and our scripts. This contains the basic page components that allow us to render the page. 
```html
&lt;div id=&quot;app&quot;&gt;
	&lt;document-navbar&gt;&lt;/document-navbar&gt;
	&lt;keep-alive&gt;
		&lt;router-view class=&quot;view&quot;&gt;&lt;/router-view&gt;
	&lt;/keep-alive&gt;
&lt;/div&gt;
```

The full html page looks like this:
```html
&lt;html&gt;

&lt;head&gt;
	&lt;meta charset=&quot;utf-8&quot;&gt;
	&lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge&quot;&gt;
	&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;

	&lt;meta name=&quot;author&quot; content=&quot;&quot;&gt;
	&lt;meta name=&quot;description&quot; content=&quot;&quot;&gt;

	&lt;title&gt;LOADING...&lt;/title&gt;
	
	&lt;link href=&quot;assets/css/app.css&quot; type=&quot;text/css&quot; rel=&quot;stylesheet&quot;&gt;

	&lt;!-- External Library Assets --&gt;
	&lt;link rel=&quot;stylesheet&quot; href=&quot;https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.5/jquery.mCustomScrollbar.min.css&quot;&gt;
	&lt;link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.1/css/all.min.css'/&gt;
	&lt;link rel=&quot;stylesheet&quot; href=&quot;https://cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.css&quot;&gt;
			
	&lt;script src=&quot;https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/prism.min.js&quot;&gt;&lt;/script&gt;
	&lt;link rel=&quot;stylesheet&quot; href=&quot;https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/themes/prism.min.css&quot;&gt;
	&lt;link rel=&quot;stylesheet&quot; href=&quot;https://unpkg.com/katex@0.6.0/dist/katex.min.css&quot;&gt;

	&lt;style&gt;
	.nounderline {
		text-decoration: none !important
	}
	&lt;/style&gt;
&lt;/head&gt;

&lt;body&gt;
	&lt;div id=&quot;app&quot;&gt;
		&lt;document-navbar&gt;&lt;/document-navbar&gt;
		&lt;keep-alive&gt;
			&lt;router-view class=&quot;view&quot;&gt;&lt;/router-view&gt;
		&lt;/keep-alive&gt;
	&lt;/div&gt;

	&lt;script src=&quot;https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js&quot;&gt;&lt;/script&gt;
	&lt;script src=&quot;https://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js&quot;&gt;&lt;/script&gt;
	&lt;script src=&quot;https://cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.min.js&quot;&gt;&lt;/script&gt;
	&lt;script src=&quot;https://www.gstatic.com/charts/loader.js&quot;&gt;&lt;/script&gt;

	&lt;!-- Our program --&gt;
	&lt;script src=&quot;assets/js/app.js&quot;&gt;&lt;/script&gt;

	&lt;!-- Jquery libraries --&gt;
	&lt;script src=&quot;https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.5/jquery.mCustomScrollbar.concat.min.js&quot;&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
```

## Techniques used during development
### Simplifying our html activities and making use of Vue
To simplify the html for our pages we had created subcomponents to house and display parts of the website like weather, this allowed the code to be reused such as taking the weather display and placing it alongside country information in the earthquakes page.

#### Example: Earthquakes usage
For example for the recent earthquakes section i had just created an array that stored the past hour of the earthquakes, and inside vue i used a `v-for` loop that will loop the html elements and when ever the `recentEarthquakes` variable has been changed it will automatically update the html dom as vue uses its own "virtual dom".
```html
&lt;map-earthquake-item v-for=&quot;(item,index) in recentEarthquakes&quot;
	:key=&quot;index&quot; :eq=&quot;item&quot; :map=&quot;self&quot;&gt;&lt;/map-earthquake-item&gt;
```
```js
let $this = this;
GetEarthQuakes(EQDateSpan.Hour, EQSignificance.M1_0_PLUS, function(response,status) {
	if (status != "success") {
		console.warn("Failed to recieve information from geological API");
		return;
	}
	$this.recentEarthquakes = response.features;
});
```
</vue-markdown>
	</div>
</template>

<script lang="ts">
	import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
    declare var Prism: any;

	@Component({})
	export default class JavascriptTechniques extends Vue {
		tocHtml: string = "";
		tocRenderered(tocHtml: string) {
			this.tocHtml = tocHtml;
        }
        
        updated() {
			Prism.highlightAll();
		}
	}
</script>

<style lang="sass" scoped>
.main-content-area 
    margin: 40px
    max-width: 1200px
</style>