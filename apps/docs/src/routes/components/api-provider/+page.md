---
title: APIProvider
---

The `APIProvider` component is responsible for loading the Google Maps JavaScript API.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| apiKey | string | | Google Maps API key (required) |
| libraries | string[] | [] | Optional array of Google Maps libraries to load |
| version | string | 'weekly' | Google Maps API version to load |
| language | string | | Language for the Google Maps API |
| region | string | | Region for the Google Maps API |
| mapIds | string[] | [] | Map IDs for cloud-based map styling |

## Usage

```svelte
<script>
  import { APIProvider, GoogleMap } from 'svelte-google-maps-api';
  
  const apiKey = 'YOUR_API_KEY';
  const libraries = ['places', 'geometry'];
</script>

<APIProvider {apiKey} {libraries}>
  <GoogleMap id="map" options={{ center: { lat: 35.6812362, lng: 139.7649361 }, zoom: 10 }} />
</APIProvider>
```

## Context

The `APIProvider` component sets a context that is consumed by child components:

```javascript
setContext('googleMap', { isReady });
```

This context is used by components like `GoogleMap` to know when the Google Maps API is loaded and ready to use.

## Loading Multiple Libraries

You can load additional Google Maps libraries by passing them in the `libraries` prop:

```svelte
<script>
  import { APIProvider, GoogleMap } from 'svelte-google-maps-api';
  
  const apiKey = 'YOUR_API_KEY';
  const libraries = ['places', 'geometry', 'drawing', 'visualization'];
</script>

<APIProvider {apiKey} {libraries}>
  <!-- Your map components here -->
</APIProvider>
```

## Language and Region

You can specify the language and region for the Google Maps API:

```svelte
<script>
  import { APIProvider, GoogleMap } from 'svelte-google-maps-api';
  
  const apiKey = 'YOUR_API_KEY';
  const language = 'ja';
  const region = 'JP';
</script>

<APIProvider {apiKey} {language} {region}>
  <!-- Your map components here -->
</APIProvider>
```

## Cloud-Based Map Styling with Map IDs

If you're using cloud-based map styling, you can specify map IDs:

```svelte
<script>
  import { APIProvider, GoogleMap } from 'svelte-google-maps-api';
  
  const apiKey = 'YOUR_API_KEY';
  const mapIds = ['YOUR_MAP_ID_1', 'YOUR_MAP_ID_2'];
  
  const mapOptions = {
    center: { lat: 35.6812362, lng: 139.7649361 },
    zoom: 10,
    mapId: 'YOUR_MAP_ID_1'
  };
</script>

<APIProvider {apiKey} {mapIds}>
  <GoogleMap id="map" options={mapOptions} />
</APIProvider>
```

## Notes

- The `APIProvider` component must be the parent of all other Google Maps components.
- It dynamically loads the Google Maps JavaScript API with the specified configuration.
- Child components will not render until the API is fully loaded.
- You only need one `APIProvider` component per application, even if you have multiple maps.
