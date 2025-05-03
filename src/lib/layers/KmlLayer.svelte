<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import { BROWSER as browser } from 'esm-env';
	import type { APIProviderContext } from '../APIProvider.svelte';

	// --- Props (Based on google.maps.KmlLayerOptions) ---
	export let url: string | undefined = undefined;
	export let options: google.maps.KmlLayerOptions | undefined = undefined;
	export let clickable: boolean | undefined = undefined;
	export let preserveViewport: boolean | undefined = undefined;
	export let screenOverlays: boolean | undefined = undefined;
	export let suppressInfoWindows: boolean | undefined = undefined;
	export let zIndex: number | undefined = undefined;

	// --- Events ---
	export let onClick: ((e: google.maps.KmlMouseEvent) => void) | undefined = undefined;
	export let onDefaultViewportChanged: (() => void) | undefined = undefined;
	export let onStatusChanged: (() => void) | undefined = undefined;
	export let onLoad: ((layer: google.maps.KmlLayer) => void) | undefined = undefined;
	export let onUnmount: ((layer: google.maps.KmlLayer) => void) | undefined = undefined;

	// --- Internal State ---
	let layerInstance: google.maps.KmlLayer | null = null;
	let listeners: google.maps.MapsEventListener[] = [];

	// --- Context ---
	const { status, googleMapsApi } = getContext<APIProviderContext>('svelte-google-maps-api');
	const map = getContext<google.maps.Map>('map');

	// --- Initialization ---
	function initializeLayer() {
		if (!browser || $status !== 'loaded' || !googleMapsApi || !map || layerInstance) return;

		if (!googleMapsApi.KmlLayer) {
			console.error('[KmlLayer] google.maps.KmlLayer not available.');
			return;
		}

		const layerOptions: google.maps.KmlLayerOptions = {
			...(options ?? {}),
			url,
			map,
			clickable,
			preserveViewport,
			screenOverlays,
			suppressInfoWindows,
			zIndex
		};

		// Filter out undefined props
		Object.keys(layerOptions).forEach((key) => {
			if (layerOptions[key as keyof typeof layerOptions] === undefined) {
				delete layerOptions[key as keyof typeof layerOptions];
			}
		});

		try {
			layerInstance = new googleMapsApi.KmlLayer(layerOptions);
			onLoad?.(layerInstance);
			setupListeners();
		} catch (error) {
			console.error('[KmlLayer] Error creating instance:', error);
		}
	}

	// --- Reactive Updates ---
	// KML Layer options are mostly set at creation. URL change might require re-creation.
	$: if (layerInstance && url && layerInstance.getUrl() !== url) {
		console.warn('[KmlLayer] URL changed. Re-initializing KML layer.');
		layerInstance.setMap(null); // Remove old
		layerInstance = null;
		// Let initialization logic re-run
	}
	$: if (layerInstance && options) {
		// KmlLayer doesn't have a setOptions method in the typings.
		// Individual setters might exist but are limited.
		// layerInstance.setOptions(options);
	}
	// Individual props update (if setters exist)
	// $: if (layerInstance && zIndex !== undefined) layerInstance.setZIndex(zIndex); // Example if setZIndex existed

	// --- Event Listeners ---
	function setupListeners() {
		if (!layerInstance || !googleMapsApi) return;

		listeners.forEach((listener) => googleMapsApi?.event.removeListener(listener));
		listeners = [];

		const eventMap = {
			onClick: 'click',
			onDefaultViewportChanged: 'defaultviewport_changed',
			onStatusChanged: 'status_changed'
		};

		Object.entries(eventMap).forEach(([propName, eventName]) => {
			const callback = $$props[propName];
			if (callback) {
				listeners.push(layerInstance!.addListener(eventName, callback));
			}
		});
	}

	$: if (layerInstance && googleMapsApi && browser) {
		setupListeners();
	}

	// --- Lifecycle ---
	onDestroy(() => {
		if (layerInstance) {
			onUnmount?.(layerInstance);
			listeners.forEach((listener) => googleMapsApi?.event.removeListener(listener));
			layerInstance.setMap(null);
			layerInstance = null;
		}
	});

	// Initialize when ready
	$: if ($status === 'loaded' && map && url && !layerInstance) {
		initializeLayer();
	}
</script>

<!-- This layer component does not render any DOM element itself -->
