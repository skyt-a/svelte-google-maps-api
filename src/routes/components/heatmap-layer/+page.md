---
title: HeatmapLayer
---
A component to display a heatmap layer on the map.
Requires the `visualization` library. Please specify `libraries={['visualization']}` in the `<APIProvider>` props.

Must be used within a `<GoogleMap>` component.

```svelte
<script lang="ts">
  import { APIProvider, GoogleMap, HeatmapLayer } from 'svelte-google-maps-api';
  import { GOOGLE_MAPS_API_KEY } from '$env/static/private';

  // Example data (points of interest in San Francisco)
  const heatmapData = [
    { location: { lat: 37.7749, lng: -122.4194 }, weight: 3 }, // Downtown SF
    { location: { lat: 37.7831, lng: -122.4039 }, weight: 2 }, // Union Square area
    { location: { lat: 37.7955, lng: -122.3937 }, weight: 1 }, // Ferry Building
    { location: { lat: 37.7694, lng: -122.4862 }, weight: 2 }, // Golden Gate Park
    { location: { lat: 37.8270, lng: -122.4230 }, weight: 3 }  // Alcatraz (visible from mainland)
    // Add more data points as needed
  ];
</script>

<APIProvider apiKey={GOOGLE_MAPS_API_KEY} libraries={['visualization']}>
  <GoogleMap initialCenter={{ lat: 37.7749, lng: -122.4194 }} initialZoom={13}>
    <HeatmapLayer data={heatmapData} radius={20} />
  </GoogleMap>
</APIProvider>
```

## Props

| Prop           | Type                                                                                                                                                  | Default     | Description                                                                                                                                                                                          |
| :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- | :---------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`         | `InputHeatmapData \| undefined`                                                                                                                     | `undefined` | The data for the heatmap. Accepts formats: `WeightedLocation[]`, `{ location: LatLngLiteral; weight: number }[]`, `(LatLng \| LatLngLiteral)[]`, or `MVCArray`. `LatLngLiteral` is automatically converted to `LatLng`. |
| `options`      | `google.maps.visualization.HeatmapLayerOptions \| undefined`                                                                                        | `undefined` | Initialization options for the heatmap layer. Takes precedence over individual props.                                                                                                          |
| `dissipating`  | `boolean \| undefined`                                                                                                                                | `undefined` | Whether the heatmap dissipates on zoom.                                                                                                                                                            |
| `gradient`     | `string[] \| undefined`                                                                                                                               | `undefined` | The color gradient of the heatmap. An array of CSS color strings (e.g., `rgba(102, 255, 0, 0)`, `rgba(147, 255, 0, 1)`).                                                                             |
| `maxIntensity` | `number \| undefined`                                                                                                                                 | `undefined` | The maximum intensity of the heatmap. Defaults to the highest density of points at any particular pixel on the map.                                                                                |
| `opacity`      | `number \| undefined`                                                                                                                                 | `undefined` | The opacity of the heatmap (from 0 to 1).                                                                                                                                                          |
| `radius`       | `number \| undefined`                                                                                                                                 | `undefined` | The radius of influence for each data point, in pixels.                                                                                                                                            |

**InputHeatmapData Type:**

```typescript
type InputHeatmapData =
  | google.maps.visualization.WeightedLocation[]
  | { location: google.maps.LatLngLiteral; weight: number }[]
  | (google.maps.LatLng | google.maps.LatLngLiteral)[]
  | google.maps.MVCArray<
      google.maps.visualization.WeightedLocation | google.maps.LatLng | google.maps.LatLngLiteral
    >;
```

## Events

| Event       | Type                                                                      | Description                                         |
| :---------- | :------------------------------------------------------------------------ | :-------------------------------------------------- |
| `onLoad`    | `((heatmapLayer: google.maps.visualization.HeatmapLayer) => void) \| undefined` | Fired when the layer is loaded. Receives the instance. |
| `onUnmount` | `((heatmapLayer: google.maps.visualization.HeatmapLayer) => void) \| undefined` | Fired when the component is destroyed. Receives the instance. |

## Binding

This component does not support the `bind:` directive. 