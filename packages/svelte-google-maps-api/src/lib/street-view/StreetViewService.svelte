<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import { BROWSER as browser } from 'esm-env';
	import type { APIProviderContext } from '../APIProvider.svelte';

	export let onLoad: ((streetViewService: google.maps.StreetViewService) => void) | undefined =
		undefined;
	export let onUnmount: ((streetViewService: google.maps.StreetViewService) => void) | undefined =
		undefined;

	let streetViewService: google.maps.StreetViewService | null = null;

	const { status, googleMapsApi } = getContext<APIProviderContext>('svelte-google-maps-api');

	$: if ($status === 'loaded' && googleMapsApi && !streetViewService && browser) {
		streetViewService = new googleMapsApi.StreetViewService();
		onLoad?.(streetViewService);
	}

	onDestroy(() => {
		if (streetViewService) {
			onUnmount?.(streetViewService);
			streetViewService = null;
		}
	});
</script>
