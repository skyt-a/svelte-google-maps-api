---
title: GroundOverlay
---

## Storybook

[Open the GroundOverlay story](https://skyt-a.github.io/svelte-google-maps-api/storybook/?path=/story/components-groundoverlay--basic)

`GroundOverlay` stretches an image over a geographic area with `google.maps.GroundOverlay`.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| url | `string` | (required) | Image URL. Changing it recreates the overlay. |
| bounds | `google.maps.LatLngBoundsLiteral \| google.maps.LatLngBounds` | (required) | Area the image covers. Changing it recreates the overlay. |
| opacity | `number` | `1` | Opacity between 0 and 1. Updated in place. |
| clickable | `boolean` | `true` | Whether the overlay handles mouse events. Read when the overlay is created. |
| groundOverlay | `google.maps.GroundOverlay \| null` | `null` | The instance. Bindable: read it with `bind:groundOverlay`. |

### Event Props

| Prop | Type | Description |
|------|------|-------------|
| onClick | `(event: google.maps.MapMouseEvent) => void` | `click` |
| onDblClick | `(event: google.maps.MapMouseEvent) => void` | `dblclick` |
| onLoad | `(groundOverlay: google.maps.GroundOverlay) => void` | Called each time the overlay is created. |

## Usage

```svelte
<script lang="ts">
	import { APIProvider, GoogleMap, GroundOverlay } from 'svelte-google-maps-api';

	const url =
		'https://developers.google.com/maps/documentation/javascript/examples/full/images/talkeetna.png';
	const bounds = { north: 62.4, south: 62.281819, east: -150.005, west: -150.287132 };
	let opacity = $state(0.6);
</script>

<input type="range" min="0" max="1" step="0.05" bind:value={opacity} />

<div style="height: 400px;">
	<APIProvider apiKey="YOUR_API_KEY">
		<GoogleMap center={{ lat: 62.34, lng: -150.15 }} zoom={11}>
			<GroundOverlay {url} {bounds} {opacity} />
		</GoogleMap>
	</APIProvider>
</div>
```

## Notes

- The Maps API cannot change the image or bounds of an existing overlay, so changing `url` or `bounds` removes the old overlay and creates a new one (and calls `onLoad` again).
