---
title: StandaloneSearchBox
---

The `StandaloneSearchBox` component wraps `google.maps.places.SearchBox` for free-form place search outside a map control.

## Storybook

[Open the StandaloneSearchBox story](https://skyt-a.github.io/svelte-google-maps-api/storybook/?path=/story/components-standalonesearchbox--basic)

## Props

| Prop | Type | Description |
|------|------|-------------|
| bounds | `google.maps.LatLngBounds \| google.maps.LatLngBoundsLiteral` | Biases results to a bounds area. |
| options | `google.maps.places.SearchBoxOptions` | Initial SearchBox options. |
| value | `string` | Input value when using the built-in input. |
| placeholder | `string` | Input placeholder when using the built-in input. |
| inputId | `string` | Built-in input id. |
| inputClass | `string` | Built-in input class. |
| inputStyle | `string` | Built-in input inline style. |
| disabled | `boolean` | Disables the built-in input. |
| onPlacesChanged | `(places) => void` | Called when selected places change. |
| onLoad | `(searchBox) => void` | Called after creation. |
| onUnmount | `(searchBox) => void` | Called before teardown. |

## Events

The component also dispatches `places_changed` with the selected places.

## Usage

```svelte
<APIProvider apiKey="YOUR_API_KEY" libraries={['places']}>
  <StandaloneSearchBox
    placeholder="Search places"
    onPlacesChanged={(places) => console.log(places)}
  />
</APIProvider>
```
