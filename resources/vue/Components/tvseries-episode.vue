<template>
	<a class="tvseries list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex justify-content-between">
            <div class="p-0">
                <h5 class="mb-1">{{tvS.name}}</h5>
                <p class="mb-1" style="font-size: 14px;">Season: <strong>{{tvS.season_number}}</strong> Episode: <strong>{{tvS.episode_number}}</strong></p>
                <p class="mb-1" style="font-size: 14px;">First Aired: <strong>{{tvS.air_date}}</strong></p>
            </div>
            <div class="p-0">
                <img style="height: 70px" :src="'https://image.tmdb.org/t/p/w500' + tvS.still_path">
            </div>
        </div>
    </a>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator';
    import * as TVID_Season from "TVID_Season";
    import TVSeries from '../Pages/TVSeries.vue';

	@Component({})
	export default class TVSeriesEpisode extends Vue {

        @Prop()
        tvS: TVID_Season.Episode;

        @Prop()
        tvSeries: TVSeries;

		constructor() {
            super();
        }

    }
</script>

<style lang="sass" scoped>

</style>
