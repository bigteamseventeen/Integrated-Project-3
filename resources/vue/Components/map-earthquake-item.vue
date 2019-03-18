<template>
	<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Idk Glasgow!? ...</h5>
            <small><timeago :datetime="this.Data.properties.time" :auto-update="60"></timeago></small>
        </div>
        <p class="mb-1">Et ullamco voluptate ipsum do minim aliqua nostrud veniam enim irure anim nulla.</p>
        <small>13:21, Monday 18/03/2019.</small>
    </a>
</template>

<script lang="ts">
	import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
    import { Feature } from 'geojson';

	@Component({})
	export default class extends Vue {
		//
		// ---------- Properties ----------
        @Prop()
        Data: Feature;

		//
		// ---------- Data ----------

		//
		// ---------- Methods and Computed ----------
		constructor() {
            super();
            console.log("map-earthquake-item: constructor ", this);
        }

		mounted() {
            console.log("map-earthquake-item: mounted ", this);
        }

        

		beforeUpdated() {}
	}
</script>
