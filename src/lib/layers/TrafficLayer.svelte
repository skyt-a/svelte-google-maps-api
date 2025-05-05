<script lang="ts">
	// Simple Layer Component Boilerplate (e.g., for TrafficLayer, TransitLayer, BicyclingLayer)
	import { getContext, onDestroy } from 'svelte';
	import { BROWSER as browser } from 'esm-env';
	import type { APIProviderContext } from '../APIProvider.svelte';

	// --- Props (May vary slightly per layer) ---
	// Most layers don't have many options settable after creation,
	// they are primarily toggled on/off by mounting/unmounting.
	// export let options: google.maps.TrafficLayerOptions | undefined = undefined; // Example

	// --- Events ---
	export let onLoad: ((layer: google.maps.TrafficLayer) => void) | undefined = undefined; // Adjust type
	export let onUnmount: ((layer: google.maps.TrafficLayer) => void) | undefined = undefined; // Adjust type

	// --- Internal State ---
	let layerInstance: google.maps.TrafficLayer | null = null; // Adjust type

	// --- Context ---
	const { status, googleMapsApi } = getContext<APIProviderContext>('svelte-google-maps-api');
	const map = getContext<google.maps.Map>('map');

	// --- Initialization ---
	function initializeLayer() {
		if (!browser || $status !== 'loaded' || !googleMapsApi || !map || layerInstance) return;

		// Ensure the specific layer class is available
		if (!googleMapsApi.TrafficLayer) {
			// Adjust class name
			console.error('[TrafficLayer] google.maps.TrafficLayer not available.'); // Adjust log
			return;
		}

		const layerOptions = {
			// Adjust options type if needed
			map
			// ...(options ?? {}) // Include options if applicable
		};

		try {
			layerInstance = new googleMapsApi.TrafficLayer(layerOptions); // Adjust class name
			onLoad?.(layerInstance);
		} catch (error) {
			console.error('[TrafficLayer] Error creating instance:', error); // Adjust log
		}
	}

	// --- Reactive Updates ---
	// Most simple layers don't have reactive props other than being added/removed from the map.
	// $: if (layerInstance && options) {
	//   layerInstance.setOptions(options); // If setOptions exists
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
