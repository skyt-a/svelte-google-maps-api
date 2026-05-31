<script lang="ts">
	import { setContext } from 'svelte';
	import type { Component } from 'svelte';
	import { writable } from 'svelte/store';

	export let component: Component<Record<string, unknown>>;
	export let props: Record<string, unknown> = {};
	export let googleMapsApi: typeof google.maps;
	export let map: google.maps.Map | undefined = undefined;
	export let status: 'loading' | 'loaded' | 'error' = 'loaded';
	export let markerClusterer: unknown = undefined;

	setContext('svelte-google-maps-api', {
		status: writable(status),
		googleMapsApi,
		error: null
	});

	if (map) {
		setContext('map', map);
	}

	if (markerClusterer) {
		setContext('markerClusterer', markerClusterer);
	}
</script>

<svelte:component this={component} {...props}>
	<span data-testid="slot-content">slot content</span>
	<svelte:fragment slot="loading">
		<span data-testid="loading">loading</span>
	</svelte:fragment>
	<svelte:fragment slot="error">
		<span data-testid="error">error</span>
	</svelte:fragment>
</svelte:component>
