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

## Quick Start

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
				center: { lat: 35.6812362, lng: 139.7649361 },
				zoom: 14
			}}
			mapContainerStyle="width:100%;height:100%;"
		>
			<Marker position={{ lat: 35.6812362, lng: 139.7649361 }} />
		</GoogleMap>
	</APIProvider>
</div>
```

## Loading Google Maps Libraries

Some components require optional Google Maps libraries. Pass them through `APIProvider`.

```svelte
<APIProvider {apiKey} libraries={['marker', 'places', 'drawing', 'visualization']}>
	<!-- map components -->
</APIProvider>
```

| Component             | Required library | Notes                                                                                                     |
| --------------------- | ---------------- | --------------------------------------------------------------------------------------------------------- |
| `AdvancedMarker`      | `marker`         | Advanced markers may require a map ID for full styling and cloud-based map features.                      |
| `Autocomplete`        | `places`         | Wraps `google.maps.places.Autocomplete`.                                                                  |
| `StandaloneSearchBox` | `places`         | Wraps `google.maps.places.SearchBox`.                                                                     |
| `DrawingManager`      | `drawing`        | The Google Maps Drawing Library is deprecated upstream; use a supported Maps API version while available. |
| `HeatmapLayer`        | `visualization`  | Wraps `google.maps.visualization.HeatmapLayer`.                                                           |

## Components

| Component                                                                                     | Purpose                                                 |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `APIProvider`                                                                                 | Loads the Maps JavaScript API and provides context.     |
| `GoogleMap`                                                                                   | Creates and provides a map instance.                    |
| `Marker`                                                                                      | Standard Google Maps marker.                            |
| `AdvancedMarker`                                                                              | Advanced marker element with slot content support.      |
| `MarkerClusterer`                                                                             | Marker clustering wrapper with `onClick` compatibility. |
| `GoogleMarkerClusterer`                                                                       | Marker clustering wrapper exposing `onClusterClick`.    |
| `InfoWindow`                                                                                  | Google Maps info window.                                |
| `InfoBox`                                                                                     | Custom overlay info box.                                |
| `Polyline`, `Polygon`, `Circle`, `Rectangle`                                                  | Shape overlays.                                         |
| `Data`                                                                                        | Google Maps data layer.                                 |
| `DrawingManager`                                                                              | Drawing tools where the upstream library is available.  |
| `DirectionsRenderer`, `DirectionsService`, `DistanceMatrixService`                            | Directions and distance services.                       |
| `HeatmapLayer`, `KmlLayer`, `TrafficLayer`, `TransitLayer`, `BicyclingLayer`, `GroundOverlay` | Map layers and image overlays.                          |
| `MapControl`                                                                                  | Custom control placement.                               |
| `Autocomplete`, `StandaloneSearchBox`                                                         | Places input helpers.                                   |
| `OverlayView`                                                                                 | Custom positioned overlay content.                      |
| `StreetViewPanorama`, `StreetViewService`                                                     | Street View UI and service helpers.                     |

## SvelteKit and SSR

Render map components only in the browser. `APIProvider` loads the Google Maps script on the client, and child components wait for that context before creating Google Maps objects.

For SvelteKit routes that render on the server, keep API keys in public environment variables only when they are meant to be exposed to browsers:

```svelte
<script lang="ts">
	import { PUBLIC_GOOGLE_MAPS_API_KEY } from '$env/static/public';
	import { APIProvider, GoogleMap } from 'svelte-google-maps-api';
</script>

<APIProvider apiKey={PUBLIC_GOOGLE_MAPS_API_KEY}>
	<GoogleMap options={{ center: { lat: 35.6812362, lng: 139.7649361 }, zoom: 12 }} />
</APIProvider>
```

Restrict browser API keys in Google Cloud Console by HTTP referrer and only enable the APIs needed by your app.

## Troubleshooting

| Symptom                          | Check                                                                                                |
| -------------------------------- | ---------------------------------------------------------------------------------------------------- |
| The map does not render          | Confirm the Maps JavaScript API is enabled and the API key is allowed for your domain.               |
| `AdvancedMarker` does not render | Add `libraries={['marker']}` and configure a map ID when using cloud-styled maps.                    |
| Places components do not work    | Add `libraries={['places']}` and enable the Places API.                                              |
| `HeatmapLayer` is unavailable    | Add `libraries={['visualization']}`.                                                                 |
| `DrawingManager` is unavailable  | The upstream Drawing Library is deprecated; pin a supported API version where it is still available. |
| Storybook asks for an API key    | Enter a restricted browser key in the Storybook API key field for local visual testing.              |

## Documentation

- Docs: https://skyt-a.github.io/svelte-google-maps-api/
- Storybook: https://skyt-a.github.io/svelte-google-maps-api/storybook/
- Repository: https://github.com/skyt-a/svelte-google-maps-api

## License

MIT
