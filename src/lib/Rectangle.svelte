<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import { BROWSER as browser } from 'esm-env';
	import type { APIProviderContext } from './APIProvider.svelte';

	export let bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral | undefined =
		undefined;
	export let options: google.maps.RectangleOptions | undefined = undefined;
	export let draggable: boolean | undefined = undefined;
	export let editable: boolean | undefined = undefined;
	export let visible: boolean | undefined = undefined;
	export let fillColor: string | undefined = undefined;
	export let fillOpacity: number | undefined = undefined;
	export let strokeColor: string | undefined = undefined;
	export let strokeOpacity: number | undefined = undefined;
	export let strokeWeight: number | undefined = undefined;
	export let zIndex: number | undefined = undefined;

	export let onboundschanged: (() => void) | undefined = undefined;
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
	export let onload: ((rectangle: google.maps.Rectangle) => void) | undefined = undefined;
	export let onunmount: ((rectangle: google.maps.Rectangle) => void) | undefined = undefined;

	let rectangleInstance: google.maps.Rectangle | null = null;
	let listeners: google.maps.MapsEventListener[] = [];

	const { status, googleMapsApi } = getContext<APIProviderContext>('svelte-google-maps-api');
	const map = getContext<google.maps.Map>('map');

	function initializeRectangle() {
		if (!browser || $status !== 'loaded' || !googleMapsApi || !map || rectangleInstance) return;

		const rectangleOptions: google.maps.RectangleOptions = {
			...(options ?? {}),
			map,
			bounds,
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

		Object.keys(rectangleOptions).forEach((key) => {
			if (rectangleOptions[key as keyof typeof rectangleOptions] === undefined) {
				delete rectangleOptions[key as keyof typeof rectangleOptions];
			}
		});

		try {
			rectangleInstance = new googleMapsApi.Rectangle(rectangleOptions);
			onload?.(rectangleInstance);
			setupListeners();
		} catch (error) {
			console.error('[Rectangle] Error creating instance:', error);
		}
	}

	$: if (rectangleInstance && bounds) {
		rectangleInstance.setBounds(bounds);
	}
	$: if (rectangleInstance && options) {
		rectangleInstance.setOptions(options);
	} else if (rectangleInstance) {
		if (draggable !== undefined) rectangleInstance.setDraggable(draggable);
		if (editable !== undefined) rectangleInstance.setEditable(editable);
		if (visible !== undefined) rectangleInstance.setVisible(visible);
		const styleOpts: google.maps.RectangleOptions = {};
		if (fillColor !== undefined) styleOpts.fillColor = fillColor;
		if (fillOpacity !== undefined) styleOpts.fillOpacity = fillOpacity;
		if (strokeColor !== undefined) styleOpts.strokeColor = strokeColor;
		if (strokeOpacity !== undefined) styleOpts.strokeOpacity = strokeOpacity;
		if (strokeWeight !== undefined) styleOpts.strokeWeight = strokeWeight;
		if (zIndex !== undefined) styleOpts.zIndex = zIndex;
		if (Object.keys(styleOpts).length > 0) rectangleInstance.setOptions(styleOpts);
	}

	function setupListeners() {
		if (!rectangleInstance || !googleMapsApi) return;

		listeners.forEach((listener) => googleMapsApi?.event.removeListener(listener));
		listeners = [];

		const eventMap = {
			onboundschanged: 'bounds_changed',
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
			onrightclick: 'rightclick'
		};

		Object.entries(eventMap).forEach(([propName, eventName]) => {
			const callback = $$props[propName];
			if (callback) {
				listeners.push(rectangleInstance!.addListener(eventName, callback));
			}
		});
	}

	$: if (rectangleInstance && googleMapsApi && browser) {
		setupListeners();
	}

	onDestroy(() => {
		if (rectangleInstance) {
			onunmount?.(rectangleInstance);
			listeners.forEach((listener) => googleMapsApi?.event.removeListener(listener));
			rectangleInstance.setMap(null);
			rectangleInstance = null;
		}
	});

	$: if ($status === 'loaded' && map && !rectangleInstance) {
		initializeRectangle();
	}
</script>
