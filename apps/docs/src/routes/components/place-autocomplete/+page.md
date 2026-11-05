---
title: PlaceAutocomplete
---

## Storybook

[Open the PlaceAutocomplete story](https://skyt-a.github.io/svelte-google-maps-api/storybook/?path=/story/components-placeautocomplete--basic)

`PlaceAutocomplete` renders Google's `PlaceAutocompleteElement` (Places API (New)): a search box with place suggestions. When the user picks a suggestion, the selected place is fetched with the fields you ask for and passed to `onPlaceSelect`.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| fields | `string[]` | `['displayName', 'formattedAddress', 'location', 'viewport']` | Place fields fetched with `place.fetchFields()` after a selection. Pass `[]` to skip the request and receive the bare `Place`. |
| placeholder | `string` | | Input placeholder. |
| includedRegionCodes | `string[]` | | Up to 15 CLDR region codes, such as `['jp']`. |
| includedPrimaryTypes | `string[]` | | Up to 5 primary place types, such as `['restaurant']`. |
| locationBias | `google.maps.places.LocationBias` | | Soft area to prefer results from. |
| locationRestriction | `google.maps.places.LocationRestriction` | | Area results must come from. |
| requestedLanguage | `string` | | Language of the results. |
| requestedRegion | `string` | | Region used to format results. |
| name | `string` | | `name` of the input, for forms. |
| disabled | `boolean` | | Disables the input. |
| options | `google.maps.places.PlaceAutocompleteElementOptions` | | Other element options. Individual props override these. |
| id | `string` | | `id` of the wrapper element. |
| class | `string` | `''` | Class of the wrapper element. |
| style | `string` | | Inline style of the wrapper element. |
| element | `google.maps.places.PlaceAutocompleteElement \| null` | `null` | The element. Bindable: read it with `bind:element`. |

### Event Props

| Prop | Type | Description |
|------|------|-------------|
| onPlaceSelect | `(place: google.maps.places.Place) => void` | Called with the selected place after its `fields` are fetched. |
| onError | `(error: Error) => void` | Called when suggestions or place details fail to load. Without it, errors are logged to the console. |

## Usage

```svelte
<script lang="ts">
	import { APIProvider, GoogleMap, AdvancedMarker, PlaceAutocomplete } from 'svelte-google-maps-api';

	let map = $state<google.maps.Map | null>(null);
	let place = $state<google.maps.places.Place | null>(null);

	function handlePlaceSelect(selected: google.maps.places.Place) {
		place = selected;
		if (selected.viewport) {
			map?.fitBounds(selected.viewport);
		} else if (selected.location) {
			map?.setCenter(selected.location);
		}
	}
</script>

<APIProvider apiKey="YOUR_API_KEY">
	<PlaceAutocomplete
		placeholder="Search for a place"
		includedRegionCodes={['jp']}
		onPlaceSelect={handlePlaceSelect}
	/>

	<div style="height: 400px;">
		<GoogleMap bind:map center={{ lat: 35.6812, lng: 139.7671 }} zoom={12} mapId="DEMO_MAP_ID">
			{#if place?.location}
				<AdvancedMarker position={place.location} title={place.displayName ?? ''} />
			{/if}
		</GoogleMap>
	</div>
</APIProvider>

{#if place}
	<p>{place.displayName}: {place.formattedAddress}</p>
{/if}
```

## Migrating from Autocomplete / StandaloneSearchBox

`Autocomplete` and `StandaloneSearchBox` wrapped `google.maps.places.Autocomplete` and `SearchBox`, which are not available to new Google Cloud customers since March 2025. They were removed. Replace them with `PlaceAutocomplete`:

- `onPlaceChanged` + `getPlace()` becomes `onPlaceSelect(place)`. The place is a `google.maps.places.Place`, so field names are camelCase (`displayName`, `formattedAddress`, `location`) instead of `name`, `formatted_address`, `geometry.location`.
- `options.fields` becomes `fields`, using the new field names.
- `options.componentRestrictions.country` becomes `includedRegionCodes`; `options.bounds` becomes `locationBias` or `locationRestriction`; `options.types` becomes `includedPrimaryTypes`.
- The input element is created by Google. Style it with CSS on the element (see Google's styling guide) rather than passing your own `<input>`.

## Notes

- Enable **Places API (New)** for your API key. The legacy Places API is not enough.
- `PlaceAutocomplete` does not need a `GoogleMap`; it only needs to be inside `APIProvider`.
- Billing: each selection starts a session that ends with the `fetchFields()` call. Request only the fields you use.
