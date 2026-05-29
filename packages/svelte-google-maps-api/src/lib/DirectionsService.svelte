<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import { BROWSER as browser } from 'esm-env';
	import type { APIProviderContext } from './APIProvider.svelte';

	export let options: google.maps.DirectionsRequest;
	export let callback: (
		result: google.maps.DirectionsResult | null,
		status: google.maps.DirectionsStatus
	) => void;
	export let onLoad: ((directionsService: google.maps.DirectionsService) => void) | undefined =
		undefined;
	export let onUnmount: ((directionsService: google.maps.DirectionsService) => void) | undefined =
		undefined;

	let directionsService: google.maps.DirectionsService | null = null;

	const { status, googleMapsApi } = getContext<APIProviderContext>('svelte-google-maps-api');

	$: if ($status === 'loaded' && googleMapsApi && !directionsService && browser) {
		directionsService = new googleMapsApi.DirectionsService();
		onLoad?.(directionsService);
	}

	$: if (directionsService && options && callback) {
		directionsService.route(options, callback);
	}

	onDestroy(() => {
		if (directionsService) {
			onUnmount?.(directionsService);
			directionsService = null;
		}
	});
</script>
