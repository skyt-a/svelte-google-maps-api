# Svelte Google Maps API

[![npm version](https://badge.fury.io/js/svelte-google-maps-api.svg)](https://badge.fury.io/js/svelte-google-maps-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A declarative Svelte component library for the Google Maps JavaScript API, inspired by [`@vis.gl/react-google-maps`](https://visgl.github.io/react-google-maps/).

**Note:** This library is under active development. APIs might change.

## Features

*   Declarative Svelte components for Google Maps elements (Map, Markers, InfoWindows, Shapes, Layers, etc.).
*   TypeScript support.
*   Context-based API loading and map instance sharing.
*   Components for `AdvancedMarkerElement`, `MapControl`, `Autocomplete`, `OverlayView`, `StreetViewPanorama`, and more.

## Installation

```bash
pnpm install svelte-google-maps-api
# or
npm install svelte-google-maps-api
# or
yarn add svelte-google-maps-api
```

## Basic Usage

Get your Google Maps API Key. Make sure the "Maps JavaScript API" is enabled for your key in the Google Cloud Console. You might also need to enable specific libraries (like "marker", "places", "visualization") depending on the components you use.

```svelte
<!-- src/routes/+page.svelte -->
<script lang="ts">
  import {
    APIProvider,
    GoogleMap,
    Marker
  } from 'svelte-google-maps-api';

  let apiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your actual API key

  // Map options
  const mapOptions = {
    center: { lat: 35.681, lng: 139.767 }, // Tokyo Station
    zoom: 14,
    mapId: 'YOUR_MAP_ID' // Optional: Recommended for Advanced Markers & custom styling
  };

  // Marker position
  const markerPosition = { lat: 35.681, lng: 139.767 };

</script>

<div style="height: 100vh; width: 100%">
  {#if apiKey}
    <APIProvider {apiKey} libraries={['marker']}> {/* Load necessary libraries */}
      <GoogleMap {...mapOptions} mapContainerStyle="width:100%; height:100%;">
        <Marker position={markerPosition} title="Tokyo Station" />
      </GoogleMap>
    </APIProvider>
  {:else}
    <p>Please provide an API Key.</p>
    <!-- Basic input example (replace with your actual key management) -->
    <input type="text" placeholder="Enter API Key" bind:value={apiKey} />
  {/if}
</div>
```

## Documentation

For detailed documentation, component references, and examples, please visit the **[Documentation Website](https://skyt-a.github.io/svelte-google-maps-api/docs)** (Replace with actual link after deployment).

## Components

This library provides the following components (and more):

*   `APIProvider`: Loads the Google Maps API and provides context.
*   `GoogleMap`: Renders the map container.
*   `Marker`: The standard Google Maps marker.
*   `AdvancedMarker`: The newer, customizable marker element.
*   `InfoWindow`: Displays info windows, often anchored to markers.
*   Drawing Components: `Polyline`, `Polygon`, `Rectangle`, `Circle`.
*   Layer Components: `HeatmapLayer`, `KmlLayer`, `TrafficLayer`, `TransitLayer`, `BicyclingLayer`, `GroundOverlay`.
*   Controls: `MapControl` (for custom controls). Standard controls are configured via `GoogleMap` options.
*   Places: `Autocomplete`.
*   Overlays: `OverlayView`.
*   Street View: `StreetViewPanorama`.

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.
 

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
