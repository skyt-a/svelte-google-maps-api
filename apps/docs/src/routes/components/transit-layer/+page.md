---
title: TransitLayer
---

## Storybook

[Open the TransitLayer story](https://skyt-a.github.io/svelte-google-maps-api/storybook/?path=/story/components-transitlayer--basic)

`TransitLayer` shows public transit lines with `google.maps.TransitLayer`. Render it inside `GoogleMap` to show the layer and remove it to hide the layer.

## Props

This component has no props other than `onLoad`.

### Event Props

| Prop | Type | Description |
|------|------|-------------|
| onLoad | `(layer: google.maps.TransitLayer) => void` | Called once after the layer is added to the map. |

## Usage

```svelte
<script lang="ts">
	import { APIProvider, GoogleMap, TransitLayer } from 'svelte-google-maps-api';

	let visible = $state(true);
</script>

<label><input type="checkbox" bind:checked={visible} /> Show layer</label>

<div style="height: 400px;">
	<APIProvider apiKey="YOUR_API_KEY">
		<GoogleMap center={{ lat: 35.6812, lng: 139.7671 }} zoom={13}>
			{#if visible}
				<TransitLayer />
			{/if}
		</GoogleMap>
	</APIProvider>
</div>
```

## Notes

- Transit data is not available in every city.
