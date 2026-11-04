<script lang="ts">
	import { untrack } from 'svelte';
	import { getAPIContext, getMap } from './internal/context.svelte.js';
	import { addListeners } from './internal/utils.js';

	type MapMouseHandler = (event: google.maps.MapMouseEvent) => void;

	interface Props {
		/** Image URL. Changing it recreates the overlay. */
		url: string;
		/** Image bounds. Changing them recreates the overlay. */
		bounds: google.maps.LatLngBoundsLiteral | google.maps.LatLngBounds;
		opacity?: number;
		clickable?: boolean;
		/** The `google.maps.GroundOverlay` instance. Read it with `bind:groundOverlay`. */
		groundOverlay?: google.maps.GroundOverlay | null;
		onClick?: MapMouseHandler;
		onDblClick?: MapMouseHandler;
		onLoad?: (groundOverlay: google.maps.GroundOverlay) => void;
	}

	let {
		url,
		bounds,
		opacity,
		clickable,
		groundOverlay = $bindable(null),
		onClick,
		onDblClick,
		onLoad
	}: Props = $props();

	const api = getAPIContext('GroundOverlay');
	const map = getMap('GroundOverlay');
	const { GroundOverlay } = api.requireLibrary('maps');
	let instance = $state.raw<google.maps.GroundOverlay | null>(null);

	$effect(() => {
		const overlay = new GroundOverlay(url, bounds, {
			clickable: untrack(() => clickable) ?? true,
			opacity: untrack(() => opacity) ?? 1
		});
		overlay.setMap(map);
		instance = overlay;
		groundOverlay = overlay;
		untrack(() => onLoad)?.(overlay);

		return () => {
			api.requireLibrary('core').event.clearInstanceListeners(overlay);
			overlay.setMap(null);
		};
	});

	$effect(() => {
		if (instance && opacity !== undefined) instance.setOpacity(opacity);
	});

	$effect(() => {
		if (!instance) return;
		return addListeners(instance, { click: onClick, dblclick: onDblClick });
	});
</script>
