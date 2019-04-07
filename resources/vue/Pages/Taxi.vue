<template>
    <div class="container">	
		<div class="row">
			<div class="col-md-8"> 
				<h3>Map of Taxi</h3>
	

				<div class="container-map">
					<!-- Map -->
					<GmapMap :center="center" :zoom="zoom" style="width:100%;height:100%;" ref="gmap">
                    </GmapMap>
				</div>

				<!-- Debugging -->
				<div style="display:none;">
					<label>
						<gmap-autocomplete @place_changed="setPlace"></gmap-autocomplete>
						<button class="btn btn-primary" @click="addMarker">Add</button>
					</label>
					<br/>
				</div>		
			</div>
			<div class="col-md-4">
				<h3>Recent traffic jams</h3>
				
				
			</div>
		</div>
	</div>
</template>

<script lang="ts">
    import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator';

	@Component({})
	export default class TaxiPage extends Vue {
		//
		// ---------- Properties ----------

		//
		// ---------- Data ----------

		//
		// ---------- Methods and Computed ----------
		constructor() { super(); } // Initialize data here if you cant above
		mounted() { } // On Component Load, use instead of constructor!
		beforeUpdated() { } // Before Render
	}
</script>

<style lang="sass" scoped>

</style>
