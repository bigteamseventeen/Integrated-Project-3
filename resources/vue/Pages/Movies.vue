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
                                   placeholder="Star Wars" v-model="formName">
                            <small id="helpIdName" class="form-text text-muted">Enter a movie name</small>
                        </div>

                        <div class="form-group">
                            <input type="text" class="form-control" aria-describedby="helpIdYear"
                                   placeholder="1998" v-model="formYear">
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
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Showing results for</h4>
                        <p>ID: {{viewData.ID}}</p>
                        <p>Title: {{viewData.Title}}</p>
                        <p>Vote Avg: {{viewData.voteAvg}}</p>
                    </div>
                </div>
            </div>
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
        viewData: { Title: string, voteAvg: number, ID: number } = {
          Title: "", voteAvg: 0, ID: 0
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
            let movies = this;

            let baseUrl = "https://api.themoviedb.org/3/search/movie?api_key=0ff577cec03e7f3e1f3502ba86722414&language=en-US&query=";
            let movieName = this.formName.replace(" ", "%20");
            let movieYear = this.formYear + "";
            let query = "&page=1&primary_release_year=";
            let urlString = "".concat(baseUrl, movieName, query, movieYear);

            if (movieName == "" || this.formYear == 0) {
                console.log("form not filled out");
                return;
            }

            $.ajax({
                url: urlString,
                success: (searchResults) => {
                    let results: any = searchResults.results;

                    movies.viewData.ID = results[0].id;
                    movies.viewData.Title = results[0].title;
                    movies.viewData.voteAvg = results[0].vote_average;

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

            let data: DataTable = null;
            if (this.formViewBudget) {
                console.log(google, google.visualization, google.visualization.arrayToDataTable);

                data = google.visualization.arrayToDataTable([
                    ['Movie', 'Budget', 'Revenue'],
                    [title, budget, revenue]
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
                colors: ['#494940', '#ce310a'],
                hAxis: {
                    title: 'Money($)',
                    minValue: 0
                },
                vAxis: {
                    title: 'Movie'
                }
            };

            let chart = new google.visualization.BarChart( this.$refs.chart as Element );
            chart.draw(data, options);
        }
    }
</script>

<style scoped>

</style>