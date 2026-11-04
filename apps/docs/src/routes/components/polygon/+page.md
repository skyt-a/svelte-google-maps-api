---
title: Polygon
---

## Storybook

[Open the Polygon story](https://skyt-a.github.io/svelte-google-maps-api/storybook/?path=/story/components-polygon--basic)

`Polygon` draws a `google.maps.Polygon`. It accepts a single ring or several rings (outer boundary first, then holes). With `editable` or `draggable`, edits flow back through `bind:paths`.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| paths | `google.maps.LatLngLiteral[] \| google.maps.LatLngLiteral[][]` | | One ring, or an array of rings. Bindable: use `bind:paths` to track edits. |
| strokeColor | `string` | | Stroke color. |
| strokeOpacity | `number` | | Stroke opacity between 0 and 1. |
| strokeWeight | `number` | | Stroke width in pixels. |
| strokePosition | `google.maps.StrokePosition` | | Stroke position (`CENTER`, `INSIDE`, `OUTSIDE`). |
| fillColor | `string` | | Fill color. |
| fillOpacity | `number` | | Fill opacity between 0 and 1. |
| geodesic | `boolean` | | Draw great-circle edges. |
| clickable | `boolean` | | Whether the shape handles mouse events. |
| draggable | `boolean` | | Lets the user drag the shape. |
| editable | `boolean` | | Shows handles so the user can edit the shape. |
| visible | `boolean` | | Whether the shape is visible. |
| zIndex | `number` | | Stacking order. |
| options | `google.maps.PolygonOptions` | | Other polygon options. Individual props override these. |
| polygon | `google.maps.Polygon \| null` | `null` | The instance. Bindable: read it with `bind:polygon`. |

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
| onPathsChanged | `(paths: google.maps.LatLngLiteral[][]) => void` | Called after the user edits or drags the polygon. Always receives an array of rings. |
| onLoad | `(polygon: google.maps.Polygon) => void` | Called once after the polygon is created. |

## Usage

```svelte
<script lang="ts">
	import { APIProvider, GoogleMap, Polygon } from 'svelte-google-maps-api';

	let paths = $state([
		{ lat: 35.70, lng: 139.72 },
		{ lat: 35.70, lng: 139.80 },
		{ lat: 35.65, lng: 139.80 },
		{ lat: 35.65, lng: 139.72 }
	]);
</script>

<div style="height: 400px;">
	<APIProvider apiKey="YOUR_API_KEY">
		<GoogleMap center={{ lat: 35.68, lng: 139.76 }} zoom={12}>
			<Polygon bind:paths fillColor="#2563eb" fillOpacity={0.25} strokeColor="#2563eb" editable />
		</GoogleMap>
	</APIProvider>
</div>
```

## Notes

- With `bind:paths`, a single ring stays a single ring after edits. If you pass nested rings, or an edit produces more than one ring, the bound value is an array of rings.
- `onPathsChanged` always receives an array of rings.
