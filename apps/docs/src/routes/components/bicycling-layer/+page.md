---
title: BicyclingLayer
---

## Storybook

[Open the BicyclingLayer story](https://skyt-a.github.io/svelte-google-maps-api/storybook/?path=/story/components-bicyclinglayer--basic)
The `BicyclingLayer` component displays bicycle paths, suggested routes, and other overlays specific to cycling on the map.

## Usage

```svelte
<script lang="ts">
	import { APIProvider, GoogleMap, BicyclingLayer } from 'svelte-google-maps-api';

	let apiKey = 'YOUR_MAP_KEY'; // Replace with your API key
	let mapCenter = { lat: 45.523, lng: -122.676 }; // Portland
	let mapZoom = 14;
</script>

<div style="height: 500px; width: 100%;">
	<APIProvider {apiKey}>
		<GoogleMap options={{ center: mapCenter, zoom: mapZoom }}>
			<BicyclingLayer />
		</GoogleMap>
	</APIProvider>
</div>
```

## Props

| Prop      | Type                                          | Description                         |
| --------- | --------------------------------------------- | ----------------------------------- |
| onLoad    | `(layer: google.maps.BicyclingLayer) => void` | Called after the layer is created.  |
| onUnmount | `(layer: google.maps.BicyclingLayer) => void` | Called before the layer is removed. |

## Notes

- The layer highlights dedicated bike trails, streets with bike lanes, and recommended cycling streets.
- Availability and detail depend on the region and zoom level. Use a location with cycling coverage when verifying the layer.
