<script lang="ts">
	import { onMount } from 'svelte';
	import { getAPIContext, getMap } from '../internal/context.svelte.js';

	interface Props {
		onLoad?: (layer: google.maps.TransitLayer) => void;
	}

	let { onLoad }: Props = $props();

	const api = getAPIContext('TransitLayer');
	const map = getMap('TransitLayer');

	onMount(() => {
		const { TransitLayer } = api.requireLibrary('maps');
		const layer = new TransitLayer();
		layer.setMap(map);
		onLoad?.(layer);

		return () => layer.setMap(null);
	});
</script>
