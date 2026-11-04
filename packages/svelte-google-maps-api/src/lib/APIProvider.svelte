<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { APIContext, setAPIContext } from './internal/context.svelte.js';
	import { loadMapsApi } from './internal/loader.js';
	import { preventGoogleFonts } from './utils/preventGoogleFonts.js';
	import type { Library } from './types.js';

	interface Props {
		/** Google Maps Platform API key. */
		apiKey: string;
		/** Maps JavaScript API version or channel (`weekly`, `quarterly`, `beta`, `3.66`, ...). */
		version?: string;
		/** Libraries to preload. Components load the libraries they need on demand. */
		libraries?: Library[];
		language?: string;
		region?: string;
		authReferrerPolicy?: 'origin';
		channel?: string;
		solutionChannel?: string;
		mapIds?: string[];
		/** Base URL of the Maps JavaScript API. */
		apiUrl?: string;
		/** CSP nonce for the injected script tag. */
		nonce?: string;
		/** Stops the API from injecting Google Fonts (Roboto / Google Sans Text). */
		preventGoogleFontsLoading?: boolean;
		onLoad?: () => void;
		onError?: (error: Error) => void;
		children?: Snippet;
		/** Rendered while the API loads. */
		loading?: Snippet;
		/** Rendered when the API fails to load. */
		error?: Snippet<[Error]>;
	}

	let {
		apiKey,
		version = 'weekly',
		libraries = [],
		language,
		region,
		authReferrerPolicy,
		channel,
		solutionChannel,
		mapIds,
		apiUrl,
		nonce,
		preventGoogleFontsLoading = false,
		onLoad,
		onError,
		children,
		loading,
		error: errorSnippet
	}: Props = $props();

	const context = setAPIContext(new APIContext());

	onMount(() => {
		let cancelled = false;

		const fail = (reason: unknown) => {
			if (cancelled) return;
			const error = reason instanceof Error ? reason : new Error(String(reason));
			context.markError(error);
			onError?.(error);
		};

		if (!apiKey) {
			fail(new Error('svelte-google-maps-api: apiKey is required for <APIProvider>.'));
			return;
		}

		if (preventGoogleFontsLoading) preventGoogleFonts();

		loadMapsApi({
			apiKey,
			version,
			libraries,
			language,
			region,
			authReferrerPolicy,
			channel,
			solutionChannel,
			mapIds,
			apiUrl,
			nonce
		})
			.then(() => {
				if (cancelled) return;
				// The loader is ready; unblock importLibrary() before preloading.
				context.markLoaded();
				const preload = new Set<Library>(['core', 'maps', ...libraries]);
				return Promise.all([...preload].map((name) => context.importLibrary(name)));
			})
			.then(() => {
				if (cancelled) return;
				onLoad?.();
			})
			.catch(fail);

		return () => {
			cancelled = true;
		};
	});

	// Children render only after the core and maps libraries are available.
	const ready = $derived(
		context.status === 'loaded' && Boolean(context.libraries.core && context.libraries.maps)
	);
</script>

{#if context.status === 'error' && context.error}
	{#if errorSnippet}
		{@render errorSnippet(context.error)}
	{:else}
		<p role="alert">Failed to load Google Maps: {context.error.message}</p>
	{/if}
{:else if ready}
	{@render children?.()}
{:else}
	{@render loading?.()}
{/if}
