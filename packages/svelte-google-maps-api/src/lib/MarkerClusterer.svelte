<script lang="ts">
	import { onMount, untrack, type Snippet } from 'svelte';
	import {
		MarkerClusterer,
		type Algorithm,
		type onClusterClickHandler,
		type Renderer
	} from '@googlemaps/markerclusterer';
	import { getMap, setClustererContext } from './internal/context.svelte.js';

	interface Props {
		/** Clustering algorithm from `@googlemaps/markerclusterer`. Set once on creation. */
		algorithm?: Algorithm;
		/** Cluster renderer from `@googlemaps/markerclusterer`. Set once on creation. */
		renderer?: Renderer;
		onClusterClick?: onClusterClickHandler;
		/** The `MarkerClusterer` instance. Read it with `bind:clusterer`. */
		clusterer?: MarkerClusterer | null;
		onLoad?: (clusterer: MarkerClusterer) => void;
		/** `<AdvancedMarker>` children are clustered. */
		children?: Snippet;
	}

	let {
		algorithm,
		renderer,
		onClusterClick,
		clusterer = $bindable(null),
		onLoad,
		children
	}: Props = $props();

	const map = getMap('MarkerClusterer');
	const instance = untrack(
		() =>
			new MarkerClusterer({
				map,
				...(algorithm ? { algorithm } : {}),
				...(renderer ? { renderer } : {}),
				...(onClusterClick ? { onClusterClick } : {})
			})
	);

	let renderScheduled = false;
	const scheduleRender = () => {
		if (renderScheduled) return;
		renderScheduled = true;
		queueMicrotask(() => {
			renderScheduled = false;
			instance.render();
		});
	};

	setClustererContext({
		clusterer: instance,
		addMarker(marker) {
			instance.addMarker(marker, true);
			scheduleRender();
		},
		removeMarker(marker) {
			instance.removeMarker(marker, true);
			scheduleRender();
		}
	});

	onMount(() => {
		clusterer = instance;
		onLoad?.(instance);

		return () => {
			instance.clearMarkers(true);
			instance.setMap(null);
		};
	});
</script>

{@render children?.()}
