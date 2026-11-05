<script lang="ts">
	import { onMount, untrack } from 'svelte';
	import { getAPIContext, getMap } from './internal/context.svelte.js';
	import { addListeners, boundsEquals, definedOnly, toBoundsLiteral } from './internal/utils.js';

	type MapMouseHandler = (event: google.maps.MapMouseEvent) => void;

	interface Props {
		/** Rectangle bounds. With `editable` or `draggable`, use `bind:bounds`. */
		bounds?: google.maps.LatLngBoundsLiteral | google.maps.LatLngBounds;
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
		/** Other `google.maps.RectangleOptions`. */
		options?: google.maps.RectangleOptions;
		/** The `google.maps.Rectangle` instance. Read it with `bind:rectangle`. */
		rectangle?: google.maps.Rectangle | null;
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
		onBoundsChanged?: (bounds: google.maps.LatLngBoundsLiteral) => void;
		onLoad?: (rectangle: google.maps.Rectangle) => void;
	}

	let {
		bounds = $bindable(),
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
		rectangle = $bindable(null),
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
		onBoundsChanged,
		onLoad
	}: Props = $props();

	const api = getAPIContext('Rectangle');
	const map = getMap('Rectangle');
	const { Rectangle } = api.requireLibrary('maps');
	const instance = new Rectangle(untrack(() => (bounds ? { bounds } : {})));

	onMount(() => {
		instance.setMap(map);
		rectangle = instance;
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
		const next = bounds;
		if (next && !boundsEquals(instance.getBounds(), next)) instance.setBounds(next);
	});

	$effect(() => {
		return addListeners(instance, {
			bounds_changed: () => {
				const next = toBoundsLiteral(instance.getBounds());
				if (!next) return;
				if (!boundsEquals(next, bounds)) bounds = next;
				onBoundsChanged?.(next);
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
