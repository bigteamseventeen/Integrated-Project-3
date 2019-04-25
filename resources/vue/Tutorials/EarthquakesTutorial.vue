<template>
	<div class="container" style="padding: 10px;">
		<h1>Table of Contents</h1>
		<div v-html="tocHtml" style="margin-bottom: 50px;"></div>

<vue-markdown :toc="true" v-on:toc-rendered="tocRenderered">
## 1. Earthquakes Walkthrough
When you first load up the Earthquakes page you will be greeted with 3 main interactive objects.
1. Map options
2. The Google Maps interface
3. Recent earthquakes

### 1.1. Map Options
This is a dynamically generated button that is rendered at the start of the page. These are the options that allow you configure what type of earthquakes are visible on the map. The options are split into two sections: "Time Span" and "Earthquake Significance". 

The Time Span section defines how old the earthquakes that are visible are, If you set it to a hour then only earthquakes in the past hour will be visible on the map. Should you set it to Day the same will happen only for earthquakes that happened on the past day, etc.

The Earthquake Significance section defines how severe the earthquake needs to be for it to be visible on the map, this ranges from Magnitude 1 to 4.5+, All will display every earthquake and Significant will display all earthquakes that will have significant effects on its surroundings such as structural damage etc.

### 1.2. The map
This is the visual part of the website that will display all of the earthquakes selected, these are grouped into marker cluster. These are 4 types of a cluster, Blue (`&lt; 10`); Yellow (`&lt; 100`); Red (`&lt; 1000`); and Purple (`&lt;< 10,000+`).

### 1.3. Recent Earthquakes
This section of the page will list off all recent earthquakes in the past hour of the page loading, these do not update automatically so if the user wnats to see an updated list they will have to refresh the page.

## 2. The API (UGSG)
We are making use of the free and open USGS API, This API allows us to request numerous amounts of information with filters. The API makes use of the [GeoJSON format (as described here)](#/tutorials/geojson). This allowed us to make use of the NPM library that defines all of the geojson attributes `@types/geojson`.

## 3. How we developed the solution. 
### 3.1. The Classes / Interfaces used to map the API
Without the need to wrap the responses of the API because of the type definitions for GeoJSON, I was able to create a simple function that was able to use enum's as parameters for the API making it less likely to throw any errors.

```js
/**
 * The level of earthquakes being polled
 */
export enum EQSignificance {
    /** All Earthquakes */
    ALL = 0,

    /** Significant Earthquakes */    
    SIGNIFICANT = 1,
    
    /** Magnitude 4.5 + */
    M4_5_PLUS = 2,
    
    /** Magnitude 2.5 + */
    M2_5_PLUS = 3, 
    
    /** Magnitude 1 + */
    M1_0_PLUS = 4, 
}

/**
 * Date span of the earthquakes
 */
export enum EQDateSpan {
    Hour  = "hour",
    Day   = "day",
    Week  = "week",
    Month = "month"
}
```

Because we are using enums to define howe we can call the api we can m ake use of the enum values to define the url's for the api as such:

```js
                      // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_hour.geojson
export const URL_BASE = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/";
export const URLS = {
    [EQSignificance.ALL]:         URL_BASE + "all",
    [EQSignificance.M1_0_PLUS]:   URL_BASE + "1.0",
    [EQSignificance.M2_5_PLUS]:   URL_BASE + "2.5",
    [EQSignificance.M4_5_PLUS]:   URL_BASE + "4.5",
    [EQSignificance.SIGNIFICANT]: URL_BASE + "significant",
};
```

Using those enum's we have created an helper function to create the ajax call for us:
```js
export function GetEarthQuakes(Span: EQDateSpan, Significance: EQSignificance, callback: (features: FeatureCollection, status) => void): void {
    // console.log("GetEarthQuakes: ", Span, Significance, callback);
    $.ajax({
        type: "GET",
        url: `${this.URLS[Significance]}_${Span}.geojson`,
        data: {},
        success: callback,
        dataType: 'json',
    });
}
```


We can now make use of the function by importing it and then calling it:
```js
import { GetEarthQuakes, EQDateSpan, EQSignificance } from '../../ts/API/EarthQuakes';

/**
 * Load the earthquakes and place them into the marketrs array
 */
function loadEarthquakesSelection() {
	// Set $this so we can use it in the callback
	let $this = this;

	// Reset our markers
	this.markers = [];

	// Get the new list of earthquakes using the options
	GetEarthQuakes(this.mapOptions["Time Span"], this.mapOptions["Earthquake Significance"], async function(response,status) {
		// EQDateSpan.Week, EQSignificance.ALL
		
		// If we failed to load the earthquakes
		if (status != "success") {
			console.warn("Failed to recieve information from geological API");
			return;
		}
		
		// For each earthquake in the response we want to loop it and make a marker for it and store it in the array
		for (let x=0; x &lt; response.features.length; x++) {
			let eq: Feature = response.features[x];

			// The marker just requires the lat and lng.
			let marker = {
				lat: eq.geometry['coordinates'][1],
				lng: eq.geometry['coordinates'][0]
			};

			// Push the new marker into the array
			$this.markers.push({ position: marker, label: eq.properties.mag.toString(), earthquake: eq });
		}
	});
}
```

### 3.2. Google Maps HTML Markdown
Now that we stored the markers in the array, because we are using the Vue Google maps library, when ever we modify the markers array the map is updated automatically. The html markup for this looks like:
```html
&lt;!-- Create a google map, with our center, zoom variables which will change the map when updated --&gt;
&lt;GmapMap :center=&quot;center&quot; :zoom=&quot;zoom&quot; style=&quot;height:500px;&quot;&gt;
    &lt;!-- Render the display window--&gt;
	&lt;gmap-info-window 
            :options=&quot;infoWindow.Options&quot; :position=&quot;infoWindow.Position&quot; 
            :opened=&quot;infoWindow.Opened&quot;   @closeclick=&quot;infoWindow.Opened=false&quot;&gt;
		&lt;div v-html=&quot;infoWindow.Content&quot;&gt; &lt;/div&gt;
	&lt;/gmap-info-window&gt;
    
    &lt;!-- Cluster our markers --&gt;
	&lt;GmapCluster&gt;
	    &lt;!-- Loop our markers in the array and re-render them --&gt;
		&lt;GmapMarker v-for=&quot;(m, index) in markers&quot; :key=&quot;index&quot; 
			:label=&quot;m.label&quot;
			:position=&quot;m.position&quot;
			:clickable=&quot;true&quot; @click=&quot;markerClick(index, m)&quot;
		&gt;&lt;/GmapMarker&gt;
	&lt;/GmapCluster&gt;
&lt;/GmapMap&gt;
```

### 3.3. Recent Earthquakes
As for the recent earthquakes section, this was created using a custom html element created inside vue called `map-earthquake-item`.

This element was simply responsible for displaying the magnitude of the earthquake the date and when it occured (how long ago). When the page is first loaded we just call the api to load the past hour earthquakes and then store them into an array which vue will render for us.

```js
function updateRecentEarthquakes() {
	let $this = this;

	GetEarthQuakes(EQDateSpan.Hour, EQSignificance.M1_0_PLUS, function(response,status) {
		if (status != "success") {
			console.warn("Failed to recieve information from geological API");
			return;
		}

		$this.recentEarthquakes = response.features;
	});
}
```

```html
&lt;div class=&quot;col-md-4 col-sm-12&quot;&gt;
	&lt;h3&gt;Recent Earthquakes&lt;/h3&gt;
	
	&lt;div class=&quot;list-group&quot; style=&quot;max-height: 500px; overflow: auto&quot;&gt;
		&lt;map-earthquake-item v-for=&quot;(item,index) in recentEarthquakes&quot;
			:key=&quot;index&quot; :eq=&quot;item&quot; :map=&quot;self&quot;&gt;&lt;/map-earthquake-item&gt;
	&lt;/div&gt; 
&lt;/div&gt;
```
</vue-markdown>
	</div>
</template>

<script lang="ts">
	import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
    declare var Prism: any;

	@Component({})
	export default class EarthquakesTutorial extends Vue {
		tocHtml: string = "";
		tocRenderered(tocHtml: string) {
			this.tocHtml = tocHtml;
        }
        
        updated() {
			Prism.highlightAll();
		}
	}
</script>
