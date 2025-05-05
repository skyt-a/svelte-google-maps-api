---
title: MapControl
---
A component to add custom control elements to the map.
Displays the HTML elements placed within its slot at the specified position.

Must be used within a `<GoogleMap>` component.

```svelte
<script lang="ts">
  import { APIProvider, GoogleMap, MapControl } from 'svelte-google-maps-api';
  import { GOOGLE_MAPS_API_KEY } from '$env/static/private';

  let map: google.maps.Map | null = null;
</script>

<APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
  <GoogleMap bind:map initialCenter={{ lat: 35.681, lng: 139.767 }} initialZoom={13}>
    <MapControl position={google.maps.ControlPosition.TOP_LEFT}>
      <div style="background: white; padding: 5px; margin: 10px; border: 1px solid #ccc; box-shadow: 0 2px 6px rgba(0,0,0,.3); cursor: pointer;">
        Custom Control
      </div>
    </MapControl>

    <MapControl position={google.maps.ControlPosition.RIGHT_BOTTOM}>
      <button style="margin: 10px;" on:click={() => map?.setZoom(map.getZoom()! + 1)}>
        Zoom In
      </button>
    </MapControl>
  </GoogleMap>
</APIProvider>
```

## Props

| Prop       | Type                             | Default     | Description                                                                                             |
| :--------- | :------------------------------- | :---------- | :------------------------------------------------------------------------------------------------------ |
| `position` | `google.maps.ControlPosition`    | (none)      | The position where the control should be added. **Required**. Uses values from the `google.maps.ControlPosition` enum. |

**`google.maps.ControlPosition` values:**

*   `BOTTOM_CENTER`
*   `BOTTOM_LEFT`
*   `BOTTOM_RIGHT`
*   `LEFT_BOTTOM`
*   `LEFT_CENTER`
*   `LEFT_TOP`
*   `RIGHT_BOTTOM`
*   `RIGHT_CENTER`
*   `RIGHT_TOP`
*   `TOP_CENTER`
*   `TOP_LEFT`
*   `TOP_RIGHT`

## Events

This component does not have specific events. You can add event listeners to the elements within the slot.

## Binding

This component does not support the `bind:` directive.

## Slots

*   **default:** Place the HTML elements or Svelte components to be displayed as the control. 