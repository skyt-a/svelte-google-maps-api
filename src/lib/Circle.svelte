<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import { BROWSER as browser } from 'esm-env';
	import type { APIProviderContext } from './APIProvider.svelte';

	export let center: google.maps.LatLng | google.maps.LatLngLiteral | undefined = undefined;
	export let radius: number | undefined = undefined;
	export let options: google.maps.CircleOptions | undefined = undefined;
	export let draggable: boolean | undefined = undefined;
	export let editable: boolean | undefined = undefined;
	export let visible: boolean | undefined = undefined;

	export let fillColor: string | undefined = undefined;
	export let fillOpacity: number | undefined = undefined;
	export let strokeColor: string | undefined = undefined;
	export let strokeOpacity: number | undefined = undefined;
	export let strokeWeight: number | undefined = undefined;
	export let zIndex: number | undefined = undefined;

	export let onclick: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let ondblclick: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let ondrag: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let ondragend: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let ondragstart: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onmousedown: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onmousemove: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onmouseout: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onmouseover: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onmouseup: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onrightclick: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let oncenterchanged: (() => void) | undefined = undefined;
	export let onradiuschanged: (() => void) | undefined = undefined;
	export let onload: ((circle: google.maps.Circle) => void) | undefined = undefined;
	export let onunmount: ((circle: google.maps.Circle) => void) | undefined = undefined;

	let circleInstance: google.maps.Circle | null = null;
	let listeners: google.maps.MapsEventListener[] = [];

	const { status, googleMapsApi } = getContext<APIProviderContext>('svelte-google-maps-api');
	const map = getContext<google.maps.Map>('map');

	function initializeCircle() {
		if (!browser || $status !== 'loaded' || !googleMapsApi || !map || circleInstance) return;

		const circleOptions: google.maps.CircleOptions = {
			...(options ?? {}),
			map,
			center,
			radius,
			draggable,
			editable,
			visible,
			fillColor,
			fillOpacity,
			strokeColor,
			strokeOpacity,
			strokeWeight,
			zIndex
		};

		Object.keys(circleOptions).forEach((key) => {
			if (circleOptions[key as keyof typeof circleOptions] === undefined) {
				delete circleOptions[key as keyof typeof circleOptions];
			}
		});

		try {
			circleInstance = new googleMapsApi.Circle(circleOptions);
			onload?.(circleInstance);
			setupListeners();
		} catch (error) {
			console.error('[Circle] Error creating instance:', error);
		}
	}

	$: if (circleInstance && center) {
		circleInstance.setCenter(center);
	}
	$: if (circleInstance && radius !== undefined) {
		circleInstance.setRadius(radius);
	}
	$: if (circleInstance && options) {
		circleInstance.setOptions(options);
	} else if (circleInstance) {
		if (draggable !== undefined) circleInstance.setDraggable(draggable);
		if (editable !== undefined) circleInstance.setEditable(editable);
		if (visible !== undefined) circleInstance.setVisible(visible);
		const styleOpts: google.maps.CircleOptions = {};
		if (fillColor !== undefined) styleOpts.fillColor = fillColor;
		if (fillOpacity !== undefined) styleOpts.fillOpacity = fillOpacity;
		if (strokeColor !== undefined) styleOpts.strokeColor = strokeColor;
		if (strokeOpacity !== undefined) styleOpts.strokeOpacity = strokeOpacity;
		if (strokeWeight !== undefined) styleOpts.strokeWeight = strokeWeight;
		if (zIndex !== undefined) styleOpts.zIndex = zIndex;
		if (Object.keys(styleOpts).length > 0) circleInstance.setOptions(styleOpts);
	}

	function setupListeners() {
		if (!circleInstance || !googleMapsApi) return;

		listeners.forEach((listener) => googleMapsApi?.event.removeListener(listener));
		listeners = [];

		const eventMap = {
			onclick: 'click',
			ondblclick: 'dblclick',
			ondrag: 'drag',
			ondragend: 'dragend',
			ondragstart: 'dragstart',
			onmousedown: 'mousedown',
			onmousemove: 'mousemove',
			onmouseout: 'mouseout',
			onmouseover: 'mouseover',
			onmouseup: 'mouseup',
			onrightclick: 'rightclick',
			oncenterchanged: 'center_changed',
			onradiuschanged: 'radius_changed'
		};

		Object.entries(eventMap).forEach(([propName, eventName]) => {
			const callback = $$props[propName];
			if (callback) {
				listeners.push(circleInstance!.addListener(eventName, callback));
			}
		});
	}

	$: if (circleInstance && googleMapsApi && browser) {
		setupListeners();
	}

	onDestroy(() => {
		if (circleInstance) {
			onunmount?.(circleInstance);
			listeners.forEach((listener) => googleMapsApi?.event.removeListener(listener));
			circleInstance.setMap(null);
			circleInstance = null;
		}
	});

	$: if ($status === 'loaded' && map && !circleInstance) {
		initializeCircle();
	}
</script>

<!-- Circle does not render any DOM element itself -->
