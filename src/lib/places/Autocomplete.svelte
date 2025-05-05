<script lang="ts">
	import { getContext, onDestroy, onMount, createEventDispatcher } from 'svelte';
	import { BROWSER as browser } from 'esm-env';
	import type { APIProviderContext } from '../APIProvider.svelte';
	import { writable, type Writable } from 'svelte/store';

	// --- Props (Based on google.maps.places.AutocompleteOptions + input attributes) ---
	export let options: google.maps.places.AutocompleteOptions | undefined = undefined;
	// Common input attributes
	export let value: string = '';
	export let placeholder: string | undefined = undefined;
	export let inputId: string | undefined = undefined;
	export let inputClass: string = '';
	export let inputStyle: string = '';
	export let disabled: boolean = false;

	// Autocomplete specific options (can also be set via main options object)
	export let bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral | undefined =
		undefined;
	export let componentRestrictions: google.maps.places.ComponentRestrictions | undefined =
		undefined;
	export let fields: string[] | undefined = undefined; // Recommended to specify fields
	export let strictBounds: boolean | undefined = undefined;
	export let types: string[] | undefined = undefined;

	// --- Events ---
	const dispatch = createEventDispatcher<{ place_changed: google.maps.places.PlaceResult }>();
	export let onLoad: ((autocomplete: google.maps.places.Autocomplete) => void) | undefined =
		undefined;
	export let onUnmount: ((autocomplete: google.maps.places.Autocomplete) => void) | undefined =
		undefined;

	// --- Internal State ---
	let inputElement: HTMLInputElement | null = null;
	let autocompleteInstance: google.maps.places.Autocomplete | null = null;
	let placeChangedListener: google.maps.MapsEventListener | null = null;
	let isMounted = false;

	// --- Context ---
	// Declare context variables, but get them in onMount
	let status: Writable<'loading' | 'loaded' | 'error'> | undefined = undefined;
	let googleMapsApi: typeof google.maps | null = null;

	// --- Initialization ---
	onMount(() => {
		// Get context inside onMount
		const context = getContext<APIProviderContext>('svelte-google-maps-api');
		if (context) {
			status = context.status;
			googleMapsApi = context.googleMapsApi;
		} else {
			console.error('[Autocomplete] Could not get APIProvider context.');
		}

		isMounted = true;
		initializeAutocomplete();

		// Subscribe to status changes AFTER getting the context
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
		// Ensure context/status is available before checking its value
		if (!status || !googleMapsApi) return; // Check if status store itself exists
		const currentStatus = $status; // Now we can safely access $status
		if (
			!browser ||
			currentStatus !== 'loaded' ||
			!inputElement ||
			!isMounted ||
			autocompleteInstance
		)
			return;

		// Ensure places library is loaded
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

		// Filter out undefined props
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

	// --- Reactive Updates ---
	// Update options when props change
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

	// --- Event Listeners ---
	function setupListeners() {
		if (!autocompleteInstance || !googleMapsApi) return;

		if (placeChangedListener) googleMapsApi.event.removeListener(placeChangedListener);
		placeChangedListener = null;

		placeChangedListener = autocompleteInstance.addListener('place_changed', () => {
			if (autocompleteInstance) {
				const place = autocompleteInstance.getPlace();
				// Update the input value to the selected place name
				// Note: This might conflict with external binding, consider carefully
				if (inputElement && place.name) {
					value = place.name;
				}
				dispatch('place_changed', place);
			}
		});
	}

	$: if (autocompleteInstance && googleMapsApi && browser) {
		setupListeners(); // Re-setup if instance exists (usually just once)
	}

	// --- Lifecycle ---
	onDestroy(() => {
		if (autocompleteInstance && googleMapsApi) {
			onUnmount?.(autocompleteInstance);
			// Important: Autocomplete adds listeners to the DOM, clear them
			googleMapsApi.event.clearInstanceListeners(autocompleteInstance);
			// Also clear listeners potentially added to the input element itself by the Autocomplete instance
			if (inputElement) {
				googleMapsApi.event.clearInstanceListeners(inputElement);
			}
			autocompleteInstance = null;
		}
	});

	// Sync external value prop with internal input value
	$: if (browser && inputElement && inputElement.value !== value) {
		inputElement.value = value;
	}

	// Handle input event to update the exported value prop (for two-way binding)
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
