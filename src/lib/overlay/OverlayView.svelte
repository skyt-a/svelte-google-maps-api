<script lang="ts">
	import { getContext, onDestroy, onMount, tick } from 'svelte';
	import { BROWSER as browser } from 'esm-env';
	import type { APIProviderContext } from '../APIProvider.svelte';

	// --- Props ---
	export let position: google.maps.LatLng | google.maps.LatLngLiteral | undefined = undefined;
	export let bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral | undefined =
		undefined;
	export let mapPaneName: keyof google.maps.MapPanes = 'floatPane'; // Default pane

	// --- Events ---
	export let onLoad: ((overlayView: google.maps.OverlayView) => void) | undefined = undefined;
	export let onUnmount: ((overlayView: google.maps.OverlayView) => void) | undefined = undefined;

	// --- Internal State ---
	let overlayViewInstance: google.maps.OverlayView | null = null;
	let contentWrapper: HTMLDivElement | null = null;
	let isAdded = false;
	let isMounted = false;

	// --- Context ---
	const { status, googleMapsApi } = getContext<APIProviderContext>('svelte-google-maps-api');
	const map = getContext<google.maps.Map>('map');

	// --- OverlayView Subclass/Implementation ---
	// Define class at the top level, but instantiate only when API is ready.
	// Avoid direct reference to googleMapsApi in class definition itself.
	class CustomOverlay extends google.maps.OverlayView {
		// Temporarily use global google.maps for definition
		private paneName: keyof google.maps.MapPanes;
		private container: HTMLDivElement;
		private pos: google.maps.LatLng | undefined;
		private bnds: google.maps.LatLngBounds | undefined;
		private api: typeof google.maps | null = null; // Store API ref internally

		constructor(
			apiRef: typeof google.maps, // Pass API reference
			paneName: keyof google.maps.MapPanes,
			containerElement: HTMLDivElement,
			initialPosition?: google.maps.LatLng | google.maps.LatLngLiteral,
			initialBounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral
		) {
			super();
			this.api = apiRef;
			this.paneName = paneName;
			this.container = containerElement;
			// Convert literals to instances using the passed API reference
			if (initialPosition) {
				this.pos =
					initialPosition instanceof this.api.LatLng
						? initialPosition
						: new this.api.LatLng(initialPosition.lat, initialPosition.lng);
			}
			if (initialBounds) {
				this.bnds =
					initialBounds instanceof this.api.LatLngBounds
						? initialBounds
						: new this.api.LatLngBounds(initialBounds);
			}
		}

		onAdd() {
			console.log('[OverlayView] onAdd called');
			const pane = this.getPanes()?.[this.paneName];
			if (pane && this.container) {
				pane.appendChild(this.container);
				isAdded = true;
				console.log('[OverlayView] Container added to pane:', this.paneName);
			} else {
				console.error('[OverlayView] Pane or container not found in onAdd.');
			}
		}

		draw() {
			const projection = this.getProjection();
			if (!projection || !this.container) {
				return;
			}

			if (this.pos) {
				const point = projection.fromLatLngToDivPixel(this.pos);
				if (point) {
					this.container.style.left = `${point.x}px`;
					this.container.style.top = `${point.y}px`;
					this.container.style.position = 'absolute';
				} else {
					console.warn('[OverlayView] Could not get div pixel for position.');
				}
			} else if (this.bnds) {
				const sw = projection.fromLatLngToDivPixel(this.bnds.getSouthWest());
				const ne = projection.fromLatLngToDivPixel(this.bnds.getNorthEast());
				if (sw && ne) {
					this.container.style.left = `${sw.x}px`;
					this.container.style.top = `${ne.y}px`;
					this.container.style.width = `${ne.x - sw.x}px`;
					this.container.style.height = `${sw.y - ne.y}px`;
					this.container.style.position = 'absolute';
				} else {
					console.warn('[OverlayView] Could not get div pixel for bounds.');
				}
			}
		}

		onRemove() {
			console.log('[OverlayView] onRemove called');
			if (this.container && this.container.parentNode) {
				this.container.parentNode.removeChild(this.container);
				isAdded = false;
				console.log('[OverlayView] Container removed from pane.');
			}
		}

		updatePosition(newPos: google.maps.LatLng | google.maps.LatLngLiteral | undefined) {
			if (!this.api) return;
			this.pos = newPos
				? newPos instanceof this.api.LatLng
					? newPos
					: new this.api.LatLng(newPos.lat, newPos.lng)
				: undefined;
			this.bnds = undefined;
			this.draw();
		}

		updateBounds(
			newBounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral | undefined
		) {
			if (!this.api) return;
			this.bnds = newBounds
				? newBounds instanceof this.api.LatLngBounds
					? newBounds
					: new this.api.LatLngBounds(newBounds)
				: undefined;
			this.pos = undefined;
			this.draw();
		}
	}

	// --- Initialization ---
	onMount(() => {
		isMounted = true;
		// Need to wait for the wrapper div to be created
		tick().then(initializeOverlayView);
	});

	function initializeOverlayView() {
		if (
			!browser ||
			$status !== 'loaded' ||
			!googleMapsApi ||
			!map ||
			!contentWrapper ||
			!isMounted ||
			overlayViewInstance
		)
			return;

		if (!googleMapsApi.OverlayView) {
			console.error('[OverlayView] google.maps.OverlayView not available.');
			return;
		}

		try {
			// Pass googleMapsApi to the constructor
			overlayViewInstance = new CustomOverlay(
				googleMapsApi,
				mapPaneName,
				contentWrapper,
				position,
				bounds
			);
			overlayViewInstance.setMap(map);
			onLoad?.(overlayViewInstance);
			console.log('[OverlayView] Instance created and set on map.');
		} catch (error) {
			console.error('[OverlayView] Error creating instance:', error);
		}
	}

	// --- Reactive Updates ---
	$: if (overlayViewInstance && position && googleMapsApi) {
		console.log('[OverlayView] Position changed');
		// Pass position (literal or instance) directly to the update method
		(overlayViewInstance as CustomOverlay).updatePosition(position);
	} else if (overlayViewInstance && bounds && googleMapsApi) {
		console.log('[OverlayView] Bounds changed');
		// Pass bounds (literal or instance) directly to the update method
		(overlayViewInstance as CustomOverlay).updateBounds(bounds);
	} else if (overlayViewInstance && !position && !bounds) {
		// Handle case where both position and bounds become undefined - perhaps hide or remove?
		console.warn(
			'[OverlayView] Both position and bounds are undefined. Hiding overlay content element.'
		);
		if (contentWrapper) contentWrapper.style.display = 'none'; // Simple hide
	}

	// --- Lifecycle ---
	onDestroy(() => {
		if (overlayViewInstance) {
			onUnmount?.(overlayViewInstance);
			overlayViewInstance.setMap(null); // This triggers onRemove
			overlayViewInstance = null;
		}
	});

	// Initialize after mount and API ready
	$: if ($status === 'loaded' && map && contentWrapper && isMounted && !overlayViewInstance) {
		initializeOverlayView();
	}
</script>

<!-- This div wraps the slot content and is managed by OverlayView -->
<!-- Initial styles might be needed to prevent flash of unstyled content -->
<div bind:this={contentWrapper}>
	{#if isAdded}
		<!-- Render slot content only after onAdd has been called -->
		<slot />
	{/if}
</div>
