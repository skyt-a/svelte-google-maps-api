---
title: Examples
---

Live examples built with the components from this library.

**Note:** You need a Google Maps API key to view these examples. Enter your key in the input field for each demo. The examples use `DEMO_MAP_ID`, which works for development.

## Basic Map

A map whose camera is bound to local state.

```svelte live title="BasicMap.svelte"
<script lang="ts">
	import { APIProvider, GoogleMap } from 'svelte-google-maps-api';

	let apiKey = $state('');
	let center = $state({ lat: 35.6812362, lng: 139.7649361 });
	let zoom = $state(10);
</script>

<label>
	Enter your API Key:
	<input type="text" bind:value={apiKey} placeholder="YOUR_API_KEY" style="width: 300px" />
</label>

<div style="height: 400px; margin-top: 1rem; border: 1px solid #ccc;">
	{#if !apiKey}
		<p style="text-align: center; padding: 2rem;">Please enter your API key above to load the map.</p>
	{:else}
		{#key apiKey}
			<APIProvider {apiKey}>
				<GoogleMap bind:center bind:zoom mapId="DEMO_MAP_ID" />
			</APIProvider>
		{/key}
	{/if}
</div>
<p>Center: {center.lat.toFixed(4)}, {center.lng.toFixed(4)} · Zoom: {zoom}</p>
```

## Markers and an InfoWindow

Click a marker to open its info window.

```svelte live title="MarkersWithInfoWindow.svelte"
<script lang="ts">
	import { APIProvider, GoogleMap, AdvancedMarker, Pin, InfoWindow } from 'svelte-google-maps-api';

	let apiKey = $state('');
	const places = [
		{ id: 1, position: { lat: 35.6812362, lng: 139.7649361 }, title: 'Tokyo Station' },
		{ id: 2, position: { lat: 35.7100627, lng: 139.8107004 }, title: 'Tokyo Skytree' },
		{ id: 3, position: { lat: 35.6586414, lng: 139.7454329 }, title: 'Tokyo Tower' }
	];
	const markers = $state<Record<number, google.maps.marker.AdvancedMarkerElement | null>>({});
	let selectedId = $state<number | null>(null);
	const selected = $derived(places.find((place) => place.id === selectedId));
</script>

<label>
	Enter your API Key:
	<input type="text" bind:value={apiKey} placeholder="YOUR_API_KEY" style="width: 300px" />
</label>

<div style="height: 400px; margin-top: 1rem; border: 1px solid #ccc;">
	{#if !apiKey}
		<p style="text-align: center; padding: 2rem;">Please enter your API key above to load the map.</p>
	{:else}
		{#key apiKey}
			<APIProvider {apiKey}>
				<GoogleMap center={{ lat: 35.68, lng: 139.77 }} zoom={12} mapId="DEMO_MAP_ID">
					{#each places as place (place.id)}
						<AdvancedMarker
							position={place.position}
							title={place.title}
							bind:marker={markers[place.id]}
							onClick={() => (selectedId = place.id)}
						>
							<Pin background={selectedId === place.id ? '#dc2626' : '#0f766e'} glyphColor="white" />
						</AdvancedMarker>
					{/each}

					{#if selected && markers[selected.id]}
						<InfoWindow
							anchor={markers[selected.id]}
							headerContent={selected.title}
							onClose={() => (selectedId = null)}
						>
							<p>{selected.position.lat.toFixed(4)}, {selected.position.lng.toFixed(4)}</p>
						</InfoWindow>
					{/if}
				</GoogleMap>
			</APIProvider>
		{/key}
	{/if}
</div>
```

## Draggable Marker

`bind:position` follows the marker as you drag it.

```svelte live title="DraggableMarker.svelte"
<script lang="ts">
	import { APIProvider, GoogleMap, AdvancedMarker } from 'svelte-google-maps-api';

	let apiKey = $state('');
	let position = $state({ lat: 35.6812362, lng: 139.7649361 });
</script>

<label>
	Enter your API Key:
	<input type="text" bind:value={apiKey} placeholder="YOUR_API_KEY" style="width: 300px" />
</label>

<div style="height: 400px; margin-top: 1rem; border: 1px solid #ccc;">
	{#if !apiKey}
		<p style="text-align: center; padding: 2rem;">Please enter your API key above to load the map.</p>
	{:else}
		{#key apiKey}
			<APIProvider {apiKey}>
				<GoogleMap center={{ lat: 35.6812362, lng: 139.7649361 }} zoom={13} mapId="DEMO_MAP_ID">
					<AdvancedMarker bind:position draggable title="Drag me" />
				</GoogleMap>
			</APIProvider>
		{/key}
	{/if}
</div>
<p>Marker: {position.lat.toFixed(5)}, {position.lng.toFixed(5)}</p>
```

## Click to Add Markers

Click the map to drop a marker, and click a marker to remove it.

```svelte live title="ClickToAddMarkers.svelte"
<script lang="ts">
	import { APIProvider, GoogleMap, AdvancedMarker, Pin } from 'svelte-google-maps-api';

	let apiKey = $state('');
	let points = $state<{ id: number; position: google.maps.LatLngLiteral }[]>([]);
	let nextId = 0;

	function addPoint(event: google.maps.MapMouseEvent) {
		if (!event.latLng) return;
		points.push({ id: nextId++, position: event.latLng.toJSON() });
	}
</script>

<label>
	Enter your API Key:
	<input type="text" bind:value={apiKey} placeholder="YOUR_API_KEY" style="width: 300px" />
</label>

<div style="height: 400px; margin-top: 1rem; border: 1px solid #ccc;">
	{#if !apiKey}
		<p style="text-align: center; padding: 2rem;">Please enter your API key above to load the map.</p>
	{:else}
		{#key apiKey}
			<APIProvider {apiKey}>
				<GoogleMap
					center={{ lat: 35.6812362, lng: 139.7649361 }}
					zoom={12}
					mapId="DEMO_MAP_ID"
					onClick={addPoint}
				>
					{#each points as point, index (point.id)}
						<AdvancedMarker
							position={point.position}
							onClick={() => (points = points.filter((item) => item.id !== point.id))}
						>
							<Pin glyphText={String(index + 1)} />
						</AdvancedMarker>
					{/each}
				</GoogleMap>
			</APIProvider>
		{/key}
	{/if}
</div>
<p>{points.length} marker(s)</p>
```

## Place Search

`PlaceAutocomplete` uses Places API (New). Selecting a place moves the map to it.

```svelte live title="PlaceSearch.svelte"
<script lang="ts">
	import { APIProvider, GoogleMap, AdvancedMarker, PlaceAutocomplete } from 'svelte-google-maps-api';

	let apiKey = $state('');
	let map = $state<google.maps.Map | null>(null);
	let place = $state.raw<google.maps.places.Place | null>(null);

	function select(selected: google.maps.places.Place) {
		place = selected;
		if (selected.viewport) map?.fitBounds(selected.viewport);
		else if (selected.location) map?.panTo(selected.location);
	}
</script>

<label>
	Enter your API Key:
	<input type="text" bind:value={apiKey} placeholder="YOUR_API_KEY" style="width: 300px" />
</label>

<div style="margin-top: 1rem;">
	{#if !apiKey}
		<p style="text-align: center; padding: 2rem; border: 1px solid #ccc;">
			Please enter your API key above to load the map.
		</p>
	{:else}
		{#key apiKey}
			<APIProvider {apiKey}>
				<PlaceAutocomplete placeholder="Search for a place" onPlaceSelect={select} />
				<div style="height: 400px; margin-top: 0.5rem; border: 1px solid #ccc;">
					<GoogleMap
						bind:map
						center={{ lat: 35.6812362, lng: 139.7649361 }}
						zoom={11}
						mapId="DEMO_MAP_ID"
					>
						{#if place?.location}
							<AdvancedMarker position={place.location} title={place.displayName ?? ''} />
						{/if}
					</GoogleMap>
				</div>
			</APIProvider>
		{/key}
	{/if}
</div>
{#if place}
	<p>{place.displayName} — {place.formattedAddress}</p>
{/if}
```
