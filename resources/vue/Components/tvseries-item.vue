<template>
	<a class="tvseries list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{tvS.name}}</h5>
            <div class="p-0">
                <img style="height: 120px" :src="'https://image.tmdb.org/t/p/w500' + tvS.poster_path">
            </div>
        </div>
    </a>
</template>

<script lang="ts">
	import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
    /// <reference path="TVSeriesModules.ts" />
    import * as SeriesList from "SeriesList";
    import TVSeries from '../Pages/TVSeries.vue';

	@Component({})
	export default class TVSeriesItem extends Vue {
		//
		// ---------- Properties ----------
        @Prop()
        tvS: SeriesList.Result;

        @Prop()
        tvSeries: TVSeries;
		//
		// ---------- Methods and Computed ----------
		constructor() {
            super();
            // console.log("constructor ", this);
        }

		mounted() {
            // console.log("mounted ", this);
        }

		beforeUpdated() {}

    }
</script>

<style lang="sass" scoped>

    .tvseries
        cursor: pointer

</style>
