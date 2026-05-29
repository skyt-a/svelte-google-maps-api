# Svelte Google Maps API

A declarative Svelte component library for the Google Maps JavaScript API.

## Installation

```bash
pnpm add svelte-google-maps-api
```

```bash
npm install svelte-google-maps-api
```

```bash
yarn add svelte-google-maps-api
```

## Basic Usage

Enable the Maps JavaScript API in Google Cloud Console and pass your API key to `APIProvider`.

```svelte
<script lang="ts">
	import { APIProvider, GoogleMap, Marker } from 'svelte-google-maps-api';

	const apiKey = 'YOUR_MAP_KEY';
</script>

<div style="width: 100%; height: 100vh;">
	<APIProvider {apiKey}>
		<GoogleMap
			options={{
				center: { lat: 35.681, lng: 139.767 },
				zoom: 14
			}}
			mapContainerStyle="width:100%;height:100%;"
		>
			<Marker position={{ lat: 35.681, lng: 139.767 }} />
		</GoogleMap>
	</APIProvider>
</div>
```

Some components require Google Maps libraries. Pass them through `APIProvider`.

```svelte
<APIProvider {apiKey} libraries={['marker', 'places', 'drawing', 'visualization']}>
	<!-- map components -->
</APIProvider>
```

## Components

- `APIProvider`
- `GoogleMap`
- `Marker`
- `AdvancedMarker`
- `InfoWindow`
- `Polyline`
- `Polygon`
- `Circle`
- `Rectangle`
- `HeatmapLayer`
- `GroundOverlay`
- `DrawingManager`
- `TrafficLayer`
- `TransitLayer`
- `BicyclingLayer`
- `KmlLayer`
- `Autocomplete`
- `StandaloneSearchBox`
- `OverlayView`
- `StreetViewPanorama`
- `StreetViewService`
- `DirectionsRenderer`
- `DirectionsService`
- `DistanceMatrixService`
- `MarkerClusterer`
- `GoogleMarkerClusterer`
- `InfoBox`
- `Data`
- `MapControl`

## Documentation

Documentation and examples are available at:

https://skyt-a.github.io/svelte-google-maps-api/

Storybook is available at:

https://skyt-a.github.io/svelte-google-maps-api/storybook/

## License

MIT
