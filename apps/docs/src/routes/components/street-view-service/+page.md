---
title: StreetViewService
---

The `StreetViewService` component creates a `google.maps.StreetViewService` instance for custom panorama lookups.

## Storybook

[Open the StreetViewService story](https://skyt-a.github.io/svelte-google-maps-api/storybook/?path=/story/components-streetviewservice--basic)

## Props

| Prop | Type | Description |
|------|------|-------------|
| onLoad | `(service: google.maps.StreetViewService) => void` | Called after service creation. |
| onUnmount | `(service: google.maps.StreetViewService) => void` | Called before teardown. |

## Usage

```svelte
<StreetViewService
  onLoad={(service) => {
    service.getPanorama({ location: center, radius: 50 }, (data, status) => {
      console.log(status, data);
    });
  }}
/>
```
