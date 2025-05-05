---
title: TrafficLayer
---
A component to display the traffic layer on the map.

Must be used within a `<GoogleMap>` component.

```svelte
<script lang="ts">
  import { APIProvider, GoogleMap, TrafficLayer } from 'svelte-google-maps-api';
  import { GOOGLE_MAPS_API_KEY } from '$env/static/private';
  import { writable } from 'svelte/store';

  const showTraffic = writable(true);
</script>

<APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
  <GoogleMap initialCenter={{ lat: 35.681, lng: 139.767 }} initialZoom={13}>
    {#if $showTraffic}
      <TrafficLayer />
    {/if}
  </GoogleMap>
</APIProvider>

<label>
  <input type="checkbox" bind:checked={$showTraffic} />
  Show Traffic
</label>
```

## Props

This component does not have any configurable props. The layer's visibility is controlled by mounting/unmounting the component.

## Events

| Event       | Type                                                  | Description                                         |
| :---------- | :---------------------------------------------------- | :-------------------------------------------------- |
| `onLoad`    | `((layer: google.maps.TrafficLayer) => void) \| undefined` | Fired when the layer is loaded. Receives the instance. |
| `onUnmount` | `((layer: google.maps.TrafficLayer) => void) \| undefined` | Fired when the component is destroyed. Receives the instance. |

## Binding

This component does not support the `bind:` directive. 