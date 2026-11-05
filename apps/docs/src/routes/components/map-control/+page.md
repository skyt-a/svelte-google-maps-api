---
title: MapControl
---

## Storybook

[Open the MapControl story](https://skyt-a.github.io/svelte-google-maps-api/storybook/?path=/story/components-mapcontrol--basic)

`MapControl` renders its children as a custom control on the map, at one of the standard control positions.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| position | `google.maps.ControlPosition \| keyof typeof google.maps.ControlPosition` | (required) | A `ControlPosition` value or its name, such as `'TOP_LEFT'` or `'BLOCK_START_INLINE_END'`. Changing it moves the control. |
| children | `Snippet` | | Control content. |

## Usage

```svelte
<script lang="ts">
	import { APIProvider, GoogleMap, MapControl } from 'svelte-google-maps-api';

	const home = { lat: 35.6812, lng: 139.7671 };
	let center = $state(home);
	let zoom = $state(12);
</script>

<div style="height: 400px;">
	<APIProvider apiKey="YOUR_API_KEY">
		<GoogleMap bind:center bind:zoom>
			<MapControl position="BLOCK_START_INLINE_END">
				<button type="button" class="control" onclick={() => ((center = home), (zoom = 12))}>
					Back to Tokyo
				</button>
			</MapControl>
		</GoogleMap>
	</APIProvider>
</div>

<style>
	.control {
		margin: 10px;
		padding: 8px 12px;
		background: white;
		border: 0;
		border-radius: 4px;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
		cursor: pointer;
	}
</style>
```

## Notes

- Prefer the logical positions (`BLOCK_START_INLINE_START`, `BLOCK_START_INLINE_END`, ...): they follow the page's writing direction.
- The content is moved into the map's control container, so styles from a parent component's `<style>` block still apply (Svelte scopes by class, not by DOM position).
