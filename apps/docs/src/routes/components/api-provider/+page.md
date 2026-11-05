---
title: APIProvider
---

## Storybook

[Open the APIProvider story](https://skyt-a.github.io/svelte-google-maps-api/storybook/?path=/story/components-apiprovider--basic)

`APIProvider` loads the Google Maps JavaScript API once per page and makes it available to every component inside it. Children are rendered only after the `core` and `maps` libraries are ready; other libraries (`marker`, `places`, `routes`, `streetView`, ...) are loaded on demand by the components that need them.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| apiKey | `string` | (required) | Google Maps Platform API key. |
| version | `string` | `'weekly'` | Maps JavaScript API version or channel (`weekly`, `quarterly`, `beta`, `3.66`, ...). |
| libraries | `Library[]` | `[]` | Libraries to preload. Components load the libraries they need on demand, so this is optional. |
| language | `string` | | Language for map labels and controls. |
| region | `string` | | Region code used to bias results. |
| authReferrerPolicy | `'origin'` | | Sent as `auth_referrer_policy`. |
| channel | `string` | | Usage tracking channel. |
| solutionChannel | `string` | | Sent as `solution_channel`. |
| mapIds | `string[]` | | Map IDs to preload. |
| apiUrl | `string` | `'https://maps.googleapis.com'` | Base URL of the Maps JavaScript API. |
| nonce | `string` | | CSP nonce for the injected script tag. |
| preventGoogleFontsLoading | `boolean` | `false` | Stops the API from injecting Google Fonts (Roboto / Google Sans Text). |
| children | `Snippet` | | Content rendered once the API is ready. |
| loading | `Snippet` | | Rendered while the API loads. |
| error | `Snippet` (receives the `Error`) | | Rendered when the API fails to load. Without it, a short message with `role="alert"` is shown. |

### Event Props

| Prop | Type | Description |
|------|------|-------------|
| onLoad | `() => void` | Called after the script and the preloaded libraries are ready. |
| onError | `(error: Error) => void` | Called when the script or a preloaded library fails to load, or when `apiKey` is empty. |

## Usage

```svelte
<script lang="ts">
	import { APIProvider, GoogleMap } from 'svelte-google-maps-api';

	const apiKey = 'YOUR_API_KEY';
</script>

<div style="height: 400px;">
	<APIProvider {apiKey} language="ja" region="JP">
		<GoogleMap center={{ lat: 35.6812, lng: 139.7671 }} zoom={12} />

		{#snippet loading()}
			<p>Loading map...</p>
		{/snippet}

		{#snippet error(err)}
			<p>Could not load Google Maps: {err.message}</p>
		{/snippet}
	</APIProvider>
</div>
```

## Hooks

These helpers must be called during component initialisation inside `APIProvider`:

- `useAPILoadingStatus()` returns an object with reactive `status` (`'loading' | 'loaded' | 'error'`) and `error`.
- `useMapsLibrary(name)` loads a library with `importLibrary()` and returns an object whose `current` is the library, or `null` until it loads.
- `useMap()` returns an object whose `current` is the nearest `GoogleMap` instance (call it inside `GoogleMap`).

```svelte
<script lang="ts">
	import { useMap, useMapsLibrary } from 'svelte-google-maps-api';

	const map = useMap();
	const geometry = useMapsLibrary('geometry');

	$effect(() => {
		if (map.current && geometry.current) {
			// Use map.current and geometry.current here.
		}
	});
</script>
```

See [Getting Started](/guide/getting-started/) for a full walkthrough.

## Notes

- The Maps JavaScript API can only be loaded once per page. If a second `APIProvider` uses different options, the first load is reused and a warning is logged.
- If the API was already loaded by another script tag, `APIProvider` reuses it instead of injecting a new one.
- Nothing is loaded during server-side rendering; the `loading` snippet is rendered on the server.
