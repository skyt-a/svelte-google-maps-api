<script lang="ts">
	import APIProvider from '../../src/lib/APIProvider.svelte';
	import GoogleMap from '../../src/lib/GoogleMap.svelte';
	import AdvancedMarker from '../../src/lib/AdvancedMarker.svelte';
	import Pin from '../../src/lib/Pin.svelte';
	import InfoWindow from '../../src/lib/InfoWindow.svelte';

	interface Props {
		variant?: 'default' | 'content' | 'pin' | 'infoWindow';
		draggable?: boolean;
		title?: string;
		onClick?: () => void;
		onPosition?: (position: unknown) => void;
		onOpen?: (open: boolean) => void;
	}

	let {
		variant = 'default',
		draggable = false,
		title = 'Tokyo',
		onClick,
		onPosition,
		onOpen
	}: Props = $props();
	let position = $state<google.maps.LatLngLiteral>({ lat: 35, lng: 139 });
	let marker = $state<google.maps.marker.AdvancedMarkerElement | null>(null);
	let open = $state(true);
	let glyph = $state('A');

	$effect(() => onPosition?.($state.snapshot(position)));
	$effect(() => onOpen?.(open));
</script>

<button type="button" onclick={() => (glyph = 'B')}>glyph</button>
<button type="button" onclick={() => (open = !open)}>toggle</button>

<APIProvider apiKey="test-key">
	<GoogleMap center={{ lat: 35, lng: 139 }} zoom={10} mapId="DEMO_MAP_ID">
		{#if variant === 'content'}
			<AdvancedMarker bind:position {title} {draggable} {onClick}>
				<div class="custom-marker">Custom</div>
			</AdvancedMarker>
		{:else if variant === 'pin'}
			<AdvancedMarker bind:position {title}>
				<Pin background="#0f766e" glyphText={glyph} scale={1.2} />
			</AdvancedMarker>
		{:else if variant === 'infoWindow'}
			<AdvancedMarker bind:position bind:marker {title} />
			{#if marker}
				<InfoWindow anchor={marker} bind:open headerContent="Header">
					<p class="info-content">Hello</p>
				</InfoWindow>
			{/if}
		{:else}
			<AdvancedMarker bind:position {title} {draggable} {onClick} />
		{/if}
	</GoogleMap>
</APIProvider>
