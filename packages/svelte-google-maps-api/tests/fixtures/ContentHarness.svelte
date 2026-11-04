<script lang="ts">
	import APIProvider from '../../src/lib/APIProvider.svelte';
	import GoogleMap from '../../src/lib/GoogleMap.svelte';
	import MapControl from '../../src/lib/controls/MapControl.svelte';
	import OverlayView from '../../src/lib/overlay/OverlayView.svelte';

	interface Props {
		variant: 'control' | 'overlay';
	}

	let { variant }: Props = $props();
	let position = $state<'TOP_LEFT' | 'TOP_RIGHT'>('TOP_LEFT');
	let visible = $state(true);
</script>

<button type="button" onclick={() => (position = 'TOP_RIGHT')}>move</button>
<button type="button" onclick={() => (visible = false)}>hide</button>

<APIProvider apiKey="test-key">
	<GoogleMap center={{ lat: 0, lng: 0 }} zoom={3}>
		{#if visible && variant === 'control'}
			<MapControl {position}><button type="button" class="control">Control</button></MapControl>
		{:else if visible && variant === 'overlay'}
			<OverlayView position={{ lat: 2, lng: 3 }} offset={[5, 5]} pane="overlayMouseTarget">
				<span class="overlay">Overlay</span>
			</OverlayView>
		{/if}
	</GoogleMap>
</APIProvider>
