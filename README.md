<p align="center">
  <a href="https://skyt-a.github.io/svelte-google-maps-api/">
    <img src="apps/docs/static/images/svelte-google-maps-logo.png" alt="Svelte Google Maps API Logo" width="300">
  </a>
  <h1 align="center">
   Svelte Google Maps API
  </h1>
</p>

[![npm version](https://badge.fury.io/js/svelte-google-maps-api.svg)](https://badge.fury.io/js/svelte-google-maps-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A declarative Svelte component library for the Google Maps JavaScript API.

## Links

- Documentation: https://skyt-a.github.io/svelte-google-maps-api/
- Storybook: https://skyt-a.github.io/svelte-google-maps-api/storybook/
- npm: https://www.npmjs.com/package/svelte-google-maps-api

## Installation

```bash
pnpm add svelte-google-maps-api
```

```bash
npm install svelte-google-maps-api
```

```bash
yarn add svelte-google-maps-api
```

## Quick Start

```svelte
<script lang="ts">
	import { APIProvider, GoogleMap, Marker } from 'svelte-google-maps-api';

	const apiKey = 'YOUR_MAP_KEY';
</script>

<div style="width: 100%; height: 100vh;">
	<APIProvider {apiKey}>
		<GoogleMap
			options={{
				center: { lat: 35.6812362, lng: 139.7649361 },
				zoom: 14
			}}
			mapContainerStyle="width:100%;height:100%;"
		>
			<Marker position={{ lat: 35.6812362, lng: 139.7649361 }} />
		</GoogleMap>
	</APIProvider>
</div>
```

## Library Loading

Some components require optional Google Maps libraries:

| Component                             | Required library |
| ------------------------------------- | ---------------- |
| `AdvancedMarker`                      | `marker`         |
| `Autocomplete`, `StandaloneSearchBox` | `places`         |
| `DrawingManager`                      | `drawing`        |
| `HeatmapLayer`                        | `visualization`  |

```svelte
<APIProvider {apiKey} libraries={['marker', 'places', 'drawing', 'visualization']}>
	<!-- map components -->
</APIProvider>
```

## Components

The package includes map, marker, clusterer, info window, shape, layer, places, directions, distance matrix, custom control, custom overlay, data layer, and Street View components. See the docs for full props and examples.

## Development

```bash
corepack pnpm install
corepack pnpm test
corepack pnpm check
corepack pnpm lint
corepack pnpm build
```

Docs and Storybook stay synchronized with the package exports:

```bash
corepack pnpm docs:sync:check
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Security

See [SECURITY.md](SECURITY.md).

## License

MIT
