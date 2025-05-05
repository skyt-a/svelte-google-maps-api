<script lang="ts">
	import { getContext, onDestroy, onMount } from 'svelte';
	import { BROWSER as browser } from 'esm-env';
	import { setContext } from 'svelte';
	import type { APIProviderContext } from './APIProvider.svelte';

	export let id: string | undefined = undefined;
	export let options: google.maps.MapOptions = {};

	export let ondblclick: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let ondragend: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let ondragstart: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onmousedown: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onmousemove: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onmouseout: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onmouseover: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onmouseup: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onrightclick: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let onclick: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let ondrag: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;
	export let oncenterchanged: ((e: google.maps.MapMouseEvent) => void) | undefined = undefined;

	export let onload: ((map: google.maps.Map) => void) | undefined = undefined;
	export let onunmount: ((map: google.maps.Map) => void) | undefined = undefined;

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

	$: if (map && ondblclick && googleMapsApi && browser) {
		if (dblclickListener !== null) {
			googleMapsApi.event.removeListener(dblclickListener);
		}
		dblclickListener = googleMapsApi.event.addListener(map, 'dblclick', ondblclick);
	}

	$: if (map && ondragend && googleMapsApi && browser) {
		if (dragendListener !== null) {
			googleMapsApi.event.removeListener(dragendListener);
		}
		dragendListener = googleMapsApi.event.addListener(map, 'dragend', ondragend);
	}

	$: if (map && ondragstart && googleMapsApi && browser) {
		if (dragstartListener !== null) {
			googleMapsApi.event.removeListener(dragstartListener);
		}
		dragstartListener = googleMapsApi.event.addListener(map, 'dragstart', ondragstart);
	}

	$: if (map && onmousedown && googleMapsApi && browser) {
		if (mousedownListener !== null) {
			googleMapsApi.event.removeListener(mousedownListener);
		}
		mousedownListener = googleMapsApi.event.addListener(map, 'mousedown', onmousedown);
	}

	$: if (map && onmousemove && googleMapsApi && browser) {
		if (mousemoveListener !== null) {
			googleMapsApi.event.removeListener(mousemoveListener);
		}
		mousemoveListener = googleMapsApi.event.addListener(map, 'mousemove', onmousemove);
	}

	$: if (map && onmouseout && googleMapsApi && browser) {
		if (mouseoutListener !== null) {
			googleMapsApi.event.removeListener(mouseoutListener);
		}
		mouseoutListener = googleMapsApi.event.addListener(map, 'mouseout', onmouseout);
	}

	$: if (map && onmouseover && googleMapsApi && browser) {
		if (mouseoverListener !== null) {
			googleMapsApi.event.removeListener(mouseoverListener);
		}
		mouseoverListener = googleMapsApi.event.addListener(map, 'mouseover', onmouseover);
	}

	$: if (map && onmouseup && googleMapsApi && browser) {
		if (mouseupListener !== null) {
			googleMapsApi.event.removeListener(mouseupListener);
		}
		mouseupListener = googleMapsApi.event.addListener(map, 'mouseup', onmouseup);
	}

	$: if (map && onrightclick && googleMapsApi && browser) {
		if (rightClickListener !== null) {
			googleMapsApi.event.removeListener(rightClickListener);
		}
		rightClickListener = googleMapsApi.event.addListener(map, 'rightclick', onrightclick);
	}

	$: if (map && onclick && googleMapsApi && browser) {
		console.log('ddddd');
		if (clickListener !== null) {
			googleMapsApi.event.removeListener(clickListener);
		}
		clickListener = googleMapsApi.event.addListener(map, 'click', onclick);
	}

	$: if (map && ondrag && googleMapsApi && browser) {
		if (dragListener !== null) {
			googleMapsApi.event.removeListener(dragListener);
		}
		dragListener = googleMapsApi.event.addListener(map, 'drag', ondrag);
	}

	$: if (map && oncenterchanged && googleMapsApi && browser) {
		if (centerChangedListener !== null) {
			googleMapsApi.event.removeListener(centerChangedListener);
		}
		centerChangedListener = googleMapsApi.event.addListener(map, 'center_changed', oncenterchanged);
	}

	const initialize = (gmaps: typeof google.maps) => {
		if (!browser || !element) return;

		map = new gmaps.Map(element, options);

		if (oncenterchanged)
			centerChangedListener = gmaps.event.addListener(map, 'center_changed', oncenterchanged);
		if (ondblclick) dblclickListener = gmaps.event.addListener(map, 'dblclick', ondblclick);
		if (ondragend) dragendListener = gmaps.event.addListener(map, 'dragend', ondragend);
		if (ondragstart) dragstartListener = gmaps.event.addListener(map, 'dragstart', ondragstart);
		if (onmousedown) mousedownListener = gmaps.event.addListener(map, 'mousedown', onmousedown);
		if (onmousemove) mousemoveListener = gmaps.event.addListener(map, 'mousemove', onmousemove);
		if (onmouseout) mouseoutListener = gmaps.event.addListener(map, 'mouseout', onmouseout);
		if (onmouseover) mouseoverListener = gmaps.event.addListener(map, 'mouseover', onmouseover);
		if (onmouseup) mouseupListener = gmaps.event.addListener(map, 'mouseup', onmouseup);
		if (onrightclick) rightClickListener = gmaps.event.addListener(map, 'rightclick', onrightclick);
		if (onclick) clickListener = gmaps.event.addListener(map, 'click', onclick);
		if (ondrag) dragListener = gmaps.event.addListener(map, 'drag', ondrag);

		onload?.(map);
		setContext('map', map);
	};
	onDestroy(() => {
		if (map !== null && googleMapsApi && browser) {
			if (onunmount) {
				onunmount(map);
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
