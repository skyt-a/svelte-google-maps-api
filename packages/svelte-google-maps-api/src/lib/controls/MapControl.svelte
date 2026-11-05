<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getAPIContext, getMap } from '../internal/context.svelte.js';

	type ControlPositionName = keyof typeof google.maps.ControlPosition;

	interface Props {
		/** A `google.maps.ControlPosition` value or its name, e.g. `'TOP_LEFT'` or `'BLOCK_START_INLINE_END'`. */
		position: google.maps.ControlPosition | ControlPositionName;
		children?: Snippet;
	}

	let { position, children }: Props = $props();

	const api = getAPIContext('MapControl');
	const map = getMap('MapControl');
	const { ControlPosition } = api.requireLibrary('core');
	let content: HTMLDivElement;

	$effect(() => {
		const resolved = typeof position === 'string' ? ControlPosition[position] : position;
		const controls = map.controls[resolved];
		const element = content;

		controls.push(element);

		return () => {
			const index = controls.getArray().indexOf(element);
			if (index >= 0) controls.removeAt(index);
		};
	});
</script>

<div hidden>
	<div bind:this={content}>{@render children?.()}</div>
</div>
