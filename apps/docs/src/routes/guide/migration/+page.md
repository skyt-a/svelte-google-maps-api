---
title: Migrating to 0.3
---

Version 0.3 rebuilds the library on Svelte 5 runes and on the current Google Maps APIs. Many components in 0.2 wrapped APIs that Google has deprecated or already turned off, so this release removes them instead of carrying them forward.

## Why components were removed

| Removed in 0.3 | Google status | Use instead |
| --- | --- | --- |
| `DrawingManager` | Drawing library unavailable from Maps JS API 3.65 | A drawing library such as [Terra Draw](https://github.com/JamesLMilner/terra-draw) |
| `HeatmapLayer` | Deprecated in May 2025, unavailable since May 2026 | [deck.gl HeatmapLayer](https://deck.gl/docs/api-reference/aggregation-layers/heatmap-layer) |
| `KmlLayer` | Unavailable from Maps JS API 3.66 | Convert to GeoJSON and use `Data` |
| `Marker` | Deprecated since February 2024 | `AdvancedMarker` (+ `Pin`) |
| `MarkerClusterer`, `GoogleMarkerClusterer` (0.2) | Built on `Marker` | `MarkerClusterer` with `AdvancedMarker` children |
| `Autocomplete`, `StandaloneSearchBox` | Not available to new customers since March 2025 | `PlaceAutocomplete` |
| `DirectionsService`, `DirectionsRenderer`, `DistanceMatrixService` | Deprecated in February 2026 | `useMapsLibrary('routes')` + `RouteRenderer` |
| `InfoBox` | Library-only reimplementation | `OverlayView`, or `AdvancedMarker` with HTML content |
| `StreetViewService` | Render-less service wrapper | `useMapsLibrary('streetView')` |

The `FLOAT_PANE`, `MAP_PANE`, ... constants are gone. Pass the pane name (`'floatPane'`) to `OverlayView` directly.

## Components are now runes-based

- Slots are now snippets. The `APIProvider` `loading`/`error` slots are now `loading`/`error` snippets.
- Use `bind:` instead of reading values back in `onLoad` callbacks where possible.
- The components need Svelte 5. Svelte 4 is not supported.

## APIProvider

- Libraries load on demand. You no longer have to list `marker` or `places` in `libraries`.
- `googleMapsApiKey`, `googleMapsClientId`, `id` and `onUnmount` are gone. Use `apiKey`.

```svelte
<!-- 0.2 -->
<APIProvider {apiKey} libraries={['marker', 'places']}>
	<div slot="loading">Loading…</div>
	...
</APIProvider>

<!-- 0.3 -->
<APIProvider {apiKey}>
	{#snippet loading()}Loading…{/snippet}
	...
</APIProvider>
```

## GoogleMap

Camera values are props, and they can be bound.

```svelte
<!-- 0.2 -->
<GoogleMap
	options={{ center, zoom: 12, mapId: 'DEMO_MAP_ID', disableDefaultUI: true }}
	mapContainerStyle="width:100%;height:100%"
	onCenterChanged={...}
/>

<!-- 0.3 -->
<GoogleMap
	bind:center
	bind:zoom
	mapId="DEMO_MAP_ID"
	options={{ disableDefaultUI: true }}
	style="width:100%;height:100%"
	onCameraChanged={(camera) => ...}
/>
```

- `mapContainerStyle` → `style`, `mapContainerClassName` → `class`
- `onRightClick` → `onContextMenu`
- New events: `onIdle`, `onBoundsChanged`, `onCameraChanged` and `onTilesLoaded`.
- `mapId`, `colorScheme` and `renderingType` are applied when the map is created.

## Marker → AdvancedMarker

```svelte
<!-- 0.2 -->
<Marker {position} options={{ title: 'Tokyo', label: 'T', draggable: true }} onDragEnd={...} />

<!-- 0.3: needs a map with a mapId -->
<AdvancedMarker bind:position title="Tokyo" draggable>
	<Pin glyphText="T" />
</AdvancedMarker>
```

To render custom HTML, pass it as children:

```svelte
<AdvancedMarker {position}>
	<div class="badge">¥1,200</div>
</AdvancedMarker>
```

## InfoWindow

Anchor the info window to a marker, and bind `open`:

```svelte
<script lang="ts">
	let marker = $state<google.maps.marker.AdvancedMarkerElement | null>(null);
	let open = $state(false);
</script>

<AdvancedMarker {position} bind:marker onClick={() => (open = true)} />
{#if marker}
	<InfoWindow anchor={marker} bind:open headerContent="Tokyo">
		<p>Tokyo Station</p>
	</InfoWindow>
{/if}
```

## Places

```svelte
<!-- 0.2 -->
<APIProvider {apiKey} libraries={['places']}>
	<Autocomplete onPlaceChanged={...} />
</APIProvider>

<!-- 0.3 -->
<APIProvider {apiKey}>
	<PlaceAutocomplete
		includedRegionCodes={['jp']}
		onPlaceSelect={(place) => map?.fitBounds(place.viewport!)}
	/>
</APIProvider>
```

`PlaceAutocomplete` renders Google's `PlaceAutocompleteElement`. It returns a `google.maps.places.Place` with the requested `fields` already fetched. Enable **Places API (New)** for your key.

## Directions → Routes

```svelte
<script lang="ts">
	import { RouteRenderer, useMapsLibrary } from 'svelte-google-maps-api';

	const routes = useMapsLibrary('routes');
	let route = $state.raw<google.maps.routes.Route | null>(null);

	$effect(() => {
		routes.current?.Route.computeRoutes({
			origin: 'Tokyo Station',
			destination: 'Tokyo Skytree',
			travelMode: 'DRIVING',
			fields: ['path', 'legs', 'viewport']
		}).then(({ routes }) => (route = routes?.[0] ?? null));
	});
</script>

<RouteRenderer {route} />
```

Put this component inside `GoogleMap`. Enable **Routes API** for your key.
