<script lang="ts">
	import { getContext, onDestroy, onMount, createEventDispatcher } from 'svelte';
	import { BROWSER as browser } from 'esm-env';
	import type { APIProviderContext } from '../APIProvider.svelte';
	import { writable, type Writable } from 'svelte/store';

	export let options: google.maps.places.AutocompleteOptions | undefined = undefined;

	export let value: string = '';
	export let placeholder: string | undefined = undefined;
	export let inputId: string | undefined = undefined;
	export let inputClass: string = '';
	export let inputStyle: string = '';
	export let disabled: boolean = false;

	export let bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral | undefined =
		undefined;
	export let componentRestrictions: google.maps.places.ComponentRestrictions | undefined =
		undefined;
	export let fields: string[] | undefined = undefined;
	export let strictBounds: boolean | undefined = undefined;
	export let types: string[] | undefined = undefined;

	const dispatch = createEventDispatcher<{ place_changed: google.maps.places.PlaceResult }>();
	export let onLoad: ((autocomplete: google.maps.places.Autocomplete) => void) | undefined =
		undefined;
	export let onUnmount: ((autocomplete: google.maps.places.Autocomplete) => void) | undefined =
		undefined;

	let inputElement: HTMLInputElement | null = null;
	let autocompleteInstance: google.maps.places.Autocomplete | null = null;
	let placeChangedListener: google.maps.MapsEventListener | null = null;
	let isMounted = false;

	let status: Writable<'loading' | 'loaded' | 'error'> | undefined = undefined;
	let googleMapsApi: typeof google.maps | null = null;

	onMount(() => {
		const context = getContext<APIProviderContext>('svelte-google-maps-api');
		if (context) {
			status = context.status;
			googleMapsApi = context.googleMapsApi;
		} else {
			console.error('[Autocomplete] Could not get APIProvider context.');
		}

		isMounted = true;
		initializeAutocomplete();

		const unsubscribe = status?.subscribe((value) => {
			if (value === 'loaded' && inputElement && !autocompleteInstance) {
				initializeAutocomplete();
			}
		});

		return () => {
			unsubscribe?.();
		};
	});

	function initializeAutocomplete() {
		if (!status || !googleMapsApi) return;
		const currentStatus = $status;
		if (
			!browser ||
			currentStatus !== 'loaded' ||
			!inputElement ||
			!isMounted ||
			autocompleteInstance
		)
			return;

		if (!googleMapsApi.places || !googleMapsApi.places.Autocomplete) {
			console.error(
				'svelte-google-maps-api: Autocomplete requires the "places" library. Please include "places" in the libraries prop of APIProvider.'
			);
			return;
		}

		const autocompleteOptions: google.maps.places.AutocompleteOptions = {
			...(options ?? {}),
			bounds,
			componentRestrictions,
			fields,
			strictBounds,
			types
		};

		Object.keys(autocompleteOptions).forEach((key) => {
			if (autocompleteOptions[key as keyof typeof autocompleteOptions] === undefined) {
				delete autocompleteOptions[key as keyof typeof autocompleteOptions];
			}
		});

		try {
			autocompleteInstance = new googleMapsApi.places.Autocomplete(
				inputElement,
				autocompleteOptions
			);
			onLoad?.(autocompleteInstance);
			setupListeners();
		} catch (error) {
			console.error('[Autocomplete] Error creating instance:', error);
		}
	}

	$: if (autocompleteInstance && options) {
		autocompleteInstance.setOptions(options);
	} else if (autocompleteInstance) {
		const individualOptions: google.maps.places.AutocompleteOptions = {};
		if (bounds !== undefined) individualOptions.bounds = bounds;
		if (componentRestrictions !== undefined)
			individualOptions.componentRestrictions = componentRestrictions;
		if (fields !== undefined) individualOptions.fields = fields;
		if (strictBounds !== undefined) individualOptions.strictBounds = strictBounds;
		if (types !== undefined) individualOptions.types = types;
		if (Object.keys(individualOptions).length > 0)
			autocompleteInstance.setOptions(individualOptions);
	}

	function setupListeners() {
		if (!autocompleteInstance || !googleMapsApi) return;

		if (placeChangedListener) googleMapsApi.event.removeListener(placeChangedListener);
		placeChangedListener = null;

		placeChangedListener = autocompleteInstance.addListener('place_changed', () => {
			if (autocompleteInstance) {
				const place = autocompleteInstance.getPlace();

				if (inputElement && place.name) {
					value = place.name;
				}
				dispatch('place_changed', place);
			}
		});
	}

	$: if (autocompleteInstance && googleMapsApi && browser) {
		setupListeners();
	}

	onDestroy(() => {
		if (autocompleteInstance && googleMapsApi) {
			onUnmount?.(autocompleteInstance);

			googleMapsApi.event.clearInstanceListeners(autocompleteInstance);

			if (inputElement) {
				googleMapsApi.event.clearInstanceListeners(inputElement);
			}
			autocompleteInstance = null;
		}
	});

	$: if (browser && inputElement && inputElement.value !== value) {
		inputElement.value = value;
	}

	function handleInput(event: Event) {
		value = (event.target as HTMLInputElement).value;
	}
</script>

<input
	bind:this={inputElement}
	bind:value
	on:input={handleInput}
	{placeholder}
	{disabled}
	id={inputId}
	class="svelte-google-maps-autocomplete {inputClass}"
	style={inputStyle}
/>
