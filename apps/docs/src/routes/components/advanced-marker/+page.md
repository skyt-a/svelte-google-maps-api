---
title: AdvancedMarker
---

## Storybook

[Open the AdvancedMarker story](https://skyt-a.github.io/svelte-google-maps-api/storybook/?path=/story/components-advancedmarker--basic)

`AdvancedMarker` places a `google.maps.marker.AdvancedMarkerElement` on the map. It shows the default red pin, a customised pin via `Pin`, or any HTML you pass as children.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| position | `LatLngInput \| null` | | Marker position. Bindable: with `draggable`, use `bind:position` to track drags. |
| title | `string` | | Tooltip and accessible name. |
| zIndex | `number \| null` | | Stacking order. |
| draggable | `boolean` | `false` | Lets the user drag the marker (`gmpDraggable`). |
| clickable | `boolean` | `true` when `onClick` is set | Makes the marker clickable (`gmpClickable`). |
| collisionBehavior | `google.maps.CollisionBehaviorString` | | How the marker behaves when it collides with others. |
| anchorLeft | `string` | `-50%` (API default) | CSS length-percentage that moves the anchor point horizontally. |
| anchorTop | `string` | `-100%` (API default) | CSS length-percentage that moves the anchor point vertically. |
| marker | `google.maps.marker.AdvancedMarkerElement \| null` | `null` | The marker instance. Bindable: read it with `bind:marker` (for example to anchor an `InfoWindow`). |
| children | `Snippet` | | Custom marker content, or a `Pin`. |

`LatLngInput` is `google.maps.LatLng \| google.maps.LatLngLiteral \| google.maps.LatLngAltitude \| google.maps.LatLngAltitudeLiteral`.

### Event Props

| Prop | Type | Description |
|------|------|-------------|
| onClick | `(event: google.maps.marker.AdvancedMarkerClickEvent) => void` | `gmp-click` |
| onDragStart | `(position: google.maps.LatLngLiteral \| null) => void` | `gmp-dragstart` |
| onDrag | `(position: google.maps.LatLngLiteral \| null) => void` | `gmp-drag` |
| onDragEnd | `(position: google.maps.LatLngLiteral \| null) => void` | `gmp-dragend`. Also updates `bind:position`. |
| onLoad | `(marker: google.maps.marker.AdvancedMarkerElement) => void` | Called once after the marker is created. |

## Usage

```svelte
<script lang="ts">
	import { APIProvider, GoogleMap, AdvancedMarker, Pin } from 'svelte-google-maps-api';

	let position = $state({ lat: 35.6812, lng: 139.7671 });
</script>

<div style="height: 400px;">
	<APIProvider apiKey="YOUR_API_KEY">
		<GoogleMap center={{ lat: 35.6812, lng: 139.7671 }} zoom={13} mapId="DEMO_MAP_ID">
			<!-- Default pin, draggable -->
			<AdvancedMarker bind:position draggable title="Drag me" />

			<!-- Customised pin -->
			<AdvancedMarker position={{ lat: 35.6586, lng: 139.7454 }} title="Tokyo Tower">
				<Pin background="#0f766e" borderColor="#134e4a" glyphColor="white" glyphText="T" />
			</AdvancedMarker>

			<!-- Custom HTML -->
			<AdvancedMarker
				position={{ lat: 35.71, lng: 139.8107 }}
				onClick={() => alert('Skytree')}
			>
				<div class="badge">Skytree</div>
			</AdvancedMarker>
		</GoogleMap>
	</APIProvider>
</div>

<style>
	.badge {
		background: white;
		border-radius: 999px;
		padding: 4px 10px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
	}
</style>
```

## Migrating from Marker

`Marker` (built on `google.maps.Marker`, deprecated since February 2024) was removed. Replace it with `AdvancedMarker`:

- Set a `mapId` on `GoogleMap`; Advanced Markers do not render without one.
- `options.draggable` becomes `draggable`, and `options.label` / `options.icon` become a `Pin` (`glyphText`, `background`, ...) or custom HTML children.
- `onClick` receives an `AdvancedMarkerClickEvent` instead of a `MapMouseEvent`. Drag handlers receive the new position.

## Notes

- The map needs a `mapId` (use `DEMO_MAP_ID` for testing).
- Children replace the default pin whenever they render an element or text. Content that appears later (for example behind an `if` block) is attached then, and the default pin returns when the children render nothing.
- Inside `MarkerClusterer`, the marker is added to the clusterer instead of directly to the map.
