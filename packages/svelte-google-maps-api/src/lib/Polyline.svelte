<script lang="ts">
	import { onMount } from 'svelte';
	import { getAPIContext, getMap } from './internal/context.svelte.js';
	import {
		addListeners,
		definedOnly,
		mvcArrayToPath,
		pathEquals,
		watchMvcArray
	} from './internal/utils.js';

	type PolyMouseHandler = (event: google.maps.PolyMouseEvent) => void;
	type MapMouseHandler = (event: google.maps.MapMouseEvent) => void;

	interface Props {
		/** Vertices of the line. With `editable` or `draggable`, use `bind:path` to track edits. */
		path?: google.maps.LatLngLiteral[];
		strokeColor?: string;
		strokeOpacity?: number;
		strokeWeight?: number;
		geodesic?: boolean;
		clickable?: boolean;
		draggable?: boolean;
		editable?: boolean;
		visible?: boolean;
		zIndex?: number;
		icons?: google.maps.IconSequence[];
		/** Other `google.maps.PolylineOptions`. */
		options?: google.maps.PolylineOptions;
		/** The `google.maps.Polyline` instance. Read it with `bind:polyline`. */
		polyline?: google.maps.Polyline | null;
		onClick?: PolyMouseHandler;
		onDblClick?: PolyMouseHandler;
		onContextMenu?: PolyMouseHandler;
		onMouseDown?: PolyMouseHandler;
		onMouseUp?: PolyMouseHandler;
		onMouseOver?: PolyMouseHandler;
		onMouseOut?: PolyMouseHandler;
		onMouseMove?: PolyMouseHandler;
		onDragStart?: MapMouseHandler;
		onDrag?: MapMouseHandler;
		onDragEnd?: MapMouseHandler;
		/** Called after the user edits or drags the line. */
		onPathChanged?: (path: google.maps.LatLngLiteral[]) => void;
		onLoad?: (polyline: google.maps.Polyline) => void;
	}

	let {
		path = $bindable(),
		strokeColor,
		strokeOpacity,
		strokeWeight,
		geodesic,
		clickable,
		draggable,
		editable,
		visible,
		zIndex,
		icons,
		options,
		polyline = $bindable(null),
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
		onPathChanged,
		onLoad
	}: Props = $props();

	const api = getAPIContext('Polyline');
	const map = getMap('Polyline');
	const { Polyline } = api.requireLibrary('maps');
	const instance = new Polyline({ path: path ?? [] });

	onMount(() => {
		instance.setMap(map);
		polyline = instance;
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
				geodesic,
				clickable,
				draggable,
				editable,
				visible,
				zIndex,
				icons
			})
		});
	});

	$effect(() => {
		const next = path;
		if (next && !pathEquals(mvcArrayToPath(instance.getPath()), next)) {
			instance.setPath(next);
		}

		const mvcPath = instance.getPath();
		return watchMvcArray(mvcPath, () => {
			const updated = mvcArrayToPath(mvcPath);
			path = updated;
			onPathChanged?.(updated);
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
