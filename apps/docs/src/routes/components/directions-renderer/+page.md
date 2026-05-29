---
title: DirectionsRenderer
---

The `DirectionsRenderer` component renders a `google.maps.DirectionsResult` on the current map.

## Storybook

[Open the DirectionsRenderer story](https://skyt-a.github.io/svelte-google-maps-api/storybook/?path=/story/components-directionsrenderer--basic)

## Props

| Prop | Type | Description |
|------|------|-------------|
| directions | `google.maps.DirectionsResult` | Directions result to render. |
| options | `google.maps.DirectionsRendererOptions` | Renderer options. |
| routeIndex | `number` | Route index to display. |
| panel | `HTMLElement` | Optional directions panel element. |
| draggable | `boolean` | Makes the rendered route draggable. |
| hideRouteList | `boolean` | Hides the route list. |
| preserveViewport | `boolean` | Keeps the current viewport. |
| suppressMarkers | `boolean` | Suppresses default route markers. |
| suppressInfoWindows | `boolean` | Suppresses default info windows. |
| suppressPolylines | `boolean` | Suppresses default polylines. |
| markerOptions | `google.maps.MarkerOptions` | Options for route markers. |
| polylineOptions | `google.maps.PolylineOptions` | Options for route polylines. |
| onDirectionsChanged | `() => void` | Called when renderer directions change. |
| onLoad | `(renderer: google.maps.DirectionsRenderer) => void` | Called after creation. |
| onUnmount | `(renderer: google.maps.DirectionsRenderer) => void` | Called before removal. |

## Usage

```svelte
<DirectionsService options={request} callback={(result) => (directions = result ?? undefined)} />
{#if directions}
  <DirectionsRenderer {directions} />
{/if}
```
