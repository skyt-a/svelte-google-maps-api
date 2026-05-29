---
title: MarkerClusterer
---

The `MarkerClusterer` component clusters child markers. It uses the modern `@googlemaps/markerclusterer` implementation while keeping a React-compatible `onClick(cluster)` convenience prop.

## Storybook

[Open the MarkerClusterer story](https://skyt-a.github.io/svelte-google-maps-api/storybook/?path=/story/components-markerclusterer--basic)

## Props

| Prop | Type | Description |
|------|------|-------------|
| options | `Omit<MarkerClustererOptions, 'map' \| 'markers'>` | Marker clusterer options. |
| markers | `Marker[]` | Optional marker instances to cluster. Child markers register automatically. |
| onClick | `(cluster) => void` | Convenience cluster click handler. |
| onClusterClick | `MarkerClustererOptions['onClusterClick']` | Native cluster click handler. |
| onLoad | `(clusterer) => void` | Called after clusterer creation. |
| onUnmount | `(clusterer) => void` | Called before clusterer removal. |

## Usage

```svelte
<MarkerClusterer onClick={(cluster) => console.log(cluster.count)}>
  {#each locations as position}
    <Marker {position} />
  {/each}
</MarkerClusterer>
```
