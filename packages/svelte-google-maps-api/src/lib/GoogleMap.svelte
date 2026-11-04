<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { getAPIContext, MapContext, setMapContext } from './internal/context.svelte.js';
	import { addListeners, latLngEquals, toLatLngLiteral } from './internal/utils.js';
	import type { MapCameraState } from './types.js';

	type MapMouseHandler = (event: google.maps.MapMouseEvent) => void;

	interface Props {
		id?: string;
		/** Map ID from the Cloud Console. Required for AdvancedMarker. Set once on creation. */
		mapId?: string;
		/** Map center. Use `bind:center` to track user panning. */
		center?: google.maps.LatLngLiteral | google.maps.LatLng;
		/** Zoom level. Use `bind:zoom` to track user zooming. */
		zoom?: number;
		heading?: number;
		tilt?: number;
		/** Set once on creation. */
		colorScheme?: google.maps.MapOptions['colorScheme'];
		/** Set once on creation. */
		renderingType?: google.maps.MapOptions['renderingType'];
		/** Any other `google.maps.MapOptions`. Applied with `setOptions()` whenever it changes. */
		options?: Omit<
			google.maps.MapOptions,
			'center' | 'zoom' | 'heading' | 'tilt' | 'mapId' | 'colorScheme' | 'renderingType'
		>;
		class?: string;
		/** Inline style for the map container. The container needs a height. */
		style?: string;
		/** The `google.maps.Map` instance. Read it with `bind:map`. */
		map?: google.maps.Map | null;
		onClick?: MapMouseHandler;
		onDblClick?: MapMouseHandler;
		onContextMenu?: MapMouseHandler;
		onMouseMove?: MapMouseHandler;
		onMouseOver?: MapMouseHandler;
		onMouseOut?: MapMouseHandler;
		onDragStart?: () => void;
		onDrag?: () => void;
		onDragEnd?: () => void;
		onIdle?: (map: google.maps.Map) => void;
		onTilesLoaded?: (map: google.maps.Map) => void;
		onBoundsChanged?: (bounds: google.maps.LatLngBoundsLiteral) => void;
		onCameraChanged?: (camera: MapCameraState) => void;
		onLoad?: (map: google.maps.Map) => void;
		children?: Snippet;
	}

	let {
		id,
		mapId,
		center = $bindable(),
		zoom = $bindable(),
		heading = $bindable(),
		tilt = $bindable(),
		colorScheme,
		renderingType,
		options,
		class: className = '',
		style = 'width:100%;height:100%;',
		map = $bindable(null),
		onClick,
		onDblClick,
		onContextMenu,
		onMouseMove,
		onMouseOver,
		onMouseOut,
		onDragStart,
		onDrag,
		onDragEnd,
		onIdle,
		onTilesLoaded,
		onBoundsChanged,
		onCameraChanged,
		onLoad,
		children
	}: Props = $props();

	const api = getAPIContext('GoogleMap');
	const context = setMapContext(new MapContext());
	let container: HTMLDivElement;

	onMount(() => {
		const { Map } = api.requireLibrary('maps');
		const instance = new Map(container, {
			...options,
			center: center ?? null,
			zoom: zoom ?? null,
			heading: heading ?? null,
			tilt: tilt ?? null,
			mapId: mapId ?? null,
			colorScheme: colorScheme ?? undefined,
			renderingType: renderingType ?? null
		});

		context.map = instance;
		map = instance;
		onLoad?.(instance);

		return () => {
			api.requireLibrary('core').event.clearInstanceListeners(instance);
			context.map = null;
		};
	});

	// Prop -> map
	$effect(() => {
		const instance = context.map;
		const next = center;
		if (!instance || !next) return;
		if (!latLngEquals(instance.getCenter(), next)) instance.setCenter(next);
	});

	$effect(() => {
		const instance = context.map;
		const next = zoom;
		if (!instance || next === undefined) return;
		if (instance.getZoom() !== next) instance.setZoom(next);
	});

	$effect(() => {
		const instance = context.map;
		const next = heading;
		if (!instance || next === undefined) return;
		if (instance.getHeading() !== next) instance.setHeading(next);
	});

	$effect(() => {
		const instance = context.map;
		const next = tilt;
		if (!instance || next === undefined) return;
		if (instance.getTilt() !== next) instance.setTilt(next);
	});

	$effect(() => {
		const instance = context.map;
		if (!instance || !options) return;
		instance.setOptions(options);
	});

	// Map -> props (two-way binding for the camera)
	$effect(() => {
		const instance = context.map;
		if (!instance) return;

		const syncCamera = () => {
			const nextCenter = toLatLngLiteral(instance.getCenter());
			const nextZoom = instance.getZoom();
			const nextHeading = instance.getHeading();
			const nextTilt = instance.getTilt();

			if (nextCenter && !latLngEquals(nextCenter, center)) center = nextCenter;
			if (nextZoom !== undefined && nextZoom !== zoom) zoom = nextZoom;
			if (nextHeading !== undefined && nextHeading !== heading) {
				heading = nextHeading;
			}
			if (nextTilt !== undefined && nextTilt !== tilt) tilt = nextTilt;

			if (onCameraChanged && nextCenter) {
				onCameraChanged({
					center: nextCenter,
					zoom: nextZoom ?? 0,
					heading: nextHeading ?? 0,
					tilt: nextTilt ?? 0
				});
			}
		};

		return addListeners(instance, {
			center_changed: syncCamera,
			zoom_changed: syncCamera,
			heading_changed: syncCamera,
			tilt_changed: syncCamera
		});
	});

	$effect(() => {
		const instance = context.map;
		if (!instance) return;

		return addListeners(instance, {
			click: onClick,
			dblclick: onDblClick,
			contextmenu: onContextMenu,
			mousemove: onMouseMove,
			mouseover: onMouseOver,
			mouseout: onMouseOut,
			dragstart: onDragStart,
			drag: onDrag,
			dragend: onDragEnd,
			idle: onIdle && (() => onIdle(instance)),
			tilesloaded: onTilesLoaded && (() => onTilesLoaded(instance)),
			bounds_changed:
				onBoundsChanged &&
				(() => {
					const bounds = instance.getBounds();
					if (bounds) onBoundsChanged(bounds.toJSON());
				})
		});
	});
</script>

<div bind:this={container} {id} class={className} {style}></div>

{#if context.map}
	{@render children?.()}
{/if}
