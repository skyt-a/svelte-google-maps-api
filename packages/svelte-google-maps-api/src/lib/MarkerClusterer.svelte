<script context="module" lang="ts">
	import type {
		Cluster,
		MarkerClustererOptions as BaseMarkerClustererOptions
	} from '@googlemaps/markerclusterer';

	export type MarkerClustererOptionsSubset = Omit<BaseMarkerClustererOptions, 'map' | 'markers'>;
</script>

<script lang="ts">
	import { getContext, onDestroy, setContext } from 'svelte';
	import { BROWSER as browser } from 'esm-env';
	import {
		MarkerClusterer as GoogleMapsMarkerClusterer,
		type Marker,
		type MarkerClustererOptions
	} from '@googlemaps/markerclusterer';
	import type { APIProviderContext } from './APIProvider.svelte';
	import type { MarkerClustererContext } from './types/markerClusterer.js';

	export let options: MarkerClustererOptionsSubset = {};
	export let markers: Marker[] = [];
	export let onClick: ((cluster: Cluster) => void) | undefined = undefined;
	export let onClusterClick: MarkerClustererOptions['onClusterClick'] | undefined = undefined;
	export let onLoad: ((markerClusterer: GoogleMapsMarkerClusterer) => void) | undefined =
		undefined;
	export let onUnmount: ((markerClusterer: GoogleMapsMarkerClusterer) => void) | undefined =
		undefined;

	let markerClusterer: GoogleMapsMarkerClusterer | null = null;
	let registeredMarkers = new Set<Marker>();

	const { status } = getContext<APIProviderContext>('svelte-google-maps-api');
	const map = getContext<google.maps.Map>('map');

	function getOnClusterClick(): MarkerClustererOptions['onClusterClick'] | undefined {
		if (onClusterClick) return onClusterClick;
		if (!onClick) return undefined;

		return ((event: google.maps.MapMouseEvent, cluster: Cluster) => {
			onClick?.(cluster);
		}) as MarkerClustererOptions['onClusterClick'];
	}

	function getClustererOptions(): MarkerClustererOptions {
		const clusterClick = getOnClusterClick();

		return {
			...options,
			map,
			...(clusterClick ? { onClusterClick: clusterClick } : {})
		};
	}

	function addMarker(marker: Marker) {
		if (!markerClusterer || registeredMarkers.has(marker)) return;
		registeredMarkers.add(marker);
		markerClusterer.addMarker(marker, true);
		markerClusterer.render();
	}

	function removeMarker(marker: Marker) {
		if (!markerClusterer || !registeredMarkers.has(marker)) return;
		markerClusterer.removeMarker(marker, true);
		registeredMarkers.delete(marker);
		markerClusterer.render();
	}

	setContext<MarkerClustererContext>('markerClusterer', {
		addMarker,
		removeMarker
	});

	function syncMarkers(nextMarkers: Marker[]) {
		if (!markerClusterer) return;

		for (const marker of Array.from(registeredMarkers)) {
			if (!nextMarkers.includes(marker)) {
				removeMarker(marker);
			}
		}

		nextMarkers.forEach(addMarker);
	}

	$: if ($status === 'loaded' && map && !markerClusterer && browser) {
		markerClusterer = new GoogleMapsMarkerClusterer(getClustererOptions());
		syncMarkers(markers);
		onLoad?.(markerClusterer);
	}

	$: if (markerClusterer && markers) {
		syncMarkers(markers);
	}

	onDestroy(() => {
		if (markerClusterer) {
			onUnmount?.(markerClusterer);
			markerClusterer.clearMarkers(true);
			markerClusterer.setMap(null);
			registeredMarkers.clear();
			markerClusterer = null;
		}
	});
</script>

{#if markerClusterer}
	<slot {markerClusterer} />
{/if}
