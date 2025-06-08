<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import { BROWSER as browser } from 'esm-env';
	import type { APIProviderContext } from './APIProvider.svelte';

	export let drawingMode: google.maps.drawing.OverlayType | null = null;
	export let drawingControlOptions: google.maps.drawing.DrawingControlOptions | undefined = undefined;
	export let circleOptions: google.maps.CircleOptions | undefined = undefined;
	export let markerOptions: google.maps.MarkerOptions | undefined = undefined;
	export let polygonOptions: google.maps.PolygonOptions | undefined = undefined;
	export let polylineOptions: google.maps.PolylineOptions | undefined = undefined;
	export let rectangleOptions: google.maps.RectangleOptions | undefined = undefined;
	export let drawingControl: boolean = true;

	export let onCircleComplete: ((circle: google.maps.Circle) => void) | undefined = undefined;
	export let onMarkerComplete: ((marker: google.maps.Marker) => void) | undefined = undefined;
	export let onOverlayComplete: ((event: google.maps.drawing.OverlayCompleteEvent) => void) | undefined = undefined;
	export let onPolygonComplete: ((polygon: google.maps.Polygon) => void) | undefined = undefined;
	export let onPolylineComplete: ((polyline: google.maps.Polyline) => void) | undefined = undefined;
	export let onRectangleComplete: ((rectangle: google.maps.Rectangle) => void) | undefined = undefined;
	export let onDrawingModeChange: (() => void) | undefined = undefined;
	export let onLoad: ((drawingManager: google.maps.drawing.DrawingManager) => void) | undefined = undefined;
	export let onUnmount: ((drawingManager: google.maps.drawing.DrawingManager) => void) | undefined = undefined;

	let circleCompleteListener: google.maps.MapsEventListener | undefined = undefined;
	let markerCompleteListener: google.maps.MapsEventListener | undefined = undefined;
	let overlayCompleteListener: google.maps.MapsEventListener | undefined = undefined;
	let polygonCompleteListener: google.maps.MapsEventListener | undefined = undefined;
	let polylineCompleteListener: google.maps.MapsEventListener | undefined = undefined;
	let rectangleCompleteListener: google.maps.MapsEventListener | undefined = undefined;
	let drawingModeChangeListener: google.maps.MapsEventListener | undefined = undefined;

	let drawingManager: google.maps.drawing.DrawingManager | null = null;
	const { status, googleMapsApi } = getContext<APIProviderContext>('svelte-google-maps-api');
	const map = getContext<google.maps.Map>('map');

	$: if ($status === 'loaded' && googleMapsApi && map && !drawingManager) {
		drawingManager = new googleMapsApi.drawing.DrawingManager({
			map: map,
			drawingMode,
			drawingControl,
			drawingControlOptions,
			circleOptions,
			markerOptions,
			polygonOptions,
			polylineOptions,
			rectangleOptions
		});
		onLoad?.(drawingManager);
	}

	onDestroy(() => {
		if (drawingManager) {
			if (googleMapsApi) {
				googleMapsApi.event.clearInstanceListeners(drawingManager);
			}
			drawingManager.setMap(null);
			onUnmount?.(drawingManager);
			drawingManager = null;
		}
	});

	$: if (drawingManager && drawingMode !== undefined) {
		drawingManager.setDrawingMode(drawingMode);
	}

	$: if (drawingManager) {
		drawingManager.setOptions({
			drawingControl,
			drawingControlOptions,
			circleOptions,
			markerOptions,
			polygonOptions,
			polylineOptions,
			rectangleOptions
		});
	}

	$: if (drawingManager && onCircleComplete && googleMapsApi && browser) {
		if (circleCompleteListener) googleMapsApi.event.removeListener(circleCompleteListener);
		circleCompleteListener = googleMapsApi.event.addListener(
			drawingManager,
			'circlecomplete',
			onCircleComplete
		);
	} else if (circleCompleteListener && googleMapsApi) {
		googleMapsApi.event.removeListener(circleCompleteListener);
		circleCompleteListener = undefined;
	}

	$: if (drawingManager && onMarkerComplete && googleMapsApi && browser) {
		if (markerCompleteListener) googleMapsApi.event.removeListener(markerCompleteListener);
		markerCompleteListener = googleMapsApi.event.addListener(
			drawingManager,
			'markercomplete',
			onMarkerComplete
		);
	} else if (markerCompleteListener && googleMapsApi) {
		googleMapsApi.event.removeListener(markerCompleteListener);
		markerCompleteListener = undefined;
	}

	$: if (drawingManager && onOverlayComplete && googleMapsApi && browser) {
		if (overlayCompleteListener) googleMapsApi.event.removeListener(overlayCompleteListener);
		overlayCompleteListener = googleMapsApi.event.addListener(
			drawingManager,
			'overlaycomplete',
			onOverlayComplete
		);
	} else if (overlayCompleteListener && googleMapsApi) {
		googleMapsApi.event.removeListener(overlayCompleteListener);
		overlayCompleteListener = undefined;
	}

	$: if (drawingManager && onPolygonComplete && googleMapsApi && browser) {
		if (polygonCompleteListener) googleMapsApi.event.removeListener(polygonCompleteListener);
		polygonCompleteListener = googleMapsApi.event.addListener(
			drawingManager,
			'polygoncomplete',
			onPolygonComplete
		);
	} else if (polygonCompleteListener && googleMapsApi) {
		googleMapsApi.event.removeListener(polygonCompleteListener);
		polygonCompleteListener = undefined;
	}

	$: if (drawingManager && onPolylineComplete && googleMapsApi && browser) {
		if (polylineCompleteListener) googleMapsApi.event.removeListener(polylineCompleteListener);
		polylineCompleteListener = googleMapsApi.event.addListener(
			drawingManager,
			'polylinecomplete',
			onPolylineComplete
		);
	} else if (polylineCompleteListener && googleMapsApi) {
		googleMapsApi.event.removeListener(polylineCompleteListener);
		polylineCompleteListener = undefined;
	}

	$: if (drawingManager && onRectangleComplete && googleMapsApi && browser) {
		if (rectangleCompleteListener) googleMapsApi.event.removeListener(rectangleCompleteListener);
		rectangleCompleteListener = googleMapsApi.event.addListener(
			drawingManager,
			'rectanglecomplete',
			onRectangleComplete
		);
	} else if (rectangleCompleteListener && googleMapsApi) {
		googleMapsApi.event.removeListener(rectangleCompleteListener);
		rectangleCompleteListener = undefined;
	}

	$: if (drawingManager && onDrawingModeChange && googleMapsApi && browser) {
		if (drawingModeChangeListener) googleMapsApi.event.removeListener(drawingModeChangeListener);
		drawingModeChangeListener = googleMapsApi.event.addListener(
			drawingManager,
			'drawingmode_changed',
			onDrawingModeChange
		);
	} else if (drawingModeChangeListener && googleMapsApi) {
		googleMapsApi.event.removeListener(drawingModeChangeListener);
		drawingModeChangeListener = undefined;
	}

	export function getDrawingManagerInstance(): google.maps.drawing.DrawingManager | null {
		return drawingManager;
	}
</script>

<!-- DrawingManager does not render anything itself, it just controls the Google Maps DrawingManager object -->