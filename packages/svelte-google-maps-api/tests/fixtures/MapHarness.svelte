<script lang="ts">
	import type { Component } from 'svelte';
	import APIProvider from '../../src/lib/APIProvider.svelte';
	import GoogleMap from '../../src/lib/GoogleMap.svelte';

	interface Props {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		component: Component<any>;
		props?: Record<string, unknown>;
		mapProps?: Record<string, unknown>;
	}

	let { component, props = {}, mapProps = {} }: Props = $props();
	const Child = $derived(component);
</script>

<APIProvider apiKey="test-key">
	<GoogleMap center={{ lat: 0, lng: 0 }} zoom={3} {...mapProps}>
		<Child {...props} />
	</GoogleMap>
</APIProvider>
