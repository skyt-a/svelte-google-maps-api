<script lang="ts">
	import { onMount } from 'svelte';
	import { getAPIContext, getMarkerContext } from './internal/context.svelte.js';

	interface Props {
		background?: string;
		borderColor?: string;
		glyphColor?: string;
		/** Text shown inside the pin. */
		glyphText?: string;
		/** Image URL shown inside the pin. */
		glyphSrc?: string | URL;
		scale?: number;
	}

	let { background, borderColor, glyphColor, glyphText, glyphSrc, scale }: Props = $props();

	const api = getAPIContext('Pin');
	const markerContext = getMarkerContext('Pin');
	let pin = $state.raw<google.maps.marker.PinElement | null>(null);

	onMount(() => {
		let disposed = false;

		api
			.importLibrary('marker')
			.then(({ PinElement }) => {
				if (!disposed) pin = new PinElement();
			})
			.catch((error: unknown) => {
				console.error('svelte-google-maps-api: Failed to create Pin.', error);
			});

		return () => {
			disposed = true;
		};
	});

	$effect(() => {
		if (!pin) return;
		pin.background = background ?? null;
		pin.borderColor = borderColor ?? null;
		pin.glyphColor = glyphColor ?? null;
		pin.glyphText = glyphText ?? null;
		pin.glyphSrc = glyphSrc ?? null;
		pin.scale = scale ?? null;
	});

	$effect(() => {
		const marker = markerContext.marker;
		const element = pin;
		if (!marker || !element) return;

		marker.append(element);
		return () => element.remove();
	});
</script>
