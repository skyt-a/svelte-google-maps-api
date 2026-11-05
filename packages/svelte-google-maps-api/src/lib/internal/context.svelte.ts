import { getContext, hasContext, setContext } from 'svelte';
import type { MarkerClusterer } from '@googlemaps/markerclusterer';
import type { APILoadingStatus, Library, LibraryMap } from '../types.js';

const API_CONTEXT = Symbol('svelte-google-maps-api/api');
const MAP_CONTEXT = Symbol('svelte-google-maps-api/map');
const MARKER_CONTEXT = Symbol('svelte-google-maps-api/marker');
const CLUSTERER_CONTEXT = Symbol('svelte-google-maps-api/clusterer');

type MapsNamespace = typeof google.maps & {
	importLibrary(name: string): Promise<unknown>;
};

export class APIContext {
	status = $state<APILoadingStatus>('loading');
	error = $state<Error | null>(null);
	libraries = $state.raw<Partial<LibraryMap>>({});

	#pending = new Map<Library, Promise<unknown>>();
	#resolveReady!: () => void;
	#rejectReady!: (error: Error) => void;
	#ready = new Promise<void>((resolve, reject) => {
		this.#resolveReady = resolve;
		this.#rejectReady = reject;
	});

	constructor() {
		// Avoid unhandled rejections when nothing awaits a failed load.
		this.#ready.catch(() => undefined);
	}

	markLoaded() {
		this.status = 'loaded';
		this.error = null;
		this.#resolveReady();
	}

	markError(error: Error) {
		this.status = 'error';
		this.error = error;
		this.#rejectReady(error);
	}

	/** Imports a Maps JavaScript API library once and caches the result. */
	importLibrary<K extends Library>(name: K): Promise<LibraryMap[K]> {
		const loaded = this.libraries[name];
		if (loaded) return Promise.resolve(loaded as LibraryMap[K]);

		let pending = this.#pending.get(name);
		if (!pending) {
			pending = this.#ready
				.then(() => (window.google.maps as MapsNamespace).importLibrary(name))
				.then((library) => {
					this.libraries = { ...this.libraries, [name]: library };
					return library;
				});
			pending.catch(() => this.#pending.delete(name));
			this.#pending.set(name, pending);
		}

		return pending as Promise<LibraryMap[K]>;
	}

	/** Returns a library that must already be loaded (core and maps always are). */
	requireLibrary<K extends Library>(name: K): LibraryMap[K] {
		const library = this.libraries[name];
		if (!library) {
			throw new Error(`svelte-google-maps-api: The "${name}" library has not been loaded yet.`);
		}
		return library as LibraryMap[K];
	}
}

export class MapContext {
	map = $state.raw<google.maps.Map | null>(null);
}

export class MarkerContext {
	marker = $state.raw<google.maps.marker.AdvancedMarkerElement | null>(null);
}

export interface ClustererContext {
	clusterer: MarkerClusterer;
	addMarker(marker: google.maps.marker.AdvancedMarkerElement): void;
	removeMarker(marker: google.maps.marker.AdvancedMarkerElement): void;
}

export function setAPIContext(context: APIContext) {
	return setContext(API_CONTEXT, context);
}

export function getAPIContext(componentName: string): APIContext {
	if (!hasContext(API_CONTEXT)) {
		throw new Error(
			`svelte-google-maps-api: <${componentName}> must be used inside <APIProvider>.`
		);
	}
	return getContext<APIContext>(API_CONTEXT);
}

export function setMapContext(context: MapContext) {
	return setContext(MAP_CONTEXT, context);
}

export function getOptionalMapContext(): MapContext | undefined {
	return hasContext(MAP_CONTEXT) ? getContext<MapContext>(MAP_CONTEXT) : undefined;
}

/**
 * Returns the map for components rendered as children of `<GoogleMap>`.
 * `<GoogleMap>` only renders its children after the map exists, so the map is never null here.
 */
export function getMap(componentName: string): google.maps.Map {
	const map = getOptionalMapContext()?.map;
	if (!map) {
		throw new Error(`svelte-google-maps-api: <${componentName}> must be used inside <GoogleMap>.`);
	}
	return map;
}

export function setMarkerContext(context: MarkerContext) {
	return setContext(MARKER_CONTEXT, context);
}

export function getMarkerContext(componentName: string): MarkerContext {
	if (!hasContext(MARKER_CONTEXT)) {
		throw new Error(
			`svelte-google-maps-api: <${componentName}> must be used inside <AdvancedMarker>.`
		);
	}
	return getContext<MarkerContext>(MARKER_CONTEXT);
}

export function setClustererContext(context: ClustererContext | undefined) {
	return setContext(CLUSTERER_CONTEXT, context);
}

export function getClustererContext(): ClustererContext | undefined {
	return hasContext(CLUSTERER_CONTEXT)
		? getContext<ClustererContext | undefined>(CLUSTERER_CONTEXT)
		: undefined;
}
