import { getAPIContext, getOptionalMapContext } from './internal/context.svelte.js';
import type { APILoadingStatus, Library, LibraryMap } from './types.js';

export interface Current<T> {
	readonly current: T;
}

/**
 * Returns the nearest `<GoogleMap>` instance.
 * Call it during component initialisation, inside `<GoogleMap>`.
 *
 * @example
 * const map = useMap();
 * $effect(() => map.current?.panTo(position));
 */
export function useMap(): Current<google.maps.Map | null> {
	const context = getOptionalMapContext();

	return {
		get current() {
			return context?.map ?? null;
		}
	};
}

/**
 * Loads a Maps JavaScript API library and returns it once ready.
 * Call it during component initialisation, inside `<APIProvider>`.
 *
 * @example
 * const routes = useMapsLibrary('routes');
 * $effect(() => {
 *   routes.current?.Route.computeRoutes({ origin, destination, fields: ['path'] });
 * });
 */
export function useMapsLibrary<K extends Library>(name: K): Current<LibraryMap[K] | null> {
	const api = getAPIContext('useMapsLibrary');

	api.importLibrary(name).catch((error: unknown) => {
		console.error(`svelte-google-maps-api: Failed to load the "${name}" library.`, error);
	});

	return {
		get current() {
			return (api.libraries[name] as LibraryMap[K] | undefined) ?? null;
		}
	};
}

/**
 * Returns the loading state of the Maps JavaScript API.
 * Call it during component initialisation, inside `<APIProvider>`.
 */
export function useAPILoadingStatus(): {
	readonly status: APILoadingStatus;
	readonly error: Error | null;
} {
	const api = getAPIContext('useAPILoadingStatus');

	return {
		get status() {
			return api.status;
		},
		get error() {
			return api.error;
		}
	};
}
