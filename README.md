# Svelte Google Maps API

[![npm version](https://badge.fury.io/js/svelte-google-maps-api.svg)](https://badge.fury.io/js/svelte-google-maps-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A declarative Svelte component library for the Google Maps JavaScript API.

**Note:** This library is under active development. APIs might change.

## Features

*   Declarative Svelte components for Google Maps elements (Map, Markers, InfoWindows, Shapes, Layers, etc.).
*   TypeScript support.
*   Context-based API loading and map instance sharing.
*   Components for `AdvancedMarkerElement`, `MapControl`, `Autocomplete`, `OverlayView`, `StreetViewPanorama`, and more.

## Installation

```bash
pnpm install svelte-google-maps-api
# or
npm install svelte-google-maps-api
# or
yarn add svelte-google-maps-api
```

## Basic Usage

Get your Google Maps API Key. Make sure the "Maps JavaScript API" is enabled for your key in the Google Cloud Console. You might also need to enable specific libraries (like "marker", "places", "visualization") depending on the components you use.

```svelte
{% raw %}
<script lang="ts">
	import { GoogleMap } from 'svelte-google-maps-api';
	import { APIProvider } from 'svelte-google-maps-api';
	import { Marker } from 'svelte-google-maps-api';

	let apiKey = 'YOUR_MAP_KEY';
</script>

<div style="width: 100%; height: 100vh;">
	<APIProvider {apiKey} libraries={['marker']}>
		<GoogleMap
			options={{
				center: { lat: 35.681, lng: 139.767 },
				zoom: 14,
				mapId: 'YOUR_MAP_ID'
			}}
			mapContainerStyle="width:100%;height:100%;"
		>
			<Marker position={{ lat: 35.681, lng: 139.767 }} />
		</GoogleMap>
	</APIProvider>
</div>
{% endraw %}
```

## Documentation

For detailed documentation, component references, and examples, please visit the **[Documentation Website](https://skyt-a.github.io/svelte-google-maps-api/docs)** (Replace with actual link after deployment).

## Components

This library provides the following components (and more):

*   `APIProvider`: Loads the Google Maps API and provides context.
*   `GoogleMap`: Renders the map container.
*   `Marker`: The standard Google Maps marker.
*   `AdvancedMarker`: The newer, customizable marker element.
*   `InfoWindow`: Displays info windows, often anchored to markers.
*   Drawing Components: `Polyline`, `Polygon`, `Rectangle`, `Circle`.
*   Layer Components: `HeatmapLayer`, `KmlLayer`, `TrafficLayer`, `TransitLayer`, `BicyclingLayer`, `GroundOverlay`.
*   Controls: `MapControl` (for custom controls). Standard controls are configured via `GoogleMap` options.
*   Places: `Autocomplete`.
*   Overlays: `OverlayView`.
*   Street View: `StreetViewPanorama`.

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.
 

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
