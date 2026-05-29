---
title: DistanceMatrixService
---

The `DistanceMatrixService` component wraps `google.maps.DistanceMatrixService` and calls `getDistanceMatrix` whenever `options` changes.

## Storybook

[Open the DistanceMatrixService story](https://skyt-a.github.io/svelte-google-maps-api/storybook/?path=/story/components-distancematrixservice--basic)

## Props

| Prop | Type | Description |
|------|------|-------------|
| options | `google.maps.DistanceMatrixRequest` | Distance Matrix request. |
| callback | `(response, status) => void` | Receives the response and status. |
| onLoad | `(service: google.maps.DistanceMatrixService) => void` | Called after service creation. |
| onUnmount | `(service: google.maps.DistanceMatrixService) => void` | Called before teardown. |

## Usage

```svelte
<DistanceMatrixService
  options={{ origins, destinations, travelMode: 'DRIVING' }}
  callback={(response, status) => console.log(status, response)}
/>
```
