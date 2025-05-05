<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import { BROWSER as browser } from 'esm-env';
	import type { APIProviderContext } from './APIProvider.svelte';

	type PathType =
		| google.maps.MVCArray<google.maps.LatLng>
		| (google.maps.LatLng | google.maps.LatLngLiteral)[];
	type PathsType = google.maps.MVCArray<PathType> | PathType[];

	export let paths: PathsType | undefined = undefined;
	export let options: google.maps.PolygonOptions | undefined = undefined;
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
	export let onpathschanged:
		| ((newPaths: google.maps.MVCArray<google.maps.MVCArray<google.maps.LatLng>>) => void)
		| undefined = undefined;
	export let onload: ((polygon: google.maps.Polygon) => void) | undefined = undefined;
	export let onunmount: ((polygon: google.maps.Polygon) => void) | undefined = undefined;

	let polygonInstance: google.maps.Polygon | null = null;
	let listeners: google.maps.MapsEventListener[] = [];

	const { status, googleMapsApi } = getContext<APIProviderContext>('svelte-google-maps-api');
	const map = getContext<google.maps.Map>('map');

	function initializePolygon() {
		if (!browser || $status !== 'loaded' || !googleMapsApi || !map || polygonInstance) return;

		const polygonOptions: google.maps.PolygonOptions = {
			...(options ?? {}),
			map,
			paths,
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

		Object.keys(polygonOptions).forEach((key) => {
			if (polygonOptions[key as keyof typeof polygonOptions] === undefined) {
				delete polygonOptions[key as keyof typeof polygonOptions];
			}
		});

		try {
			polygonInstance = new googleMapsApi.Polygon(polygonOptions);
			onload?.(polygonInstance);
			setupListeners();
		} catch (error) {
			console.error('[Polygon] Error creating instance:', error);
		}
	}

	$: if (polygonInstance && paths) {
		polygonInstance.setPaths(paths);
	}
	$: if (polygonInstance && options) {
		polygonInstance.setOptions(options);
	} else if (polygonInstance) {
		if (draggable !== undefined) polygonInstance.setDraggable(draggable);
		if (editable !== undefined) polygonInstance.setEditable(editable);
		if (visible !== undefined) polygonInstance.setVisible(visible);
		const styleOpts: google.maps.PolygonOptions = {};
		if (fillColor !== undefined) styleOpts.fillColor = fillColor;
		if (fillOpacity !== undefined) styleOpts.fillOpacity = fillOpacity;
		if (strokeColor !== undefined) styleOpts.strokeColor = strokeColor;
		if (strokeOpacity !== undefined) styleOpts.strokeOpacity = strokeOpacity;
		if (strokeWeight !== undefined) styleOpts.strokeWeight = strokeWeight;
		if (zIndex !== undefined) styleOpts.zIndex = zIndex;
		if (Object.keys(styleOpts).length > 0) polygonInstance.setOptions(styleOpts);
	}

	function setupListeners() {
		if (!polygonInstance || !googleMapsApi) return;

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
			onrightclick: 'rightclick'
		};

		Object.entries(eventMap).forEach(([propName, eventName]) => {
			const callback = $$props[propName];
			if (callback) {
				listeners.push(polygonInstance!.addListener(eventName, callback));
			}
		});

		if (onpathschanged) {
			const polygonPaths = polygonInstance.getPaths();
			if (polygonPaths) {
				const updatePaths = () => onpathschanged(polygonPaths);

				listeners.push(googleMapsApi.event.addListener(polygonPaths, 'insert_at', updatePaths));
				listeners.push(googleMapsApi.event.addListener(polygonPaths, 'remove_at', updatePaths));
				listeners.push(googleMapsApi.event.addListener(polygonPaths, 'set_at', updatePaths));

				polygonPaths.forEach((path, index) => {
					listeners.push(googleMapsApi.event.addListener(path, 'insert_at', updatePaths));
					listeners.push(googleMapsApi.event.addListener(path, 'set_at', updatePaths));
				});
			}

			if (draggable) {
				listeners.push(
					polygonInstance!.addListener('dragend', () => onpathschanged(polygonInstance!.getPaths()))
				);
			}
		}
	}

	$: if (polygonInstance && googleMapsApi && browser) {
		setupListeners();
	}

	onDestroy(() => {
		if (polygonInstance) {
			onunmount?.(polygonInstance);
			listeners.forEach((listener) => googleMapsApi?.event.removeListener(listener));
			polygonInstance.setMap(null);
			polygonInstance = null;
		}
	});

	$: if ($status === 'loaded' && map && !polygonInstance) {
		initializePolygon();
	}
</script>

<!-- Polygon does not render any DOM element itself -->
