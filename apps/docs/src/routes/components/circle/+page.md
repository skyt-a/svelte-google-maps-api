---
title: Circle
---

## Storybook

[Open the Circle story](https://skyt-a.github.io/svelte-google-maps-api/storybook/?path=/story/components-circle--basic)

`Circle` draws a `google.maps.Circle`. With `editable` or `draggable`, the new center and radius flow back through `bind:center` and `bind:radius`.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| center | `google.maps.LatLngLiteral \| google.maps.LatLng` | | Circle center. Bindable. |
| radius | `number` | | Radius in meters. Bindable. |
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
| options | `google.maps.CircleOptions` | | Other circle options. Individual props override these. |
| circle | `google.maps.Circle \| null` | `null` | The instance. Bindable: read it with `bind:circle`. |

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
| onCenterChanged | `(center: google.maps.LatLngLiteral) => void` | `center_changed` |
| onRadiusChanged | `(radius: number) => void` | `radius_changed` |
| onLoad | `(circle: google.maps.Circle) => void` | Called once after the circle is created. |

## Usage

```svelte
<script lang="ts">
	import { APIProvider, GoogleMap, Circle } from 'svelte-google-maps-api';

	let center = $state({ lat: 35.6812, lng: 139.7671 });
	let radius = $state(1000);
</script>

<div style="height: 400px;">
	<APIProvider apiKey="YOUR_API_KEY">
		<GoogleMap center={{ lat: 35.6812, lng: 139.7671 }} zoom={13}>
			<Circle bind:center bind:radius fillColor="#f59e0b" fillOpacity={0.2} strokeColor="#f59e0b" editable draggable />
		</GoogleMap>
	</APIProvider>
</div>

<p>Radius: {Math.round(radius)} m</p>
```
