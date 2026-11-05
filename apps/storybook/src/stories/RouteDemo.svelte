<script lang="ts">
	import { RouteRenderer, useMapsLibrary } from 'svelte-google-maps-api';

	interface Props {
		origin: google.maps.LatLngLiteral;
		destination: google.maps.LatLngLiteral;
		onStatus?: (status: string) => void;
	}

	let { origin, destination, onStatus }: Props = $props();

	const routes = useMapsLibrary('routes');
	let route = $state.raw<google.maps.routes.Route | null>(null);

	$effect(() => {
		const library = routes.current;
		if (!library) return;

		onStatus?.('Computing route…');
		library.Route.computeRoutes({
			origin,
			destination,
			travelMode: 'DRIVING',
			fields: ['path', 'legs', 'viewport', 'distanceMeters', 'durationMillis']
		})
			.then(({ routes: computed }) => {
				route = computed?.[0] ?? null;
				const meters = route?.distanceMeters;
				onStatus?.(meters ? `Route: ${(meters / 1000).toFixed(1)} km` : 'No route found');
			})
			.catch((error: unknown) => {
				onStatus?.(`Route error: ${error instanceof Error ? error.message : String(error)}`);
			});
	});
</script>

<RouteRenderer {route} polylineOptions={{ strokeColor: '#2563eb', strokeWeight: 6 }} />
