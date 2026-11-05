---
title: Rectangle
---

## Storybook

[Open the Rectangle story](https://skyt-a.github.io/svelte-google-maps-api/storybook/?path=/story/components-rectangle--basic)

`Rectangle` draws a `google.maps.Rectangle`. With `editable` or `draggable`, the new bounds flow back through `bind:bounds`.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| bounds | `google.maps.LatLngBoundsLiteral \| google.maps.LatLngBounds` | | Rectangle bounds. Bindable. |
| strokeColor | `string` | | Stroke color. |
| strokeOpacity | `number` | | Stroke opacity between 0 and 1. |
| strokeWeight | `number` | | Stroke width in pixels. |
| strokePosition | `google.maps.StrokePosition` | | Stroke position (`CENTER`, `INSIDE`, `OUTSIDE`). |
| fillColor | `string` | | Fill color. |
| fillOpacity | `number` | | Fill opacity between 0 and 1. |
| clickable | `boolean` | | Whether the shape handles mouse events. |
| draggable | `boolean` | | Lets the user drag the shape. |
| editable | `boolean` | | Shows handles so the user can edit the shape. |
| visible | `boolean` | | Whether the shape is visible. |
| zIndex | `number` | | Stacking order. |
| options | `google.maps.RectangleOptions` | | Other rectangle options. Individual props override these. |
| rectangle | `google.maps.Rectangle \| null` | `null` | The instance. Bindable: read it with `bind:rectangle`. |

### Event Props

| Prop | Type | Description |
|------|------|-------------|
| onClick | `(event: google.maps.MapMouseEvent) => void` | `click` |
| onDblClick | `(event: google.maps.MapMouseEvent) => void` | `dblclick` |
| onContextMenu | `(event: google.maps.MapMouseEvent) => void` | `contextmenu` |
| onMouseDown | `(event: google.maps.MapMouseEvent) => void` | `mousedown` |
| onMouseUp | `(event: google.maps.MapMouseEvent) => void` | `mouseup` |
| onMouseOver | `(event: google.maps.MapMouseEvent) => void` | `mouseover` |
| onMouseOut | `(event: google.maps.MapMouseEvent) => void` | `mouseout` |
| onMouseMove | `(event: google.maps.MapMouseEvent) => void` | `mousemove` |
| onDragStart | `(event: google.maps.MapMouseEvent) => void` | `dragstart` |
| onDrag | `(event: google.maps.MapMouseEvent) => void` | `drag` |
| onDragEnd | `(event: google.maps.MapMouseEvent) => void` | `dragend` |
| onBoundsChanged | `(bounds: google.maps.LatLngBoundsLiteral) => void` | `bounds_changed` |
| onLoad | `(rectangle: google.maps.Rectangle) => void` | Called once after the rectangle is created. |

## Usage

```svelte
<script lang="ts">
	import { APIProvider, GoogleMap, Rectangle } from 'svelte-google-maps-api';

	let bounds = $state({ north: 35.70, south: 35.66, east: 139.79, west: 139.73 });
</script>

<div style="height: 400px;">
	<APIProvider apiKey="YOUR_API_KEY">
		<GoogleMap center={{ lat: 35.68, lng: 139.76 }} zoom={13}>
			<Rectangle bind:bounds fillColor="#16a34a" fillOpacity={0.2} strokeColor="#16a34a" editable />
		</GoogleMap>
	</APIProvider>
</div>
```
