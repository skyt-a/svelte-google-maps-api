# Svelte Google Maps API

Svelte 5 components for the Google Maps JavaScript API, built on the current Maps APIs: Advanced Markers, Places API (New) and the Routes library.

## Installation

```bash
pnpm add svelte-google-maps-api
# or
npm install svelte-google-maps-api
```

Requires Svelte 5.

## Quick Start

Enable the **Maps JavaScript API** for your key. Advanced Markers need a Map ID. `DEMO_MAP_ID` works for development.

```svelte
<script lang="ts">
	import { APIProvider, GoogleMap, AdvancedMarker, Pin } from 'svelte-google-maps-api';

	const apiKey = 'YOUR_API_KEY';
	let center = $state({ lat: 35.6812362, lng: 139.7649361 });
	let zoom = $state(13);
</script>

<div style="height: 100vh">
	<APIProvider {apiKey}>
		<GoogleMap bind:center bind:zoom mapId="DEMO_MAP_ID">
			<AdvancedMarker position={{ lat: 35.6812362, lng: 139.7649361 }} title="Tokyo Station">
				<Pin background="#0f766e" glyphText="T" glyphColor="white" />
			</AdvancedMarker>
		</GoogleMap>
	</APIProvider>
</div>
```

Components load the Maps libraries they need (`marker`, `places`, `streetView`, ...) on demand. Pass `libraries` to `APIProvider` only to preload them.

## Components

| Component                                        | Purpose                                                                      |
| ------------------------------------------------ | ---------------------------------------------------------------------------- |
| `APIProvider`                                    | Loads the Maps JavaScript API once. Provides `loading` / `error` snippets.   |
| `GoogleMap`                                      | The map. `bind:center`, `bind:zoom`, `bind:heading`, `bind:tilt`.            |
| `AdvancedMarker`                                 | `AdvancedMarkerElement` with HTML children and `bind:position` for dragging. |
| `Pin`                                            | Customises the default marker pin (`PinElement`).                            |
| `MarkerClusterer`                                | Clusters child `AdvancedMarker`s with `@googlemaps/markerclusterer`.         |
| `InfoWindow`                                     | Info window anchored to a marker or a position, with `bind:open`.            |
| `Polyline`, `Polygon`, `Circle`, `Rectangle`     | Shapes. Editable geometry is bindable.                                       |
| `GroundOverlay`, `Data`                          | Image overlays and GeoJSON data layers.                                      |
| `TrafficLayer`, `TransitLayer`, `BicyclingLayer` | Built-in map layers.                                                         |
| `MapControl`                                     | Renders children as a custom map control.                                    |
| `OverlayView`                                    | Renders children at a geographic position or over bounds.                    |
| `PlaceAutocomplete`                              | `PlaceAutocompleteElement` (Places API New) that returns a `Place`.          |
| `RouteRenderer`                                  | Draws a `google.maps.routes.Route` with polylines and waypoint markers.      |
| `StreetViewPanorama`                             | Street View panorama with bindable position and point of view.               |

## Helpers

Call these during component initialisation:

- `useMap()` returns `{ current }` with the nearest `google.maps.Map`.
- `useMapsLibrary(name)` returns `{ current }` with a typed library, e.g. `useMapsLibrary('routes')`.
- `useAPILoadingStatus()` returns `{ status, error }`.

## Upgrading from 0.2

0.3 removes the components built on deprecated or discontinued Google APIs. These are `Marker`, `DrawingManager`, `HeatmapLayer`, `KmlLayer`, `Autocomplete`, `StandaloneSearchBox`, the Directions and Distance Matrix services, `InfoBox` and `StreetViewService`. 0.3 also replaces the Svelte 4 slot API with runes and snippets. See the [migration guide](https://skyt-a.github.io/svelte-google-maps-api/guide/migration/).

## SvelteKit and SSR

Google Maps objects are only created in the browser after mount. During SSR, `APIProvider` renders its `loading` snippet. Use a public, HTTP-referrer-restricted browser key:

```svelte
<script lang="ts">
	import { PUBLIC_GOOGLE_MAPS_API_KEY } from '$env/static/public';
	import { APIProvider, GoogleMap } from 'svelte-google-maps-api';
</script>

<APIProvider apiKey={PUBLIC_GOOGLE_MAPS_API_KEY}>
	<GoogleMap center={{ lat: 35.68, lng: 139.76 }} zoom={12} />
</APIProvider>
```

## Troubleshooting

| Symptom                                  | Check                                                                                  |
| ---------------------------------------- | -------------------------------------------------------------------------------------- |
| The map is blank                         | The container needs a height. Confirm the Maps JavaScript API is enabled for your key. |
| `AdvancedMarker` does not render         | Set `mapId` on `GoogleMap`.                                                            |
| `PlaceAutocomplete` shows no results     | Enable **Places API (New)** for your key.                                              |
| `computeRoutes` fails                    | Enable **Routes API** for your key.                                                    |
| A warning says the API is already loaded | The API loads once per page. Use the same `APIProvider` options everywhere.            |

## Documentation

- Docs: https://skyt-a.github.io/svelte-google-maps-api/
- Storybook: https://skyt-a.github.io/svelte-google-maps-api/storybook/
- Repository: https://github.com/skyt-a/svelte-google-maps-api

## License

MIT
