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

	export let onBoundsChanged: (() => void) | undefined = undefined;
	export let onClick: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onDblClick: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onDrag: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onDragEnd: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onDragStart: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onMouseDown: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onMouseMove: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onMouseOut: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onMouseOver: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onMouseUp: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onRightClick: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onLoad: ((rectangle: google.maps.Rectangle) => void) | undefined = undefined;
	export let onUnmount: ((rectangle: google.maps.Rectangle) => void) | undefined = undefined;

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
			onLoad?.(rectangleInstance);
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
			onBoundsChanged: 'bounds_changed',
			onClick: 'click',
			onDblClick: 'dblclick',
			onDrag: 'drag',
			onDragEnd: 'dragend',
			onDragStart: 'dragstart',
			onMouseDown: 'mousedown',
			onMouseMove: 'mousemove',
			onMouseOut: 'mouseout',
			onMouseOver: 'mouseover',
			onMouseUp: 'mouseup',
			onRightClick: 'rightclick'
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
			onUnmount?.(rectangleInstance);
			listeners.forEach((listener) => googleMapsApi?.event.removeListener(listener));
			rectangleInstance.setMap(null);
			rectangleInstance = null;
		}
	});

	$: if ($status === 'loaded' && map && !rectangleInstance) {
		initializeRectangle();
	}
</script>
