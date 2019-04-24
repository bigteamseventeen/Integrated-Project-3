<template>
	<div class="container" style="padding: 10px;">
		<h1>Table of Contents</h1>
		<div v-html="tocHtml" style="margin-bottom: 50px;"></div>

<vue-markdown :toc="true" v-on:toc-rendered="tocRenderered">
## What is the purpose of GeoJSON?
GeoJSON is a open standard that is designed to allow multiple applications to communicate basic geographical features without having to rewrite numerous amount's of code to use multiple differnet API's. The purpose of this was to allow for many different api's to respond with a predefined format that saved the programmer time writing the implementation.

The GeoJSON format started its conception in March 2007 and the first specification was finalized in June 2008, Later in April 2015 the Internet Enginnering Task Force (IETF) had founded the Geographic JSON working group which updated the spec and released GeoJSON as [RFC 4946](https://tools.ietf.org/html/rfc7946).

## What does GeoJSON Contain? 
The type of information that GeoJSON can include is simple geographical features such as `points` (addresses, locations), `line strings` (Streets, highways and their boundaries), `polygons` (countries, provinces the tracts of land) and including collections of the types specified above.

## Why we are using GeoJSON?
We are using GeoJSON because of the USGS Earthquake API makes use of the GeoJSON Standard which we was able to install and get the types for through 
NPM `npm install @types/geojson`, this made development easier as we was able to the use the interfaces for the FeatureCollection and get intellisense type hinting 
during development.

## Examples of JSON Elements in GeoJSON
### `FeatureCollection` type
This is a `FeatureCollection` example containing the majority of possible values.
```js
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [102.0, 0.5]
      },
      "properties": {
        "prop0": "value0"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0]
        ]
      },
      "properties": {
        "prop0": "value0",
        "prop1": 0.0
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [100.0, 0.0], [101.0, 0.0], [101.0, 1.0],
            [100.0, 1.0], [100.0, 0.0]
          ]
        ]
      },
      "properties": {
        "prop0": "value0",
        "prop1": { "this": "that" }
      }
    }
  ]
}
```

### `Point` type structure
```js
{
    "type": "Point", 
    "coordinates": [30, 10]
}
```

### `LineString` type structure
```js
{
    "type": "LineString", 
    "coordinates": [
        [30, 10], [10, 30], [40, 40]
    ]
}
```

### `Polygon` type structure
```js
{
    "type": "Polygon", 
    "coordinates": [
        [[35, 10], [45, 45], [15, 40], [10, 20], [35, 10]], 
        [[20, 30], [35, 35], [30, 20], [20, 30]]
    ]
}
```

### `MultiPoint` type
```js
{
    "type": "MultiPoint", 
    "coordinates": [
        [10, 40], [40, 30], [20, 20], [30, 10]
    ]
}
```

### `MultiLineString` type
```js
{
    "type": "MultiLineString", 
    "coordinates": [
        [[10, 10], [20, 20], [10, 40]], 
        [[40, 40], [30, 30], [40, 20], [30, 10]]
    ]
}
```

### `MultiPolygon` type
```js
{
    "type": "MultiPolygon", 
    "coordinates": [
        [  [[30, 20], [45, 40], [10, 40], [30, 20]] ], 
        [  [[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]] ]
    ]
}
```
</vue-markdown>
	</div>
</template>

<script lang="ts">
	import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
    declare var Prism: any;

	@Component({})
	export default class GeoJSONTutorial extends Vue {
		tocHtml: string = "";
		tocRenderered(tocHtml: string) {
			this.tocHtml = tocHtml;
        }
        
        updated() {
			Prism.highlightAll();
		}
	}
</script>

<style lang="sass" scoped>
.main-content-area 
    margin: 40px
    max-width: 1200px
</style>