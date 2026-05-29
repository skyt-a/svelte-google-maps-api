---
title: GoogleMarkerClusterer
---

The `GoogleMarkerClusterer` component wraps `@googlemaps/markerclusterer` and clusters child `Marker` or `AdvancedMarker` components.

## Storybook

[Open the GoogleMarkerClusterer story](https://skyt-a.github.io/svelte-google-maps-api/storybook/?path=/story/components-googlemarkerclusterer--basic)

## Props

| Prop | Type | Description |
|------|------|-------------|
| options | `Omit<MarkerClustererOptions, 'map' \| 'markers'>` | Marker clusterer options. |
| markers | `Marker[]` | Optional marker instances to cluster. Child markers register automatically. |
| onClusterClick | `MarkerClustererOptions['onClusterClick']` | Cluster click handler. |
| onLoad | `(clusterer) => void` | Called after clusterer creation. |
| onUnmount | `(clusterer) => void` | Called before clusterer removal. |

## Usage

```svelte
<GoogleMarkerClusterer>
  {#each locations as position}
    <Marker {position} />
  {/each}
</GoogleMarkerClusterer>
```
