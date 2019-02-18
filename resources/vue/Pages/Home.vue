<template>
	<section class="jumbotron text-center jumbotron-header">
		<div class="container">
			<h1 class="jumbotron-heading">Album example</h1>
			<p class="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
			<p>
				<a href="#" class="btn btn-primary my-2">Main call to action</a>
				<a href="#" class="btn btn-secondary my-2">Secondary action</a>
			</p>
		</div>
	</section>
</template>

<script lang="ts">
	import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator';

	@Component({})
	export default class extends Vue {
		//
		// ---------- Properties ----------

		//
		// ---------- Data ----------

		//
		// ---------- Methods and Computed ----------
		constructor() { super(); }
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