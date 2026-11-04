---
title: BicyclingLayer
---

## Storybook

[Open the BicyclingLayer story](https://skyt-a.github.io/svelte-google-maps-api/storybook/?path=/story/components-bicyclinglayer--basic)

`BicyclingLayer` shows bike paths and bicycle-friendly roads with `google.maps.BicyclingLayer`. Render it inside `GoogleMap` to show the layer and remove it to hide the layer.

## Props

This component has no props other than `onLoad`.

### Event Props

| Prop | Type | Description |
|------|------|-------------|
| onLoad | `(layer: google.maps.BicyclingLayer) => void` | Called once after the layer is added to the map. |

## Usage

```svelte
<script lang="ts">
	import { APIProvider, GoogleMap, BicyclingLayer } from 'svelte-google-maps-api';

	let visible = $state(true);
</script>

<label><input type="checkbox" bind:checked={visible} /> Show layer</label>

<div style="height: 400px;">
	<APIProvider apiKey="YOUR_API_KEY">
		<GoogleMap center={{ lat: 45.523, lng: -122.676 }} zoom={13}>
			{#if visible}
				<BicyclingLayer />
			{/if}
		</GoogleMap>
	</APIProvider>
</div>
```

## Notes

- Bicycling data is not available in every region; try a city such as Portland, Oregon.
