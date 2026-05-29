---
title: Autocomplete
---

## Storybook

[Open the Autocomplete story](https://skyt-a.github.io/svelte-google-maps-api/storybook/?path=/story/components-autocomplete--basic)

The `Autocomplete` component creates a Google Places autocomplete input.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| options | `google.maps.places.AutocompleteOptions` | | Autocomplete options. |
| value | `string` | `''` | Input value. |
| placeholder | `string` | | Input placeholder. |
| inputId | `string` | | Input id. |
| inputClass | `string` | `''` | Input class. |
| className | `string` | `''` | React-compatible class alias added to the input. |
| inputStyle | `string` | `''` | Input inline style. |
| disabled | `boolean` | `false` | Disables the input. |
| bounds | `google.maps.LatLngBounds \| google.maps.LatLngBoundsLiteral` | | Result bias bounds. |
| componentRestrictions | `google.maps.places.ComponentRestrictions` | | Component restrictions. |
| restrictions | `google.maps.places.ComponentRestrictions` | | React-compatible alias for component restrictions. |
| fields | `string[]` | | Place fields to return. |
| strictBounds | `boolean` | | Restricts predictions to the bounds. |
| types | `string[]` | | Place types. |
| onPlaceChanged | `() => void` | | React-compatible place changed callback. |
| onLoad | `(autocomplete: google.maps.places.Autocomplete) => void` | | Called after creation. |
| onUnmount | `(autocomplete: google.maps.places.Autocomplete) => void` | | Called before teardown. |

## Events

The component dispatches `place_changed` with the selected `google.maps.places.PlaceResult`.

## Usage

```svelte
<APIProvider apiKey="YOUR_API_KEY" libraries={['places']}>
  <Autocomplete
    placeholder="Enter a location"
    fields={['name', 'geometry.location']}
    inputStyle="width: 300px; padding: 8px;"
    on:place_changed={(event) => {
      selectedPlace = event.detail;
    }}
  />
</APIProvider>
```

## Notes

- Requires `libraries={['places']}` on `APIProvider`.
- Specify `fields` to request only the data you need.
