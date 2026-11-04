<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import {
		getAPIContext,
		getClustererContext,
		getMap,
		MarkerContext,
		setMarkerContext
	} from './internal/context.svelte.js';
	import { hasRenderableContent, toLatLngLiteral } from './internal/utils.js';
	import type { LatLngInput } from './types.js';

	type Marker = google.maps.marker.AdvancedMarkerElement;

	interface Props {
		/** Marker position. With `draggable`, use `bind:position` to track drags. */
		position?: LatLngInput | null;
		title?: string;
		zIndex?: number | null;
		draggable?: boolean;
		/** Defaults to `true` when `onClick` is set. */
		clickable?: boolean;
		collisionBehavior?: google.maps.CollisionBehaviorString;
		/** CSS length-percentage to move the anchor point horizontally. Default `-50%`. */
		anchorLeft?: string;
		/** CSS length-percentage to move the anchor point vertically. Default `-100%`. */
		anchorTop?: string;
		/** The `AdvancedMarkerElement` instance. Read it with `bind:marker`. */
		marker?: Marker | null;
		onClick?: (event: google.maps.marker.AdvancedMarkerClickEvent) => void;
		onDragStart?: (position: google.maps.LatLngLiteral | null) => void;
		onDrag?: (position: google.maps.LatLngLiteral | null) => void;
		onDragEnd?: (position: google.maps.LatLngLiteral | null) => void;
		onLoad?: (marker: Marker) => void;
		/** Custom marker content. Use `<Pin>` to customise the default pin instead. */
		children?: Snippet;
	}

	let {
		position = $bindable(),
		title,
		zIndex,
		draggable = false,
		clickable,
		collisionBehavior,
		anchorLeft,
		anchorTop,
		marker = $bindable(null),
		onClick,
		onDragStart,
		onDrag,
		onDragEnd,
		onLoad,
		children
	}: Props = $props();

	const api = getAPIContext('AdvancedMarker');
	const map = getMap('AdvancedMarker');
	const clusterer = getClustererContext();
	const context = setMarkerContext(new MarkerContext());
	let holder: HTMLDivElement;
	let content: HTMLDivElement;

	onMount(() => {
		let instance: Marker | null = null;
		let disposed = false;

		// Children replace the default pin only while they render something, so content that
		// appears later (e.g. inside {#if}) is attached then, and the pin returns when it empties.
		const syncContent = () => {
			if (!instance) return;
			if (hasRenderableContent(content)) {
				if (content.parentNode !== instance) instance.append(content);
			} else if (content.parentNode === instance) {
				holder.append(content);
			}
		};
		const observer = new MutationObserver(syncContent);
		observer.observe(content, { childList: true, subtree: true, characterData: true });

		api
			.importLibrary('marker')
			.then(({ AdvancedMarkerElement }) => {
				if (disposed) return;

				instance = new AdvancedMarkerElement({
					position: position ?? null,
					title: title ?? '',
					zIndex: zIndex ?? null,
					gmpDraggable: draggable,
					gmpClickable: clickable ?? Boolean(onClick),
					collisionBehavior: collisionBehavior ?? null,
					...(anchorLeft !== undefined ? { anchorLeft } : {}),
					...(anchorTop !== undefined ? { anchorTop } : {})
				});

				syncContent();

				if (clusterer) {
					clusterer.addMarker(instance);
				} else {
					instance.map = map;
				}

				context.marker = instance;
				marker = instance;
				onLoad?.(instance);
			})
			.catch((error: unknown) => {
				console.error('svelte-google-maps-api: Failed to create AdvancedMarker.', error);
			});

		return () => {
			disposed = true;
			observer.disconnect();
			if (!instance) return;
			if (clusterer) {
				clusterer.removeMarker(instance);
			} else {
				instance.map = null;
			}
			content.remove();
			context.marker = null;
		};
	});

	$effect(() => {
		const instance = context.marker;
		if (instance) instance.position = position ?? null;
	});

	$effect(() => {
		const instance = context.marker;
		if (instance) instance.title = title ?? '';
	});

	$effect(() => {
		const instance = context.marker;
		if (instance) instance.zIndex = zIndex ?? null;
	});

	$effect(() => {
		const instance = context.marker;
		if (!instance) return;
		instance.gmpDraggable = draggable;
		instance.gmpClickable = clickable ?? Boolean(onClick);
		instance.collisionBehavior = collisionBehavior ?? null;
		if (anchorLeft !== undefined) instance.anchorLeft = anchorLeft;
		if (anchorTop !== undefined) instance.anchorTop = anchorTop;
	});

	$effect(() => {
		const instance = context.marker;
		if (!instance) return;

		const currentPosition = () => toLatLngLiteral(instance.position);
		const handleClick = (event: Event) =>
			onClick?.(event as google.maps.marker.AdvancedMarkerClickEvent);
		const handleDragStart = () => onDragStart?.(currentPosition());
		const handleDrag = () => onDrag?.(currentPosition());
		const handleDragEnd = () => {
			const next = currentPosition();
			if (next) position = next;
			onDragEnd?.(next);
		};

		instance.addEventListener('gmp-click', handleClick);
		instance.addEventListener('gmp-dragstart', handleDragStart);
		instance.addEventListener('gmp-drag', handleDrag);
		instance.addEventListener('gmp-dragend', handleDragEnd);

		return () => {
			instance.removeEventListener('gmp-click', handleClick);
			instance.removeEventListener('gmp-dragstart', handleDragStart);
			instance.removeEventListener('gmp-drag', handleDrag);
			instance.removeEventListener('gmp-dragend', handleDragEnd);
		};
	});
</script>

<div hidden bind:this={holder}>
	<div bind:this={content}>{@render children?.()}</div>
</div>
