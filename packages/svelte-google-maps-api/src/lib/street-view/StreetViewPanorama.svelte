<script lang="ts">
	import { getContext, onDestroy, onMount } from 'svelte';
	import { BROWSER as browser } from 'esm-env';
	import type { APIProviderContext } from '../APIProvider.svelte';

	export let options: google.maps.StreetViewPanoramaOptions | undefined = undefined;
	export let containerId: string | undefined = undefined;
	export let containerClass: string = '';
	export let containerStyle: string = 'width:100%;height:100%;';

	export let position: google.maps.LatLng | google.maps.LatLngLiteral | undefined = undefined;
	export let pov: google.maps.StreetViewPov | undefined = undefined;
	export let zoom: number | undefined = undefined;
	export let pano: string | undefined = undefined;

	export let addressControl: boolean | undefined = undefined;
	export let enableCloseButton: boolean | undefined = undefined;
	export let fullscreenControl: boolean | undefined = undefined;
	export let imageDateControl: boolean | undefined = undefined;
	export let linksControl: boolean | undefined = undefined;
	export let motionTracking: boolean | undefined = undefined;
	export let motionTrackingControl: boolean | undefined = undefined;
	export let panControl: boolean | undefined = undefined;
	export let scrollwheel: boolean | undefined = undefined;
	export let zoomControl: boolean | undefined = undefined;
	export let visible: boolean = true;

	export let onCloseClick: (() => void) | undefined = undefined;
	export let onPanoChanged: (() => void) | undefined = undefined;
	export let onPositionChanged: (() => void) | undefined = undefined;
	export let onPovChanged: (() => void) | undefined = undefined;
	export let onResize: (() => void) | undefined = undefined;
	export let onStatusChanged: (() => void) | undefined = undefined;
	export let onVisibleChanged: (() => void) | undefined = undefined;
	export let onZoomChanged: (() => void) | undefined = undefined;
	export let onLoad: ((panorama: google.maps.StreetViewPanorama) => void) | undefined = undefined;
	export let onUnmount: ((panorama: google.maps.StreetViewPanorama) => void) | undefined =
		undefined;

	let panoramaInstance: google.maps.StreetViewPanorama | null = null;
	let containerElement: HTMLDivElement | null = null;
	let listeners: google.maps.MapsEventListener[] = [];

	const { status, googleMapsApi } = getContext<APIProviderContext>('svelte-google-maps-api');

	onMount(() => {
		initializePanorama();
	});

	function initializePanorama() {
		if (!browser || $status !== 'loaded' || !googleMapsApi || !containerElement || panoramaInstance)
			return;

		if (!googleMapsApi.StreetViewPanorama) {
			console.error('[StreetViewPanorama] google.maps.StreetViewPanorama not available.');
			return;
		}

		const panoramaOptions: google.maps.StreetViewPanoramaOptions = {
			...(options ?? {}),
			position,
			pov,
			zoom,
			pano,
			addressControl,
			enableCloseButton,
			fullscreenControl,
			imageDateControl,
			linksControl,
			motionTracking,
			motionTrackingControl,
			panControl,
			scrollwheel,
			zoomControl,
			visible
		};

		Object.keys(panoramaOptions).forEach((key) => {
			if (panoramaOptions[key as keyof typeof panoramaOptions] === undefined) {
				delete panoramaOptions[key as keyof typeof panoramaOptions];
			}
		});

		try {
			panoramaInstance = new googleMapsApi.StreetViewPanorama(containerElement, panoramaOptions);
			onLoad?.(panoramaInstance);
			setupListeners();
		} catch (error) {
			console.error('[StreetViewPanorama] Error creating instance:', error);
		}
	}

	$: if (panoramaInstance && position && googleMapsApi) {
		const newPos =
			position instanceof googleMapsApi.LatLng
				? position
				: new googleMapsApi.LatLng(position.lat, position.lng);
		panoramaInstance.setPosition(newPos);
	}
	$: if (panoramaInstance && pov) {
		panoramaInstance.setPov(pov);
	}
	$: if (panoramaInstance && zoom !== undefined) {
		panoramaInstance.setZoom(zoom);
	}
	$: if (panoramaInstance && pano) {
		panoramaInstance.setPano(pano);
	}
	$: if (panoramaInstance && visible !== undefined) {
		panoramaInstance.setVisible(visible);
	}

	$: if (panoramaInstance && options) {
		panoramaInstance.setOptions(options);
	} else if (panoramaInstance) {
		const controlOpts: google.maps.StreetViewPanoramaOptions = {};
		if (addressControl !== undefined) controlOpts.addressControl = addressControl;
		if (enableCloseButton !== undefined) controlOpts.enableCloseButton = enableCloseButton;
		if (fullscreenControl !== undefined) controlOpts.fullscreenControl = fullscreenControl;
		if (imageDateControl !== undefined) controlOpts.imageDateControl = imageDateControl;
		if (linksControl !== undefined) controlOpts.linksControl = linksControl;
		if (motionTracking !== undefined) controlOpts.motionTracking = motionTracking;
		if (motionTrackingControl !== undefined)
			controlOpts.motionTrackingControl = motionTrackingControl;
		if (panControl !== undefined) controlOpts.panControl = panControl;
		if (scrollwheel !== undefined) controlOpts.scrollwheel = scrollwheel;
		if (zoomControl !== undefined) controlOpts.zoomControl = zoomControl;
		if (Object.keys(controlOpts).length > 0) panoramaInstance.setOptions(controlOpts);
	}

	function setupListeners() {
		if (!panoramaInstance || !googleMapsApi) return;

		listeners.forEach((listener) => googleMapsApi?.event.removeListener(listener));
		listeners = [];

		const eventMap = {
			onCloseClick: 'closeclick',
			onPanoChanged: 'pano_changed',
			onPositionChanged: 'position_changed',
			onPovChanged: 'pov_changed',
			onResize: 'resize',
			onStatusChanged: 'status_changed',
			onVisibleChanged: 'visible_changed',
			onZoomChanged: 'zoom_changed'
		};

		Object.entries(eventMap).forEach(([propName, eventName]) => {
			const callback = $$props[propName];
			if (callback) {
				listeners.push(panoramaInstance!.addListener(eventName, callback));
			}
		});
	}

	$: if (panoramaInstance && googleMapsApi && browser) {
		setupListeners();
	}

	onDestroy(() => {
		if (panoramaInstance) {
			onUnmount?.(panoramaInstance);
			listeners.forEach((listener) => googleMapsApi?.event.removeListener(listener));

			panoramaInstance = null;
		}
	});

	$: if ($status === 'loaded' && containerElement && !panoramaInstance) {
		initializePanorama();
	}
</script>

<div bind:this={containerElement} id={containerId} class={containerClass} style={containerStyle}>
	<!-- Panorama is rendered inside this div by the Google Maps API -->
</div>
