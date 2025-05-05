<script context="module" lang="ts">
	import type { Library } from './types/googleMap.js';

	type LoadStatus = 'loading' | 'loaded' | 'error';

	export interface APIProviderContext {
		status: Writable<LoadStatus>;
		googleMapsApi: typeof google.maps | null;
		error: Error | null;
	}
</script>

<script lang="ts">
	import { BROWSER as browser } from 'esm-env';
	import { setContext, onDestroy } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	export let apiKey = '';
	export let libraries: Library[] = [];
	export let language: string | undefined = undefined;
	export let region: string | undefined = undefined;
	export let version: string | undefined = undefined;
	export let solutionChannel: string | undefined = undefined;

	let googleMapsApi: typeof google.maps | null = null;
	let error: Error | null = null;

	const statusStore = writable<LoadStatus>('loading');

	const SCRIPT_ID = 'svelte-google-maps-api-script';
	const CALLBACK_NAME = '__svelteGoogleMapApiCallback__';

	let scriptElement: HTMLScriptElement | null = null;

	$: if (browser && !document.getElementById(SCRIPT_ID)) {
		if (!apiKey) {
			console.error('svelte-google-maps-api: apiKey is required for APIProvider');
			statusStore.set('error');
			error = new Error('apiKey is required');
		} else {
			statusStore.set('loading');
			error = null;

			window[CALLBACK_NAME] = () => {
				googleMapsApi = window.google.maps;
				statusStore.set('loaded');

				try {
					delete window[CALLBACK_NAME];
				} catch (e) {
					window[CALLBACK_NAME] = undefined;
				}
			};

			const script = document.createElement('script');
			script.id = SCRIPT_ID;
			script.type = 'text/javascript';
			const params = new URLSearchParams();
			params.set('key', apiKey);
			params.set('callback', CALLBACK_NAME);
			if (libraries.length > 0) {
				params.set('libraries', libraries.sort().join(','));
			}
			if (language) params.set('language', language);
			if (region) params.set('region', region);
			if (version) params.set('v', version);
			if (solutionChannel) params.set('solution_channel', solutionChannel);

			script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
			script.async = true;
			script.defer = true;
			script.onerror = (event: Event | string) => {
				console.error('svelte-google-maps-api: Failed to load Google Maps API script.', event);
				statusStore.set('error');
				error = new Error(`Failed to load Google Maps script: ${event.toString()}`);

				try {
					delete window[CALLBACK_NAME];
				} catch (e) {
					window[CALLBACK_NAME] = undefined;
				}
				if (scriptElement) document.head.removeChild(scriptElement);
				scriptElement = null;
			};

			scriptElement = script;
			document.head.appendChild(scriptElement);
		}
	} else if (browser && document.getElementById(SCRIPT_ID) && window.google && window.google.maps) {
		statusStore.set('loaded');
		googleMapsApi = window.google.maps;
	}

	$: setContext<APIProviderContext>('svelte-google-maps-api', {
		status: statusStore,
		googleMapsApi,
		error
	});

	onDestroy(() => {
		if (browser) {
			if (typeof window[CALLBACK_NAME] !== 'undefined') {
				try {
					delete window[CALLBACK_NAME];
				} catch (e) {
					window[CALLBACK_NAME] = undefined;
				}
			}
		}
	});
</script>

{#if $statusStore === 'loading'}
	<slot name="loading">
		<!-- Default loading state -->
		<!-- You can provide custom loading UI via <div slot="loading">...</div> -->
	</slot>
{:else if $statusStore === 'loaded'}
	<slot />
{:else if $statusStore === 'error'}
	<slot name="error" {error}>
		<!-- Default error state -->
		<p style="color: red;">Failed to load Google Maps: {error?.message ?? 'Unknown error'}</p>
		<!-- You can provide custom error UI via <div slot="error" let:error>...</div> -->
	</slot>
{/if}
