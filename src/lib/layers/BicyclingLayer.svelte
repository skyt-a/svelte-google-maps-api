<script lang="ts">
	// Simple Layer Component Boilerplate (e.g., for TrafficLayer, TransitLayer, BicyclingLayer)
	import { getContext, onDestroy } from 'svelte';
	import { BROWSER as browser } from 'esm-env';
	import type { APIProviderContext } from '../APIProvider.svelte';

	// --- Props ---
	// export let options: google.maps.BicyclingLayerOptions | undefined = undefined;

	// --- Events ---
	export let onLoad: ((layer: google.maps.BicyclingLayer) => void) | undefined = undefined; // Adjust type
	export let onUnmount: ((layer: google.maps.BicyclingLayer) => void) | undefined = undefined; // Adjust type

	// --- Internal State ---
	let layerInstance: google.maps.BicyclingLayer | null = null; // Adjust type

	// --- Context ---
	const { status, googleMapsApi } = getContext<APIProviderContext>('svelte-google-maps-api');
	const map = getContext<google.maps.Map>('map');

	// --- Initialization ---
	function initializeLayer() {
		if (!browser || $status !== 'loaded' || !googleMapsApi || !map || layerInstance) return;

		if (!googleMapsApi.BicyclingLayer) {
			// Adjust class name
			console.error('[BicyclingLayer] google.maps.BicyclingLayer not available.'); // Adjust log
			return;
		}

		// No options for constructor
		try {
			layerInstance = new googleMapsApi.BicyclingLayer(); // Adjust class name
			layerInstance.setMap(map); // Set map after creation
			onLoad?.(layerInstance);
		} catch (error) {
			console.error('[BicyclingLayer] Error creating instance:', error); // Adjust log
		}
	}

	// --- Reactive Updates ---
	// $: if (layerInstance && options) {
	//   layerInstance.setOptions(options);
	// }

	// --- Lifecycle ---
	onDestroy(() => {
		if (layerInstance) {
			onUnmount?.(layerInstance);
			layerInstance.setMap(null);
			layerInstance = null;
		}
	});

	// Initialize when ready
	$: if ($status === 'loaded' && map && !layerInstance) {
		initializeLayer();
	}
</script>

<!-- This layer component does not render any DOM element itself -->
