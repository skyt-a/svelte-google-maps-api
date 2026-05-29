<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import { BROWSER as browser } from 'esm-env';
	import type { APIProviderContext } from './APIProvider.svelte';

	export let options: google.maps.Data.DataOptions | undefined = undefined;

	export let onClick: ((e: google.maps.Data.MouseEvent) => void) | undefined = undefined;
	export let onDblClick: ((e: google.maps.Data.MouseEvent) => void) | undefined = undefined;
	export let onMouseDown: ((e: google.maps.Data.MouseEvent) => void) | undefined = undefined;
	export let onMouseMove: ((e: google.maps.Data.MouseEvent) => void) | undefined = undefined;
	export let onMouseOut: ((e: google.maps.Data.MouseEvent) => void) | undefined = undefined;
	export let onMouseOver: ((e: google.maps.Data.MouseEvent) => void) | undefined = undefined;
	export let onMouseUp: ((e: google.maps.Data.MouseEvent) => void) | undefined = undefined;
	export let onRightClick: ((e: google.maps.Data.MouseEvent) => void) | undefined = undefined;
	export let onAddFeature: ((e: google.maps.Data.AddFeatureEvent) => void) | undefined = undefined;
	export let onRemoveFeature: ((e: google.maps.Data.RemoveFeatureEvent) => void) | undefined =
		undefined;
	export let onRemoveProperty: ((e: google.maps.Data.RemovePropertyEvent) => void) | undefined =
		undefined;
	export let onSetGeometry: ((e: google.maps.Data.SetGeometryEvent) => void) | undefined =
		undefined;
	export let onSetProperty: ((e: google.maps.Data.SetPropertyEvent) => void) | undefined =
		undefined;
	export let onLoad: ((data: google.maps.Data) => void) | undefined = undefined;
	export let onUnmount: ((data: google.maps.Data) => void) | undefined = undefined;

	let data: google.maps.Data | null = null;
	let listeners: google.maps.MapsEventListener[] = [];
	let listenerDeps: unknown[] = [];

	const { status, googleMapsApi } = getContext<APIProviderContext>('svelte-google-maps-api');
	const map = getContext<google.maps.Map>('map');

	function clearListeners() {
		if (!googleMapsApi) return;
		listeners.forEach((listener) => googleMapsApi.event.removeListener(listener));
		listeners = [];
	}

	function addListener<T>(
		instance: google.maps.Data,
		eventName: string,
		handler: ((event: T) => void) | undefined
	) {
		if (handler && googleMapsApi) {
			listeners.push(googleMapsApi.event.addListener(instance, eventName, handler));
		}
	}

	function setupListeners() {
		if (!data || !googleMapsApi) return;

		clearListeners();
		addListener<google.maps.Data.MouseEvent>(data, 'click', onClick);
		addListener<google.maps.Data.MouseEvent>(data, 'dblclick', onDblClick);
		addListener<google.maps.Data.MouseEvent>(data, 'mousedown', onMouseDown);
		addListener<google.maps.Data.MouseEvent>(data, 'mousemove', onMouseMove);
		addListener<google.maps.Data.MouseEvent>(data, 'mouseout', onMouseOut);
		addListener<google.maps.Data.MouseEvent>(data, 'mouseover', onMouseOver);
		addListener<google.maps.Data.MouseEvent>(data, 'mouseup', onMouseUp);
		addListener<google.maps.Data.MouseEvent>(data, 'rightclick', onRightClick);
		addListener<google.maps.Data.AddFeatureEvent>(data, 'addfeature', onAddFeature);
		addListener<google.maps.Data.RemoveFeatureEvent>(data, 'removefeature', onRemoveFeature);
		addListener<google.maps.Data.RemovePropertyEvent>(data, 'removeproperty', onRemoveProperty);
		addListener<google.maps.Data.SetGeometryEvent>(data, 'setgeometry', onSetGeometry);
		addListener<google.maps.Data.SetPropertyEvent>(data, 'setproperty', onSetProperty);
	}

	function applyOptions(nextOptions: google.maps.Data.DataOptions | undefined) {
		if (!data || !nextOptions) return;

		if (nextOptions.controlPosition !== undefined) {
			data.setControlPosition(nextOptions.controlPosition);
		}
		if (nextOptions.controls !== undefined) {
			data.setControls(nextOptions.controls);
		}
		if (nextOptions.drawingMode !== undefined) {
			data.setDrawingMode(nextOptions.drawingMode);
		}
		if (nextOptions.style !== undefined) {
			data.setStyle(nextOptions.style);
		}
	}

	$: if ($status === 'loaded' && googleMapsApi && map && !data && browser) {
		data = new googleMapsApi.Data({
			...(options ?? {}),
			map
		});
		setupListeners();
		onLoad?.(data);
	}

	$: if (data && options) {
		applyOptions(options);
	}

	$: listenerDeps = [
		onClick,
		onDblClick,
		onMouseDown,
		onMouseMove,
		onMouseOut,
		onMouseOver,
		onMouseUp,
		onRightClick,
		onAddFeature,
		onRemoveFeature,
		onRemoveProperty,
		onSetGeometry,
		onSetProperty
	];

	$: if (data && googleMapsApi && browser && listenerDeps) {
		setupListeners();
	}

	onDestroy(() => {
		if (data) {
			clearListeners();
			onUnmount?.(data);
			data.setMap(null);
			data = null;
		}
	});
</script>

{#if data}
	<slot />
{/if}
