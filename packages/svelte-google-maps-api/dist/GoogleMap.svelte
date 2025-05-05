<script lang="ts">
	import { getContext, onDestroy, onMount } from 'svelte';
	import { BROWSER as browser } from 'esm-env';
	import { setContext } from 'svelte';
	import type { APIProviderContext } from './APIProvider.svelte';

	export let id: string | undefined = undefined;
	export let options: google.maps.MapOptions = {};

	export let onDblClick: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onDragEnd: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onDragStart: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onMouseDown: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onMouseMove: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onMouseOut: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onMouseOver: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onMouseUp: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onRightClick: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onClick: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onDrag: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onCenterChanged: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;

	export let onLoad: ((map: google.maps.Map) => void) | undefined = undefined;
	export let onUnmount: ((map: google.maps.Map) => void) | undefined = undefined;

	export let mapContainerStyle: string = 'width:100%;height:100%';
	export let mapContainerClassName: string = '';

	let element: HTMLElement | null = null;
	let map: google.maps.Map | null = null;

	const { status, googleMapsApi } = getContext<APIProviderContext>('svelte-google-maps-api');

	let dblclickListener: google.maps.MapsEventListener | null = null;
	let dragendListener: google.maps.MapsEventListener | null = null;
	let dragstartListener: google.maps.MapsEventListener | null = null;
	let mousedownListener: google.maps.MapsEventListener | null = null;
	let mousemoveListener: google.maps.MapsEventListener | null = null;
	let mouseoutListener: google.maps.MapsEventListener | null = null;
	let mouseoverListener: google.maps.MapsEventListener | null = null;
	let mouseupListener: google.maps.MapsEventListener | null = null;
	let rightClickListener: google.maps.MapsEventListener | null = null;
	let clickListener: google.maps.MapsEventListener | null = null;
	let dragListener: google.maps.MapsEventListener | null = null;
	let centerChangedListener: google.maps.MapsEventListener | null = null;

	$: if (map && onDblClick && googleMapsApi && browser) {
		if (dblclickListener !== null) {
			googleMapsApi.event.removeListener(dblclickListener);
		}
		dblclickListener = googleMapsApi.event.addListener(map, 'dblclick', onDblClick);
	}

	$: if (map && onDragEnd && googleMapsApi && browser) {
		if (dragendListener !== null) {
			googleMapsApi.event.removeListener(dragendListener);
		}
		dragendListener = googleMapsApi.event.addListener(map, 'dragend', onDragEnd);
	}

	$: if (map && onDragStart && googleMapsApi && browser) {
		if (dragstartListener !== null) {
			googleMapsApi.event.removeListener(dragstartListener);
		}
		dragstartListener = googleMapsApi.event.addListener(map, 'dragstart', onDragStart);
	}

	$: if (map && onMouseDown && googleMapsApi && browser) {
		if (mousedownListener !== null) {
			googleMapsApi.event.removeListener(mousedownListener);
		}
		mousedownListener = googleMapsApi.event.addListener(map, 'mousedown', onMouseDown);
	}

	$: if (map && onMouseMove && googleMapsApi && browser) {
		if (mousemoveListener !== null) {
			googleMapsApi.event.removeListener(mousemoveListener);
		}
		mousemoveListener = googleMapsApi.event.addListener(map, 'mousemove', onMouseMove);
	}

	$: if (map && onMouseOut && googleMapsApi && browser) {
		if (mouseoutListener !== null) {
			googleMapsApi.event.removeListener(mouseoutListener);
		}
		mouseoutListener = googleMapsApi.event.addListener(map, 'mouseout', onMouseOut);
	}

	$: if (map && onMouseOver && googleMapsApi && browser) {
		if (mouseoverListener !== null) {
			googleMapsApi.event.removeListener(mouseoverListener);
		}
		mouseoverListener = googleMapsApi.event.addListener(map, 'mouseover', onMouseOver);
	}

	$: if (map && onMouseUp && googleMapsApi && browser) {
		if (mouseupListener !== null) {
			googleMapsApi.event.removeListener(mouseupListener);
		}
		mouseupListener = googleMapsApi.event.addListener(map, 'mouseup', onMouseUp);
	}

	$: if (map && onRightClick && googleMapsApi && browser) {
		if (rightClickListener !== null) {
			googleMapsApi.event.removeListener(rightClickListener);
		}
		rightClickListener = googleMapsApi.event.addListener(map, 'rightclick', onRightClick);
	}

	$: if (map && onClick && googleMapsApi && browser) {
		console.log('ddddd');
		if (clickListener !== null) {
			googleMapsApi.event.removeListener(clickListener);
		}
		clickListener = googleMapsApi.event.addListener(map, 'click', onClick);
	}

	$: if (map && onDrag && googleMapsApi && browser) {
		if (dragListener !== null) {
			googleMapsApi.event.removeListener(dragListener);
		}
		dragListener = googleMapsApi.event.addListener(map, 'drag', onDrag);
	}

	$: if (map && onCenterChanged && googleMapsApi && browser) {
		if (centerChangedListener !== null) {
			googleMapsApi.event.removeListener(centerChangedListener);
		}
		centerChangedListener = googleMapsApi.event.addListener(map, 'center_changed', onCenterChanged);
	}

	const initialize = (gmaps: typeof google.maps) => {
		if (!browser || !element) return;

		map = new gmaps.Map(element, options);

		if (onCenterChanged)
			centerChangedListener = gmaps.event.addListener(map, 'center_changed', onCenterChanged);
		if (onDblClick) dblclickListener = gmaps.event.addListener(map, 'dblclick', onDblClick);
		if (onDragEnd) dragendListener = gmaps.event.addListener(map, 'dragend', onDragEnd);
		if (onDragStart) dragstartListener = gmaps.event.addListener(map, 'dragstart', onDragStart);
		if (onMouseDown) mousedownListener = gmaps.event.addListener(map, 'mousedown', onMouseDown);
		if (onMouseMove) mousemoveListener = gmaps.event.addListener(map, 'mousemove', onMouseMove);
		if (onMouseOut) mouseoutListener = gmaps.event.addListener(map, 'mouseout', onMouseOut);
		if (onMouseOver) mouseoverListener = gmaps.event.addListener(map, 'mouseover', onMouseOver);
		if (onMouseUp) mouseupListener = gmaps.event.addListener(map, 'mouseup', onMouseUp);
		if (onRightClick) rightClickListener = gmaps.event.addListener(map, 'rightclick', onRightClick);
		if (onClick) clickListener = gmaps.event.addListener(map, 'click', onClick);
		if (onDrag) dragListener = gmaps.event.addListener(map, 'drag', onDrag);

		onLoad?.(map);
		setContext('map', map);
	};
	onDestroy(() => {
		if (map !== null && googleMapsApi && browser) {
			if (onUnmount) {
				onUnmount(map);
			}
			googleMapsApi.event.clearInstanceListeners(map);
		}
	});

	$: if ($status === 'loaded' && googleMapsApi && element && !map) {
		initialize(googleMapsApi);
	}
</script>

<div bind:this={element} {id} style={mapContainerStyle} class={mapContainerClassName}>
	{#if $status === 'loading'}
		<slot name="loading">
			<!-- Optional: Display loading indicator -->
		</slot>
	{:else if $status === 'error'}
		<slot name="error">
			<!-- Optional: Display error message -->
			<p style="color: red;">Error loading map.</p>
		</slot>
	{:else if map}
		<slot />
	{/if}
</div>
