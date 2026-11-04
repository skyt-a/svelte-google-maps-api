---
title: TrafficLayer
---

## Storybook

[Open the TrafficLayer story](https://skyt-a.github.io/svelte-google-maps-api/storybook/?path=/story/components-trafficlayer--basic)

`TrafficLayer` shows real-time traffic conditions with `google.maps.TrafficLayer`. Render it inside `GoogleMap` to show the layer and remove it to hide the layer.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| autoRefresh | `boolean` | `true` | Refresh traffic data automatically. |

### Event Props

| Prop | Type | Description |
|------|------|-------------|
| onLoad | `(layer: google.maps.TrafficLayer) => void` | Called once after the layer is added to the map. |

## Usage

```svelte
<script lang="ts">
	import { APIProvider, GoogleMap, TrafficLayer } from 'svelte-google-maps-api';

	let visible = $state(true);
</script>

<label><input type="checkbox" bind:checked={visible} /> Show layer</label>

<div style="height: 400px;">
	<APIProvider apiKey="YOUR_API_KEY">
		<GoogleMap center={{ lat: 35.6812, lng: 139.7671 }} zoom={13}>
			{#if visible}
				<TrafficLayer autoRefresh />
			{/if}
		</GoogleMap>
	</APIProvider>
</div>
```

## Notes

- Traffic data is not available in every region.
