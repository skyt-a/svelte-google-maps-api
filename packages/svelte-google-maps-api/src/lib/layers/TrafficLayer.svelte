<script lang="ts">
	import { onMount } from 'svelte';
	import { getAPIContext, getMap } from '../internal/context.svelte.js';

	interface Props {
		/** Refresh traffic data automatically. Defaults to `true`. */
		autoRefresh?: boolean;
		onLoad?: (layer: google.maps.TrafficLayer) => void;
	}

	let { autoRefresh = true, onLoad }: Props = $props();

	const api = getAPIContext('TrafficLayer');
	const map = getMap('TrafficLayer');
	let layer = $state.raw<google.maps.TrafficLayer | null>(null);

	onMount(() => {
		const { TrafficLayer } = api.requireLibrary('maps');
		const instance = new TrafficLayer({ autoRefresh });
		instance.setMap(map);
		layer = instance;
		onLoad?.(instance);

		return () => instance.setMap(null);
	});

	$effect(() => {
		layer?.setOptions({ autoRefresh });
	});
</script>
