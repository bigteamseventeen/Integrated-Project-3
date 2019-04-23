<template>
    <div class="container">
        <h1>Student Statistics</h1>
        <h2>Percentage of students enroled in science courses from 2009 to 2015</h2>       
        <div ref="chart" style="height: 200px;"></div>  
    </div>
</template>

<script lang="ts">
	import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
    import * as $ from "jquery";

    declare var Morris: any;

	@Component({})
	export default class extends Vue {
		//
		// ---------- Properties ----------

		//
		// ---------- Data ----------

		//
		// ---------- Methods and Computed ----------
		constructor() { super(); } // Initialize data here if you cant above
		mounted() { 
            this.displayChart(this.$refs.chart)
        } // On Component Load, use instead of constructor!
        beforeUpdated() { } // Before Render
        
        getInformation(callback) {
            $.get({
                url: `https://api.worldbank.org/v2/countries/GBR/indicators/UIS.FOSEP.56.F400?date=2009:2015&format=json`,
                dataType: 'json',
                success: callback
            });  
        }

        displayChart(element) {
            this.getInformation(function(data) {
                let chart = [];
                let yeardata = data[1].reverse();
                for(let x = 0; x < yeardata.length; x++) {
                    let i = yeardata[x];
                    chart.push({year: i.date, value: i.value});
                }
                
                Morris.Bar({
                    element: element,
                    data: chart,
                    xkey: 'year',
                    ykeys: ['value'],
                    labels: ['Percentage(%)'],
                    barColors: ["#008000"]
                });
            });
        }
	}
</script>


<style lang="sass" scoped>

</style>