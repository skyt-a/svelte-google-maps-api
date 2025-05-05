<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import { BROWSER as browser } from 'esm-env';
	import type { APIProviderContext } from './APIProvider.svelte';

	export let directions: google.maps.DirectionsResult | undefined = undefined;
	export let options: google.maps.DirectionsRendererOptions | undefined = undefined;

	export let routeIndex: number | undefined = undefined;
	export let panel: HTMLElement | undefined = undefined;
	export let draggable: boolean | undefined = undefined;
	export let hideRouteList: boolean | undefined = undefined;
	export let preserveViewport: boolean | undefined = undefined;
	export let suppressMarkers: boolean | undefined = undefined;
	export let suppressInfoWindows: boolean | undefined = undefined;
	export let suppressPolylines: boolean | undefined = undefined;
	export let markerOptions: google.maps.MarkerOptions | undefined = undefined;
	export let polylineOptions: google.maps.PolylineOptions | undefined = undefined;

	export let onDirectionsChanged: (() => void) | undefined = undefined;
	export let onLoad: ((renderer: google.maps.DirectionsRenderer) => void) | undefined = undefined;
	export let onUnmount: ((renderer: google.maps.DirectionsRenderer) => void) | undefined =
		undefined;

	let rendererInstance: google.maps.DirectionsRenderer | null = null;
	let directionsChangedListener: google.maps.MapsEventListener | null = null;

	const { status, googleMapsApi } = getContext<APIProviderContext>('svelte-google-maps-api');
	const map = getContext<google.maps.Map>('map');

	function initializeRenderer() {
		if (!browser || $status !== 'loaded' || !googleMapsApi || !map || rendererInstance) return;

		if (!googleMapsApi.DirectionsRenderer) {
			console.error(
				'svelte-google-maps-api: DirectionsRenderer is not available on googleMapsApi object.'
			);
			return;
		}

		const rendererOptions: google.maps.DirectionsRendererOptions = {
			...(options ?? {}),
			map,
			directions,
			routeIndex,
			panel,
			draggable,
			hideRouteList,
			preserveViewport,
			suppressMarkers,
			suppressInfoWindows,
			suppressPolylines,
			markerOptions,
			polylineOptions
		};

		Object.keys(rendererOptions).forEach((key) => {
			if (rendererOptions[key as keyof typeof rendererOptions] === undefined) {
				delete rendererOptions[key as keyof typeof rendererOptions];
			}
		});

		try {
			rendererInstance = new googleMapsApi.DirectionsRenderer(rendererOptions);
			onLoad?.(rendererInstance);
			setupListeners();
		} catch (error) {
			console.error('[DirectionsRenderer] Error creating instance:', error);
		}
	}

	$: if (rendererInstance && directions) {
		rendererInstance.setDirections(directions);
	}
	$: if (rendererInstance && routeIndex !== undefined) {
		rendererInstance.setRouteIndex(routeIndex);
	}
	$: if (rendererInstance && panel !== undefined) {
		rendererInstance.setPanel(panel);
	}
	$: if (rendererInstance && options) {
		rendererInstance.setOptions(options);
	} else if (rendererInstance) {
		const individualOptions: google.maps.DirectionsRendererOptions = {};
		if (draggable !== undefined) individualOptions.draggable = draggable;
		if (hideRouteList !== undefined) individualOptions.hideRouteList = hideRouteList;
		if (preserveViewport !== undefined) individualOptions.preserveViewport = preserveViewport;
		if (suppressMarkers !== undefined) individualOptions.suppressMarkers = suppressMarkers;
		if (suppressInfoWindows !== undefined)
			individualOptions.suppressInfoWindows = suppressInfoWindows;
		if (suppressPolylines !== undefined) individualOptions.suppressPolylines = suppressPolylines;
		if (markerOptions !== undefined) individualOptions.markerOptions = markerOptions;
		if (polylineOptions !== undefined) individualOptions.polylineOptions = polylineOptions;
		if (Object.keys(individualOptions).length > 0) rendererInstance.setOptions(individualOptions);
	}

	function setupListeners() {
		if (!rendererInstance || !googleMapsApi) return;

		if (directionsChangedListener) googleMapsApi.event.removeListener(directionsChangedListener);
		directionsChangedListener = null;

		if (onDirectionsChanged) {
			directionsChangedListener = rendererInstance.addListener(
				'directions_changed',
				onDirectionsChanged
			);
		}
	}

	$: if (rendererInstance && googleMapsApi && browser) {
		setupListeners();
	}

	onDestroy(() => {
		if (rendererInstance) {
			onUnmount?.(rendererInstance);
			if (directionsChangedListener && googleMapsApi) {
				googleMapsApi.event.removeListener(directionsChangedListener);
			}
			rendererInstance.setMap(null);
			rendererInstance = null;
		}
	});

	$: if ($status === 'loaded' && map && !rendererInstance) {
		initializeRenderer();
	}
</script>
