<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import { BROWSER as browser } from 'esm-env';
	import type { APIProviderContext } from '../APIProvider.svelte';

	export let onLoad: ((layer: google.maps.TransitLayer) => void) | undefined = undefined;
	export let onUnmount: ((layer: google.maps.TransitLayer) => void) | undefined = undefined;

	let layerInstance: google.maps.TransitLayer | null = null;

	const { status, googleMapsApi } = getContext<APIProviderContext>('svelte-google-maps-api');
	const map = getContext<google.maps.Map>('map');

	function initializeLayer() {
		if (!browser || $status !== 'loaded' || !googleMapsApi || !map || layerInstance) return;

		if (!googleMapsApi.TransitLayer) {
			console.error('[TransitLayer] google.maps.TransitLayer not available.');
			return;
		}

		try {
			layerInstance = new googleMapsApi.TransitLayer();
			layerInstance.setMap(map);
			onLoad?.(layerInstance);
		} catch (error) {
			console.error('[TransitLayer] Error creating instance:', error);
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
