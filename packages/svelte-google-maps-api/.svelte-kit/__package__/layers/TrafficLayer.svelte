<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import { BROWSER as browser } from 'esm-env';
	import type { APIProviderContext } from '../APIProvider.svelte';

	export let onLoad: ((layer: google.maps.TrafficLayer) => void) | undefined = undefined;
	export let onUnmount: ((layer: google.maps.TrafficLayer) => void) | undefined = undefined;

	let layerInstance: google.maps.TrafficLayer | null = null;

	const { status, googleMapsApi } = getContext<APIProviderContext>('svelte-google-maps-api');
	const map = getContext<google.maps.Map>('map');

	function initializeLayer() {
		if (!browser || $status !== 'loaded' || !googleMapsApi || !map || layerInstance) return;

		if (!googleMapsApi.TrafficLayer) {
			console.error('[TrafficLayer] google.maps.TrafficLayer not available.');
			return;
		}

		const layerOptions = {
			map
		};

		try {
			layerInstance = new googleMapsApi.TrafficLayer(layerOptions);
			onLoad?.(layerInstance);
		} catch (error) {
			console.error('[TrafficLayer] Error creating instance:', error);
		}
	}

	onDestroy(() => {
		if (layerInstance) {
			onUnmount?.(layerInstance);
			layerInstance.setMap(null);
			layerInstance = null;
		}
	});

	$: if ($status === 'loaded' && map && !layerInstance) {
		initializeLayer();
	}
</script>

<!-- This layer component does not render any DOM element itself -->
