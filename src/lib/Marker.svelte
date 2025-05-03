<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import { BROWSER as browser } from 'esm-env';
	import type { APIProviderContext } from './APIProvider.svelte';

	export let position: google.maps.LatLng | google.maps.LatLngLiteral;
	export let options: google.maps.MarkerOptions = {};

	export let onClick: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onClickableChanged: (() => void) | undefined = undefined;
	export let onCursorChanged: (() => void) | undefined = undefined;
	export let onAnimationChanged: (() => void) | undefined = undefined;
	export let onDblClick: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onDrag: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onDragEnd: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onDraggableChanged: (() => void) | undefined = undefined;
	export let onDragStart: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onFlatChanged: (() => void) | undefined = undefined;
	export let onIconChanged: (() => void) | undefined = undefined;
	export let onMouseDown: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onMouseOut: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onMouseOver: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onMouseUp: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onPositionChanged: (() => void) | undefined = undefined;
	export let onRightClick: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onShapeChanged: (() => void) | undefined = undefined;
	export let onTitleChanged: (() => void) | undefined = undefined;
	export let onVisibleChanged: (() => void) | undefined = undefined;
	export let onZindexChanged: (() => void) | undefined = undefined;
	export let onLoad: ((marker: google.maps.Marker) => void) | undefined = undefined;
	export let onUnmount: ((marker: google.maps.Marker) => void) | undefined = undefined;

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
		onLoad?.(marker);
	}

	onDestroy(() => {
		if (marker) {
			if (googleMapsApi) {
				googleMapsApi.event.clearInstanceListeners(marker);
			}
			marker.setMap(null);
			onUnmount?.(marker);
			marker = null;
		}
	});

	$: if (marker && position) {
		marker.setPosition(position);
	}

	$: if (marker && options) {
		marker.setOptions(options);
	}

	$: if (marker && onClick && googleMapsApi && browser) {
		if (clickListener) googleMapsApi.event.removeListener(clickListener);
		clickListener = googleMapsApi.event.addListener(marker, 'click', onClick);
	} else if (clickListener && googleMapsApi) {
		googleMapsApi.event.removeListener(clickListener);
		clickListener = undefined;
	}

	$: if (marker && onClickableChanged && googleMapsApi && browser) {
		if (clickableChangedListener) googleMapsApi.event.removeListener(clickableChangedListener);
		clickableChangedListener = googleMapsApi.event.addListener(
			marker,
			'clickable_changed',
			onClickableChanged
		);
	} else if (clickableChangedListener && googleMapsApi) {
		googleMapsApi.event.removeListener(clickableChangedListener);
		clickableChangedListener = undefined;
	}

	$: if (marker && onCursorChanged && googleMapsApi && browser) {
		if (cursorChangedListener) googleMapsApi.event.removeListener(cursorChangedListener);
		cursorChangedListener = googleMapsApi.event.addListener(
			marker,
			'cursor_changed',
			onCursorChanged
		);
	} else if (cursorChangedListener && googleMapsApi) {
		googleMapsApi.event.removeListener(cursorChangedListener);
		cursorChangedListener = undefined;
	}

	$: if (marker && onAnimationChanged && googleMapsApi && browser) {
		if (animationChangedListener) googleMapsApi.event.removeListener(animationChangedListener);
		animationChangedListener = googleMapsApi.event.addListener(
			marker,
			'animation_changed',
			onAnimationChanged
		);
	} else if (animationChangedListener && googleMapsApi) {
		googleMapsApi.event.removeListener(animationChangedListener);
		animationChangedListener = undefined;
	}

	$: if (marker && onDblClick && googleMapsApi && browser) {
		if (dblclickListener) googleMapsApi.event.removeListener(dblclickListener);
		dblclickListener = googleMapsApi.event.addListener(marker, 'dblclick', onDblClick);
	}

	$: if (marker && onDrag && googleMapsApi && browser) {
		if (dragListener) googleMapsApi.event.removeListener(dragListener);
		dragListener = googleMapsApi.event.addListener(marker, 'drag', onDrag);
	}

	$: if (marker && onDragEnd && googleMapsApi && browser) {
		if (dragendListener) googleMapsApi.event.removeListener(dragendListener);
		dragendListener = googleMapsApi.event.addListener(marker, 'dragend', onDragEnd);
	}

	$: if (marker && onDraggableChanged && googleMapsApi && browser) {
		if (draggableChangedListener) googleMapsApi.event.removeListener(draggableChangedListener);
		draggableChangedListener = googleMapsApi.event.addListener(
			marker,
			'draggable_changed',
			onDraggableChanged
		);
	}

	$: if (marker && onDragStart && googleMapsApi && browser) {
		if (dragstartListener) googleMapsApi.event.removeListener(dragstartListener);
		dragstartListener = googleMapsApi.event.addListener(marker, 'dragstart', onDragStart);
	}

	$: if (marker && onFlatChanged && googleMapsApi && browser) {
		if (flatChangedListener) googleMapsApi.event.removeListener(flatChangedListener);
		flatChangedListener = googleMapsApi.event.addListener(marker, 'flat_changed', onFlatChanged);
	}

	$: if (marker && onIconChanged && googleMapsApi && browser) {
		if (iconChangedListener) googleMapsApi.event.removeListener(iconChangedListener);
		iconChangedListener = googleMapsApi.event.addListener(marker, 'icon_changed', onIconChanged);
	}

	$: if (marker && onMouseDown && googleMapsApi && browser) {
		if (mousedownListener) googleMapsApi.event.removeListener(mousedownListener);
		mousedownListener = googleMapsApi.event.addListener(marker, 'mousedown', onMouseDown);
	}

	$: if (marker && onMouseOut && googleMapsApi && browser) {
		if (mouseoutListener) googleMapsApi.event.removeListener(mouseoutListener);
		mouseoutListener = googleMapsApi.event.addListener(marker, 'mouseout', onMouseOut);
	}

	$: if (marker && onMouseOver && googleMapsApi && browser) {
		if (mouseoverListener) googleMapsApi.event.removeListener(mouseoverListener);
		mouseoverListener = googleMapsApi.event.addListener(marker, 'mouseover', onMouseOver);
	}

	$: if (marker && onMouseUp && googleMapsApi && browser) {
		if (mouseupListener) googleMapsApi.event.removeListener(mouseupListener);
		mouseupListener = googleMapsApi.event.addListener(marker, 'mouseup', onMouseUp);
	}

	$: if (marker && onPositionChanged && googleMapsApi && browser) {
		if (positionChangedListener) googleMapsApi.event.removeListener(positionChangedListener);
		positionChangedListener = googleMapsApi.event.addListener(
			marker,
			'position_changed',
			onPositionChanged
		);
	}

	$: if (marker && onRightClick && googleMapsApi && browser) {
		if (rightclickListener) googleMapsApi.event.removeListener(rightclickListener);
		rightclickListener = googleMapsApi.event.addListener(marker, 'rightclick', onRightClick);
	}

	$: if (marker && onShapeChanged && googleMapsApi && browser) {
		if (shapeChangedListener) googleMapsApi.event.removeListener(shapeChangedListener);
		shapeChangedListener = googleMapsApi.event.addListener(marker, 'shape_changed', onShapeChanged);
	}

	$: if (marker && onTitleChanged && googleMapsApi && browser) {
		if (titleChangedListener) googleMapsApi.event.removeListener(titleChangedListener);
		titleChangedListener = googleMapsApi.event.addListener(marker, 'title_changed', onTitleChanged);
	}

	$: if (marker && onVisibleChanged && googleMapsApi && browser) {
		if (visibleChangedListener) googleMapsApi.event.removeListener(visibleChangedListener);
		visibleChangedListener = googleMapsApi.event.addListener(
			marker,
			'visible_changed',
			onVisibleChanged
		);
	}

	$: if (marker && onZindexChanged && googleMapsApi && browser) {
		if (zindexChangedListener) googleMapsApi.event.removeListener(zindexChangedListener);
		zindexChangedListener = googleMapsApi.event.addListener(
			marker,
			'zindex_changed',
			onZindexChanged
		);
	}
</script>

<!-- Marker does not render anything itself, it just controls the Google Maps Marker object -->
{#if marker}
	<slot />
{/if}
