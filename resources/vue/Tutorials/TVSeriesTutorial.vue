<template>
	<div class="container" style="padding: 10px;">
		<h1>Table of Contents</h1>
		<div v-html="tocHtml" style="margin-bottom: 50px;"></div>

<vue-markdown :toc="true" v-on:toc-rendered="tocRenderered">
# TV Series Visualizer 

The TV Series Visualizer allows you to view episode ratings in a line or scatter chart, scaled by season.  
More details about a show is listed below, including a brief overview, airing dates and an extensive list of episodes.

## 1 - Features

  - Alternate between scatter and line chart by selecting the appropriate option above
  - Zoom in the map by selecting an area via dragging, right click will reset
  - All episodes are listed bottom right of the page, giving an image and appropriate season, episode numbers
  - Details about the TV Series are bottom left, giving a poster image and more details about the selected series
  - Click on the "Episode Details" panel to be taken to the homepage of the series
  - Automatic filtering of Specials
  - Search for a show via user input

## 2 - Utilised APIs

The TV Series Visualized is based on information obtained from [TMDb][tmdb]

| Endpoint | Documentation |
| ------ | ------ |
| /tv/{tv_id} | [3/tv/get-tv-details][tmdb_tv] |
| /tv/{tv_id}/season/{season_number} |[3/tv-seasons/get-tv-season-details][tmdb_tv_s] |
| /tv/top_rated  |[3/tv/get-top-rated-tv][tmdb_tv_tr] |
| /tv/popular |[3/tv/get-popular-tv-shows][tmdb_tv_mp] |

Visualizations are obtained from [Google Charts][gc]

| Chart | Documentation |
| ------ | ------ |
| Line | [docs/gallery/linechart][gc_lc] |
| Scatter | [docs/gallery/scatterchart][gc_sc] |
| Combo | [docs/gallery/combochart][gc_cc] |

## 3 - Tech

* [VueJS] - The Progressive JavaScript Framework
* [node.js] - a JavaScript runtime built on Chrome's V8 JavaScript engine
* [jQuery] - The Write Less, Do More, JavaScript Library
* [Jetbrains] - Developer Tools for Professionals and Teams
* [GitHub] - The world's leading software development platform

## 4 - Module Creation

Responses from Top Rated or Most Popular

```js
declare module "SeriesList" {

	export interface Result {
		poster_path: string;
		popularity: number;
		id: number;
		backdrop_path: string;
		vote_average: number;
		overview: string;
		first_air_date: string;
		origin_country: string[];
		genre_ids: number[];
		original_language: string;
		vote_count: number;
		name: string;
		original_name: string;
	}

	export interface RootObject {
		page: number;
		results: Result[];
		total_results: number;
		total_pages: number;
	}
	
}
```

Responses from TVID

```js
declare module TVID {

	export interface CreatedBy {
		id: number;
		credit_id: string;
		name: string;
		gender: number;
		profile_path: string;
	}

	export interface Genre {
		id: number;
		name: string;
	}

	export interface LastEpisodeToAir {
		air_date: string;
		episode_number: number;
		id: number;
		name: string;
		overview: string;
		production_code: string;
		season_number: number;
		show_id: number;
		still_path: string;
		vote_average: number;
		vote_count: number;
	}

	export interface Network {
		name: string;
		id: number;
		logo_path: string;
		origin_country: string;
	}

	export interface ProductionCompany {
		id: number;
		logo_path: string;
		name: string;
		origin_country: string;
	}

	export interface Season {
		air_date: string;
		episode_count: number;
		id: number;
		name: string;
		overview: string;
		poster_path: string;
		season_number: number;
	}

	export interface RootObject {
		backdrop_path: string;
		created_by: CreatedBy[];
		episode_run_time: number[];
		first_air_date: string;
		genres: Genre[];
		homepage: string;
		id: number;
		in_production: boolean;
		languages: string[];
		last_air_date: string;
		last_episode_to_air: LastEpisodeToAir;
		name: string;
		next_episode_to_air?: any;
		networks: Network[];
		number_of_episodes: number;
		number_of_seasons: number;
		origin_country: string[];
		original_language: string;
		original_name: string;
		overview: string;
		popularity: number;
		poster_path: string;
		production_companies: ProductionCompany[];
		seasons: Season[];
		status: string;
		type: string;
		vote_average: number;
		vote_count: number;
	}
}
```

Responses from TVID_Season

```js
declare module TVID_Season {

	export interface Crew {
		id: number;
		credit_id: string;
		name: string;
		department: string;
		job: string;
		profile_path: string;
	}

	export interface GuestStar {
		id: number;
		name: string;
		credit_id: string;
		character: string;
		order: number;
		profile_path: string;
	}

	export interface Episode {
		air_date: string;
		crew: Crew[];
		episode_number: number;
		guest_stars: GuestStar[];
		name: string;
		overview: string;
		id: number;
		production_code: string;
		season_number: number;
		still_path: string;
		vote_average: number;
		vote_count: number;
	}

	export interface RootObject {
		_id: string;
		air_date: string;
		episodes: Episode[];
		name: string;
		overview: string;
		id: number;
		poster_path: string;
		season_number: number;
	}

}

declare module SeriesList {

	export interface Result {
		poster_path: string;
		popularity: number;
		id: number;
		backdrop_path: string;
		vote_average: number;
		overview: string;
		first_air_date: string;
		origin_country: string[];
		genre_ids: number[];
		original_language: string;
		vote_count: number;
		name: string;
		original_name: string;
	}

	export interface RootObject {
		page: number;
		results: Result[];
		total_results: number;
		total_pages: number;
	}
}
```



## 5 - Obtaining data from TMDb

Top Rated or Most Popular

```js
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.themoviedb.org/3/tv/top_rated?page=1&language=en-US&api_key={api_key}",
  "method": "GET",
  "headers": {},
  "data": "{}"
}

$.ajax(settings).done(function (response) {
    // seriestlist: SeriesList.RootObject
    seriesList = response;
  });
```

TV Information

```js
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.themoviedb.org/3/tv/{tvid}?language=en-US&api_key={api_key}",
  "method": "GET",
  "headers": {},
  "data": "{}"
}

$.ajax(settings).done(function (response) {
  // tvInformation = TVID.RootObject
  tvInformation = response;
});
```

TV Season Information

```js
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.themoviedb.org/3/tv/{tvid}/season/{season_number}?language=en-US&api_key={api_key}",
  "method": "GET",
  "headers": {},
  "data": "{}"
}

$.ajax(settings).done(function (response) {
  // seasonInformation = TVID_Season.RootObject
  seasonInformation = response;
});
```

## 6 - Visualizing Data using Google Charts

### 6.1 -  Create a function to draw

Reference the chart loader in script tag

```html
&lt;script src=&quot;https://www.gstatic.com/charts/loader.js&quot;&gt;&lt;/script&gt;
```

Create a DataTable
```js
let data = new google.visualization.DataTable();
```

Add appropriate Columns - [API Refernece][gc_r]

```js
data.addColumn(type, opt_label, opt_id)
data.addColumn(description_object)
```

Add your data -  [API Refernece][gc_r]

```js
// numOrArray = the data you've collected
data.addRows(numOrArray)
```

Specify your options
```js
// these are the option the TV Series Visualizer uses
let options = {
	title: title,
	height: 500,
	chartArea: {'width' : '100%', 'height' : '80%', 'left' : '40', },
	legend: {'position': 'bottom' as 'bottom'},
	seriesType: $this.sType,
    explorer: {
		actions: ['dragToZoom', 'rightClickToReset'],
		axis: 'horizontal',
		keepInBounds: true,
		maxZoomIn: 7.0
	} as google.visualization.ComboChartOptions
```

Visualizing data using Google Charts

```js
// element = where the graph will be placed
let chart = new google.visualization.ComboChart(element);
let chart = new google.visualization.LineChart(element);
let chart = new google.visualization.ScatterChart(element);
```

Draw the chart

```js
chart.draw(data, options);
```

#### 6.2 - Set for your chart to load

Load packages

```js
google.charts.load('current', {
	packages: ['corechart', 'line']
});
```

Set the onLoadCallback

```js
google.setOnLoadCallback(function() {
    draw(hasSpecials, seasonCount, showData, title);
});
```

## 7 - Todos

 - Use Combo Chart to implement trendlines
 - Add options for viewing individual seasons
 - Integrate ratings from other sources



[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

	[gc]: https://developers.google.com/chart/
	[tmdb]: https://www.themoviedb.org/documentation/api
	[tmdb_tv]: https://developers.themoviedb.org/3/tv/get-tv-details
	[tmdb_tv_s]: https://developers.themoviedb.org/3/tv-seasons/get-tv-season-details
	[tmdb_tv_mp]: https://developers.themoviedb.org/3/tv/get-popular-tv-shows
	[tmdb_tv_tr]: https://developers.themoviedb.org/3/tv/get-top-rated-tv
	[gc_cc]: https://developers.google.com/chart/interactive/docs/gallery/combochart
	[gc_sc]: https://developers.google.com/chart/interactive/docs/gallery/scatterchart
	[gc_lc]: https://developers.google.com/chart/interactive/docs/gallery/linechart
	[VueJS]: https://vuejs.org/
	[node.js]: http://nodejs.org
	[jQuery]: http://jquery.com
	[Jetbrains]: https://www.jetbrains.com/
	[gc_r]: https://developers.google.com/chart/interactive/docs/reference
	[github]: https://github.com/
</vue-markdown>
	</div>
</template>

<script lang="ts">
	import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
    declare var Prism: any;


	@Component({})
	export default class TvSeriesTutorial extends Vue {
		tocHtml: string = "";
		tocRenderered(tocHtml: string) {
			this.tocHtml = tocHtml;
		}
        
		updated() {
			Prism.highlightAll();
		}
	}
</script>
