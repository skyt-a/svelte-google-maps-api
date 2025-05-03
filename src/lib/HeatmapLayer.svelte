<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import { BROWSER as browser } from 'esm-env';
	import type { APIProviderContext } from './APIProvider.svelte';

	type InputHeatmapData =
		| google.maps.visualization.WeightedLocation[]
		| { location: google.maps.LatLngLiteral; weight: number }[]
		| (google.maps.LatLng | google.maps.LatLngLiteral)[]
		| google.maps.MVCArray<
				google.maps.visualization.WeightedLocation | google.maps.LatLng | google.maps.LatLngLiteral
		  >;

	type APIHeatmapData =
		| google.maps.MVCArray<google.maps.LatLng | google.maps.visualization.WeightedLocation>
		| (google.maps.LatLng | google.maps.visualization.WeightedLocation)[];

	export let data: InputHeatmapData | undefined = undefined;
	export let options: google.maps.visualization.HeatmapLayerOptions | undefined = undefined;

	export let dissipating: boolean | undefined = undefined;
	export let gradient: string[] | undefined = undefined;
	export let maxIntensity: number | undefined = undefined;
	export let opacity: number | undefined = undefined;
	export let radius: number | undefined = undefined;

	export let onLoad: ((heatmapLayer: google.maps.visualization.HeatmapLayer) => void) | undefined =
		undefined;
	export let onUnmount:
		| ((heatmapLayer: google.maps.visualization.HeatmapLayer) => void)
		| undefined = undefined;

	let heatmapInstance: google.maps.visualization.HeatmapLayer | null = null;

	const { status, googleMapsApi } = getContext<APIProviderContext>('svelte-google-maps-api');
	const map = getContext<google.maps.Map>('map');

	function initializeHeatmap() {
		if (!browser || $status !== 'loaded' || !googleMapsApi || !map || heatmapInstance) {
			return;
		}

		if (!googleMapsApi.visualization || !googleMapsApi.visualization.HeatmapLayer) {
			console.error(
				'svelte-google-maps-api: HeatmapLayer requires the "visualization" library. Please include "visualization" in the libraries prop of APIProvider.'
			);
			return;
		}

		let apiData: APIHeatmapData | undefined = undefined;
		if (data && Array.isArray(data)) {
			const processedData = data
				.map(
					(item: any): google.maps.LatLng | google.maps.visualization.WeightedLocation | null => {
						if (item.location) {
							if (item.location instanceof googleMapsApi.LatLng) {
								return item as google.maps.visualization.WeightedLocation;
							} else if (
								typeof item.location.lat === 'number' &&
								typeof item.location.lng === 'number'
							) {
								return {
									location: new googleMapsApi.LatLng(item.location.lat, item.location.lng),
									weight: item.weight
								};
							}
						} else if (item instanceof googleMapsApi.LatLng) {
							return item;
						} else if (typeof item.lat === 'number' && typeof item.lng === 'number') {
							return new googleMapsApi.LatLng(item.lat, item.lng);
						}
						console.warn('[HeatmapLayer] Unknown data item format:', item);
						return null;
					}
				)
				.filter((item) => item !== null);
			apiData = processedData as APIHeatmapData;
		}

		const heatmapOptions: google.maps.visualization.HeatmapLayerOptions = {
			...(options ?? {}),
			data: apiData,
			map,
			dissipating,
			gradient,
			maxIntensity,
			opacity,
			radius
		};

		console.log('[HeatmapLayer] Options prepared:', heatmapOptions);

		Object.keys(heatmapOptions).forEach((key) => {
			if (heatmapOptions[key as keyof typeof heatmapOptions] === undefined) {
				delete heatmapOptions[key as keyof typeof heatmapOptions];
			}
		});

		try {
			heatmapInstance = new googleMapsApi.visualization.HeatmapLayer(heatmapOptions);
			console.log('[HeatmapLayer] Instance created:', heatmapInstance);
			onLoad?.(heatmapInstance);
		} catch (error) {
			console.error('[HeatmapLayer] Error creating instance:', error);
		}
	}

	$: if (heatmapInstance && data) {
		let apiData: APIHeatmapData | undefined = undefined;
		if (data && googleMapsApi && Array.isArray(data)) {
			const processedData = data
				.map(
					(item: any): google.maps.LatLng | google.maps.visualization.WeightedLocation | null => {
						if (item.location) {
							if (item.location instanceof googleMapsApi.LatLng) {
								return item as google.maps.visualization.WeightedLocation;
							} else if (
								typeof item.location.lat === 'number' &&
								typeof item.location.lng === 'number'
							) {
								return {
									location: new googleMapsApi.LatLng(item.location.lat, item.location.lng),
									weight: item.weight
								};
							}
						} else if (item instanceof googleMapsApi.LatLng) {
							return item;
						} else if (typeof item.lat === 'number' && typeof item.lng === 'number') {
							return new googleMapsApi.LatLng(item.lat, item.lng);
						}
						console.warn('[HeatmapLayer] Unknown data item format during update:', item);
						return null;
					}
				)
				.filter((item) => item !== null);
			apiData = processedData as APIHeatmapData;
		}
		try {
			heatmapInstance.setData(apiData || []);
		} catch (error) {
			console.error('[HeatmapLayer] Error calling setData:', error);
		}
	}
	$: if (heatmapInstance && options) {
		heatmapInstance.setOptions(options);
	} else if (heatmapInstance) {
		const styleOpts: google.maps.visualization.HeatmapLayerOptions = {};
		if (dissipating !== undefined) styleOpts.dissipating = dissipating;
		if (gradient !== undefined) styleOpts.gradient = gradient;
		if (maxIntensity !== undefined) styleOpts.maxIntensity = maxIntensity;
		if (opacity !== undefined) styleOpts.opacity = opacity;
		if (radius !== undefined) styleOpts.radius = radius;
		if (Object.keys(styleOpts).length > 0) heatmapInstance.setOptions(styleOpts);
	}

	onDestroy(() => {
		if (heatmapInstance) {
			onUnmount?.(heatmapInstance);
			heatmapInstance.setMap(null);
			heatmapInstance = null;
		}
	});

	$: {
		if ($status === 'loaded' && map && !heatmapInstance) {
			initializeHeatmap();
		}
	}
</script>

<!-- HeatmapLayer does not render any DOM element itself -->
