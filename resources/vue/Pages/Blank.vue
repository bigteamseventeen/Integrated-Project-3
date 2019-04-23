<template>
	<div></div>
</template>

<script lang="ts">
	import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator';

	@Component({})
	export default class Blank extends Vue {
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