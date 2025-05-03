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

For detailed documentation, component references, and examples, please visit the **[Documentation Website](https://your-github-username.github.io/svelte-google-maps-api/)** (Replace with actual link after deployment).

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

## Building the Documentation

To build the static documentation site (output to the `docs` directory):

```bash
pnpm run build
```

This command typically runs `vite build`, which uses the `adapter-static` configured in `svelte.config.js`.

## Deploying to GitHub Pages

1.  **Build the site:** Run `pnpm run build` (or `npm run build`/`yarn build`). This will generate the static files in the `docs` directory.
2.  **Commit the `docs` directory:** Add the `docs` directory to your git commit.
3.  **Push to GitHub:** Push your changes to the `main` (or your default) branch.
4.  **Configure GitHub Pages:**
    *   Go to your repository settings on GitHub.
    *   Navigate to the "Pages" section.
    *   Under "Build and deployment", select "Deploy from a branch" as the source.
    *   Choose the branch you pushed to (e.g., `main`) and select the `/docs` folder as the publishing source.
    *   Save the changes.
5.  **Access the site:** GitHub Pages will deploy your site. The URL will be something like `https://<your-username>.github.io/<repository-name>/docs/`. (Update the link in the main README accordingly).

    *Alternatively, you can set up a GitHub Action to automate the build and deployment process to the `gh-pages` branch.* 

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
