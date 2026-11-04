---
title: RouteRenderer
---

## Storybook

[Open the RouteRenderer story](https://skyt-a.github.io/svelte-google-maps-api/storybook/?path=/story/components-routerenderer--basic)

`RouteRenderer` draws a route computed with the Routes library (`google.maps.routes.Route`) on the map: the route polylines, waypoint markers (A, B, C, ...) and, by default, fits the map to the route.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| route | `google.maps.routes.Route \| null \| undefined` | (required) | A route returned by `Route.computeRoutes()`. Nothing is drawn while it is empty. |
| polylineOptions | `google.maps.PolylineOptions` or a function | | Style for the polylines, or a function returning a style per segment. Passed to `route.createPolylines()`. |
| colorScheme | `google.maps.ColorSchemeString` | | Light or dark polyline colors. |
| markers | `boolean \| google.maps.marker.AdvancedMarkerElementOptions \| function` | `true` | Waypoint markers. `true` uses the defaults, an object or function customises them, `false` hides them. Passed to `route.createWaypointAdvancedMarkers()`. |
| fitBounds | `boolean` | `true` | Fit the map viewport to the route when it changes. |

### Event Props

| Prop | Type | Description |
|------|------|-------------|
| onLoad | `(rendered) => void` | Called after the polylines and markers are on the map. Receives an object with `polylines` (`google.maps.Polyline[]`) and `markers` (`google.maps.marker.AdvancedMarkerElement[]`). |

## Usage

```svelte
<script lang="ts">
	import { RouteRenderer, useMapsLibrary } from 'svelte-google-maps-api';

	// This component is rendered inside <GoogleMap mapId="DEMO_MAP_ID">.
	const routesLibrary = useMapsLibrary('routes');
	let route = $state<google.maps.routes.Route | null>(null);

	$effect(() => {
		const library = routesLibrary.current;
		if (!library) return;

		library.Route.computeRoutes({
			origin: 'Tokyo Station',
			destination: 'Tokyo Skytree',
			travelMode: 'DRIVING',
			fields: ['path', 'legs', 'viewport', 'distanceMeters', 'durationMillis']
		}).then(({ routes }) => {
			route = routes?.[0] ?? null;
		});
	});
</script>

<RouteRenderer {route} polylineOptions={{ strokeColor: '#2563eb', strokeWeight: 6 }} />

{#if route}
	<p>{((route.distanceMeters ?? 0) / 1000).toFixed(1)} km</p>
{/if}
```

Use it from a page like this:

```svelte
<script lang="ts">
	import { APIProvider, GoogleMap } from 'svelte-google-maps-api';
	import Directions from './Directions.svelte';
</script>

<div style="height: 400px;">
	<APIProvider apiKey="YOUR_API_KEY">
		<GoogleMap center={{ lat: 35.69, lng: 139.79 }} zoom={12} mapId="DEMO_MAP_ID">
			<Directions />
		</GoogleMap>
	</APIProvider>
</div>
```

## Migrating from DirectionsService / DirectionsRenderer

`DirectionsService`, `DirectionsRenderer` and `DistanceMatrixService` wrapped classes that Google deprecated on February 25, 2026. They were removed.

- Replace `DirectionsService` with `useMapsLibrary('routes')` and `Route.computeRoutes()` (with `origin`, `destination`, `travelMode` and `fields`). You must list the `fields` you need; `path`, `legs` and `viewport` are needed for drawing.
- Replace `DirectionsRenderer` (and its `directions` prop) with `RouteRenderer`, passing the first route from the result as `route`.
- Replace `DistanceMatrixService` with `RouteMatrix.computeRouteMatrix()` from the same library.

## Notes

- Enable the **Routes API** for your API key.
- Waypoint markers are Advanced Markers, so the map needs a `mapId`. Set `markers` to `false` to draw only the polylines.
- Changing `route`, `polylineOptions`, `colorScheme`, `markers` or `fitBounds` removes the drawn route and draws it again.
