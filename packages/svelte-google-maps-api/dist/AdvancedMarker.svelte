<script lang="ts">
	import { getContext, onDestroy, onMount, tick } from 'svelte';
	import { BROWSER as browser } from 'esm-env';
	import type { APIProviderContext } from './APIProvider.svelte';

	export let position: google.maps.LatLng | google.maps.LatLngLiteral | undefined = undefined;
	export let title: string | undefined = undefined;
	export let zIndex: number | undefined = undefined;
	export let element: HTMLElement | undefined = undefined;
	export let gmpDraggable: boolean | undefined = undefined;

	export let onClick: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onDrag: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onDragEnd: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onDragStart: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onLoad: ((marker: google.maps.marker.AdvancedMarkerElement) => void) | undefined =
		undefined;
	export let onUnmount: ((marker: google.maps.marker.AdvancedMarkerElement) => void) | undefined =
		undefined;

	let markerInstance: google.maps.marker.AdvancedMarkerElement | null = null;
	let contentWrapper: HTMLDivElement | null = null;
	let clickListener: google.maps.MapsEventListener | null = null;
	let dragListener: google.maps.MapsEventListener | null = null;
	let dragEndListener: google.maps.MapsEventListener | null = null;
	let dragStartListener: google.maps.MapsEventListener | null = null;

	const { status, googleMapsApi } = getContext<APIProviderContext>('svelte-google-maps-api');
	const map = getContext<google.maps.Map>('map');

	onDestroy(() => {
		if (markerInstance) {
			onUnmount?.(markerInstance);

			if (googleMapsApi) {
				googleMapsApi.event.clearInstanceListeners(markerInstance);
			}
			markerInstance.map = null;
			markerInstance = null;
		}
	});

	async function initializeMarker() {
		if (!browser || $status !== 'loaded' || !googleMapsApi || !map || markerInstance) {
			return;
		}

		if (!googleMapsApi.marker || !googleMapsApi.marker.AdvancedMarkerElement) {
			console.error(
				'svelte-google-maps-api: AdvancedMarker requires the "marker" library to be loaded. Please include "marker" in the libraries prop of APIProvider.'
			);
			return;
		}

		let markerContent: HTMLElement | null = null;
		if (element) {
			markerContent = element;
		} else if (contentWrapper && contentWrapper.childNodes.length > 0) {
			markerContent = contentWrapper;
		}

		const markerOptions: google.maps.marker.AdvancedMarkerElementOptions = {
			map,
			position,
			title,
			zIndex,
			content: markerContent,
			gmpDraggable
		};

		try {
			markerInstance = new googleMapsApi.marker.AdvancedMarkerElement(markerOptions);
			onLoad?.(markerInstance);
		} catch (error) {
			console.error('[AdvancedMarker] Error creating instance:', error);
			return;
		}

		setupListeners();
	}

	$: if (markerInstance && position) {
		markerInstance.position = position;
	}
	$: if (markerInstance && title !== undefined) {
		markerInstance.title = title;
	}
	$: if (markerInstance && zIndex !== undefined) {
		markerInstance.zIndex = zIndex;
	}
	$: if (markerInstance && gmpDraggable !== undefined) {
		markerInstance.gmpDraggable = gmpDraggable;
	}

	function setupListeners() {
		if (!markerInstance || !googleMapsApi) return;

		if (clickListener) googleMapsApi.event.removeListener(clickListener);
		if (dragListener) googleMapsApi.event.removeListener(dragListener);
		if (dragEndListener) googleMapsApi.event.removeListener(dragEndListener);
		if (dragStartListener) googleMapsApi.event.removeListener(dragStartListener);

		if (onClick) {
			clickListener = markerInstance.addListener('click', onClick);
		}
		if (onDrag) {
			dragListener = markerInstance.addListener('gmp-drag', onDrag);
		}
		if (onDragEnd) {
			dragEndListener = markerInstance.addListener('gmp-dragend', onDragEnd);
		}
		if (onDragStart) {
			dragStartListener = markerInstance.addListener('gmp-dragstart', onDragStart);
		}
	}

	$: if (markerInstance && googleMapsApi && browser) {
		setupListeners();
	}

	$: if ($status === 'loaded' && map && !markerInstance) {
		tick().then(initializeMarker);
	}

	export function getMarkerInstance(): google.maps.marker.AdvancedMarkerElement | null {
		return markerInstance;
	}
</script>

<!-- Wrapper for slot content, only rendered if no element prop is provided -->
{#if !element}
	<div bind:this={contentWrapper}>
		<slot />
	</div>
{/if}

<!-- This component doesn't render directly to the DOM where it's used,
     it controls the AdvancedMarkerElement on the map -->
