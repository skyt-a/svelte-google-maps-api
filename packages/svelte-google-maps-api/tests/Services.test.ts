import { render, waitFor } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import DirectionsService from '../src/lib/DirectionsService.svelte';
import DistanceMatrixService from '../src/lib/DistanceMatrixService.svelte';
import StreetViewService from '../src/lib/street-view/StreetViewService.svelte';
import MapContextHarness from './fixtures/MapContextHarness.svelte';
import { createGoogleMapsMock } from './googleMapsMock';

describe('service components', () => {
	it('creates DirectionsService and requests a route', async () => {
		const googleMaps = createGoogleMapsMock();
		const callback = vi.fn();
		const onLoad = vi.fn();
		const onUnmount = vi.fn();
		const options = {
			origin: 'Tokyo',
			destination: 'Yokohama',
			travelMode: 'DRIVING'
		};

		const { unmount } = render(MapContextHarness, {
			props: {
				component: DirectionsService,
				googleMapsApi: googleMaps.maps as unknown as typeof google.maps,
				props: {
					options,
					callback,
					onLoad,
					onUnmount
				}
			}
		});

		await waitFor(() => {
			expect(googleMaps.classes.DirectionsService.instances).toHaveLength(1);
		});

		const service = googleMaps.classes.DirectionsService.instances[0];

		expect(service.route).toHaveBeenCalledWith(options, callback);
		expect(onLoad).toHaveBeenCalledWith(service);

		unmount();

		expect(onUnmount).toHaveBeenCalledWith(service);
	});

	it('creates DistanceMatrixService and requests a distance matrix', async () => {
		const googleMaps = createGoogleMapsMock();
		const callback = vi.fn();
		const onLoad = vi.fn();
		const onUnmount = vi.fn();
		const options = {
			origins: ['Tokyo'],
			destinations: ['Yokohama'],
			travelMode: 'DRIVING'
		};

		const { unmount } = render(MapContextHarness, {
			props: {
				component: DistanceMatrixService,
				googleMapsApi: googleMaps.maps as unknown as typeof google.maps,
				props: {
					options,
					callback,
					onLoad,
					onUnmount
				}
			}
		});

		await waitFor(() => {
			expect(googleMaps.classes.DistanceMatrixService.instances).toHaveLength(1);
		});

		const service = googleMaps.classes.DistanceMatrixService.instances[0];

		expect(service.getDistanceMatrix).toHaveBeenCalledWith(options, callback);
		expect(onLoad).toHaveBeenCalledWith(service);

		unmount();

		expect(onUnmount).toHaveBeenCalledWith(service);
	});

	it('creates StreetViewService and calls lifecycle callbacks', async () => {
		const googleMaps = createGoogleMapsMock();
		const onLoad = vi.fn();
		const onUnmount = vi.fn();

		const { unmount } = render(MapContextHarness, {
			props: {
				component: StreetViewService,
				googleMapsApi: googleMaps.maps as unknown as typeof google.maps,
				props: {
					onLoad,
					onUnmount
				}
			}
		});

		await waitFor(() => {
			expect(googleMaps.classes.StreetViewService.instances).toHaveLength(1);
		});

		const service = googleMaps.classes.StreetViewService.instances[0];

		expect(onLoad).toHaveBeenCalledWith(service);

		unmount();

		expect(onUnmount).toHaveBeenCalledWith(service);
	});
});
