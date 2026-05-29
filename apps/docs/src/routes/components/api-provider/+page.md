---
title: APIProvider
---

## Storybook

[Open the APIProvider story](https://skyt-a.github.io/svelte-google-maps-api/storybook/?path=/story/components-apiprovider--basic)

The `APIProvider` component is responsible for loading the Google Maps JavaScript API.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| apiKey | `string` | `''` | Google Maps API key. |
| googleMapsApiKey | `string` | | React-compatible API key alias. |
| googleMapsClientId | `string` | | Google Maps Premium Plan client id. Do not use with an API key. |
| libraries | `Library[]` | `[]` | Google Maps libraries to load. |
| version | `string` | `'weekly'` | Google Maps API version to load. |
| language | `string` | | Language for the Google Maps API. |
| region | `string` | | Region for the Google Maps API. |
| channel | `string` | | Usage tracking channel. |
| mapIds | `string[]` | | Map IDs for cloud-based map styling. |
| authReferrerPolicy | `'origin'` | | Auth referrer policy. |
| apiUrl | `string` | `'https://maps.googleapis.com'` | Google Maps API base URL. |
| solutionChannel | `string` | | Google solution channel. |
| id | `string` | `'svelte-google-maps-api-script'` | Script element id. |
| nonce | `string` | | CSP nonce for the script tag. |
| preventGoogleFontsLoading | `boolean` | `false` | Prevents Google Maps from injecting its default font styles. |
| onLoad | `() => void` | | Called when the script has loaded. |
| onError | `(error: Error) => void` | | Called when the script fails to load. |
| onUnmount | `() => void` | | Called when the provider is destroyed. |

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

The `APIProvider` component sets the `svelte-google-maps-api` context with the load status, API reference, and error state. `GoogleMap` and service components use that context to wait for the script before creating Google Maps objects.

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
