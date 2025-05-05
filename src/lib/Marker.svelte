<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import { BROWSER as browser } from 'esm-env';
	import type { APIProviderContext } from './APIProvider.svelte';

	export let position: google.maps.LatLng | google.maps.LatLngLiteral;
	export let options: google.maps.MarkerOptions = {};

	export let onclick: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onclickablechanged: (() => void) | undefined = undefined;
	export let oncursorchanged: (() => void) | undefined = undefined;
	export let onanimationchanged: (() => void) | undefined = undefined;
	export let ondblclick: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let ondrag: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let ondragend: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let ondraggablechanged: (() => void) | undefined = undefined;
	export let ondragstart: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onflatchanged: (() => void) | undefined = undefined;
	export let oniconchanged: (() => void) | undefined = undefined;
	export let onmousedown: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onmouseout: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onmouseover: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onmouseup: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onpositionchanged: (() => void) | undefined = undefined;
	export let onrightclick: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onshapechanged: (() => void) | undefined = undefined;
	export let ontitlechanged: (() => void) | undefined = undefined;
	export let onvisiblechanged: (() => void) | undefined = undefined;
	export let onzindexchanged: (() => void) | undefined = undefined;
	export let onload: ((marker: google.maps.Marker) => void) | undefined = undefined;
	export let onunmount: ((marker: google.maps.Marker) => void) | undefined = undefined;

	let clickListener: google.maps.MapsEventListener | undefined = undefined;
	let clickableChangedListener: google.maps.MapsEventListener | undefined = undefined;
	let cursorChangedListener: google.maps.MapsEventListener | undefined = undefined;
	let animationChangedListener: google.maps.MapsEventListener | undefined = undefined;
	let dblclickListener: google.maps.MapsEventListener | undefined = undefined;
	let dragListener: google.maps.MapsEventListener | undefined = undefined;
	let dragendListener: google.maps.MapsEventListener | undefined = undefined;
	let draggableChangedListener: google.maps.MapsEventListener | undefined = undefined;
	let dragstartListener: google.maps.MapsEventListener | undefined = undefined;
	let flatChangedListener: google.maps.MapsEventListener | undefined = undefined;
	let iconChangedListener: google.maps.MapsEventListener | undefined = undefined;
	let mousedownListener: google.maps.MapsEventListener | undefined = undefined;
	let mouseoutListener: google.maps.MapsEventListener | undefined = undefined;
	let mouseoverListener: google.maps.MapsEventListener | undefined = undefined;
	let mouseupListener: google.maps.MapsEventListener | undefined = undefined;
	let positionChangedListener: google.maps.MapsEventListener | undefined = undefined;
	let rightclickListener: google.maps.MapsEventListener | undefined = undefined;
	let shapeChangedListener: google.maps.MapsEventListener | undefined = undefined;
	let titleChangedListener: google.maps.MapsEventListener | undefined = undefined;
	let visibleChangedListener: google.maps.MapsEventListener | undefined = undefined;
	let zindexChangedListener: google.maps.MapsEventListener | undefined = undefined;

	let marker: google.maps.Marker | null = null;
	const { status, googleMapsApi } = getContext<APIProviderContext>('svelte-google-maps-api');
	const map = getContext<google.maps.Map>('map');

	$: if ($status === 'loaded' && googleMapsApi && map && position && !marker) {
		marker = new googleMapsApi.Marker({
			position,
			map: map,
			...options
		});
		onload?.(marker);
	}

	onDestroy(() => {
		if (marker) {
			if (googleMapsApi) {
				googleMapsApi.event.clearInstanceListeners(marker);
			}
			marker.setMap(null);
			onunmount?.(marker);
			marker = null;
		}
	});

	$: if (marker && position) {
		marker.setPosition(position);
	}

	$: if (marker && options) {
		marker.setOptions(options);
	}

	$: if (marker && onclick && googleMapsApi && browser) {
		if (clickListener) googleMapsApi.event.removeListener(clickListener);
		clickListener = googleMapsApi.event.addListener(marker, 'click', onclick);
	} else if (clickListener && googleMapsApi) {
		googleMapsApi.event.removeListener(clickListener);
		clickListener = undefined;
	}

	$: if (marker && onclickablechanged && googleMapsApi && browser) {
		if (clickableChangedListener) googleMapsApi.event.removeListener(clickableChangedListener);
		clickableChangedListener = googleMapsApi.event.addListener(
			marker,
			'clickable_changed',
			onclickablechanged
		);
	} else if (clickableChangedListener && googleMapsApi) {
		googleMapsApi.event.removeListener(clickableChangedListener);
		clickableChangedListener = undefined;
	}

	$: if (marker && oncursorchanged && googleMapsApi && browser) {
		if (cursorChangedListener) googleMapsApi.event.removeListener(cursorChangedListener);
		cursorChangedListener = googleMapsApi.event.addListener(
			marker,
			'cursor_changed',
			oncursorchanged
		);
	} else if (cursorChangedListener && googleMapsApi) {
		googleMapsApi.event.removeListener(cursorChangedListener);
		cursorChangedListener = undefined;
	}

	$: if (marker && onanimationchanged && googleMapsApi && browser) {
		if (animationChangedListener) googleMapsApi.event.removeListener(animationChangedListener);
		animationChangedListener = googleMapsApi.event.addListener(
			marker,
			'animation_changed',
			onanimationchanged
		);
	} else if (animationChangedListener && googleMapsApi) {
		googleMapsApi.event.removeListener(animationChangedListener);
		animationChangedListener = undefined;
	}

	$: if (marker && ondblclick && googleMapsApi && browser) {
		if (dblclickListener) googleMapsApi.event.removeListener(dblclickListener);
		dblclickListener = googleMapsApi.event.addListener(marker, 'dblclick', ondblclick);
	}

	$: if (marker && ondrag && googleMapsApi && browser) {
		if (dragListener) googleMapsApi.event.removeListener(dragListener);
		dragListener = googleMapsApi.event.addListener(marker, 'drag', ondrag);
	}

	$: if (marker && ondragend && googleMapsApi && browser) {
		if (dragendListener) googleMapsApi.event.removeListener(dragendListener);
		dragendListener = googleMapsApi.event.addListener(marker, 'dragend', ondragend);
	}

	$: if (marker && ondraggablechanged && googleMapsApi && browser) {
		if (draggableChangedListener) googleMapsApi.event.removeListener(draggableChangedListener);
		draggableChangedListener = googleMapsApi.event.addListener(
			marker,
			'draggable_changed',
			ondraggablechanged
		);
	}

	$: if (marker && ondragstart && googleMapsApi && browser) {
		if (dragstartListener) googleMapsApi.event.removeListener(dragstartListener);
		dragstartListener = googleMapsApi.event.addListener(marker, 'dragstart', ondragstart);
	}

	$: if (marker && onflatchanged && googleMapsApi && browser) {
		if (flatChangedListener) googleMapsApi.event.removeListener(flatChangedListener);
		flatChangedListener = googleMapsApi.event.addListener(marker, 'flat_changed', onflatchanged);
	}

	$: if (marker && oniconchanged && googleMapsApi && browser) {
		if (iconChangedListener) googleMapsApi.event.removeListener(iconChangedListener);
		iconChangedListener = googleMapsApi.event.addListener(marker, 'icon_changed', oniconchanged);
	}

	$: if (marker && onmousedown && googleMapsApi && browser) {
		if (mousedownListener) googleMapsApi.event.removeListener(mousedownListener);
		mousedownListener = googleMapsApi.event.addListener(marker, 'mousedown', onmousedown);
	}

	$: if (marker && onmouseout && googleMapsApi && browser) {
		if (mouseoutListener) googleMapsApi.event.removeListener(mouseoutListener);
		mouseoutListener = googleMapsApi.event.addListener(marker, 'mouseout', onmouseout);
	}

	$: if (marker && onmouseover && googleMapsApi && browser) {
		if (mouseoverListener) googleMapsApi.event.removeListener(mouseoverListener);
		mouseoverListener = googleMapsApi.event.addListener(marker, 'mouseover', onmouseover);
	}

	$: if (marker && onmouseup && googleMapsApi && browser) {
		if (mouseupListener) googleMapsApi.event.removeListener(mouseupListener);
		mouseupListener = googleMapsApi.event.addListener(marker, 'mouseup', onmouseup);
	}

	$: if (marker && onpositionchanged && googleMapsApi && browser) {
		if (positionChangedListener) googleMapsApi.event.removeListener(positionChangedListener);
		positionChangedListener = googleMapsApi.event.addListener(
			marker,
			'position_changed',
			onpositionchanged
		);
	}

	$: if (marker && onrightclick && googleMapsApi && browser) {
		if (rightclickListener) googleMapsApi.event.removeListener(rightclickListener);
		rightclickListener = googleMapsApi.event.addListener(marker, 'rightclick', onrightclick);
	}

	$: if (marker && onshapechanged && googleMapsApi && browser) {
		if (shapeChangedListener) googleMapsApi.event.removeListener(shapeChangedListener);
		shapeChangedListener = googleMapsApi.event.addListener(marker, 'shape_changed', onshapechanged);
	}

	$: if (marker && ontitlechanged && googleMapsApi && browser) {
		if (titleChangedListener) googleMapsApi.event.removeListener(titleChangedListener);
		titleChangedListener = googleMapsApi.event.addListener(marker, 'title_changed', ontitlechanged);
	}

	$: if (marker && onvisiblechanged && googleMapsApi && browser) {
		if (visibleChangedListener) googleMapsApi.event.removeListener(visibleChangedListener);
		visibleChangedListener = googleMapsApi.event.addListener(
			marker,
			'visible_changed',
			onvisiblechanged
		);
	}

	$: if (marker && onzindexchanged && googleMapsApi && browser) {
		if (zindexChangedListener) googleMapsApi.event.removeListener(zindexChangedListener);
		zindexChangedListener = googleMapsApi.event.addListener(
			marker,
			'zindex_changed',
			onzindexchanged
		);
	}

	export function getMarkerInstance(): google.maps.Marker | null {
		return marker;
	}
</script>

<!-- Marker does not render anything itself, it just controls the Google Maps Marker object -->
{#if marker}
	<slot />
{/if}
