<script lang="ts">
	import { onMount } from 'svelte';
	import { getAPIContext } from '../internal/context.svelte.js';
	import { addListeners, latLngEquals, toLatLngLiteral } from '../internal/utils.js';

	interface Props {
		/** Panorama position. Use `bind:position` to follow the user moving around. */
		position?: google.maps.LatLngLiteral | google.maps.LatLng;
		/** Camera orientation. Use `bind:pov` to follow the user looking around. */
		pov?: google.maps.StreetViewPov;
		zoom?: number;
		visible?: boolean;
		/** Other `google.maps.StreetViewPanoramaOptions`. */
		options?: Omit<google.maps.StreetViewPanoramaOptions, 'position' | 'pov' | 'zoom' | 'visible'>;
		id?: string;
		class?: string;
		/** Inline style for the container. The container needs a height. */
		style?: string;
		/** The `google.maps.StreetViewPanorama` instance. Read it with `bind:panorama`. */
		panorama?: google.maps.StreetViewPanorama | null;
		onPanoChanged?: (pano: string) => void;
		onStatusChanged?: (status: ReturnType<google.maps.StreetViewPanorama['getStatus']>) => void;
		onCloseClick?: () => void;
		onLoad?: (panorama: google.maps.StreetViewPanorama) => void;
	}

	let {
		position = $bindable(),
		pov = $bindable(),
		zoom = $bindable(),
		visible = true,
		options,
		id,
		class: className = '',
		style = 'width:100%;height:100%;',
		panorama = $bindable(null),
		onPanoChanged,
		onStatusChanged,
		onCloseClick,
		onLoad
	}: Props = $props();

	const api = getAPIContext('StreetViewPanorama');
	let container: HTMLDivElement;
	let instance = $state.raw<google.maps.StreetViewPanorama | null>(null);

	onMount(() => {
		let disposed = false;
		let created: google.maps.StreetViewPanorama | null = null;

		api
			.importLibrary('streetView')
			.then(({ StreetViewPanorama }) => {
				if (disposed) return;
				created = new StreetViewPanorama(container, {
					...options,
					...(position ? { position } : {}),
					...(pov ? { pov } : {}),
					...(zoom !== undefined ? { zoom } : {}),
					visible
				});
				instance = created;
				panorama = created;
				onLoad?.(created);
			})
			.catch((error: unknown) => {
				console.error('svelte-google-maps-api: Failed to create StreetViewPanorama.', error);
			});

		return () => {
			disposed = true;
			if (created) api.requireLibrary('core').event.clearInstanceListeners(created);
			instance = null;
		};
	});

	$effect(() => {
		if (instance && options) instance.setOptions(options);
	});

	$effect(() => {
		const next = position;
		if (instance && next && !latLngEquals(instance?.getPosition(), next)) {
			instance.setPosition(next);
		}
	});

	$effect(() => {
		const next = pov;
		if (!instance || !next) return;
		const current = instance?.getPov();
		if (current?.heading !== next.heading || current?.pitch !== next.pitch) instance.setPov(next);
	});

	$effect(() => {
		if (instance && zoom !== undefined && instance?.getZoom() !== zoom) {
			instance.setZoom(zoom);
		}
	});

	$effect(() => {
		instance?.setVisible(visible);
	});

	$effect(() => {
		const current = instance;
		if (!current) return;

		return addListeners(current, {
			position_changed: () => {
				const next = toLatLngLiteral(current.getPosition());
				if (next && !latLngEquals(next, position)) position = next;
			},
			pov_changed: () => {
				const next = current.getPov();
				const previous = pov;
				if (next.heading !== previous?.heading || next.pitch !== previous?.pitch) {
					pov = { heading: next.heading, pitch: next.pitch };
				}
			},
			zoom_changed: () => {
				const next = current.getZoom();
				if (next !== zoom) zoom = next;
			},
			pano_changed: onPanoChanged && (() => onPanoChanged(current.getPano())),
			status_changed: onStatusChanged && (() => onStatusChanged(current.getStatus())),
			closeclick: onCloseClick
		});
	});
</script>

<div bind:this={container} {id} class={className} {style}></div>
