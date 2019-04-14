<template>
	<a class="tvseries list-group-item list-group-item-action flex-column align-items-start" @click="onClick">
        <div class="d-flex w-100 justify-content-between">
            <div class="p-0">
                <h5 class="mb-1">{{tvS.name}}</h5>
                <p class="mb-1" style="font-size: 14px;">Average Rating: <strong>{{tvS.vote_average}}</strong></p>
                <p class="mb-1" style="font-size: 14px;">User Ratings: <strong>{{tvS.vote_count}}</strong></p>
                <p class="mb-1" style="font-size: 14px;">First Aired: <strong>{{tvS.first_air_date}}</strong></p>
            </div>
            <div class="p-0">
                <img style="height: 120px" :src="'https://image.tmdb.org/t/p/w500' + tvS.poster_path">
            </div>
        </div>
    </a>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator';

    /// <reference path="TVSeriesModules.ts" />
    import * as SeriesList from "SeriesList";
    import TVSeries from '../Pages/TVSeries.vue';

	@Component({})
	export default class TVSeriesItem extends Vue {

        @Prop()
        tvS: SeriesList.Result;

        @Prop()
        tvSeries: TVSeries;

		constructor() {
            super();
        }

        onClick(): void {
            this.tvSeries.loadShow(this.tvS["id"]);
        }

    }
</script>

<style lang="sass" scoped>

    .tvseries
        cursor: pointer

</style>
