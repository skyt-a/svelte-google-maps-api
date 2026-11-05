---
title: Polyline
---

## Storybook

[Open the Polyline story](https://skyt-a.github.io/svelte-google-maps-api/storybook/?path=/story/components-polyline--basic)

`Polyline` draws a `google.maps.Polyline`. With `editable` or `draggable`, the user's edits flow back through `bind:path`.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| path | `google.maps.LatLngLiteral[]` | | Vertices of the line. Bindable: use `bind:path` to track edits. |
| strokeColor | `string` | | Stroke color. |
| strokeOpacity | `number` | | Stroke opacity between 0 and 1. |
| strokeWeight | `number` | | Stroke width in pixels. |
| geodesic | `boolean` | | Draw great-circle segments. |
| clickable | `boolean` | | Whether the shape handles mouse events. |
| draggable | `boolean` | | Lets the user drag the shape. |
| editable | `boolean` | | Shows handles so the user can edit the shape. |
| visible | `boolean` | | Whether the shape is visible. |
| zIndex | `number` | | Stacking order. |
| icons | `google.maps.IconSequence[]` | | Symbols along the line. |
| options | `google.maps.PolylineOptions` | | Other polyline options. Individual props override these. |
| polyline | `google.maps.Polyline \| null` | `null` | The instance. Bindable: read it with `bind:polyline`. |

### Event Props

| Prop | Type | Description |
|------|------|-------------|
| onClick | `(event: google.maps.PolyMouseEvent) => void` | `click` |
| onDblClick | `(event: google.maps.PolyMouseEvent) => void` | `dblclick` |
| onContextMenu | `(event: google.maps.PolyMouseEvent) => void` | `contextmenu` |
| onMouseDown | `(event: google.maps.PolyMouseEvent) => void` | `mousedown` |
| onMouseUp | `(event: google.maps.PolyMouseEvent) => void` | `mouseup` |
| onMouseOver | `(event: google.maps.PolyMouseEvent) => void` | `mouseover` |
| onMouseOut | `(event: google.maps.PolyMouseEvent) => void` | `mouseout` |
| onMouseMove | `(event: google.maps.PolyMouseEvent) => void` | `mousemove` |
| onDragStart | `(event: google.maps.MapMouseEvent) => void` | `dragstart` |
| onDrag | `(event: google.maps.MapMouseEvent) => void` | `drag` |
| onDragEnd | `(event: google.maps.MapMouseEvent) => void` | `dragend` |
| onPathChanged | `(path: google.maps.LatLngLiteral[]) => void` | Called after the user edits or drags the line. |
| onLoad | `(polyline: google.maps.Polyline) => void` | Called once after the polyline is created. |

## Usage

```svelte
<script lang="ts">
	import { APIProvider, GoogleMap, Polyline } from 'svelte-google-maps-api';

	let path = $state([
		{ lat: 35.6812, lng: 139.7671 },
		{ lat: 35.6586, lng: 139.7454 },
		{ lat: 35.71, lng: 139.8107 }
	]);
</script>

<div style="height: 400px;">
	<APIProvider apiKey="YOUR_API_KEY">
		<GoogleMap center={{ lat: 35.68, lng: 139.77 }} zoom={12}>
			<Polyline bind:path strokeColor="#0f766e" strokeWeight={4} geodesic editable />
		</GoogleMap>
	</APIProvider>
</div>

<p>{path.length} vertices</p>
```

## Notes

- Style props are applied with `setOptions()` whenever they change; unset props keep the API defaults.
- Assigning a new `path` array redraws the line. Editing or dragging writes a new array back to `path`.
