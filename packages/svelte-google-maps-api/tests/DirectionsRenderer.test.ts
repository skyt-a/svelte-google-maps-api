import { render, waitFor } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import DirectionsRenderer from '../src/lib/DirectionsRenderer.svelte';
import MapContextHarness from './fixtures/MapContextHarness.svelte';
import { createGoogleMapsMock } from './googleMapsMock';

describe('DirectionsRenderer', () => {
	it('creates the renderer, wires directions_changed, and clears it on unmount', async () => {
		const googleMaps = createGoogleMapsMock();
		const map = new googleMaps.classes.Map(document.createElement('div'), {});
		const panel = document.createElement('div');
		const directions = { routes: [] };
		const onDirectionsChanged = vi.fn();
		const onLoad = vi.fn();
		const onUnmount = vi.fn();

		const { unmount } = render(MapContextHarness, {
			props: {
				component: DirectionsRenderer,
				googleMapsApi: googleMaps.maps as unknown as typeof google.maps,
				map: map as unknown as google.maps.Map,
				props: {
					directions,
					panel,
					routeIndex: 1,
					suppressMarkers: true,
					onDirectionsChanged,
					onLoad,
					onUnmount
				}
			}
		});

		await waitFor(() => {
			expect(googleMaps.classes.DirectionsRenderer.instances).toHaveLength(1);
		});

		const renderer = googleMaps.classes.DirectionsRenderer.instances[0];

		expect(renderer.options).toMatchObject({
			map,
			directions,
			panel,
			routeIndex: 1,
			suppressMarkers: true
		});
		expect(renderer.addListener).toHaveBeenCalledWith('directions_changed', onDirectionsChanged);
		expect(onLoad).toHaveBeenCalledWith(renderer);

		unmount();

		expect(renderer.setMap).toHaveBeenCalledWith(null);
		expect(onUnmount).toHaveBeenCalledWith(renderer);
	});
});
