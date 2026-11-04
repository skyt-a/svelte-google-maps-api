<script lang="ts">
	import { onMount } from 'svelte';
	import { getAPIContext, getMap } from '../internal/context.svelte.js';

	interface Props {
		onLoad?: (layer: google.maps.BicyclingLayer) => void;
	}

	let { onLoad }: Props = $props();

	const api = getAPIContext('BicyclingLayer');
	const map = getMap('BicyclingLayer');

	onMount(() => {
		const { BicyclingLayer } = api.requireLibrary('maps');
		const layer = new BicyclingLayer();
		layer.setMap(map);
		onLoad?.(layer);

		return () => layer.setMap(null);
	});
</script>
