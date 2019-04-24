<template>
	<div class="container" style="padding: 10px;">
		<h1>Table of Contents</h1>
		<div v-html="tocHtml" style="margin-bottom: 50px;"></div>

<vue-markdown :toc="true" v-on:toc-rendered="tocRenderered">
# Students Page

The students page displays statistics about student enrolment from the World Bank API.

### What it does
The students page takes statistics from the World Bank API and displays it in a bar chart. It uses data about the amount of students enrolled in a course from the years 2009 to 2015 to show a comparison in the amount of students that are enrolled in a course in those years. The graph displays the data as a percentage of the total students that are enrolled on that course.

### The API
The API that I used was the World Bank API.
The World Bank API has a lot of different data available on it ranging from country indicators to stats about student enrolment which is what I used.

Link to the data I used: https://api.worldbank.org/v2/countries/GBR/indicators/UIS.FOSEP.56.F400?date=2009:2015&format=json

The API has a different code for each subject area that you can use to get the data about different subject areas. So in the link provided the code is "UIS.FOSEP.56.F400" which returns data for science subjects. 

### How it was created

To create this page I used the following technologies:

* [Vue.js] - Vue is an open source JavaScript framework
* [TypeScript] - TypeScript is an open source programming language from Microsoft
* [Morris.js] - Morris.js is an easy to use chart tool
* [World Bank API] - The world Bank API was used to get the data
* [VSCode] - VSCode is the development environment I used to create the page

### Get data from the API and visualize the data
To get the data from the API the following function was used
```
getInformation(callback) {
	$.get({
		url:`https://api.worldbank.org/v2/countries/GBR/indicators/UIS.FOSEP.56.F400?date=2009:2015&format=json`,
		dataType:  'json',
		success:  callback
	});
}
```

To visualize the data from the API the following function was used
```
displayChart(element) {
	this.getInformation(function(data) {
		let  chart  = [];
		let  yeardata  =  data[1].reverse();
		for(let  x  =  0; x  %lt;  yeardata.length; x++) {
			let  i  =  yeardata[x];
			chart.push({year:  i.date, value:  i.value});
		}
		
		Morris.Bar({
			element:  element,
			data:  chart,
			xkey:  'year',
			ykeys: ['value'],
			labels: ['Percentage(%)'],
			barColors: ["#008000"]
		});
	});
}
```
The tool that was used to visualize the data was Morris.js.

### Todos

 - Add more sets of data from other courses
 - Add data about different areas
 - Add functionality to allow users to change the type of graph
 - Add functionality to allow users to search through the available data

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
			Prism.highlightAll();
		}
	}
</script>
