<script lang="ts">
	import { createEventDispatcher, getContext, onDestroy, onMount, tick } from 'svelte';
	import { BROWSER as browser } from 'esm-env';
	import type { APIProviderContext } from '../APIProvider.svelte';

	export let bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral | undefined =
		undefined;
	export let options: google.maps.places.SearchBoxOptions | undefined = undefined;

	export let value: string = '';
	export let placeholder: string | undefined = undefined;
	export let inputId: string | undefined = undefined;
	export let inputClass: string = '';
	export let inputStyle: string = '';
	export let disabled: boolean = false;

	export let onPlacesChanged: ((places: google.maps.places.PlaceResult[] | undefined) => void) | undefined =
		undefined;
	export let onLoad: ((searchBox: google.maps.places.SearchBox) => void) | undefined = undefined;
	export let onUnmount: ((searchBox: google.maps.places.SearchBox) => void) | undefined =
		undefined;

	const dispatch = createEventDispatcher<{
		places_changed: google.maps.places.PlaceResult[] | undefined;
	}>();

	let containerElement: HTMLDivElement | null = null;
	let inputElement: HTMLInputElement | null = null;
	let searchBoxInstance: google.maps.places.SearchBox | null = null;
	let placesChangedListener: google.maps.MapsEventListener | null = null;
	let isMounted = false;

	const { status, googleMapsApi } = getContext<APIProviderContext>('svelte-google-maps-api');

	onMount(() => {
		isMounted = true;
		tick().then(initializeSearchBox);
	});

	function getInputElement() {
		return inputElement ?? containerElement?.querySelector('input') ?? null;
	}

	function initializeSearchBox() {
		if (!browser || $status !== 'loaded' || !googleMapsApi || searchBoxInstance || !isMounted) {
			return;
		}

		if (!googleMapsApi.places || !googleMapsApi.places.SearchBox) {
			console.error(
				'svelte-google-maps-api: StandaloneSearchBox requires the "places" library. Please include "places" in the libraries prop of APIProvider.'
			);
			return;
		}

		const input = getInputElement();
		if (!input) return;

		searchBoxInstance = new googleMapsApi.places.SearchBox(input, options);

		if (bounds !== undefined) {
			searchBoxInstance.setBounds(bounds);
		}

		setupListeners();
		onLoad?.(searchBoxInstance);
	}

	function setupListeners() {
		if (!searchBoxInstance || !googleMapsApi) return;

		if (placesChangedListener) {
			googleMapsApi.event.removeListener(placesChangedListener);
			placesChangedListener = null;
		}

		placesChangedListener = searchBoxInstance.addListener('places_changed', () => {
			const places = searchBoxInstance?.getPlaces();
			onPlacesChanged?.(places);
			dispatch('places_changed', places);
		});
	}

	$: if ($status === 'loaded' && !searchBoxInstance) {
		tick().then(initializeSearchBox);
	}

	$: if (searchBoxInstance && bounds !== undefined) {
		searchBoxInstance.setBounds(bounds);
	}

	$: if (searchBoxInstance && googleMapsApi && browser && onPlacesChanged) {
		setupListeners();
	}

	onDestroy(() => {
		if (searchBoxInstance && googleMapsApi) {
			onUnmount?.(searchBoxInstance);
			if (placesChangedListener) {
				googleMapsApi.event.removeListener(placesChangedListener);
			}
			googleMapsApi.event.clearInstanceListeners(searchBoxInstance);
			searchBoxInstance = null;
		}
	});
</script>

<div bind:this={containerElement} class="svelte-google-maps-search-box">
	{#if $$slots.default}
		<slot />
	{:else}
		<input
			bind:this={inputElement}
			bind:value
			{placeholder}
			{disabled}
			id={inputId}
			class="svelte-google-maps-search-box-input {inputClass}"
			style={inputStyle}
		/>
	{/if}
</div>
