<script lang="ts">
	import { setContext } from 'svelte';
	import type { Component } from 'svelte';
	import { writable } from 'svelte/store';

	export let component: Component<Record<string, unknown>>;
	export let props: Record<string, unknown> = {};
	export let googleMapsApi: typeof google.maps;
	export let map: google.maps.Map | undefined = undefined;
	export let status: 'loading' | 'loaded' | 'error' = 'loaded';

	setContext('svelte-google-maps-api', {
		status: writable(status),
		googleMapsApi,
		error: null
	});

	if (map) {
		setContext('map', map);
	}
</script>

<svelte:component this={component} {...props} />
