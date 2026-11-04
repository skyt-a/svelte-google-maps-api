<script lang="ts">
	import { onMount } from 'svelte';
	import { getAPIContext } from '../internal/context.svelte.js';
	import { definedOnly } from '../internal/utils.js';

	type ElementOptions = google.maps.places.PlaceAutocompleteElementOptions;

	interface Props {
		/**
		 * Place fields to fetch after a selection, passed to `place.fetchFields()`.
		 * Pass an empty array to skip the request and receive the bare `Place`.
		 */
		fields?: string[];
		placeholder?: string;
		/** Up to 15 CLDR region codes, e.g. `['jp']`. */
		includedRegionCodes?: string[];
		/** Up to 5 primary place types, e.g. `['restaurant']`. */
		includedPrimaryTypes?: string[];
		locationBias?: google.maps.places.LocationBias;
		locationRestriction?: google.maps.places.LocationRestriction;
		requestedLanguage?: string;
		requestedRegion?: string;
		name?: string;
		disabled?: boolean;
		/** Other `google.maps.places.PlaceAutocompleteElementOptions`. */
		options?: ElementOptions;
		id?: string;
		class?: string;
		style?: string;
		/** The `PlaceAutocompleteElement` instance. Read it with `bind:element`. */
		element?: google.maps.places.PlaceAutocompleteElement | null;
		/** Called with the selected place after its `fields` are fetched. */
		onPlaceSelect?: (place: google.maps.places.Place) => void;
		onError?: (error: Error) => void;
	}

	let {
		fields = ['displayName', 'formattedAddress', 'location', 'viewport'],
		placeholder,
		includedRegionCodes,
		includedPrimaryTypes,
		locationBias,
		locationRestriction,
		requestedLanguage,
		requestedRegion,
		name,
		disabled,
		options,
		id,
		class: className = '',
		style,
		element = $bindable(null),
		onPlaceSelect,
		onError
	}: Props = $props();

	const api = getAPIContext('PlaceAutocomplete');
	let container: HTMLDivElement;
	let instance = $state.raw<google.maps.places.PlaceAutocompleteElement | null>(null);

	const resolvedOptions = $derived<ElementOptions>({
		...options,
		...definedOnly({
			placeholder,
			includedRegionCodes,
			includedPrimaryTypes,
			locationBias,
			locationRestriction,
			requestedLanguage,
			requestedRegion,
			name,
			disabled
		})
	});

	const reportError = (reason: unknown) => {
		const error = reason instanceof Error ? reason : new Error(String(reason));
		if (onError) {
			onError(error);
		} else {
			console.error('svelte-google-maps-api: PlaceAutocomplete error.', error);
		}
	};

	onMount(() => {
		let disposed = false;
		let created: google.maps.places.PlaceAutocompleteElement | null = null;

		api
			.importLibrary('places')
			.then(({ PlaceAutocompleteElement }) => {
				if (disposed) return;
				created = new PlaceAutocompleteElement(resolvedOptions);
				container.append(created);
				instance = created;
				element = created;
			})
			.catch(reportError);

		return () => {
			disposed = true;
			created?.remove();
			instance = null;
		};
	});

	$effect(() => {
		if (instance) Object.assign(instance, resolvedOptions);
	});

	$effect(() => {
		const current = instance;
		if (!current) return;

		const handleSelect = async (event: Event) => {
			try {
				const { placePrediction } = event as google.maps.places.PlacePredictionSelectEvent;
				const place = placePrediction.toPlace();
				if (fields.length > 0) await place.fetchFields({ fields });
				onPlaceSelect?.(place);
			} catch (error) {
				reportError(error);
			}
		};
		const handleError = () =>
			reportError(new Error('PlaceAutocompleteElement failed to fetch suggestions.'));

		current.addEventListener('gmp-select', handleSelect);
		current.addEventListener('gmp-error', handleError);

		return () => {
			current.removeEventListener('gmp-select', handleSelect);
			current.removeEventListener('gmp-error', handleError);
		};
	});
</script>

<div bind:this={container} {id} class={className} {style}></div>
