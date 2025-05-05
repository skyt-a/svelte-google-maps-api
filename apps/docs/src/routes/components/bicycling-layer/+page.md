---
title: BicyclingLayer
---
The `BicyclingLayer` component displays bicycle paths, suggested routes, and other overlays specific to cycling on the map.

## Usage

```svelte
<script lang="ts">
  import { APIProvider, GoogleMap, BicyclingLayer } from 'svelte-google-maps-api';

  let apiKey = 'YOUR_MAP_KEY'; // Replace with your API key
  let map: google.maps.Map | null = null;
  let mapCenter = { lat: 45.523, lng: -122.676 }; // Portland
  let mapZoom = 14;

</script>

<div style="height: 500px; width: 100%;">
  <APIProvider {apiKey}>
    <GoogleMap bind:map options={{ center: mapCenter, zoom: mapZoom }}>
      <BicyclingLayer />
    </GoogleMap>
  </APIProvider>
</div>
```

## Props

This component does not typically take specific options via props in the standard API.

## Notes

*   The layer highlights:
    *   Dark green: Dedicated bike trails.
    *   Light green: Streets with dedicated bike lanes.
    *   Dashed green: Streets recommended for cycling but without dedicated lanes.
*   Availability and detail depend on the region and zoom level. 