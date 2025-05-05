<script lang="ts">
	import { getContext, onDestroy, onMount } from 'svelte';
	import { BROWSER as browser } from 'esm-env';
	import type { APIProviderContext } from '../APIProvider.svelte';

	export let position: google.maps.ControlPosition;

	let controlWrapper: HTMLDivElement | null = null;
	let isMounted = false;
	let controlIndex: number | undefined = undefined;

	const { status, googleMapsApi } = getContext<APIProviderContext>('svelte-google-maps-api');
	const map = getContext<google.maps.Map>('map');

	onMount(() => {
		isMounted = true;

		addControl();
	});

	onDestroy(() => {
		removeControl();
	});

	function addControl() {
		if (!browser || !map || !googleMapsApi || !controlWrapper || !isMounted || $status !== 'loaded')
			return;

		if (position === undefined || position === null) {
			console.error('[MapControl] position prop is required.');
			return;
		}

		try {
			if (!map.controls[position]) {
				console.warn(
					`[MapControl] Controls array for position ${position} not found. Cannot add control.`
				);
				return;
			}

			removeControl();

			controlIndex = map.controls[position].push(controlWrapper) - 1;
			console.log('[MapControl] Control added to position:', position, 'at index:', controlIndex);
		} catch (error) {
			console.error('[MapControl] Error adding control:', error);
		}
	}

	function removeControl() {
		if (browser && map && googleMapsApi && controlWrapper && controlIndex !== undefined) {
			try {
				const controlsArray = map.controls[position];
				if (controlsArray) {
					let found = false;
					for (let i = 0; i < controlsArray.getLength(); i++) {
						if (controlsArray.getAt(i) === controlWrapper) {
							controlsArray.removeAt(i);
							found = true;
							console.log('[MapControl] Control removed from position:', position);
							break;
						}
					}
					if (!found) {
						console.warn('[MapControl] Could not find control element to remove.');
					}
				}
			} catch (error) {
				console.error('[MapControl] Error removing control:', error);
			}
			controlIndex = undefined;
		}
	}

	$: if (isMounted && map && googleMapsApi && $status === 'loaded') {
		addControl();
	}
</script>

<!-- This div wraps the slot content and is added to the map controls -->
<div bind:this={controlWrapper}>
	<slot />
</div>
