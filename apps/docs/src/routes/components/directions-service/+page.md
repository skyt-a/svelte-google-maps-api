---
title: DirectionsService
---

The `DirectionsService` component wraps `google.maps.DirectionsService` and calls `route` whenever `options` changes.

## Storybook

[Open the DirectionsService story](https://skyt-a.github.io/svelte-google-maps-api/storybook/?path=/story/components-directionsservice--basic)

## Props

| Prop | Type | Description |
|------|------|-------------|
| options | `google.maps.DirectionsRequest` | Route request. |
| callback | `(result, status) => void` | Receives the route result and status. |
| onLoad | `(service: google.maps.DirectionsService) => void` | Called after service creation. |
| onUnmount | `(service: google.maps.DirectionsService) => void` | Called before teardown. |

## Usage

```svelte
<DirectionsService
  options={{ origin, destination, travelMode: 'DRIVING' }}
  callback={(result, status) => {
    directions = result ?? undefined;
    console.log(status);
  }}
/>
```
