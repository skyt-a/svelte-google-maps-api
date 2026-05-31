<script lang="ts">
	import APIProvider from '../../src/lib/APIProvider.svelte';
	import type { Library } from '../../src/lib/types/googleMap.js';

	export let apiKey = '';
	export let googleMapsApiKey: string | undefined = undefined;
	export let googleMapsClientId: string | undefined = undefined;
	export let libraries: Library[] = [];
	export let id = 'test-google-maps-script';
	export let language: string | undefined = undefined;
	export let region: string | undefined = undefined;
	export let version: string | undefined = 'weekly';
	export let apiUrl = 'https://maps.googleapis.com';
	export let onLoad: (() => void) | undefined = undefined;
	export let onError: ((error: Error) => void) | undefined = undefined;
</script>

<APIProvider
	{apiKey}
	{googleMapsApiKey}
	{googleMapsClientId}
	{libraries}
	{id}
	{language}
	{region}
	{version}
	{apiUrl}
	{onLoad}
	{onError}
>
	<p data-testid="loaded">Loaded</p>
	<svelte:fragment slot="loading">
		<p data-testid="loading">Loading</p>
	</svelte:fragment>
	<svelte:fragment slot="error" let:error>
		<p data-testid="error">{error?.message}</p>
	</svelte:fragment>
</APIProvider>
