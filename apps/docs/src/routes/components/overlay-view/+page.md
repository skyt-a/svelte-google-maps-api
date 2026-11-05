---
title: OverlayView
---

## Storybook

[Open the OverlayView story](https://skyt-a.github.io/svelte-google-maps-api/storybook/?path=/story/components-overlayview--basic)

`OverlayView` renders Svelte content inside a map pane at a geographic position, or stretched over geographic bounds. Use it for fully custom HTML overlays.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| position | `LatLngInput \| null` | | Point the content's top-left corner is placed at. |
| bounds | `google.maps.LatLngBoundsLiteral \| google.maps.LatLngBounds \| null` | | Area the content is stretched over. Takes precedence over `position`. |
| pane | `keyof google.maps.MapPanes` | `'floatPane'` | Map pane to render into. Use `overlayMouseTarget` or `floatPane` for clickable content. |
| offset | `[number, number]` | `[0, 0]` | Pixel offset applied to `position`, as `[x, y]`. |
| zIndex | `number` | | CSS `z-index` of the content container. |
| class | `string` | `''` | Class of the content container. |
| overlayView | `google.maps.OverlayView \| null` | `null` | The instance. Bindable: read it with `bind:overlayView`. |
| children | `Snippet` | | Overlay content. |

### Event Props

| Prop | Type | Description |
|------|------|-------------|
| onLoad | `(overlayView: google.maps.OverlayView) => void` | Called once after the overlay is added to the map. |

## Usage

```svelte
<script lang="ts">
	import { APIProvider, GoogleMap, OverlayView } from 'svelte-google-maps-api';
</script>

<div style="height: 400px;">
	<APIProvider apiKey="YOUR_API_KEY">
		<GoogleMap center={{ lat: 35.6812, lng: 139.7671 }} zoom={14}>
			<OverlayView
				position={{ lat: 35.6812, lng: 139.7671 }}
				pane="overlayMouseTarget"
				offset={[-60, -40]}
			>
				<div class="label">Tokyo Station</div>
			</OverlayView>
		</GoogleMap>
	</APIProvider>
</div>

<style>
	.label {
		width: 120px;
		padding: 6px;
		text-align: center;
		background: white;
		border-radius: 6px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
	}
</style>
```

## Notes

- With `position`, the content's top-left corner sits on the point; use `offset` to center it.
- The content is hidden until the overlay is first drawn, so it never flashes at the top-left of the page.
- For simple markers with custom HTML, `AdvancedMarker` with children is usually easier and handles collisions and accessibility.
