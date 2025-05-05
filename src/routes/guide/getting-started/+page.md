---
title: Getting Started
---

Svelte Google Maps API is a library that provides Svelte components for integrating Google Maps JavaScript API into Svelte applications.

## Installation

```bash
npm install svelte-google-maps-api
```

Or using yarn:

```bash
yarn add svelte-google-maps-api
```

Or using pnpm:

```bash
pnpm add svelte-google-maps-api
```

## Basic Usage

To use the Svelte Google Maps API, you need to have a Google Maps API key. You can get one from the [Google Cloud Console](https://console.cloud.google.com/).

Here's a basic example of how to use the library:

```svelte
<script>
  import { APIProvider, GoogleMap, Marker } from 'svelte-google-maps-api';
  
  // Replace with your Google Maps API key
  const apiKey = 'YOUR_API_KEY';
  
  // Map options
  const mapOptions = {
    center: { lat: 35.6812362, lng: 139.7649361 },
    zoom: 10
  };
  
  // Marker position
  const position = { lat: 35.6812362, lng: 139.7649361 };
</script>

<div style="height: 400px; width: 100%;">
  <APIProvider {apiKey}>
    <GoogleMap id="map" options={mapOptions} mapContainerStyle="width: 100%; height: 100%;">
      <Marker {position} />
    </GoogleMap>
  </APIProvider>
</div>
```

## Component Hierarchy

The library follows a specific component hierarchy:

1. `APIProvider` - Loads the Google Maps JavaScript API
2. `GoogleMap` - Renders the map
3. Various child components:
   - `Marker` - Adds markers to the map
   - `AdvancedMarker` - Adds advanced markers with custom elements
   - `InfoWindow` - Adds info windows to the map
   - `Polyline` - Draws lines on the map
   - `Polygon` - Draws polygons on the map
   - `Circle` - Draws circles on the map
   - `Rectangle` - Draws rectangles on the map
   - And more...

The `APIProvider` component must wrap the `GoogleMap` component, which in turn can contain multiple child components.

## Next Steps

Check out the detailed documentation for each component:

- [APIProvider](/components/api-provider/)
- [GoogleMap](/components/google-map/)
- [Marker](/components/marker/)
- [AdvancedMarker](/components/advanced-marker/)
- [InfoWindow](/components/info-window/)
- [Polyline](/components/polyline/)
- [Polygon](/components/polygon/)
- [Circle](/components/circle/)
- [Rectangle](/components/rectangle/)

Or explore the [examples](/examples) to see more advanced usage.
