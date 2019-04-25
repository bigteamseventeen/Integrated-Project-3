<template>
	<div class="container" style="padding: 10px;">
		<h1>Table of Contents</h1>
		<div v-html="tocHtml" style="margin-bottom: 50px;"></div>

<vue-markdown :toc="true" v-on:toc-rendered="tocRenderered">
# Movies Tutorial
## How To Use This Page
### Information
This page loads with a form which will ask the user for the following information:
- The name of the movie they wish to see details of
- The year this movie was initially released
- Whether or not they want to see the budget AND the revenue generated or just the budget of the movie
### Submission
#### Budget and Revenue
If the user ticks the checkbox for viewing the budget and revenue of the movie they have entered, a bar graph will be loaded showing
- The budget
- The revenue generated
- If the movie made a profit, this is shown

The following is displayed in a card below the bar graph:

- The movie's poster
- The movie's TMDb Movie ID
- The title
- The average user rating of the movie
- A description/overview of the movie
- The net profit/loss of the movie

#### Budget Only

If the checkbox is left unchecked, then the graph shows the budget only.
The card below the graph loads the same way as if the checkbox had been checked

#### Possible Issues
- When the user leaves any of the fields blank, the page does not reload
- If the user does not enter the correct name and year of release of a movie, the correct details are not guaranteed to load. 
- For example, entering "Infinity War" and "2019" will return the results for "Avengers: Endgame"

## The API

To get the data for this page, The Movie Database(TMDb) was used.

To get the information, 3 calls are made. The first call uses the details entered by the user to find some initial details about the movie, the 2nd call uses the ID from the initial search to get more details. The 3rd call looks for the films that ranked highest in revenue in the year entered by the user in the form.

> This API requires an API key any time a call is made.
> This can be found at https://www.themoviedb.org/ by 
> creating an account and requesting an API key. There is
> lots of documentation on this site which is very useful

### Using the user's data to find the ID of the film they are looking for
#### Purpose
The purpose of this initial call is to get basic details about the movie, particularly the ID of the movie which is used to get a more detailed look at the movie. Without this first call, the user would need to know the ID of the movie to search for the details required for the graph

##### URL
The URL for the first call looks like this:
https://api.themoviedb.org/3/search/movie?api_key=0ff577cec03e7f3e1f3502ba86722414&language=en-US&query=donnie%20darko&page=1&primary_release_year=2001

In this example, the user has entered "Donnie Darko" as the title and "2001" as the year. These details turn into "query=donnie%20darko" and "primary_release_year=2001". This query is then run using my API key

##### How the call was made
$.ajax was called using the URL created by the user's input

When results are successfully returned, the results are stored in a variavble called "searchResults". The results are then used to populate the properties and these properties (Title, ID, average rating, overview and poster path) are displayed to the user.

After these properties are populated, a function named "findMovieDetails(ID)" is called, passing the movie ID found to find more details. This function will make the next API call

##### Data
The following details are returned from this query:
| Attribute | Data Type |
| ------ | ------ |
| vote_count | number |
| id | number |
| video | boolean |
| vote_average | number |
| Title | string |
| Popularity | number |
| Poster_path | string |
| original_language | string |
| original_title | string |
| genre_ids | number |
| backdrop_path | string |
| adult | boolean |
| overview | string |
| release_date | date |

Most of this data goes unused for this page, the only details needed were: 
- ID
- Title
- Vote_average
- Overview
- Poster_path.

These details are shown to the user in the card below the bar graph and the ID is used in the next call to get more details about the movie

#### More details about the movie - Call
##### Purpose
The purpose of this call is to get more information about the movie because the initial call does not return all of the data we need. The details about the budget and revenue made by the movie will be returned, which is required for the bar graph

##### URL
The URL for this call looks like this:
https://api.themoviedb.org/3/movie/141?language=en-UK&api_key=0ff577cec03e7f3e1f3502ba86722414
In this example, the ID (141) has been taken from the previous call and put into this URL. A query is then run using my API key.

#### How the call was made
This call is made in the function "findMovieDetails(ID)". The URL for this call is created using the ID which was passed into the function.

$.ajax uses this URL to search for more details. When this is successful, the bar graph method is called, passing the searchResults from this query.

##### Data
The following details are returned from this query:
| Attribute | Data Type |
| ------ | ------ |
| adult | boolean |
| backdrop_path | string |
| belongs_to_collection | Array (Collection ID - number, name - string, poster_path - string, backdrop_path - string) |
| budget | number |
| genres | Array (Id - number, name - string) |
| homepage | string |
| id | number |
| imdb_id | number |
| original_language | string |
| original_title | string |
| overview | string |
| popularity | number |
| poster_path | string |
| production_companies | Array (id - number, logo_path - string, name - string, origin_country - string) |
| release_date | date |
| revenue | number |
| runtime | number |
| status | string |
| tagline | string |
| title | string |
| video | boolean |
| vote_average | number |
| vote_count | number |

Again, most of this data goes unused and the only details taken from this call are:
- budget
- revenue

These details are used to calculate the net profit/loss of the movie. These values and the net are displayed in the bar graph, depending on the input of the user.

## Finding the data about the films with the highest revenue in the year entered by the user
This call finds the movies with the highest revenue, takes the IDs of these movies and then gets more details about them. These details are sent to an array and then added to the data table which previously just held the data about the specific film being viewed by the user. More details are displayed below the form, including the movies' posters, descriptions and average rating.

## Drawing Graph
Google Charts was used to create the graph for this page, the following details are passed to a method named "DrawBarColours()":
- Title
- Budget
- Revenue

The form is checked to see if the user wishes to see just the budget or if they want to view the budget and revenue.

The graph displays the budget and revenue of each film, depending on the 'budget and revenue' checkbox

The options are set so that the budget bar is grey and the revenue bar is green.

**END OF TUTORIAL PAGE**
**Marc Millar - Team 17**
</vue-markdown>
	</div>
</template>

<script lang="ts">
	import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
    declare var Prism: any;

	@Component({})
	export default class MoviesTutorial extends Vue {
		tocHtml: string = "";
		tocRenderered(tocHtml: string) {
			this.tocHtml = tocHtml;
        }
        
        updated() {
			Prism.highlightAll();
		}
	}
</script>
