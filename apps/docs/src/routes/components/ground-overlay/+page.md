---
title: GroundOverlay
---
A component to display an image on the map, fitted to the specified bounds.

Must be used within a `<GoogleMap>` component.

```svelte
<script lang="ts">
  import { APIProvider, GoogleMap, GroundOverlay } from 'svelte-google-maps-api';
  import { GOOGLE_MAPS_API_KEY } from '$env/static/private';

  const imageUrl = 'https://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg'; // Example image URL
  const imageBounds = {
    north: 40.773941,
    south: 40.712216,
    east: -74.12544,
    west: -74.22655
  };
</script>

<APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
  <GoogleMap initialCenter={{ lat: 40.74, lng: -74.18 }} initialZoom={13}>
    <GroundOverlay url={imageUrl} bounds={imageBounds} opacity={0.8} clickable={true} />
  </GoogleMap>
</APIProvider>
```

## Props

| Prop       | Type                                                                 | Default     | Description                                                                                                                          |
| :--------- | :------------------------------------------------------------------- | :---------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| `url`      | `string`                                                             | (none)      | The URL of the image to display. **Required**. Changing this will cause the overlay to re-initialize.                              |
| `bounds`   | `google.maps.LatLngBounds \| google.maps.LatLngBoundsLiteral`        | (none)      | The bounds (`LatLngBounds` or `LatLngBoundsLiteral`) to which the image should be fitted. **Required**. Changing this will cause the overlay to re-initialize. |
| `options`  | `google.maps.GroundOverlayOptions \| undefined`                       | `undefined` | Initialization options for the ground overlay. Takes precedence over individual props.                                            |
| `clickable`| `boolean \| undefined`                                               | `undefined` | Whether the overlay is clickable.                                                                                                    |
| `opacity`  | `number \| undefined`                                                | `undefined` | The opacity of the overlay (from 0 to 1).                                                                                            |

## Events

| Event      | Type                                                   | Description                                         |
| :--------- | :----------------------------------------------------- | :-------------------------------------------------- |
| `onClick`  | `((e: google.maps.MapMouseEvent) => void) \| undefined` | Fired when the overlay is clicked.                  |
| `onDblClick`| `((e: google.maps.MapMouseEvent) => void) \| undefined` | Fired when the overlay is double-clicked.           |
| `onLoad`   | `((overlay: google.maps.GroundOverlay) => void) \| undefined` | Fired when the overlay is loaded. Receives the instance. |
| `onUnmount`| `((overlay: google.maps.GroundOverlay) => void) \| undefined` | Fired when the component is destroyed. Receives the instance. |

## Binding

This component does not support the `bind:` directive. 