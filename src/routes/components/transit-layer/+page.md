---
title: TransitLayer
---
The `TransitLayer` component displays the public transportation network on the map.

## Usage

```svelte
<script lang="ts">
  import { APIProvider, GoogleMap, TransitLayer } from 'svelte-google-maps-api';

  let apiKey = 'YOUR_MAP_KEY'; // Replace with your API key
  let map: google.maps.Map | null = null;
  let mapCenter = { lat: 51.507, lng: -0.127 }; // London
  let mapZoom = 13;

</script>

<div style="height: 500px; width: 100%;">
  <APIProvider {apiKey}>
    <GoogleMap bind:map options={{ center: mapCenter, zoom: mapZoom }}>
      <TransitLayer />
    </GoogleMap>
  </APIProvider>
</div>
```

## Props

This component does not typically take specific options via props in the standard API.

## Notes

*   The transit layer displays major public transit routes (subway, bus, train lines) with distinct colors and styles based on the transit agency.
*   Availability of transit information depends on the region and zoom level. 