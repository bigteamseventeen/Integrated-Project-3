<template>
	<div class="container" style="padding: 10px;">
		<h1>Table of Contents</h1>
		<div v-html="tocHtml" style="margin-bottom: 50px;"></div>

<vue-markdown :toc="true" v-on:toc-rendered="tocRenderered">
# Air Quality API

Author: _Amar Khaliq_
Created: _15/04/19_

## 1.0. Information
I decided to create the Air Quality API due to the emergence of pollution, climate change issues. Users like to stay aware of their health and part of that is how healthy the air is they are breathing. This webpage will inform users of how healthy the air is in the location they request.

This tutorial is for the Air Quality API webpage. The API call takes two sets of information from the user. The latitude  and the longitude. The API then returns the ACI number which indicates how healthy the air is. There is a colour code below the map to clarify the colour to the danger levels of the polluion levels.

## 2.0. Functionality
* Map displays initially as page loads.
* Enter latitude and longitude values in a text box.
* Map relocates to the new entered position (latitude, longitude) after user presses the load air quality button.
* Map adds a marker to the new position (latitude, longitude) after the user presses the load air quality button.
* web page displays the colour code in relation to the danger levels for user assistance in identifying the meaning of each colour and how it affects the health of those people in those cities.

## 3.0. How the page was created
I first started developing in a different workspace from the group as the vue.js framework was not well known. First the index.html page was created with the skeleton html template. The author added jquery library, javascript page source, bootstrap library and google map library to the index.html page.

I used Postman to look at the API options, what call was best suited to the designed webpage. What the data would be used for. Which data was most suitable. the Postman application also identified the API call and the inputs required to make the call like the API key, latitude and the longitude.

I then started work on the javascript page where by the inital map was loaded using the google maps documentation for support. the author then used ajax which was a comfortable technology due to past experiences to the page. Whereby the call was made and the response data was returned to the console.

The Map was then programmed and Google Maps documentation was used to help with each function that was going to be used in the application. including the use of markers, re-centering the map, changing the colour of the markers and changing the shape of the marker.

I then started on adding the colour code legend, adding error handling to the ajax call, adding form validtion in html/javascript. The author then started integrating the site in the vue framework. To do this the author looked at Vue courses/tutorials to help with the coding process. Once the web page was working some styling was done and then the page was ready to merge with the other branches in Github.
</vue-markdown>
	</div>
</template>

<script lang="ts">
	import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
    declare var Prism: any;

	@Component({})
	export default class AirQualityTutorial extends Vue {
		tocHtml: string = "";
		tocRenderered(tocHtml: string) {
			this.tocHtml = tocHtml;
        }
        
        updated() {
			Prism.highlightAll();
		}
	}
</script>
