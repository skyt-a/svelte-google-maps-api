<script lang="ts">
	import { getContext, onDestroy, onMount } from 'svelte';
	import { BROWSER as browser } from 'esm-env';
	import type { APIProviderContext } from '../APIProvider.svelte'; // Use relative path

	// --- Props ---
	export let position: google.maps.ControlPosition;

	// --- Internal State ---
	let controlWrapper: HTMLDivElement | null = null;
	let isMounted = false;
	let controlIndex: number | undefined = undefined;

	// --- Context ---
	const { status, googleMapsApi } = getContext<APIProviderContext>('svelte-google-maps-api');
	const map = getContext<google.maps.Map>('map');

	// --- Lifecycle ---
	onMount(() => {
		isMounted = true;
		// Add control once the map is ready and the wrapper div is created
		addControl();
	});

	onDestroy(() => {
		removeControl();
	});

	// --- Logic ---
	function addControl() {
		if (!browser || !map || !googleMapsApi || !controlWrapper || !isMounted || $status !== 'loaded')
			return;

		// Ensure the position is valid
		if (position === undefined || position === null) {
			console.error('[MapControl] position prop is required.');
			return;
		}

		try {
			// Check if the controls array for the position exists
			if (!map.controls[position]) {
				// This case should ideally not happen with valid ControlPosition enum values
				// but adding a safeguard.
				console.warn(
					`[MapControl] Controls array for position ${position} not found. Cannot add control.`
				);
				return;
			}
			// Remove existing control from the same instance if it exists (e.g., on position change)
			removeControl();
			// Add the wrapper div containing the slot content to the map controls
			controlIndex = map.controls[position].push(controlWrapper) - 1;
			console.log('[MapControl] Control added to position:', position, 'at index:', controlIndex);
		} catch (error) {
			console.error('[MapControl] Error adding control:', error);
		}
	}

	function removeControl() {
		if (browser && map && googleMapsApi && controlWrapper && controlIndex !== undefined) {
			try {
				// Find the control array for the *previous* position if position changed,
				// or use the current position if unmounting.
				// Note: Simple removal might be complex if position changes dynamically.
				// This basic removal assumes the position hasn't changed between add and remove,
				// or handles unmount cleanup.

				const controlsArray = map.controls[position];
				if (controlsArray) {
					// Attempt to remove the specific element instance.
					// Direct removal by index can be unreliable if other controls are added/removed.
					// A safer approach is to find the element and remove it.
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
						// Fallback or warning if element wasn't found (might happen if externally manipulated)
						console.warn('[MapControl] Could not find control element to remove.');
					}
				}
			} catch (error) {
				console.error('[MapControl] Error removing control:', error);
			}
			controlIndex = undefined;
		}
	}

	// Re-add control if map or position changes after mount
	$: if (isMounted && map && googleMapsApi && $status === 'loaded') {
		addControl();
	}
</script>

<!-- This div wraps the slot content and is added to the map controls -->
<div bind:this={controlWrapper}>
	<slot />
</div>
