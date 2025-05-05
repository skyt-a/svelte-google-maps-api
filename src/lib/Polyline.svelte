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
	export let onpathchanged:
		| ((newPath: google.maps.MVCArray<google.maps.LatLng>) => void)
		| undefined = undefined;
	export let onload: ((polyline: google.maps.Polyline) => void) | undefined = undefined;
	export let onunmount: ((polyline: google.maps.Polyline) => void) | undefined = undefined;

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
			onload?.(polylineInstance);
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
				listeners.push(polylineInstance!.addListener(eventName, callback));
			}
		});

		if (onpathchanged) {
			const polylinePath = polylineInstance.getPath();
			if (polylinePath) {
				const updatePath = () => onpathchanged(polylinePath);
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
			onunmount?.(polylineInstance);
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
