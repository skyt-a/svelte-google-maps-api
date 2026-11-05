<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { getAPIContext, getMap } from '../internal/context.svelte.js';
	import { toLatLngLiteral } from '../internal/utils.js';
	import type { LatLngInput } from '../types.js';

	interface Props {
		/** Geographic point the content is placed at. Use `bounds` to stretch the content instead. */
		position?: LatLngInput | null;
		/** Geographic area the content is stretched over. */
		bounds?: google.maps.LatLngBoundsLiteral | google.maps.LatLngBounds | null;
		/** Map pane to render into. Use `overlayMouseTarget` or `floatPane` for clickable content. */
		pane?: keyof google.maps.MapPanes;
		/** Pixel offset applied to `position`, as `[x, y]`. */
		offset?: [number, number];
		zIndex?: number;
		class?: string;
		/** The `google.maps.OverlayView` instance. Read it with `bind:overlayView`. */
		overlayView?: google.maps.OverlayView | null;
		onLoad?: (overlayView: google.maps.OverlayView) => void;
		children?: Snippet;
	}

	let {
		position,
		bounds,
		pane = 'floatPane',
		offset = [0, 0],
		zIndex,
		class: className = '',
		overlayView = $bindable(null),
		onLoad,
		children
	}: Props = $props();

	const api = getAPIContext('OverlayView');
	const map = getMap('OverlayView');
	const { OverlayView } = api.requireLibrary('maps');
	const { LatLng, LatLngBounds } = api.requireLibrary('core');
	let content: HTMLDivElement;

	class SvelteOverlay extends OverlayView {
		onAdd() {
			this.getPanes()?.[pane].appendChild(content);
		}

		draw() {
			const projection = this.getProjection();
			if (!projection) return;

			content.style.position = 'absolute';
			content.style.zIndex = zIndex === undefined ? '' : String(zIndex);

			if (bounds) {
				const area = bounds instanceof LatLngBounds ? bounds : new LatLngBounds(bounds);
				const southWest = projection.fromLatLngToDivPixel(area.getSouthWest());
				const northEast = projection.fromLatLngToDivPixel(area.getNorthEast());
				if (!southWest || !northEast) return;

				content.style.left = `${southWest.x}px`;
				content.style.top = `${northEast.y}px`;
				content.style.width = `${northEast.x - southWest.x}px`;
				content.style.height = `${southWest.y - northEast.y}px`;
				content.style.visibility = 'visible';
				return;
			}

			const literal = toLatLngLiteral(position);
			if (literal) {
				const point = projection.fromLatLngToDivPixel(new LatLng(literal));
				if (!point) return;

				content.style.left = `${point.x + offset[0]}px`;
				content.style.top = `${point.y + offset[1]}px`;
				content.style.visibility = 'visible';
			}
		}

		onRemove() {
			content.remove();
		}
	}

	const instance = new SvelteOverlay();

	onMount(() => {
		content.style.visibility = 'hidden';
		instance.setMap(map);
		overlayView = instance;
		onLoad?.(instance);

		return () => instance.setMap(null);
	});

	$effect(() => {
		// Redraw whenever placement props change.
		void [position, bounds, offset, zIndex];
		instance.draw();
	});

	$effect(() => {
		// Move to another pane when `pane` changes after mount.
		const target = pane;
		const panes = instance.getPanes();
		if (panes && content.parentElement !== panes[target]) panes[target].appendChild(content);
	});
</script>

<div hidden>
	<div bind:this={content} class={className}>{@render children?.()}</div>
</div>
