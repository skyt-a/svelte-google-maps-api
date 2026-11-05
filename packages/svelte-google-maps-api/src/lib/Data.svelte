<script lang="ts">
	import { onMount, untrack } from 'svelte';
	import { getAPIContext, getMap } from './internal/context.svelte.js';
	import { addListeners } from './internal/utils.js';

	type DataMouseHandler = (event: google.maps.Data.MouseEvent) => void;

	interface Props {
		/** GeoJSON object to add. Replacing it removes the previous features. */
		geoJson?: object;
		/** URL of a GeoJSON file to load. Changing it removes the previous features. */
		url?: string;
		/** Property used as the feature ID. */
		idPropertyName?: string;
		style?: google.maps.Data.StylingFunction | google.maps.Data.StyleOptions;
		/** Other `google.maps.Data.DataOptions` (controls, drawing mode, ...). Set once on creation. */
		options?: Omit<google.maps.Data.DataOptions, 'map' | 'style'>;
		/** The `google.maps.Data` instance. Read it with `bind:data`. */
		data?: google.maps.Data | null;
		onClick?: DataMouseHandler;
		onDblClick?: DataMouseHandler;
		onContextMenu?: DataMouseHandler;
		onMouseDown?: DataMouseHandler;
		onMouseUp?: DataMouseHandler;
		onMouseOver?: DataMouseHandler;
		onMouseOut?: DataMouseHandler;
		onAddFeature?: (event: google.maps.Data.AddFeatureEvent) => void;
		onRemoveFeature?: (event: google.maps.Data.RemoveFeatureEvent) => void;
		onSetGeometry?: (event: google.maps.Data.SetGeometryEvent) => void;
		onSetProperty?: (event: google.maps.Data.SetPropertyEvent) => void;
		onRemoveProperty?: (event: google.maps.Data.RemovePropertyEvent) => void;
		onLoad?: (data: google.maps.Data) => void;
	}

	let {
		geoJson,
		url,
		idPropertyName,
		style,
		options,
		data = $bindable(null),
		onClick,
		onDblClick,
		onContextMenu,
		onMouseDown,
		onMouseUp,
		onMouseOver,
		onMouseOut,
		onAddFeature,
		onRemoveFeature,
		onSetGeometry,
		onSetProperty,
		onRemoveProperty,
		onLoad
	}: Props = $props();

	const api = getAPIContext('Data');
	const map = getMap('Data');
	const { Data } = api.requireLibrary('maps');
	const instance = new Data({ ...untrack(() => options), map });

	onMount(() => {
		data = instance;
		onLoad?.(instance);

		return () => {
			api.requireLibrary('core').event.clearInstanceListeners(instance);
			instance.setMap(null);
		};
	});

	$effect(() => {
		instance.setStyle(style ?? {});
	});

	$effect(() => {
		if (!geoJson) return;
		const features = instance.addGeoJson(geoJson, idPropertyName ? { idPropertyName } : undefined);
		return () => features.forEach((feature) => instance.remove(feature));
	});

	$effect(() => {
		if (!url) return;
		let features: google.maps.Data.Feature[] = [];
		let active = true;

		instance.loadGeoJson(url, idPropertyName ? { idPropertyName } : undefined, (loaded) => {
			if (active) {
				features = loaded;
			} else {
				loaded.forEach((feature) => instance.remove(feature));
			}
		});

		return () => {
			active = false;
			features.forEach((feature) => instance.remove(feature));
		};
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
			addfeature: onAddFeature,
			removefeature: onRemoveFeature,
			setgeometry: onSetGeometry,
			setproperty: onSetProperty,
			removeproperty: onRemoveProperty
		});
	});
</script>
