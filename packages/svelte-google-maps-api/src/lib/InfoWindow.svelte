<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { getAPIContext, getMap } from './internal/context.svelte.js';
	import { addListeners, definedOnly, hasRenderableContent } from './internal/utils.js';
	import type { LatLngInput } from './types.js';

	interface Props {
		/** Whether the info window is open. Closing it from the map sets this to `false`. */
		open?: boolean;
		/** Marker (or other anchor) to attach to. Takes precedence over `position`. */
		anchor?: google.maps.marker.AdvancedMarkerElement | google.maps.MVCObject | null;
		position?: LatLngInput | null;
		/** Header text. Use the `header` snippet for rich content. */
		headerContent?: string;
		headerDisabled?: boolean;
		maxWidth?: number;
		minWidth?: number;
		/** Pixel offset from the anchor point, as `[x, y]`. */
		pixelOffset?: [number, number];
		zIndex?: number;
		disableAutoPan?: boolean;
		ariaLabel?: string;
		shouldFocus?: boolean;
		/** Other `google.maps.InfoWindowOptions`. */
		options?: google.maps.InfoWindowOptions;
		/** The `google.maps.InfoWindow` instance. Read it with `bind:infoWindow`. */
		infoWindow?: google.maps.InfoWindow | null;
		/** Called whenever the info window closes. */
		onClose?: () => void;
		/** Called when the user clicks the close button. */
		onCloseClick?: () => void;
		onLoad?: (infoWindow: google.maps.InfoWindow) => void;
		header?: Snippet;
		children?: Snippet;
	}

	let {
		open = $bindable(true),
		anchor,
		position,
		headerContent,
		headerDisabled,
		maxWidth,
		minWidth,
		pixelOffset,
		zIndex,
		disableAutoPan,
		ariaLabel,
		shouldFocus,
		options,
		infoWindow = $bindable(null),
		onClose,
		onCloseClick,
		onLoad,
		header,
		children
	}: Props = $props();

	const api = getAPIContext('InfoWindow');
	const map = getMap('InfoWindow');
	const { InfoWindow } = api.requireLibrary('maps');
	const { Size } = api.requireLibrary('core');
	const instance = new InfoWindow();
	let content: HTMLDivElement;
	let headerElement: HTMLDivElement;

	onMount(() => {
		instance.setContent(content);
		infoWindow = instance;
		onLoad?.(instance);

		return () => {
			api.requireLibrary('core').event.clearInstanceListeners(instance);
			instance.close();
			content.remove();
			headerElement.remove();
		};
	});

	$effect(() => {
		instance.setOptions({
			...options,
			...definedOnly({
				maxWidth,
				minWidth,
				zIndex,
				disableAutoPan,
				ariaLabel,
				headerDisabled
			}),
			...(pixelOffset ? { pixelOffset: new Size(pixelOffset[0], pixelOffset[1]) } : {})
		});
	});

	$effect(() => {
		if (header && hasRenderableContent(headerElement)) {
			instance.setHeaderContent(headerElement);
		} else {
			instance.setHeaderContent(headerContent ?? null);
		}
	});

	$effect(() => {
		if (!anchor && position) instance.setPosition(position);
	});

	$effect(() => {
		if (open) {
			instance.open({ map, anchor: anchor ?? undefined, shouldFocus });
		} else {
			instance.close();
		}
	});

	$effect(() => {
		return addListeners(instance, {
			close: () => {
				if (open) open = false;
				onClose?.();
			},
			closeclick: onCloseClick
		});
	});
</script>

<div hidden>
	<div bind:this={content}>{@render children?.()}</div>
	<div bind:this={headerElement}>{@render header?.()}</div>
</div>
