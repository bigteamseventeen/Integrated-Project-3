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
            <div class="col-md-6">
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
                        <h4 class="card-title">Showing results for</h4>
                        <img style="width: 185px;" :src="'https://image.tmdb.org/t/p/w185' + viewData.Poster_path">
                        <div style="vertical-align: text-top">
                            <p>ID: {{viewData.ID}}</p>
                            <p>Title: {{viewData.Title}}</p>
                            <p>Average Rating: {{viewData.voteAvg}}</p>
                            <p>Description: {{viewData.Desc}}</p>
                            <p>Net: {{viewData.Net}}</p>
                        </div>
                    </div>


                </div>
            </div>
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

    @Component({})
    export default class MoviesPage extends Vue {
        //
        // ---------- Properties ----------

        //
        // ---------- Data ----------
        formName: string = "Iron Man";
        formYear: Number = 2008;
        formViewBudget: boolean = false;
        viewData: { Title: string, voteAvg: number, ID: number, Desc: string, Net: number, Poster_path: string } = {
          Title: "", voteAvg: 0, ID: 0, Desc: "", Net: 0, Poster_path: ""
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
        }

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
        }

        // Draw the bars in the chart
        drawBarColours({title, budget, revenue}): void {
            console.log({title, budget, revenue});

            //displaying the net
            this.viewData.Net = revenue - budget;
            var net = revenue - budget;

            if (net < 0) {

            let data: DataTable = null;
            if (this.formViewBudget) {
                console.log(google, google.visualization, google.visualization.arrayToDataTable);

                data = google.visualization.arrayToDataTable([
                    ['Movie', 'Budget', 'Revenue'],
                    [title, budget, revenue]
                ]);
            }
            else {
                console.log(google, google.visualization, google.visualization.arrayToDataTable);

                data = google.visualization.arrayToDataTable([
                    ['Movie', 'Budget'],
                    [title, budget]
                ]);
            }
                //When the movie makes a loss, the revenue bar is red
                let options = {
                    title: 'Revenue and Budget Comparison',
                    chartArea: {width: '50%'},
                    colors: ['#494940', '#db0704'],
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

            }
            else {
                let data: DataTable = null;
                if (this.formViewBudget) {
                    console.log(google, google.visualization, google.visualization.arrayToDataTable);

                    data = google.visualization.arrayToDataTable([
                        ['Movie', 'Budget', 'Revenue', 'Net'],
                        [title, budget, revenue, net]
                    ]);
                } else {
                    console.log(google, google.visualization, google.visualization.arrayToDataTable);

                    data = google.visualization.arrayToDataTable([
                        ['Movie', 'Budget'],
                        [title, budget]
                    ]);
                }
                        let options = {
                        title: 'Revenue and Budget Comparison',
                        chartArea: {width: '50%'},
                        colors: ['#494940', '#ffe500', '#2eb72c'],
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

            }

        }
    }
</script>

<style scoped>

</style>