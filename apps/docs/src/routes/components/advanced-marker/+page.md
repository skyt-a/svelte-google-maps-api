---
title: AdvancedMarker
---

## Storybook

[Open the AdvancedMarker story](https://skyt-a.github.io/svelte-google-maps-api/storybook/?path=/story/components-advancedmarker--basic)

The `AdvancedMarker` component creates and manages advanced markers on the map, allowing for custom HTML content.

## Props

| Prop         | Type                                                       | Default | Description                             |
| ------------ | ---------------------------------------------------------- | ------- | --------------------------------------- |
| position     | google.maps.LatLng \| google.maps.LatLngLiteral            |         | Geographical coordinates for the marker |
| title        | string                                                     |         | Rollover and accessibility text         |
| zIndex       | number                                                     |         | Marker stacking order                   |
| element      | HTMLElement                                                |         | Custom marker element                   |
| gmpDraggable | boolean                                                    |         | Enables dragging                        |
| options      | google.maps.marker.AdvancedMarkerElementOptions            |         | Advanced marker configuration options   |
| onLoad       | (marker: google.maps.marker.AdvancedMarkerElement) => void |         | Callback when marker is loaded          |
| onUnmount    | (marker: google.maps.marker.AdvancedMarkerElement) => void |         | Callback before marker is destroyed     |

### Event Handler Props

| Prop        | Type                                   | Description              |
| ----------- | -------------------------------------- | ------------------------ |
| onClick     | (e: google.maps.MapMouseEvent) => void | Click event handler      |
| onDrag      | (e: google.maps.MapMouseEvent) => void | Drag event handler       |
| onDragEnd   | (e: google.maps.MapMouseEvent) => void | Drag end event handler   |
| onDragStart | (e: google.maps.MapMouseEvent) => void | Drag start event handler |

## Usage

```svelte
<script>
	import { APIProvider, GoogleMap, AdvancedMarker } from 'svelte-google-maps-api';

	const apiKey = 'YOUR_API_KEY';
	const mapOptions = {
		center: { lat: 35.6812362, lng: 139.7649361 },
		zoom: 12,
		mapId: 'DEMO_MAP_ID'
	};

	const position = { lat: 35.6812362, lng: 139.7649361 };

	function handleMarkerClick() {
		alert('Advanced Marker clicked!');
	}
</script>

<div style="height: 400px; width: 100%;">
	<APIProvider {apiKey} libraries={['marker']} mapIds={['DEMO_MAP_ID']}>
		<GoogleMap id="map" options={mapOptions} mapContainerStyle="width: 100%; height: 100%;">
			<AdvancedMarker {position} title="Tokyo" gmpDraggable onClick={handleMarkerClick} />
		</GoogleMap>
	</APIProvider>
</div>
```

## Custom Content

One of the main advantages of `AdvancedMarker` is the ability to use custom HTML content:

```svelte
<script>
	import { APIProvider, GoogleMap, AdvancedMarker } from 'svelte-google-maps-api';

	const apiKey = 'YOUR_API_KEY';
	const mapOptions = {
		center: { lat: 35.6812362, lng: 139.7649361 },
		zoom: 12,
		mapId: 'DEMO_MAP_ID'
	};

	const position = { lat: 35.6812362, lng: 139.7649361 };
</script>

<div style="height: 400px; width: 100%;">
	<APIProvider {apiKey} libraries={['marker']} mapIds={['DEMO_MAP_ID']}>
		<GoogleMap id="map" options={mapOptions} mapContainerStyle="width: 100%; height: 100%;">
			<AdvancedMarker {position} title="Tokyo">
				<div class="custom-marker">Tokyo</div>
			</AdvancedMarker>
		</GoogleMap>
	</APIProvider>
</div>

<style>
	.custom-marker {
		background: #4285f4;
		border-radius: 4px;
		color: white;
		font-weight: bold;
		padding: 8px 12px;
	}
</style>
```

## Context

The `AdvancedMarker` component consumes the context set by `GoogleMap` to access the map instance:

```javascript
const map = getContext('map');
```

## Notes

- The `AdvancedMarker` component must be a child of the `GoogleMap` component.
- It requires the Google Maps "marker" library to be loaded.
- The map must use a `mapId`; `DEMO_MAP_ID` is suitable for local testing.
- It allows for custom HTML content, making it more flexible than the standard `Marker` component.
- Event listeners are automatically cleaned up when the component is destroyed.
- The marker is automatically removed from the map when the component is unmounted.
