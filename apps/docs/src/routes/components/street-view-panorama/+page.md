---
title: StreetViewPanorama
---

## Storybook

[Open the StreetViewPanorama story](https://skyt-a.github.io/svelte-google-maps-api/storybook/?path=/story/components-streetviewpanorama--basic)

`StreetViewPanorama` shows an interactive Street View panorama in its own container. Position, point of view and zoom can be two-way bound.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| position | `google.maps.LatLngLiteral \| google.maps.LatLng` | | Panorama position. Bindable: follows the user moving around. |
| pov | `google.maps.StreetViewPov` | | Camera heading and pitch. Bindable: follows the user looking around. |
| zoom | `number` | | Zoom level. Bindable. |
| visible | `boolean` | `true` | Whether the panorama is visible. |
| options | `google.maps.StreetViewPanoramaOptions` (without `position`, `pov`, `zoom`, `visible`) | | Other panorama options. |
| id | `string` | | `id` of the container. |
| class | `string` | `''` | Class of the container. |
| style | `string` | `'width:100%;height:100%;'` | Inline style of the container. The container needs a height. |
| panorama | `google.maps.StreetViewPanorama \| null` | `null` | The instance. Bindable: read it with `bind:panorama`. |

### Event Props

| Prop | Type | Description |
|------|------|-------------|
| onPanoChanged | `(pano: string) => void` | `pano_changed`, with the panorama ID. |
| onStatusChanged | `(status) => void` | `status_changed`, with the result of `getStatus()` (`'OK'`, `'ZERO_RESULTS'`, ...). |
| onCloseClick | `() => void` | `closeclick` |
| onLoad | `(panorama: google.maps.StreetViewPanorama) => void` | Called once after the panorama is created. |

## Usage

```svelte
<script lang="ts">
	import { APIProvider, StreetViewPanorama } from 'svelte-google-maps-api';

	let position = $state({ lat: 35.6595, lng: 139.7005 });
	let pov = $state({ heading: 165, pitch: 0 });
</script>

<div style="height: 400px;">
	<APIProvider apiKey="YOUR_API_KEY">
		<StreetViewPanorama bind:position bind:pov options={{ addressControl: false }} />
	</APIProvider>
</div>

<p>Heading: {Math.round(pov.heading)}°</p>
```

## Notes

- Use it directly inside `APIProvider`; it does not need (and should not be placed inside) `GoogleMap`.
- The component loads the `streetView` library on demand.
