<script lang="ts">
	import { isReady } from '$lib/store.js';
	import { onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	export let id: string;
	export let options: google.maps.MapOptions = {};

	export let onDblClick: (e: google.maps.MapMouseEvent) => void;
	export let onDragEnd: (e: google.maps.MapMouseEvent) => void;
	export let onDragStart: (e: google.maps.MapMouseEvent) => void;
	export let onMouseDown: (e: google.maps.MapMouseEvent) => void;
	export let onMouseMove: (e: google.maps.MapMouseEvent) => void;
	export let onMouseOut: (e: google.maps.MapMouseEvent) => void;
	export let onMouseOver: (e: google.maps.MapMouseEvent) => void;
	export let onMouseUp: (e: google.maps.MapMouseEvent) => void;
	export let onRightClick: (e: google.maps.MapMouseEvent) => void;
	export let onClick: (e: google.maps.MapMouseEvent) => void;
	export let onDrag: (e: google.maps.MapMouseEvent) => void;
	export let onCenterChanged: (e: google.maps.MapMouseEvent) => void;

	export let onLoad: (map: google.maps.Map) => void;
	export let onUnmount: (map: google.maps.Map) => void;

	export let mapContainerStyle: string = 'width:100%;height:100%';
	export let mapContainerClassName: string;

	let element: HTMLElement | null = null;
	let map: google.maps.Map | null = null;

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

	$: if (map && onDblClick && browser) {
		if (dblclickListener !== null) {
			google.maps.event.removeListener(dblclickListener);
		}
		dblclickListener = google.maps.event.addListener(map, 'dblclick', onDblClick);
	}

	$: if (map && onDragEnd && browser) {
		if (dragendListener !== null) {
			google.maps.event.removeListener(dragendListener);
		}
		dragendListener = google.maps.event.addListener(map, 'dragend', onDragEnd);
	}

	$: if (map && onDragStart && browser) {
		if (dragstartListener !== null) {
			google.maps.event.removeListener(dragstartListener);
		}
		dragstartListener = google.maps.event.addListener(map, 'dragstart', onDragStart);
	}

	$: if (map && onMouseDown && browser) {
		if (mousedownListener !== null) {
			google.maps.event.removeListener(mousedownListener);
		}
		mousedownListener = google.maps.event.addListener(map, 'mousedown', onMouseDown);
	}

	$: if (map && onMouseMove && browser) {
		if (mousemoveListener !== null) {
			google.maps.event.removeListener(mousemoveListener);
		}
		mousemoveListener = google.maps.event.addListener(map, 'mousemove', onMouseMove);
	}

	$: if (map && onMouseOut && browser) {
		if (mouseoutListener !== null) {
			google.maps.event.removeListener(mouseoutListener);
		}
		mouseoutListener = google.maps.event.addListener(map, 'mouseout', onMouseOut);
	}

	$: if (map && onMouseOver && browser) {
		if (mouseoverListener !== null) {
			google.maps.event.removeListener(mouseoverListener);
		}
		mouseoverListener = google.maps.event.addListener(map, 'mouseover', onMouseOver);
	}

	$: if (map && onMouseUp && browser) {
		if (mouseupListener !== null) {
			google.maps.event.removeListener(mouseupListener);
		}
		mouseupListener = google.maps.event.addListener(map, 'mouseup', onMouseUp);
	}

	$: if (map && onRightClick && browser) {
		if (rightClickListener !== null) {
			google.maps.event.removeListener(rightClickListener);
		}
		rightClickListener = google.maps.event.addListener(map, 'rightclick', onRightClick);
	}

	$: if (map && onClick && browser) {
		console.log('ddddd');
		if (clickListener !== null) {
			google.maps.event.removeListener(clickListener);
		}
		clickListener = google.maps.event.addListener(map, 'click', onClick);
	}

	$: if (map && onDrag && browser) {
		if (dragListener !== null) {
			google.maps.event.removeListener(dragListener);
		}
		dragListener = google.maps.event.addListener(map, 'drag', onDrag);
	}

	$: if (map && onCenterChanged && browser) {
		if (centerChangedListener !== null) {
			google.maps.event.removeListener(centerChangedListener);
		}
		centerChangedListener = google.maps.event.addListener(map, 'center_changed', onCenterChanged);
	}

	const initialize = () => {
		if (!browser) return;
		if (!element) {
			throw new Error('map element is not found');
		}
		const google = window.google;
		map = new google.maps.Map(element, options);

		// initialize event listeners
		centerChangedListener =
			onCenterChanged && google.maps.event.addListener(map, 'center_changed', onCenterChanged);
		dblclickListener = onDblClick && google.maps.event.addListener(map, 'dblclick', onDblClick);
		dragendListener = onDragEnd && google.maps.event.addListener(map, 'dragend', onDragEnd);
		dragstartListener = onDragStart && google.maps.event.addListener(map, 'dragstart', onDragStart);
		mousedownListener = onMouseDown && google.maps.event.addListener(map, 'mousedown', onMouseDown);
		mousemoveListener = onMouseMove && google.maps.event.addListener(map, 'mousemove', onMouseMove);
		mouseoutListener = onMouseOut && google.maps.event.addListener(map, 'mouseout', onMouseOut);
		mouseoverListener = onMouseOver && google.maps.event.addListener(map, 'mouseover', onMouseOver);
		mouseupListener = onMouseUp && google.maps.event.addListener(map, 'mouseup', onMouseUp);
		rightClickListener =
			onRightClick && google.maps.event.addListener(map, 'rightclick', onRightClick);
		clickListener = onClick && google.maps.event.addListener(map, 'click', onClick);
		dragListener = onDrag && google.maps.event.addListener(map, 'drag', onDrag);

		onLoad?.(map);
	};
	onDestroy(() => {
		if (map !== null && browser) {
			if (onUnmount) {
				onUnmount(map);
			}
			const google = window.google;
			google.maps.event.clearInstanceListeners(map);
		}
	});

	isReady.subscribe((value) => {
		if (value) {
			initialize();
		}
	});
</script>

<div bind:this={element} {id} style={mapContainerStyle} class={mapContainerClassName}>
	{#if map}
		<slot />
	{/if}
</div>
