import { render, waitFor } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import RouteRenderer from '../src/lib/routes/RouteRenderer.svelte';
import MapHarness from './fixtures/MapHarness.svelte';
import { installGoogleMapsMock } from './googleMapsMock';

function createRoute() {
	const polylines = [{ setMap: vi.fn() }, { setMap: vi.fn() }];
	const markers = [{ map: null as unknown }, { map: null as unknown }];

	return {
		polylines,
		markers,
		viewport: { north: 1, south: 0, east: 1, west: 0 },
		createPolylines: vi.fn(() => polylines),
		createWaypointAdvancedMarkers: vi.fn(async () => markers)
	};
}

describe('RouteRenderer', () => {
	it('draws polylines and waypoint markers and fits the viewport', async () => {
		const mock = installGoogleMapsMock();
		const route = createRoute();
		const onLoad = vi.fn();
		const polylineOptions = { strokeColor: '#00f' };
		const { unmount } = render(MapHarness, {
			props: { component: RouteRenderer, props: { route, polylineOptions, onLoad } }
		});

		await waitFor(() => expect(onLoad).toHaveBeenCalled());
		const map = mock.classes.Map.instances[0];

		expect(route.createPolylines).toHaveBeenCalledWith({ polylineOptions });
		route.polylines.forEach((polyline) => expect(polyline.setMap).toHaveBeenCalledWith(map));
		route.markers.forEach((marker) => expect(marker.map).toBe(map));
		expect(map.fitBounds).toHaveBeenCalledWith(route.viewport);
		expect(onLoad).toHaveBeenCalledWith({ polylines: route.polylines, markers: route.markers });

		unmount();
		route.polylines.forEach((polyline) => expect(polyline.setMap).toHaveBeenLastCalledWith(null));
		route.markers.forEach((marker) => expect(marker.map).toBeNull());
	});

	it('can skip markers and viewport fitting', async () => {
		const mock = installGoogleMapsMock();
		const route = createRoute();
		const onLoad = vi.fn();
		render(MapHarness, {
			props: {
				component: RouteRenderer,
				props: { route, markers: false, fitBounds: false, onLoad }
			}
		});

		await waitFor(() =>
			expect(onLoad).toHaveBeenCalledWith({ polylines: route.polylines, markers: [] })
		);
		expect(route.createWaypointAdvancedMarkers).not.toHaveBeenCalled();
		expect(mock.classes.Map.instances[0].fitBounds).not.toHaveBeenCalled();
	});
});
