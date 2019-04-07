<template>
	<div class="main-content-area">
        <div class="row py-3">
            <div class="col" id="main">
                <h1>Main Area</h1>
                ...   
            </div>

            <div class="col-3 order-2" id="sticky-sidebar">
                <div class="sticky-top">
                    ...
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
	import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator';

	@Component({})
	export default class TestPage extends Vue {
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

.main-content-area 
    margin: 40px
    max-width: 1200px

</style>