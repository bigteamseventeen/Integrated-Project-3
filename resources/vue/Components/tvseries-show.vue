<template>
	<a class="tvseries list-group-item list-group-item-action flex-column align-items-start" @click="onClick">
        <div class="d-flex w-100 justify-content-between">
            <div class="p-0">
                <h5 class="mb-1" style="font-size: 25px;">{{tvS_E.name}}</h5>
                <p class="mb-1" style="font-size: 14px;">Seasons: <strong>{{tvS_E.number_of_seasons}}</strong> Episodes: <strong>{{tvS_E.number_of_episodes}}</strong></p>
                <p class="mb-1" style="font-size: 14px;">First Aired: <strong>{{tvS_E.first_air_date}}</strong></p>
                <p class="mb-1" style="font-size: 14px;">Last Aired: <strong>{{tvS_E.last_air_date}}</strong></p>
                <p class="mb-1" style="font-size: 14px;">Overview: <strong>{{tvS_E.overview}}</strong></p>
            </div>
            <div class="p-1 showimage">
                <img style="height: 320px" :src="'https://image.tmdb.org/t/p/w500' + tvS_E.poster_path">
            </div>
        </div>
    </a>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator';

	/// <reference path="TVSeriesModules.ts" />
    import * as TVID from "TVID";
    import TVSeries from '../Pages/TVSeries.vue';

	@Component({})
	export default class TVSeriesShow extends Vue {

        @Prop()
        tvS_E: TVID.RootObject;

        @Prop()
        tvSeries: TVSeries;

		constructor() {
            super();
        }

        onClick(): void {
            document.location.href = this.tvS_E.homepage;
        }

    }
</script>

<style lang="css" scoped>

    .tvseries {
        cursor: pointer;
    }

    @media only screen and (max-width: 700px) {
        .showimage {
            display: none;
        }
    }

</style>
