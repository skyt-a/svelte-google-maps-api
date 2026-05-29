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
	import { preventGoogleFonts } from './utils/preventGoogleFonts.js';

	export let apiKey = '';
	export let googleMapsApiKey: string | undefined = undefined;
	export let googleMapsClientId: string | undefined = undefined;
	export let libraries: Library[] = [];
	export let language: string | undefined = undefined;
	export let region: string | undefined = undefined;
	export let version: string | undefined = 'weekly';
	export let channel: string | undefined = undefined;
	export let mapIds: string[] | undefined = undefined;
	export let authReferrerPolicy: 'origin' | undefined = undefined;
	export let apiUrl: string = 'https://maps.googleapis.com';
	export let solutionChannel: string | undefined = undefined;
	export let id: string = 'svelte-google-maps-api-script';
	export let nonce: string | undefined = undefined;
	export let preventGoogleFontsLoading: boolean = false;
	export let onLoad: (() => void) | undefined = undefined;
	export let onError: ((error: Error) => void) | undefined = undefined;
	export let onUnmount: (() => void) | undefined = undefined;

	let googleMapsApi: typeof google.maps | null = null;
	let error: Error | null = null;

	const statusStore = writable<LoadStatus>('loading');

	const CALLBACK_NAME = '__svelteGoogleMapApiCallback__';

	let scriptElement: HTMLScriptElement | null = null;
	type CallbackWindow = Window & Record<string, (() => void) | undefined>;

	$: if (browser && !document.getElementById(id)) {
		const resolvedApiKey = googleMapsApiKey ?? apiKey;

		if (resolvedApiKey && googleMapsClientId) {
			const apiKeyError = new Error('Specify either apiKey/googleMapsApiKey or googleMapsClientId, not both');
			console.error(`svelte-google-maps-api: ${apiKeyError.message}`);
			statusStore.set('error');
			error = apiKeyError;
			onError?.(apiKeyError);
		} else if (!resolvedApiKey && !googleMapsClientId) {
			console.error('svelte-google-maps-api: apiKey or googleMapsClientId is required for APIProvider');
			statusStore.set('error');
			error = new Error('apiKey or googleMapsClientId is required');
			onError?.(error);
		} else {
			statusStore.set('loading');
			error = null;

			const callbackWindow = window as unknown as CallbackWindow;

			callbackWindow[CALLBACK_NAME] = () => {
				googleMapsApi = window.google.maps;
				statusStore.set('loaded');
				onLoad?.();

				try {
					delete callbackWindow[CALLBACK_NAME];
				} catch (e) {
					callbackWindow[CALLBACK_NAME] = undefined;
				}
			};

			const script = document.createElement('script');
			script.id = id;
			script.type = 'text/javascript';
			if (nonce) script.nonce = nonce;
			const params = new URLSearchParams();
			if (resolvedApiKey) {
				params.set('key', resolvedApiKey);
			} else if (googleMapsClientId) {
				params.set('client', googleMapsClientId);
			}
			params.set('callback', CALLBACK_NAME);
			params.set('loading', 'async');
			if (libraries.length > 0) {
				params.set('libraries', [...libraries].sort().join(','));
			}
			if (language) params.set('language', language);
			if (region) params.set('region', region);
			if (version) params.set('v', version);
			if (channel) params.set('channel', channel);
			if (mapIds?.length) params.set('map_ids', mapIds.join(','));
			if (authReferrerPolicy) params.set('auth_referrer_policy', authReferrerPolicy);
			if (solutionChannel) params.set('solution_channel', solutionChannel);

			script.src = `${apiUrl.replace(/\/$/, '')}/maps/api/js?${params.toString()}`;
			script.async = true;
			script.defer = true;
			script.onerror = (event: Event | string) => {
				console.error('svelte-google-maps-api: Failed to load Google Maps API script.', event);
				statusStore.set('error');
				error = new Error(`Failed to load Google Maps script: ${event.toString()}`);
				onError?.(error);

				try {
					delete callbackWindow[CALLBACK_NAME];
				} catch (e) {
					callbackWindow[CALLBACK_NAME] = undefined;
				}
				if (scriptElement) document.head.removeChild(scriptElement);
				scriptElement = null;
			};

			scriptElement = script;
			if (preventGoogleFontsLoading) {
				preventGoogleFonts();
			}
			document.head.appendChild(scriptElement);
		}
	} else if (browser && document.getElementById(id) && window.google && window.google.maps) {
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
			const callbackWindow = window as unknown as CallbackWindow;
			if (typeof callbackWindow[CALLBACK_NAME] !== 'undefined') {
				try {
					delete callbackWindow[CALLBACK_NAME];
				} catch (e) {
					callbackWindow[CALLBACK_NAME] = undefined;
				}
			}
			onUnmount?.();
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
