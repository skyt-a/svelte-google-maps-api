<script lang="ts">
	import { onMount, untrack } from 'svelte';
	import { getAPIContext, getMap } from './internal/context.svelte.js';
	import { addListeners, definedOnly, latLngEquals, toLatLngLiteral } from './internal/utils.js';

	type MapMouseHandler = (event: google.maps.MapMouseEvent) => void;

	interface Props {
		/** Circle center. With `editable` or `draggable`, use `bind:center`. */
		center?: google.maps.LatLngLiteral | google.maps.LatLng;
		/** Radius in meters. With `editable`, use `bind:radius`. */
		radius?: number;
		strokeColor?: string;
		strokeOpacity?: number;
		strokeWeight?: number;
		strokePosition?: google.maps.StrokePosition;
		fillColor?: string;
		fillOpacity?: number;
		clickable?: boolean;
		draggable?: boolean;
		editable?: boolean;
		visible?: boolean;
		zIndex?: number;
		/** Other `google.maps.CircleOptions`. */
		options?: google.maps.CircleOptions;
		/** The `google.maps.Circle` instance. Read it with `bind:circle`. */
		circle?: google.maps.Circle | null;
		onClick?: MapMouseHandler;
		onDblClick?: MapMouseHandler;
		onContextMenu?: MapMouseHandler;
		onMouseDown?: MapMouseHandler;
		onMouseUp?: MapMouseHandler;
		onMouseOver?: MapMouseHandler;
		onMouseOut?: MapMouseHandler;
		onMouseMove?: MapMouseHandler;
		onDragStart?: MapMouseHandler;
		onDrag?: MapMouseHandler;
		onDragEnd?: MapMouseHandler;
		onCenterChanged?: (center: google.maps.LatLngLiteral) => void;
		onRadiusChanged?: (radius: number) => void;
		onLoad?: (circle: google.maps.Circle) => void;
	}

	let {
		center = $bindable(),
		radius = $bindable(),
		strokeColor,
		strokeOpacity,
		strokeWeight,
		strokePosition,
		fillColor,
		fillOpacity,
		clickable,
		draggable,
		editable,
		visible,
		zIndex,
		options,
		circle = $bindable(null),
		onClick,
		onDblClick,
		onContextMenu,
		onMouseDown,
		onMouseUp,
		onMouseOver,
		onMouseOut,
		onMouseMove,
		onDragStart,
		onDrag,
		onDragEnd,
		onCenterChanged,
		onRadiusChanged,
		onLoad
	}: Props = $props();

	const api = getAPIContext('Circle');
	const map = getMap('Circle');
	const { Circle } = api.requireLibrary('maps');
	const instance = new Circle(
		untrack(() => definedOnly({ center: center ?? undefined, radius: radius ?? undefined }))
	);

	onMount(() => {
		instance.setMap(map);
		circle = instance;
		onLoad?.(instance);

		return () => {
			api.requireLibrary('core').event.clearInstanceListeners(instance);
			instance.setMap(null);
		};
	});

	$effect(() => {
		instance.setOptions({
			...options,
			...definedOnly({
				strokeColor,
				strokeOpacity,
				strokeWeight,
				strokePosition,
				fillColor,
				fillOpacity,
				clickable,
				draggable,
				editable,
				visible,
				zIndex
			})
		});
	});

	$effect(() => {
		const next = center;
		if (next && !latLngEquals(instance.getCenter(), next)) instance.setCenter(next);
	});

	$effect(() => {
		const next = radius;
		if (next !== undefined && instance.getRadius() !== next) instance.setRadius(next);
	});

	$effect(() => {
		return addListeners(instance, {
			center_changed: () => {
				const next = toLatLngLiteral(instance.getCenter());
				if (!next) return;
				if (!latLngEquals(next, center)) center = next;
				onCenterChanged?.(next);
			},
			radius_changed: () => {
				const next = instance.getRadius();
				if (next !== radius) radius = next;
				onRadiusChanged?.(next);
			}
		});
	});

	$effect(() => {
		return addListeners(instance, {
			click: onClick,
			dblclick: onDblClick,
			contextmenu: onContextMenu,
			mousedown: onMouseDown,
			mouseup: onMouseUp,
			mouseover: onMouseOver,
			mouseout: onMouseOut,
			mousemove: onMouseMove,
			dragstart: onDragStart,
			drag: onDrag,
			dragend: onDragEnd
		});
	});
</script>
