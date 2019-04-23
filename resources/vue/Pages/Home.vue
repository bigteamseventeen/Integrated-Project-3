<template>
	<section class="jumbotron text-center jumbotron-header">
		<div class="container">
			<h1 class="jumbotron-heading">Banner page example</h1>
			<p class="lead text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis feugiat, nunc aliquet dapibus ornare, diam urna venenatis tellus, quis congue libero dui vitae mauris. Sed malesuada libero interdum felis dignissim.</p>
			<p>
				<router-link to="/pricing" class="btn btn-primary my-2">Product Pricing</router-link>
				<a href="#" class="btn btn-secondary my-2">View Terms and Conditions</a>
			</p>
		</div> 
	</section>
</template>

<script lang="ts">
	import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator';

	@Component({})
	export default class Home extends Vue {
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

<style scoped>
	.jumbotron {
		padding-top: 3rem;
		padding-bottom: 3rem;
		margin-bottom: 0;
		background-color: #fff;
	}
	@media (min-width: 768px) {
		.jumbotron {
			padding-top: 6rem;
			padding-bottom: 6rem;
		}
	}

	.jumbotron p:last-child {
		margin-bottom: 0;
	}

	.jumbotron-heading {
		font-weight: 300;
	}

	.jumbotron .container {
		max-width: 40rem;
	}
</style>