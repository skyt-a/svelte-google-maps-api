---
title: Autocomplete
---
The `Autocomplete` component provides a text input field that suggests geographic locations as the user types, leveraging the Google Places Autocomplete service.

## Usage

First, ensure you load the `places` library via the `APIProvider`.

```svelte
<script lang="ts">
  import { APIProvider, GoogleMap, Marker, Autocomplete } from 'svelte-google-maps-api';

  let apiKey = 'YOUR_MAP_KEY'; // Replace with your API key
  let map: google.maps.Map | null = null;
  let selectedPlace: google.maps.places.PlaceResult | null = null;
  let mapCenter = { lat: 35.681, lng: 139.767 }; // Default center (Tokyo)
  let mapZoom = 12;

  function handlePlaceChanged(event: CustomEvent<google.maps.places.PlaceResult>) {
    const place = event.detail;
    if (place.geometry?.location) {
      selectedPlace = place;
      // Update map center and zoom based on the selected place
      mapCenter = place.geometry.location.toJSON();
      mapZoom = 17;
      console.log('Selected Place:', place.name, place.geometry.location.toJSON());
    } else {
      console.log('Returned place contains no geometry');
    }
  }
</script>

<div style="height: 500px; width: 100%; display: flex; flex-direction: column;">
  <APIProvider {apiKey} libraries={['places']}>
    <div style="padding: 10px;">
      <Autocomplete
        placeholder="Enter a location"
        on:place_changed={handlePlaceChanged}
        options={{
          types: ['geocode'],
          fields: ['name', 'geometry.location'] // Specify fields to reduce cost
          // componentRestrictions: { country: 'jp' } // Example restriction
        }}
        style="width: 300px; padding: 8px; margin-bottom: 10px; font-size: 1rem;"
      />
    </div>

    <div style="flex-grow: 1;">
      <GoogleMap bind:map options={{ center: mapCenter, zoom: mapZoom, disableDefaultUI: true }}>
        {#if selectedPlace && selectedPlace.geometry?.location}
          <Marker position={selectedPlace.geometry.location} title={selectedPlace.name} />
        {/if}
      </GoogleMap>
    </div>
  </APIProvider>
</div>
```

## Props

*(Specific props for the Svelte component need confirmation. Common ones include)*

*   `options`: `google.maps.places.AutocompleteOptions` - Configuration for the Autocomplete service (e.g., types, fields, componentRestrictions).
*   `placeholder`: `string` - Placeholder text for the input field.
*   `style`: `string` - Inline styles for the input element.
*   `class`: `string` - CSS classes for the input element.

## Events

*   **`on:place_changed`**: Fired when a place is selected from the suggestions. The `event.detail` contains the `google.maps.places.PlaceResult`.

## Notes

*   Requires the `places` library to be loaded in `APIProvider`.
*   Specify the `fields` option to request only the data you need, which can affect billing. See [Google Maps Platform documentation](https://developers.google.com/maps/documentation/javascript/places-autocomplete#specify-fields) for details. 