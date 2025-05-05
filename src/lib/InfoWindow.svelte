<script lang="ts">
	import { getContext, onDestroy, onMount, tick } from 'svelte';
	import { BROWSER as browser } from 'esm-env';
	import type { APIProviderContext } from './APIProvider.svelte';

	type Anchor =
		| google.maps.MVCObject
		| google.maps.marker.AdvancedMarkerElement
		| google.maps.LatLng
		| google.maps.LatLngLiteral;

	export let anchor: Anchor | undefined = undefined;
	export let position: google.maps.LatLng | google.maps.LatLngLiteral | undefined = undefined;
	export let options: google.maps.InfoWindowOptions | undefined = undefined;
	export let headerContent: Element | string | undefined = undefined;
	export let zIndex: number | undefined = undefined;
	export let shouldFocus: boolean = true;

	export let isOpen: boolean = true;

	export let onCloseClick: (() => void) | undefined = undefined;
	export let onDomReady: (() => void) | undefined = undefined;
	export let onContentChanged: (() => void) | undefined = undefined;
	export let onPositionChanged: (() => void) | undefined = undefined;
	export let onZIndexChanged: (() => void) | undefined = undefined;
	export let onLoad: ((infoWindow: google.maps.InfoWindow) => void) | undefined = undefined;
	export let onUnmount: ((infoWindow: google.maps.InfoWindow) => void) | undefined = undefined;

	let infoWindowInstance: google.maps.InfoWindow | null = null;
	let contentWrapper: HTMLDivElement | null = null;
	let headerWrapper: HTMLDivElement | null = null;
	let closeClickListener: google.maps.MapsEventListener | null = null;
	let domReadyListener: google.maps.MapsEventListener | null = null;
	let contentChangedListener: google.maps.MapsEventListener | null = null;
	let positionChangedListener: google.maps.MapsEventListener | null = null;
	let zIndexChangedListener: google.maps.MapsEventListener | null = null;

	let internalOpenState = isOpen;

	const { status, googleMapsApi } = getContext<APIProviderContext>('svelte-google-maps-api');
	const map = getContext<google.maps.Map>('map');

	onMount(() => {
		tick().then(initializeInfoWindow);
	});

	onDestroy(() => {
		if (infoWindowInstance) {
			onUnmount?.(infoWindowInstance);
			if (googleMapsApi) {
				googleMapsApi.event.clearInstanceListeners(infoWindowInstance);
			}
			infoWindowInstance.close();
			infoWindowInstance = null;
		}
	});

	async function initializeInfoWindow() {
		if (!browser || $status !== 'loaded' || !googleMapsApi || !map || infoWindowInstance) return;

		const infoWindowOptions: google.maps.InfoWindowOptions = {
			...(options ?? {}),
			content: contentWrapper ?? undefined,
			headerContent: headerWrapper ?? headerContent ?? undefined,
			position,
			zIndex
		};

		Object.keys(infoWindowOptions).forEach((key) => {
			if (
				key !== 'content' &&
				key !== 'headerContent' &&
				infoWindowOptions[key as keyof typeof infoWindowOptions] === undefined
			) {
				delete infoWindowOptions[key as keyof typeof infoWindowOptions];
			}
		});

		infoWindowInstance = new googleMapsApi.InfoWindow(infoWindowOptions);
		onLoad?.(infoWindowInstance);

		setupListeners();

		updateOpenState();
	}

	$: if (infoWindowInstance && position) {
		infoWindowInstance.setPosition(position);
	}
	$: if (infoWindowInstance && zIndex !== undefined) {
		infoWindowInstance.setZIndex(zIndex);
	}
	$: if (infoWindowInstance && options) {
		infoWindowInstance.setOptions(options);
	}

	$: if (isOpen !== internalOpenState) {
		internalOpenState = isOpen;
		updateOpenState();
	}

	function setupListeners() {
		if (!infoWindowInstance || !googleMapsApi) return;

		if (closeClickListener) googleMapsApi.event.removeListener(closeClickListener);
		if (domReadyListener) googleMapsApi.event.removeListener(domReadyListener);
		if (contentChangedListener) googleMapsApi.event.removeListener(contentChangedListener);
		if (positionChangedListener) googleMapsApi.event.removeListener(positionChangedListener);
		if (zIndexChangedListener) googleMapsApi.event.removeListener(zIndexChangedListener);

		if (onCloseClick) {
			closeClickListener = infoWindowInstance.addListener('closeclick', () => {
				internalOpenState = false;
				isOpen = false;
				onCloseClick();
			});
		}
		if (onDomReady) {
			domReadyListener = infoWindowInstance.addListener('domready', onDomReady);
		}
		if (onContentChanged) {
			contentChangedListener = infoWindowInstance.addListener('content_changed', onContentChanged);
		}
		if (onPositionChanged) {
			positionChangedListener = infoWindowInstance.addListener(
				'position_changed',
				onPositionChanged
			);
		}
		if (onZIndexChanged) {
			zIndexChangedListener = infoWindowInstance.addListener('zindex_changed', onZIndexChanged);
		}
	}

	$: if (infoWindowInstance && googleMapsApi && browser) {
		setupListeners();
	}

	function updateOpenState() {
		if (!infoWindowInstance || !map) return;

		if (internalOpenState) {
			let openAnchor: google.maps.MVCObject | undefined = undefined;
			if (anchor && typeof anchor === 'object' && anchor !== null) {
				if ('addListener' in anchor || 'position' in anchor) {
					openAnchor = anchor as google.maps.MVCObject;
				}
			}
			infoWindowInstance.open({ map: map, anchor: openAnchor, shouldFocus: shouldFocus });
		} else {
			infoWindowInstance.close();
		}
	}

	$: if (infoWindowInstance && map) {
		updateOpenState();
	}

	$: if ($status === 'loaded' && !infoWindowInstance) {
		tick().then(initializeInfoWindow);
	}
</script>

<!-- Wrapper for slot content -->
<div bind:this={contentWrapper}>
	<slot />
</div>

<!-- Wrapper for header slot content (optional) -->
{#if $$slots.header}
	<div bind:this={headerWrapper}>
		<slot name="header" />
	</div>
{/if}

<!-- This component doesn't render directly to the DOM where it's used,
     it controls the InfoWindow on the map -->
