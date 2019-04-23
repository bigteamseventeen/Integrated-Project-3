<template>
    <div class="container">
        <div class="row" style="margin-bottom: 10px;">
            <div class="col-md-12" style="margin-bottom: 10px;">
                <h3>Movie Comparisons</h3>
                <div class="card">
                    <div class="card-body">
                        <div ref="chart"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="card" style="margin-bottom: 10px;">
                    <div class="card-body">
                        <h4 class="card-title">Enter film</h4>
                        <div class="form-group">
                            <input type="text" class="form-control" aria-describedby="helpIdName"
                                   placeholder="Iron Man" v-model="formName">
                            <small id="helpIdName" class="form-text text-muted">Enter a movie name</small>
                        </div>

                        <div class="form-group">
                            <input type="text" class="form-control" aria-describedby="helpIdYear"
                                   placeholder="2008" v-model="formYear">
                            <small id="helpIdYear" class="form-text text-muted">The year the movie was released</small>
                        </div>

                        <div class="form-group">
                            <input type="text" class="form-control" aria-describedby="helpIdYear"
                                   placeholder="2010" v-model="formComYear">
                            <small id="helpIdComYear" class="form-text text-muted">Compare your movie to the top 3 from this year</small>
                        </div>

                        <div class="form-check">
                            <label class="form-check-label">
                                <input type="checkbox" class="form-check-input" value="true" checked
                                       v-model="formViewBudget">
                                View budget and revenue
                            </label>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button type="button" class="btn btn-primary float-md-right"
                                @click="searchButton_Click">
                            Perform Search</button>
                    </div>
                </div>
            </div>

            <!--<div class="col-auto">
                <div class="card">
                    <div class="card-body" style="width: 185px">
                        <img style="width: 185px;" :src="'https://image.tmdb.org/t/p/w185' + viewData.Poster_path">
                    </div>
                </div>
            </div>-->

            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Details of {{viewData.Title}}</h4>
                        <img style="width: 185px;" :src="'https://image.tmdb.org/t/p/w185' + viewData.Poster_path">
                        <div style="vertical-align: text-top">
                            <p>ID: {{viewData.ID}}</p>
                            <p>Title: {{viewData.Title}}</p>
                            <p>Average Rating: {{viewData.voteAvg}}</p>
                            <p>Description: {{viewData.Desc}}</p>

                        </div>
                    </div>


                </div>
            </div>
            <div class="col-md-6">
            <div class="card" style="align: right">
                <div class="card-body">
                    <h4 class="card-title">Details of {{viewCompData.Title1}}</h4>
                    <img style="width: 185px;" :src="'https://image.tmdb.org/t/p/w185' + viewCompData.Poster_path1">
                    <p>ID: {{viewCompData.ID1}}</p>
                    <p>Title: {{viewCompData.Title1}}</p>
                    <p>Average Rating: {{viewCompData.voteAvg1}}</p>
                    <p>Description: {{viewCompData.Description1}}</p>
                </div>
            </div>
        </div>
            <div class="col-md-6">
                <div class="card" style="align: right">
                    <div class="card-body">
                        <h4 class="card-title">Details of {{viewCompData.Title2}}</h4>
                        <img style="width: 185px;" :src="'https://image.tmdb.org/t/p/w185' + viewCompData.Poster_path2">
                        <p>ID: {{viewCompData.ID2}}</p>
                        <p>Title: {{viewCompData.Title2}}</p>
                        <p>Average Rating: {{viewCompData.voteAvg2}}</p>
                        <p>Description: {{viewCompData.Description2}}</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card" style="align: right">
                    <div class="card-body">
                        <h4 class="card-title">Details of {{viewCompData.Title3}}</h4>
                        <img style="width: 185px;" :src="'https://image.tmdb.org/t/p/w185' + viewCompData.Poster_path3">
                        <p>ID: {{viewCompData.ID3}}</p>
                        <p>Title: {{viewCompData.Title3}}</p>
                        <p>Average Rating: {{viewCompData.voteAvg3}}</p>
                        <p>Description: {{viewCompData.Description3}}</p>
                    </div>
                </div>
            </div>
<!--
<img style="width: 185px;" :src="'https://image.tmdb.org/t/p/w185' + viewCompData.Poster_path2">
                        <img style="width: 185px;" :src="'https://image.tmdb.org/t/p/w185' + viewCompData.Poster_path3">
-->

        </div>
        <div class="col-md-4">
        <!--<div class="card">
            <img style="width: 185px" :src="'https://image.tmdb.org/t/p/w185' + viewData.Poster_path">
        </div>-->
        </div>
    </div>

</template>

<script lang="ts">
    import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
    import DataTable = google.visualization.DataTable;
    import * as $ from "jquery";



    //let car = "dog"

//['Avengers: Assemble', 220000000, 1519557910, 1299557910]

    @Component({})
    export default class MoviesPage extends Vue {
        //
        // ---------- Properties ----------

        //
        // ---------- Data ----------
        formName: string = "Iron Man";
        formYear: Number = 2008;
        formComYear: Number = 2010;
        formViewBudget: boolean = false;
        viewData: { Title: string, voteAvg: number, ID: number, Desc: string, Net: number, Poster_path: string } = {
          Title: "", voteAvg: 0, ID: 0, Desc: "", Net: 0, Poster_path: ""
        };
        viewCompData: { Poster_path1: string, Poster_path2: string, Poster_path3: string, Title1: string, Title2: string,
            Title3: string, ID1: number, ID2: number, ID3: number, voteAvg1: number, voteAvg2: number, voteAvg3: number,
        Description1: string, Description2: string, Description3: string} = {
            Poster_path1: "", Poster_path2: "", Poster_path3: "", Title1: "", Title2: "", Title3: "", ID1: 0, ID2: 0,
            ID3: 0, voteAvg1: 0, voteAvg2: 0, voteAvg3: 0, Description1: "", Description2: "", Description3: ""
        };


        //
        // ---------- Methods and Computed ----------
        constructor() { super(); } // Initialize data here if you cant above
        mounted() {
            // // Load the charts
            google.charts.load('current', {packages: ['corechart', 'bar']});
            google.charts.setOnLoadCallback(this.chartsLoadCallback);
        } // On Component Load, use instead of constructor!

        beforeUpdated(): void { } // Before Render

        // Chart load
        chartsLoadCallback(): void {

        }


/*
        findThreeFilms(){
            let movies = this;

            let baseUrl = "https://api.themoviedb.org/3/discover/movie?api_key=0ff577cec03e7f3e1f3502ba86722414&&primary_release_year="
            let restQuery = "&sort_by=revenue.desc"
            let comYear = this.formComYear + "";
            let urlString = "".concat(baseUrl, comYear, restQuery);

            if(this.formComYear > 2019)
            {
                console.log("Invalid year");
                return;
            }

            $.ajax({
                url:urlString,
                async:false,
                success: (searchResults) => {
                    let results: any = searchResults.results;

                    var movid0 = results[0].id;
                    var movid1 = results[1].id;
                    var movid2 = results[2].id;
                    var movids = [movid0, movid1, movid2];
                    console.log("3 movie IDs: ", movid0, movid1, movid2);
                    let details = movies.findDetailsThreeMovies(movids);
                    console.log(details[0]);
                    return details;
                },
                error:(xhr, status, err) => {
                    console.error("failed")
                }
            })
        }
*/
        //finds the details of the top 3 films in a given year
        findDetailsThreeMovies(movids){
            let instance = this;
            let baseUrl = "https://api.themoviedb.org/3/movie/";
            let restUrl = "?language=en-UK&api_key=0ff577cec03e7f3e1f3502ba86722414";
            const details = []
            let dets = [];
            //do this 3 times
            for (var i = 0; i < 3; i++){
                let url = "".concat(baseUrl, movids[i], restUrl);
                $.ajax({
                    url:url,
                    //there was in issue with the console running faster than ajax
                    async: false,
                    success: (searchResults) => {
                        let results: any = searchResults.results;

                        let movName = searchResults.title;

                        let movBud = searchResults.budget;

                        let movRev = searchResults.revenue;

                        //adds these details about the movie
                        dets.push([movName], [movBud], [movRev]);
                        console.log("adding", dets);


                    },
                    error:(xhr, status, err) => {
                        console.error("failed")
                    }
                })
            }

            console.log("RESULTS: ", dets);

            return dets;

        } //end of findDetailsThreeMovies

        // Search Button click
        searchButton_Click(): void {
            //used to hold the details of the movie in the search result
            let movies = this;

            let baseUrl = "https://api.themoviedb.org/3/search/movie?api_key=0ff577cec03e7f3e1f3502ba86722414&language=en-US&query=";
            let movieName = this.formName.replace(" ", "%20");
            let movieYear = this.formYear + "";
            let query = "&page=1&primary_release_year=";
            let urlString = "".concat(baseUrl, movieName, query, movieYear);

            //if the user enters no details
            if (movieName == "" || this.formYear == 0) {
                console.log("form not filled out");
                return;
            }

            //calling the api
            $.ajax({
                url: urlString,
                success: (searchResults) => {
                    let results: any = searchResults.results;

                    //populating the fields on the site
                    movies.viewData.ID = results[0].id;
                    movies.viewData.Title = results[0].title;
                    movies.viewData.voteAvg = results[0].vote_average;
                    movies.viewData.Desc = results[0].overview;
                    movies.viewData.Poster_path = results[0].poster_path;

                    //movies.viewData.Poster = "https://image.tmdb.org/t/p/w185" + results[0].poster_path;

                    //finds more details about the site
                    movies.findMovieDetails(results[0].id);
                },
                error: (xhr, status, err) => {
                    console.error("failed")
                }
            })
        }// end of search button on click

        // Get movie details
        findMovieDetails(movieId): void {
            let instance = this;
            let baseUrl = "https://api.themoviedb.org/3/movie/";
            let restUrl = "?language=en-UK&api_key=0ff577cec03e7f3e1f3502ba86722414";
            let url = "".concat(baseUrl, movieId, restUrl);
            //let movies = this;

            //calls api using the above url
            $.ajax({
                url: url,
                success: (searchResults) => {

                    console.log(searchResults);
                    instance.drawBarColours(searchResults);
                },
                error: (xhr, status, err) => {
                    console.error("failed")
                }
            })
        } //end of finding details about the user's entered movie

        // Draw the bars in the chart
        drawBarColours({title, budget, revenue}): void{
            console.log({title, budget, revenue});

            //displaying the net
            this.viewData.Net = revenue - budget;

                let data: DataTable = null;

                //if the user selects to see the budgets and revenues of the movies
                if (this.formViewBudget) {

                    let baseUrl = "https://api.themoviedb.org/3/discover/movie?api_key=0ff577cec03e7f3e1f3502ba86722414&&primary_release_year="
                    let restQuery = "&sort_by=revenue.desc"
                    let comYear = this.formComYear + "";
                    let urlString = "".concat(baseUrl, comYear, restQuery);

                    //if the user enters an invalid year
                    if(this.formComYear > 2019 || this.formComYear < 1940)
                    {
                        console.log("Invalid year");
                        return;
                    }

                    $.ajax({
                        url:urlString,
                        success: (searchResults) => {
                            let results: any = searchResults.results;


                            let movid0 = results[0].id;
                            let movid1 = results[1].id;
                            let movid2 = results[2].id;
                            let movids = [movid0, movid1, movid2];

                            //details of films on page
                            this.viewCompData.Poster_path1 = results[0].poster_path;
                            this.viewCompData.Poster_path2 = results[1].poster_path;
                            this.viewCompData.Poster_path3 = results[2].poster_path;
                            this.viewCompData.Title1 = results[0].title;
                            this.viewCompData.Title2 = results[1].title;
                            this.viewCompData.Title3 = results[2].title;
                            this.viewCompData.ID1 = results[0].id;
                            this.viewCompData.ID2 = results[1].id;
                            this.viewCompData.ID3 = results[2].id;
                            this.viewCompData.voteAvg1 = results[0].vote_average;
                            this.viewCompData.voteAvg2 = results[1].vote_average;
                            this.viewCompData.voteAvg3 = results[2].vote_average;
                            this.viewCompData.Description1 = results[0].overview;
                            this.viewCompData.Description2 = results[1].overview;
                            this.viewCompData.Description3 = results[2].overview;
                            //end of details of films on page

                            console.log("3 movie IDs: ", movid0, movid1, movid2);
                            let details = this.findDetailsThreeMovies(movids);

                            //the details of all 3 top movies from the year
                            let mov1N = details[0];
                            let mov1B = details[1];
                            let mov1R = details[2];
                            let mov2N = details[3];
                            let mov2B = details[4];
                            let mov2R = details[5];
                            let mov3N = details[6];
                            let mov3B = details[7];
                            let mov3R = details[8];
                            console.log("got movie", mov1N);
                            console.log(google, google.visualization, google.visualization.arrayToDataTable);
                            data = google.visualization.arrayToDataTable([
                                ['Movie', 'Budget', 'Revenue'],
                                [title, budget, revenue],
                                [mov1N, mov1B, mov1R],
                                [mov2N, mov2B, mov2R],
                                [mov3N, mov3B, mov3R]
                            ]);
                            let options = {
                                title: 'Revenue and Budget Comparison',
                                chartArea: {width: '50%'},
                                colors: ['#494940', '#04af01'],
                                hAxis: {
                                    title: 'Money($)',
                                    minValue: 0
                                },
                                vAxis: {
                                    title: 'Movie'
                                }
                            };
                            let chart = new google.visualization.BarChart(this.$refs.chart as Element);
                            chart.draw(data, options);
                        },
                        error:(xhr, status, err) => {
                            console.error("failed")
                        }
                    });
                }
                //if the user wishes to just see the budgets of the movies
                else {
                    let baseUrl = "https://api.themoviedb.org/3/discover/movie?api_key=0ff577cec03e7f3e1f3502ba86722414&&primary_release_year="
                    let restQuery = "&sort_by=revenue.desc"
                    let comYear = this.formComYear + "";
                    let urlString = "".concat(baseUrl, comYear, restQuery);

                    if(this.formComYear > 2019)
                    {
                        console.log("Invalid year");
                        return;
                    }
                    $.ajax({
                        url:urlString,
                        success: (searchResults) => {
                            let results: any = searchResults.results;


                            let movid0 = results[0].id;
                            let movid1 = results[1].id;
                            let movid2 = results[2].id;
                            let movids = [movid0, movid1, movid2];

                            //details of films on page
                            this.viewCompData.Poster_path1 = results[0].poster_path;
                            this.viewCompData.Poster_path2 = results[1].poster_path;
                            this.viewCompData.Poster_path3 = results[2].poster_path;
                            this.viewCompData.Title1 = results[0].title;
                            this.viewCompData.Title2 = results[1].title;
                            this.viewCompData.Title3 = results[2].title;
                            this.viewCompData.ID1 = results[0].id;
                            this.viewCompData.ID2 = results[1].id;
                            this.viewCompData.ID3 = results[2].id;
                            this.viewCompData.voteAvg1 = results[0].vote_average;
                            this.viewCompData.voteAvg2 = results[1].vote_average;
                            this.viewCompData.voteAvg3 = results[2].vote_average;
                            this.viewCompData.Description1 = results[0].overview;
                            this.viewCompData.Description2 = results[1].overview;
                            this.viewCompData.Description3 = results[2].overview;
                            //end of details of films on page
                            console.log("3 movie IDs: ", movid0, movid1, movid2);
                            let details = this.findDetailsThreeMovies(movids);

                            //the details of all 3 top movies from the year
                            let mov1N = details[0];
                            let mov1B = details[1];

                            let mov2N = details[3];
                            let mov2B = details[4];

                            let mov3N = details[6];
                            let mov3B = details[7];

                            console.log("got movie", mov1N);
                            console.log(google, google.visualization, google.visualization.arrayToDataTable);
                            data = google.visualization.arrayToDataTable([
                                ['Movie', 'Budget'],
                                [title, budget],
                                [mov1N, mov1B],
                                [mov2N, mov2B],
                                [mov3N, mov3B]
                            ]);
                            let options = {
                                title: 'Revenue and Budget Comparison',
                                chartArea: {width: '50%'},
                                colors: ['#494940'],
                                hAxis: {
                                    title: 'Money($)',
                                    minValue: 0
                                },
                                vAxis: {
                                    title: 'Movie'
                                }
                            };
                            let chart = new google.visualization.BarChart(this.$refs.chart as Element);
                            chart.draw(data, options);
                        },
                        error:(xhr, status, err) => {
                            console.error("failed")
                        }
                    });
                } //end of else

        }// end of draw bar graph function
    }
</script>

<style scoped>

</style>