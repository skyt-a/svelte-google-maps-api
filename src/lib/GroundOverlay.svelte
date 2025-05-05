<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import { BROWSER as browser } from 'esm-env';
	import type { APIProviderContext } from './APIProvider.svelte';

	export let url: string;
	export let bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral;
	export let options: google.maps.GroundOverlayOptions | undefined = undefined;

	export let clickable: boolean | undefined = undefined;
	export let opacity: number | undefined = undefined;

	export let onclick: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let ondblclick: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onload: ((overlay: google.maps.GroundOverlay) => void) | undefined = undefined;
	export let onunmount: ((overlay: google.maps.GroundOverlay) => void) | undefined = undefined;

	let overlayInstance: google.maps.GroundOverlay | null = null;
	let listeners: google.maps.MapsEventListener[] = [];

	const { status, googleMapsApi } = getContext<APIProviderContext>('svelte-google-maps-api');
	const map = getContext<google.maps.Map>('map');

	function initializeOverlay() {
		if (!browser || $status !== 'loaded' || !googleMapsApi || !map || overlayInstance) return;

		const overlayOptions: google.maps.GroundOverlayOptions = {
			...(options ?? {}),
			map,
			clickable,
			opacity
		};

		Object.keys(overlayOptions).forEach((key) => {
			if (overlayOptions[key as keyof typeof overlayOptions] === undefined) {
				delete overlayOptions[key as keyof typeof overlayOptions];
			}
		});

		try {
			overlayInstance = new googleMapsApi.GroundOverlay(url, bounds, overlayOptions);
			onload?.(overlayInstance);
			setupListeners();
		} catch (error) {
			console.error('[GroundOverlay] Error creating instance:', error);
		}
	}

	$: if (overlayInstance && opacity !== undefined) {
		overlayInstance.setOpacity(opacity);
	}

	function setupListeners() {
		if (!overlayInstance || !googleMapsApi) return;

		listeners.forEach((listener) => googleMapsApi?.event.removeListener(listener));
		listeners = [];

		const eventMap = {
			onclick: 'click',
			ondblclick: 'dblclick'
		};

		Object.entries(eventMap).forEach(([propName, eventName]) => {
			const callback = $$props[propName];
			if (callback) {
				listeners.push(overlayInstance!.addListener(eventName, callback));
			}
		});
	}

	$: if (overlayInstance && googleMapsApi && browser) {
		setupListeners();
	}

	onDestroy(() => {
		if (overlayInstance) {
			onunmount?.(overlayInstance);
			listeners.forEach((listener) => googleMapsApi?.event.removeListener(listener));
			overlayInstance.setMap(null);
			overlayInstance = null;
		}
	});

	$: if ($status === 'loaded' && map && url && bounds && !overlayInstance) {
		initializeOverlay();
	}

	let previousBoundsLiteral: google.maps.LatLngBoundsLiteral | null = null;
	$: {
		let currentBoundsLiteral: google.maps.LatLngBoundsLiteral | null = null;
		if (bounds && googleMapsApi) {
			if (bounds instanceof googleMapsApi.LatLngBounds) {
				currentBoundsLiteral = bounds.toJSON();
			} else {
				currentBoundsLiteral = bounds;
			}
		}
		if (
			overlayInstance &&
			(url !== overlayInstance.getUrl() ||
				JSON.stringify(currentBoundsLiteral) !== JSON.stringify(previousBoundsLiteral))
		) {
			console.warn('[GroundOverlay] Re-initializing due to url or bounds change.');
			overlayInstance.setMap(null);

			listeners.forEach((listener) => googleMapsApi?.event.removeListener(listener));
			listeners = [];
			overlayInstance = null;
		}
		previousBoundsLiteral = currentBoundsLiteral;
	}
</script>

<!-- GroundOverlay does not render any DOM element itself -->
