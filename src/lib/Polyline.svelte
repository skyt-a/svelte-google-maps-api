<script lang="ts">
	import { getContext, onDestroy, onMount } from 'svelte';
	import { BROWSER as browser } from 'esm-env';
	import type { APIProviderContext } from './APIProvider.svelte';

	export let path:
		| google.maps.MVCArray<google.maps.LatLng>
		| (google.maps.LatLng | google.maps.LatLngLiteral)[]
		| undefined = undefined;
	export let options: google.maps.PolylineOptions | undefined = undefined;
	export let draggable: boolean | undefined = undefined;
	export let editable: boolean | undefined = undefined;
	export let visible: boolean | undefined = undefined;
	export let strokeColor: string | undefined = undefined;
	export let strokeOpacity: number | undefined = undefined;
	export let strokeWeight: number | undefined = undefined;
	export let zIndex: number | undefined = undefined;

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
	export let onPathChanged:
		| ((newPath: google.maps.MVCArray<google.maps.LatLng>) => void)
		| undefined = undefined;
	export let onLoad: ((polyline: google.maps.Polyline) => void) | undefined = undefined;
	export let onUnmount: ((polyline: google.maps.Polyline) => void) | undefined = undefined;

	let polylineInstance: google.maps.Polyline | null = null;
	let listeners: google.maps.MapsEventListener[] = [];
	let pathUpdateListener: google.maps.MapsEventListener | null = null;

	const { status, googleMapsApi } = getContext<APIProviderContext>('svelte-google-maps-api');
	const map = getContext<google.maps.Map>('map');

	function initializePolyline() {
		if (!browser || $status !== 'loaded' || !googleMapsApi || !map || polylineInstance) return;

		const polylineOptions: google.maps.PolylineOptions = {
			...(options ?? {}),
			map,
			path,
			draggable,
			editable,
			visible,
			strokeColor,
			strokeOpacity,
			strokeWeight,
			zIndex
		};

		Object.keys(polylineOptions).forEach((key) => {
			if (polylineOptions[key as keyof typeof polylineOptions] === undefined) {
				delete polylineOptions[key as keyof typeof polylineOptions];
			}
		});

		try {
			polylineInstance = new googleMapsApi.Polyline(polylineOptions);
			onLoad?.(polylineInstance);
			setupListeners();
		} catch (error) {
			console.error('[Polyline] Error creating instance:', error);
		}
	}

	$: if (polylineInstance && path) {
		polylineInstance.setPath(path);
	}
	$: if (polylineInstance && options) {
		polylineInstance.setOptions(options);
	} else if (polylineInstance) {
		if (draggable !== undefined) polylineInstance.setDraggable(draggable);
		if (editable !== undefined) polylineInstance.setEditable(editable);
		if (visible !== undefined) polylineInstance.setVisible(visible);
		if (strokeColor !== undefined) polylineInstance.setOptions({ strokeColor });
		if (strokeOpacity !== undefined) polylineInstance.setOptions({ strokeOpacity });
		if (strokeWeight !== undefined) polylineInstance.setOptions({ strokeWeight });
		if (zIndex !== undefined) polylineInstance.setOptions({ zIndex });
	}

	function setupListeners() {
		if (!polylineInstance || !googleMapsApi) return;
		listeners.forEach((listener) => googleMapsApi?.event.removeListener(listener));
		listeners = [];
		if (pathUpdateListener && googleMapsApi) {
			googleMapsApi.event.removeListener(pathUpdateListener);
			pathUpdateListener = null;
		}
		const eventMap = {
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
				listeners.push(polylineInstance!.addListener(eventName, callback));
			}
		});

		if (onPathChanged) {
			const polylinePath = polylineInstance.getPath();
			if (polylinePath) {
				const updatePath = () => onPathChanged(polylinePath);
				listeners.push(googleMapsApi.event.addListener(polylinePath, 'insert_at', updatePath));
				listeners.push(googleMapsApi.event.addListener(polylinePath, 'set_at', updatePath));
				if (draggable) {
					listeners.push(polylineInstance!.addListener('dragend', updatePath));
				}
			}
		}
	}

	$: if (polylineInstance && googleMapsApi && browser) {
		setupListeners();
	}

	onDestroy(() => {
		if (polylineInstance) {
			onUnmount?.(polylineInstance);
			listeners.forEach((listener) => googleMapsApi?.event.removeListener(listener));
			if (pathUpdateListener && googleMapsApi) {
				googleMapsApi.event.removeListener(pathUpdateListener);
			}
			polylineInstance.setMap(null);
			polylineInstance = null;
		}
	});

	$: if ($status === 'loaded' && map && !polylineInstance) {
		initializePolyline();
	}
</script>
