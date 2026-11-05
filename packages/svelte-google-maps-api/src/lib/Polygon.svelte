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
	type Paths = google.maps.LatLngLiteral[] | google.maps.LatLngLiteral[][];

	interface Props {
		/**
		 * A single ring, or an array of rings (outer boundary first, then holes).
		 * With `editable` or `draggable`, use `bind:paths` to track edits.
		 */
		paths?: Paths;
		strokeColor?: string;
		strokeOpacity?: number;
		strokeWeight?: number;
		strokePosition?: google.maps.StrokePosition;
		fillColor?: string;
		fillOpacity?: number;
		geodesic?: boolean;
		clickable?: boolean;
		draggable?: boolean;
		editable?: boolean;
		visible?: boolean;
		zIndex?: number;
		/** Other `google.maps.PolygonOptions`. */
		options?: google.maps.PolygonOptions;
		/** The `google.maps.Polygon` instance. Read it with `bind:polygon`. */
		polygon?: google.maps.Polygon | null;
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
		/** Called after the user edits or drags the polygon. Always receives an array of rings. */
		onPathsChanged?: (paths: google.maps.LatLngLiteral[][]) => void;
		onLoad?: (polygon: google.maps.Polygon) => void;
	}

	let {
		paths = $bindable(),
		strokeColor,
		strokeOpacity,
		strokeWeight,
		strokePosition,
		fillColor,
		fillOpacity,
		geodesic,
		clickable,
		draggable,
		editable,
		visible,
		zIndex,
		options,
		polygon = $bindable(null),
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
		onPathsChanged,
		onLoad
	}: Props = $props();

	const api = getAPIContext('Polygon');
	const map = getMap('Polygon');
	const { Polygon } = api.requireLibrary('maps');
	const instance = new Polygon({ paths: paths ?? [] });

	function toRings(value: Paths): google.maps.LatLngLiteral[][] {
		if (value.length === 0) return [];
		return Array.isArray(value[0])
			? (value as google.maps.LatLngLiteral[][])
			: [value as google.maps.LatLngLiteral[]];
	}

	function readRings(): google.maps.LatLngLiteral[][] {
		return instance
			.getPaths()
			.getArray()
			.map((ring) => mvcArrayToPath(ring));
	}

	function ringsEqual(a: google.maps.LatLngLiteral[][], b: google.maps.LatLngLiteral[][]) {
		return a.length === b.length && a.every((ring, index) => pathEquals(ring, b[index]));
	}

	onMount(() => {
		instance.setMap(map);
		polygon = instance;
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
				geodesic,
				clickable,
				draggable,
				editable,
				visible,
				zIndex
			})
		});
	});

	$effect(() => {
		const next = paths;
		if (next && !ringsEqual(readRings(), toRings(next))) {
			instance.setPaths(next);
		}

		const outer = instance.getPaths();
		const sync = () => {
			const updated = readRings();
			const isNested = Array.isArray(paths?.[0]) || updated.length !== 1;
			paths = isNested ? updated : updated[0];
			onPathsChanged?.(updated);
		};

		const cleanups = [
			watchMvcArray(outer as google.maps.MVCArray<unknown>, sync),
			...outer.getArray().map((ring) => watchMvcArray(ring as google.maps.MVCArray<unknown>, sync))
		];
		return () => cleanups.forEach((cleanup) => cleanup());
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
