<script lang="ts">
	import APIProvider from '../../src/lib/APIProvider.svelte';
	import GoogleMap from '../../src/lib/GoogleMap.svelte';
	import AdvancedMarker from '../../src/lib/AdvancedMarker.svelte';
	import MarkerClusterer from '../../src/lib/MarkerClusterer.svelte';

	let count = $state(3);
	const points = $derived(
		Array.from({ length: count }, (_, index) => ({ lat: index, lng: index }))
	);
</script>

<button type="button" onclick={() => (count = 1)}>shrink</button>

<APIProvider apiKey="test-key">
	<GoogleMap center={{ lat: 0, lng: 0 }} zoom={3} mapId="DEMO_MAP_ID">
		<MarkerClusterer>
			{#each points as position (position.lat)}
				<AdvancedMarker {position} />
			{/each}
		</MarkerClusterer>
	</GoogleMap>
</APIProvider>
