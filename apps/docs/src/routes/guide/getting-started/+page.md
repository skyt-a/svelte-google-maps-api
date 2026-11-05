---
title: Getting Started
---

Svelte Google Maps API is a set of Svelte 5 components for the [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript). It is built on the current Maps APIs: Advanced Markers, Places API (New) and the Routes library.

## Requirements

- Svelte 5 (the components use runes and snippets)
- A Google Maps Platform API key with the **Maps JavaScript API** enabled
- A **Map ID** for Advanced Markers. `DEMO_MAP_ID` works for development.
- **Places API (New)** for `PlaceAutocomplete`, and **Routes API** for routes

## Installation

```bash
pnpm add svelte-google-maps-api
# or
npm install svelte-google-maps-api
```

## Your first map

```svelte
<script lang="ts">
	import { APIProvider, GoogleMap, AdvancedMarker, Pin } from 'svelte-google-maps-api';

	const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
	const tokyo = { lat: 35.6812, lng: 139.7671 };
</script>

<div style="height: 400px">
	<APIProvider {apiKey}>
		<GoogleMap center={tokyo} zoom={13} mapId="DEMO_MAP_ID">
			<AdvancedMarker position={tokyo} title="Tokyo Station">
				<Pin background="#0f766e" glyphText="T" glyphColor="white" />
			</AdvancedMarker>
		</GoogleMap>
	</APIProvider>
</div>
```

The map fills its container, so the container needs a height.

## How the pieces fit together

1. `APIProvider` loads the Maps JavaScript API once per page. It renders its children after the `core` and `maps` libraries are ready.
2. `GoogleMap` creates the map. It renders its children once the map exists.
3. Components inside `GoogleMap` (markers, shapes, layers, controls, overlays, routes) add themselves to that map. They remove themselves when they unmount.

`PlaceAutocomplete` and `StreetViewPanorama` do not need a map. Place them directly inside `APIProvider`.

Each component loads the libraries it needs (`marker`, `places`, `streetView`, ...) with `importLibrary()`. Pass `libraries` to `APIProvider` only to preload them.

## Two-way binding

Map camera props and editable geometry can be bound:

```svelte
<script lang="ts">
	let center = $state({ lat: 35.6812, lng: 139.7671 });
	let zoom = $state(12);
	let position = $state({ lat: 35.6812, lng: 139.7671 });
</script>

<GoogleMap bind:center bind:zoom mapId="DEMO_MAP_ID">
	<AdvancedMarker bind:position draggable />
</GoogleMap>

<p>{center.lat.toFixed(4)}, {center.lng.toFixed(4)} @ {zoom}</p>
```

You can also bind the underlying Google Maps instances, such as `bind:map` on `GoogleMap` or `bind:marker` on `AdvancedMarker`.

## Helpers

Use these helpers in your own components inside `APIProvider` (and inside `GoogleMap` for `useMap`). Call them during component initialisation. Each returns an object whose `current` property updates when the value is ready.

| Helper | Returns |
| --- | --- |
| `useMap()` | `{ current: google.maps.Map \| null }`: the nearest map |
| `useMapsLibrary(name)` | `{ current: Library \| null }`: a typed library such as `routes` or `geocoding` |
| `useAPILoadingStatus()` | `{ status, error }`: the API loading state |

```svelte
<script lang="ts">
	import { useMap, useMapsLibrary } from 'svelte-google-maps-api';

	const map = useMap();
	const geocoding = useMapsLibrary('geocoding');

	$effect(() => {
		if (!map.current || !geocoding.current) return;
		new geocoding.current.Geocoder().geocode({ address: 'Kyoto' }).then(({ results }) => {
			const location = results[0]?.geometry.location;
			if (location) map.current?.panTo(location);
		});
	});
</script>
```

## SSR

All Google Maps work runs in the browser after mount. During SSR, `APIProvider` renders its `loading` snippet (or nothing), so SvelteKit pages can render on the server without errors.

## Next steps

- Coming from 0.2.x? Read the [migration guide](/guide/migration/).
- Browse the components in the sidebar, or the [examples](/examples/).
