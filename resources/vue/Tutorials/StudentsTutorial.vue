<template>
	<div class="container" style="margin: 10px;">
		<h1>Table of Contents</h1>
		<div v-html="tocHtml" style="margin-bottom: 50px;"></div>

<vue-markdown :toc="true" v-on:toc-rendered="tocRenderered">
# students tutorial
</vue-markdown>
	</div>
</template>

<script lang="ts">
	import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
    declare var Prism: any;

	@Component({})
	export default class StudentsTutorial extends Vue {
		tocHtml: string = "";
		tocRenderered(tocHtml: string) {
			this.tocHtml = tocHtml;
        }
        
        updated() {
			console.log("updated!");
			Prism.highlightAll();
		}
	}
</script>
