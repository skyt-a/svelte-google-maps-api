<script lang="ts">
	import type { Component } from 'svelte';
	import APIProvider from '../../src/lib/APIProvider.svelte';

	interface Props {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		component: Component<any>;
		props?: Record<string, unknown>;
	}

	let { component, props = {} }: Props = $props();
	const Child = $derived(component);
</script>

<APIProvider apiKey="test-key">
	<Child {...props} />
</APIProvider>
