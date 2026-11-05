---
title: GoogleMap
---

## Storybook

[Open the GoogleMap story](https://skyt-a.github.io/svelte-google-maps-api/storybook/?path=/story/components-googlemap--basic)

`GoogleMap` creates a `google.maps.Map` and provides it to its children. The camera (`center`, `zoom`, `heading`, `tilt`) is controlled by props and can be two-way bound, so user panning and zooming flows back into your state.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| center | `google.maps.LatLngLiteral \| google.maps.LatLng` | | Map center. Bindable: use `bind:center` to track panning. |
| zoom | `number` | | Zoom level. Bindable: use `bind:zoom` to track zooming. |
| heading | `number` | | Heading in degrees. Bindable. |
| tilt | `number` | | Tilt in degrees. Bindable. |
| mapId | `string` | | Map ID from the Cloud Console. Required for `AdvancedMarker`. Creation-only. |
| colorScheme | `google.maps.MapOptions['colorScheme']` | | `LIGHT`, `DARK` or `FOLLOW_SYSTEM`. Creation-only. |
| renderingType | `google.maps.MapOptions['renderingType']` | | `RASTER` or `VECTOR`. Creation-only. |
| options | `google.maps.MapOptions` (without camera, `mapId`, `colorScheme`, `renderingType`) | | Any other map options. Applied with `setOptions()` whenever it changes. |
| id | `string` | | `id` of the map container. |
| class | `string` | `''` | Class of the map container. |
| style | `string` | `'width:100%;height:100%;'` | Inline style of the map container. The container needs a height. |
| map | `google.maps.Map \| null` | `null` | The map instance. Bindable: read it with `bind:map`. |
| children | `Snippet` | | Map children, rendered once the map exists. |

### Event Props

| Prop | Type | Description |
|------|------|-------------|
| onClick | `(event: google.maps.MapMouseEvent) => void` | `click` |
| onDblClick | `(event: google.maps.MapMouseEvent) => void` | `dblclick` |
| onContextMenu | `(event: google.maps.MapMouseEvent) => void` | `contextmenu` (right click) |
| onMouseMove | `(event: google.maps.MapMouseEvent) => void` | `mousemove` |
| onMouseOver | `(event: google.maps.MapMouseEvent) => void` | `mouseover` |
| onMouseOut | `(event: google.maps.MapMouseEvent) => void` | `mouseout` |
| onDragStart | `() => void` | `dragstart` |
| onDrag | `() => void` | `drag` |
| onDragEnd | `() => void` | `dragend` |
| onIdle | `(map: google.maps.Map) => void` | `idle` |
| onTilesLoaded | `(map: google.maps.Map) => void` | `tilesloaded` |
| onBoundsChanged | `(bounds: google.maps.LatLngBoundsLiteral) => void` | `bounds_changed` |
| onCameraChanged | `(camera: MapCameraState) => void` | Any of `center_changed`, `zoom_changed`, `heading_changed`, `tilt_changed`. Receives center, zoom, heading and tilt. |
| onLoad | `(map: google.maps.Map) => void` | Called once after the map is created. |

## Usage

```svelte
<script lang="ts">
	import { APIProvider, GoogleMap } from 'svelte-google-maps-api';

	let center = $state({ lat: 35.6812, lng: 139.7671 });
	let zoom = $state(12);
</script>

<div style="height: 400px;">
	<APIProvider apiKey="YOUR_API_KEY">
		<GoogleMap
			bind:center
			bind:zoom
			mapId="DEMO_MAP_ID"
			options={{ disableDefaultUI: true, gestureHandling: 'greedy' }}
			onClick={(event) => console.log(event.latLng?.toJSON())}
		/>
	</APIProvider>
</div>

<p>{center.lat.toFixed(4)}, {center.lng.toFixed(4)} @ {zoom}</p>
```

## Migrating from 0.2

- `options.center` and `options.zoom` are now the `center` and `zoom` props (bindable).
- `mapContainerStyle` is now `style`, and `mapContainerClassName` is now `class`.
- `options.mapId` is now the `mapId` prop.
- `onLoad` is unchanged. `onUnmount` was removed; use an effect cleanup in a child component if you need it.
- The map instance is also available with `bind:map` or the `useMap()` hook.

## Notes

- The map is invisible until it has both `center` and `zoom`.
- `mapId`, `colorScheme` and `renderingType` are read once when the map is created. Recreate the component (for example inside a `key` block) to change them.
- Children are rendered only after the map exists, so child components can use the map right away.
