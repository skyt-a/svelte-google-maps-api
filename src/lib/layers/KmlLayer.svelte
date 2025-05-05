<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import { BROWSER as browser } from 'esm-env';
	import type { APIProviderContext } from '../APIProvider.svelte';

	export let url: string | undefined = undefined;
	export let options: google.maps.KmlLayerOptions | undefined = undefined;
	export let clickable: boolean | undefined = undefined;
	export let preserveViewport: boolean | undefined = undefined;
	export let screenOverlays: boolean | undefined = undefined;
	export let suppressInfoWindows: boolean | undefined = undefined;
	export let zIndex: number | undefined = undefined;

	export let onclick: ((e: google.maps.KmlMouseEvent) => void) | undefined = undefined;
	export let ondefaultviewportchanged: (() => void) | undefined = undefined;
	export let onstatuschanged: (() => void) | undefined = undefined;
	export let onload: ((layer: google.maps.KmlLayer) => void) | undefined = undefined;
	export let onunmount: ((layer: google.maps.KmlLayer) => void) | undefined = undefined;

	let layerInstance: google.maps.KmlLayer | null = null;
	let listeners: google.maps.MapsEventListener[] = [];

	const { status, googleMapsApi } = getContext<APIProviderContext>('svelte-google-maps-api');
	const map = getContext<google.maps.Map>('map');

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

		Object.keys(layerOptions).forEach((key) => {
			if (layerOptions[key as keyof typeof layerOptions] === undefined) {
				delete layerOptions[key as keyof typeof layerOptions];
			}
		});

		try {
			layerInstance = new googleMapsApi.KmlLayer(layerOptions);
			onload?.(layerInstance);
			setupListeners();
		} catch (error) {
			console.error('[KmlLayer] Error creating instance:', error);
		}
	}

	$: if (layerInstance && url && layerInstance.getUrl() !== url) {
		console.warn('[KmlLayer] URL changed. Re-initializing KML layer.');
		layerInstance.setMap(null);
		layerInstance = null;
	}
	$: if (layerInstance && options) {
	}

	function setupListeners() {
		if (!layerInstance || !googleMapsApi) return;

		listeners.forEach((listener) => googleMapsApi?.event.removeListener(listener));
		listeners = [];

		const eventMap = {
			onclick: 'click',
			ondefaultviewportchanged: 'defaultviewport_changed',
			onstatuschanged: 'status_changed'
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

	onDestroy(() => {
		if (layerInstance) {
			onunmount?.(layerInstance);
			listeners.forEach((listener) => googleMapsApi?.event.removeListener(listener));
			layerInstance.setMap(null);
			layerInstance = null;
		}
	});

	$: if ($status === 'loaded' && map && url && !layerInstance) {
		initializeLayer();
	}
</script>

<!-- This layer component does not render any DOM element itself -->
