---
title: InfoWindow
---

## Storybook

[Open the InfoWindow story](https://skyt-a.github.io/svelte-google-maps-api/storybook/?path=/story/components-infowindow--basic)

`InfoWindow` shows a `google.maps.InfoWindow` popup, either anchored to a marker or at a position. Its content and optional header are Svelte snippets, and its open state can be two-way bound.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| open | `boolean` | `true` | Whether the info window is open. Bindable: closing it from the map sets it to `false`. |
| anchor | `google.maps.marker.AdvancedMarkerElement \| google.maps.MVCObject \| null` | | Marker to attach to. Takes precedence over `position`. |
| position | `LatLngInput \| null` | | Position used when there is no `anchor`. |
| headerContent | `string` | | Header text. Use the `header` snippet for rich content. |
| headerDisabled | `boolean` | | Hides the header row, including the close button. |
| maxWidth | `number` | | Maximum width in pixels. |
| minWidth | `number` | | Minimum width in pixels. |
| pixelOffset | `[number, number]` | | Offset from the anchor point, as `[x, y]`. |
| zIndex | `number` | | Stacking order. |
| disableAutoPan | `boolean` | | Stops the map from panning to show the info window when it opens. |
| ariaLabel | `string` | | Accessible label. |
| shouldFocus | `boolean` | | Whether focus moves into the info window when it opens. |
| options | `google.maps.InfoWindowOptions` | | Other info window options. |
| infoWindow | `google.maps.InfoWindow \| null` | `null` | The instance. Bindable: read it with `bind:infoWindow`. |
| header | `Snippet` | | Rich header content. Overrides `headerContent` when it renders something. |
| children | `Snippet` | | Info window content. |

### Event Props

| Prop | Type | Description |
|------|------|-------------|
| onClose | `() => void` | Called whenever the info window closes (close button or `open = false`). |
| onCloseClick | `() => void` | Called when the user clicks the close button. |
| onLoad | `(infoWindow: google.maps.InfoWindow) => void` | Called once after the info window is created. |

## Usage

```svelte
<script lang="ts">
	import { APIProvider, GoogleMap, AdvancedMarker, InfoWindow } from 'svelte-google-maps-api';

	let marker = $state<google.maps.marker.AdvancedMarkerElement | null>(null);
	let open = $state(false);
</script>

<div style="height: 400px;">
	<APIProvider apiKey="YOUR_API_KEY">
		<GoogleMap center={{ lat: 35.6812, lng: 139.7671 }} zoom={13} mapId="DEMO_MAP_ID">
			<AdvancedMarker
				position={{ lat: 35.6812, lng: 139.7671 }}
				bind:marker
				onClick={() => (open = true)}
			/>

			{#if marker}
				<InfoWindow anchor={marker} bind:open maxWidth={240}>
					{#snippet header()}
						<strong>Tokyo Station</strong>
					{/snippet}
					<p>Opened in 1914. Marunouchi side.</p>
				</InfoWindow>
			{/if}

			<InfoWindow position={{ lat: 35.6586, lng: 139.7454 }} headerContent="Tokyo Tower">
				<p>333 m tall.</p>
			</InfoWindow>
		</GoogleMap>
	</APIProvider>
</div>
```

## Notes

- Get the marker for `anchor` with `bind:marker` on `AdvancedMarker`. Render the `InfoWindow` only once the marker exists.
- Unmounting the component closes the info window.
- `InfoWindow` must be inside `GoogleMap`.
