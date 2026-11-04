<script lang="ts">
	import APIProvider from '../../src/lib/APIProvider.svelte';
	import GoogleMap from '../../src/lib/GoogleMap.svelte';

	interface Props {
		onCenter?: (center: google.maps.LatLngLiteral | undefined) => void;
		onZoom?: (zoom: number | undefined) => void;
		onClick?: (event: google.maps.MapMouseEvent) => void;
	}

	let { onCenter, onZoom, onClick }: Props = $props();
	let center = $state<google.maps.LatLngLiteral | undefined>({ lat: 35, lng: 139 });
	let zoom = $state<number | undefined>(10);

	$effect(() => onCenter?.($state.snapshot(center)));
	$effect(() => onZoom?.(zoom));
</script>

<button type="button" onclick={() => (center = { lat: 1, lng: 2 })}>move</button>
<button type="button" onclick={() => (zoom = 4)}>zoom</button>

<APIProvider apiKey="test-key">
	<GoogleMap bind:center bind:zoom mapId="DEMO_MAP_ID" {onClick} class="test-map" />
</APIProvider>
