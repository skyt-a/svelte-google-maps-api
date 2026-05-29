<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import { BROWSER as browser } from 'esm-env';
	import type { APIProviderContext } from './APIProvider.svelte';

	export let options: google.maps.DistanceMatrixRequest;
	export let callback: (
		response: google.maps.DistanceMatrixResponse | null,
		status: google.maps.DistanceMatrixStatus
	) => void;
	export let onLoad:
		| ((distanceMatrixService: google.maps.DistanceMatrixService) => void)
		| undefined = undefined;
	export let onUnmount:
		| ((distanceMatrixService: google.maps.DistanceMatrixService) => void)
		| undefined = undefined;

	let distanceMatrixService: google.maps.DistanceMatrixService | null = null;

	const { status, googleMapsApi } = getContext<APIProviderContext>('svelte-google-maps-api');

	$: if ($status === 'loaded' && googleMapsApi && !distanceMatrixService && browser) {
		distanceMatrixService = new googleMapsApi.DistanceMatrixService();
		onLoad?.(distanceMatrixService);
	}

	$: if (distanceMatrixService && options && callback) {
		distanceMatrixService.getDistanceMatrix(options, callback);
	}

	onDestroy(() => {
		if (distanceMatrixService) {
			onUnmount?.(distanceMatrixService);
			distanceMatrixService = null;
		}
	});
</script>
