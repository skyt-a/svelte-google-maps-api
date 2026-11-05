import type { Library } from '../types.js';

export interface LoaderOptions {
	apiKey: string;
	version?: string;
	libraries?: Library[];
	language?: string;
	region?: string;
	authReferrerPolicy?: 'origin';
	channel?: string;
	solutionChannel?: string;
	mapIds?: string[];
	apiUrl?: string;
	nonce?: string;
}

export const SCRIPT_ID = 'svelte-google-maps-api-script';
const CALLBACK_NAME = '__svelteGoogleMapsApiCallback__';

type LoaderWindow = Window & {
	google?: { maps?: { importLibrary?: unknown } };
	[CALLBACK_NAME]?: () => void;
};

let loadPromise: Promise<void> | null = null;
let loadedUrl: string | null = null;

export function buildScriptUrl(options: LoaderOptions): string {
	const params = new URLSearchParams();

	params.set('key', options.apiKey);
	params.set('v', options.version ?? 'weekly');
	params.set('loading', 'async');
	params.set('callback', CALLBACK_NAME);

	const libraries = [...new Set(options.libraries ?? [])].sort();
	if (libraries.length) params.set('libraries', libraries.join(','));
	if (options.language) params.set('language', options.language);
	if (options.region) params.set('region', options.region);
	if (options.authReferrerPolicy) params.set('auth_referrer_policy', options.authReferrerPolicy);
	if (options.channel) params.set('channel', options.channel);
	if (options.solutionChannel) params.set('solution_channel', options.solutionChannel);
	if (options.mapIds?.length) params.set('map_ids', options.mapIds.join(','));

	const base = (options.apiUrl ?? 'https://maps.googleapis.com').replace(/\/$/, '');
	return `${base}/maps/api/js?${params.toString()}`;
}

/**
 * Loads the Maps JavaScript API once per page.
 *
 * The API can only be loaded once, so later calls with different options reuse
 * the first load and log a warning instead of injecting a second script.
 */
export function loadMapsApi(options: LoaderOptions): Promise<void> {
	if (typeof window === 'undefined') {
		return Promise.reject(new Error('The Google Maps JavaScript API can only load in a browser.'));
	}

	const url = buildScriptUrl(options);
	const loaderWindow = window as LoaderWindow;

	if (loadPromise) {
		if (loadedUrl !== null && loadedUrl !== url) {
			console.warn(
				'svelte-google-maps-api: The Maps JavaScript API is already loaded with different options. ' +
					'The API can only be loaded once per page, so the new options are ignored.'
			);
		}
		return loadPromise;
	}

	if (typeof loaderWindow.google?.maps?.importLibrary === 'function') {
		// Loaded by another script tag or loader. Reuse it as-is.
		loadPromise = Promise.resolve();
		loadedUrl = null;
		return loadPromise;
	}

	loadPromise = new Promise<void>((resolve, reject) => {
		const script = document.createElement('script');

		loaderWindow[CALLBACK_NAME] = () => {
			delete loaderWindow[CALLBACK_NAME];
			resolve();
		};

		script.id = SCRIPT_ID;
		script.src = url;
		script.async = true;
		if (options.nonce) script.nonce = options.nonce;
		script.onerror = () => {
			delete loaderWindow[CALLBACK_NAME];
			script.remove();
			loadPromise = null;
			loadedUrl = null;
			reject(new Error('Failed to load the Google Maps JavaScript API script.'));
		};

		document.head.append(script);
	});
	loadedUrl = url;

	return loadPromise;
}

/** Clears the module-level load state. Intended for tests only. */
export function resetLoaderForTesting() {
	loadPromise = null;
	loadedUrl = null;
}
