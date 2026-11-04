---
title: MarkerClusterer
---

## Storybook

[Open the MarkerClusterer story](https://skyt-a.github.io/svelte-google-maps-api/storybook/?path=/story/components-markerclusterer--basic)

`MarkerClusterer` groups the `AdvancedMarker` components rendered inside it into clusters, using [`@googlemaps/markerclusterer`](https://github.com/googlemaps/js-markerclusterer).

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| algorithm | `Algorithm` | library default (`SuperClusterAlgorithm`) | Clustering algorithm from `@googlemaps/markerclusterer`. Creation-only. |
| renderer | `Renderer` | library default | Cluster renderer from `@googlemaps/markerclusterer`. Creation-only. |
| clusterer | `MarkerClusterer \| null` | `null` | The clusterer instance. Bindable: read it with `bind:clusterer`. |
| children | `Snippet` | | `AdvancedMarker` components to cluster. |

### Event Props

| Prop | Type | Description |
|------|------|-------------|
| onClusterClick | `onClusterClickHandler` | Called when a cluster is clicked. Creation-only. Defaults to zooming into the cluster. |
| onLoad | `(clusterer: MarkerClusterer) => void` | Called once after the clusterer is created. |

## Usage

```svelte
<script lang="ts">
	import {
		APIProvider,
		GoogleMap,
		AdvancedMarker,
		MarkerClusterer,
		GoogleMapsMarkerClusterer
	} from 'svelte-google-maps-api';

	const points = Array.from({ length: 100 }, (_, i) => ({
		id: i,
		position: { lat: 35.6 + Math.random() * 0.2, lng: 139.6 + Math.random() * 0.3 }
	}));

	const algorithm = new GoogleMapsMarkerClusterer.SuperClusterAlgorithm({ radius: 80 });
</script>

<div style="height: 400px;">
	<APIProvider apiKey="YOUR_API_KEY">
		<GoogleMap center={{ lat: 35.7, lng: 139.75 }} zoom={10} mapId="DEMO_MAP_ID">
			<MarkerClusterer {algorithm}>
				{#each points as point (point.id)}
					<AdvancedMarker position={point.position} />
				{/each}
			</MarkerClusterer>
		</GoogleMap>
	</APIProvider>
</div>
```

## Migrating from MarkerClusterer / GoogleMarkerClusterer (0.2)

0.2 had two clusterers built around the deprecated `Marker`. Both are replaced by this single component, which clusters `AdvancedMarker` children. Change each `Marker` child to `AdvancedMarker` and set a `mapId` on the map.

## Notes

- The map needs a `mapId`, because both markers and cluster icons are Advanced Markers.
- `algorithm`, `renderer` and `onClusterClick` are read once when the clusterer is created.
- Markers are added and removed in batches and the clusters are redrawn once per change, so rendering many markers with an `each` block is efficient.
- The full `@googlemaps/markerclusterer` module is re-exported as `GoogleMapsMarkerClusterer` for algorithms and renderers.
