<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { getAPIContext, MapContext, setMapContext } from './internal/context.svelte.js';
	import { addListeners, definedOnly, latLngEquals, toLatLngLiteral } from './internal/utils.js';
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
		// Pass only the props that are set. The Maps API rejects `null` for some options
		// (e.g. `renderingType`), and unset props must not override values from `options`.
		const instance = new Map(container, {
			...options,
			...definedOnly({ center, zoom, heading, tilt, mapId, colorScheme, renderingType })
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

		// Each event syncs only its own value. These events fire synchronously while the
		// prop -> map effects run, so writing every camera value here would overwrite props
		// (e.g. a new zoom) that were changed in the same update but not yet applied.
		const notifyCamera = () => {
			const nextCenter = toLatLngLiteral(instance.getCenter());
			if (!onCameraChanged || !nextCenter) return;
			onCameraChanged({
				center: nextCenter,
				zoom: instance.getZoom() ?? 0,
				heading: instance.getHeading() ?? 0,
				tilt: instance.getTilt() ?? 0
			});
		};

		return addListeners(instance, {
			center_changed: () => {
				const next = toLatLngLiteral(instance.getCenter());
				if (next && !latLngEquals(next, center)) center = next;
				notifyCamera();
			},
			zoom_changed: () => {
				const next = instance.getZoom();
				if (next !== undefined && next !== zoom) zoom = next;
				notifyCamera();
			},
			heading_changed: () => {
				const next = instance.getHeading();
				if (next !== undefined && next !== heading) heading = next;
				notifyCamera();
			},
			tilt_changed: () => {
				const next = instance.getTilt();
				if (next !== undefined && next !== tilt) tilt = next;
				notifyCamera();
			}
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
