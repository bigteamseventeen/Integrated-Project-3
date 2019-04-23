<template>
	<div>
		<div class="row ng-scope">
			<div class="col-md-4">
				<h2>Names</h2>
				<div class="table-responsive">
					<table class="table table-bordered">
						<tbody>
							<tr>
								<th>Name</th>
								<td>{{country.name}}</td>
							</tr>

							<tr>
								<th>Name (Native)</th>
								<td>{{country.nativeName}}</td>
							</tr>

							<tr>
								<th>Alternative Names</th>
								<td>{{country.altSpellings.join(', ')}}</td>
							</tr>

							<tr><th colspan="2">Translations</th></tr>
							<tr v-for="(v,k) in country.translations" :key="k">
								<th>{{k}}</th>
								<td>{{v}}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			
			<div class="col-md-4">
				<h2>Language(s)</h2>
				<div class="table-responsive">
					<table class="table table-bordered">
						<tbody>
							<tr v-for="l in country.languages" :key="l.iso639_2">
								<th>{{l.iso639_2}}</th>
								<td>{{l.name}}</td>
							</tr>
						</tbody>
					</table>
				</div>
				
				<h2>Geography</h2>
				<div class="table-responsive">
					<table class="table table-bordered">
						<tbody>
							<tr>
								<th>Region</th>
								<td class="ng-binding">{{country.region}}</td>
							</tr>
							<tr>
								<th>Subregion</th>
								<td class="ng-binding">{{country.subregion}}</td>
							</tr>
							<tr>
								<th>Capital</th>
								<td class="ng-binding">{{country.capital}}</td>
							</tr>
							<tr>
								<th>Demonym</th>
								<td class="ng-binding">{{country.demonym}}</td>
							</tr>
							<tr>
								<th>Lat/Lng</th>
								<td>
									<p v-if="country.latlng.length > 0">{{country.latlng[0]}}, {{country.latlng[1]}}</p>
								</td>
							</tr>
							<tr ng-show="country.area > 0" class="">
								<th>Area</th>
								<td>
									<span v-if="country.area > 0">{{country.area}} km²</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<div class="col-md-4">
				<h2>Flag</h2>
				<img :src="country.flag" width="100%" style="max-width: 500px">

				<h2>Codes</h2>
				<div class="table-reponsive">
					<table class="table table-bordered">
						<tbody>
							<tr>
								<th>ISO 3166-1 alpha-2</th>
								<td class="ng-binding">{{country.alpha2Code}}</td>
							</tr>
							<tr>
								<th>ISO 3166-1 alpha-3</th>
								<td class="ng-binding">{{country.alpha3Code}}</td>
							</tr>
							<tr>
								<th>ISO 3166-1 numeric</th>
								<td class="ng-binding">{{country.numericCode}}</td>
							</tr>
							<tr>
								<th>International calling code<span v-if="country.callingCodes.length > 1">s</span></th>
								<td>
									<p v-for="k in country.callingCodes" :key="k">{{k}}</p>
								</td>
							</tr>
							<tr>
								<th>ISO 4217 currency code<span v-if="country.currencies.length > 1">s</span></th>
								<td>
									<p v-for="k in country.currencies" :key="k.code">{{k.code}}</p>
								</td>
							</tr>
							<tr>
								<th>Top level domain<span v-if="country.topLevelDomain.length > 1">s</span></th>
								<td>
									<p v-for="k in country.topLevelDomain" :key="k">{{k}}</p>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
	import { 
		GetCountryFromLatLng, 
		GetCountryInformationFromCode,
		CountryInformation,
		BasicCountryInformation
	} from "../../ts/API/Geonames";

	@Component({})
	export default class MapCountryInformation extends Vue {
		//
		// ---------- Properties ----------
		@Prop() /** Simple country info */
		basic: BasicCountryInformation;
		@Prop() /** Advanced country information */
		country: CountryInformation;

		//
		// ---------- Data ----------
		showTranslations: boolean = false;


		//
		// ---------- Methods and Computed ----------
		constructor() { super(); } // Initialize data here if you cant above
		mounted() { } // On Component Load, use instead of constructor!
		beforeUpdated() { } // Before Render
		
		toggleTranslations() {

		}
	}
</script>

<style lang="scss" scoped>
	
</style>
