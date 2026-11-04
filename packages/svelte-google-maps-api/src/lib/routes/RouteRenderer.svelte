<script lang="ts">
	import { getAPIContext, getMap } from '../internal/context.svelte.js';

	type MarkerOptions = google.maps.marker.AdvancedMarkerElementOptions;
	type MarkerOptionsFactory = (
		defaults: MarkerOptions,
		details: google.maps.routes.WaypointMarkerDetails
	) => MarkerOptions;

	interface Props {
		/** A route returned by `google.maps.routes.Route.computeRoutes()`. */
		route: google.maps.routes.Route | null | undefined;
		/** Style for the route polylines, or a function returning per-segment styles. */
		polylineOptions?: google.maps.routes.RoutePolylineOptions['polylineOptions'];
		colorScheme?: google.maps.ColorSchemeString;
		/**
		 * Waypoint markers (A, B, C, ...). `true` uses the defaults, an object or function
		 * customises them, `false` hides them. Markers need a map with a `mapId`.
		 */
		markers?: boolean | MarkerOptions | MarkerOptionsFactory;
		/** Fit the map viewport to the route when it changes. */
		fitBounds?: boolean;
		onLoad?: (rendered: {
			polylines: google.maps.Polyline[];
			markers: google.maps.marker.AdvancedMarkerElement[];
		}) => void;
	}

	let {
		route,
		polylineOptions,
		colorScheme,
		markers = true,
		fitBounds = true,
		onLoad
	}: Props = $props();

	const api = getAPIContext('RouteRenderer');
	const map = getMap('RouteRenderer');

	$effect(() => {
		if (!route) return;

		const currentRoute = route;
		let disposed = false;
		let markerElements: google.maps.marker.AdvancedMarkerElement[] = [];
		const polylines = currentRoute.createPolylines({
			...(polylineOptions ? { polylineOptions } : {}),
			...(colorScheme ? { colorScheme } : {})
		});

		polylines.forEach((polyline) => polyline.setMap(map));

		if (fitBounds && currentRoute.viewport) map.fitBounds(currentRoute.viewport);

		const markerRequest =
			markers === false
				? Promise.resolve([])
				: api
						.importLibrary('marker')
						.then(() =>
							currentRoute.createWaypointAdvancedMarkers(markers === true ? undefined : markers)
						);

		markerRequest
			.then((created) => {
				if (disposed) return;
				markerElements = created;
				created.forEach((marker) => (marker.map = map));
				onLoad?.({ polylines, markers: created });
			})
			.catch((error: unknown) => {
				console.error('svelte-google-maps-api: Failed to render route markers.', error);
			});

		return () => {
			disposed = true;
			polylines.forEach((polyline) => polyline.setMap(null));
			markerElements.forEach((marker) => (marker.map = null));
		};
	});
</script>
