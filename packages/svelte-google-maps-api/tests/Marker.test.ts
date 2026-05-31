import { render, waitFor } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import Marker from '../src/lib/Marker.svelte';
import MapContextHarness from './fixtures/MapContextHarness.svelte';
import { createGoogleMapsMock } from './googleMapsMock';

describe('Marker', () => {
	it('creates a marker, wires events, and removes it from the map', async () => {
		const googleMaps = createGoogleMapsMock();
		const map = new googleMaps.classes.Map(document.createElement('div'), {});
		const onClick = vi.fn();
		const onLoad = vi.fn();
		const onUnmount = vi.fn();
		const initialPosition = { lat: 35, lng: 139 };
		const initialOptions = { title: 'Initial' };

		const { unmount } = render(MapContextHarness, {
			props: {
				component: Marker,
				googleMapsApi: googleMaps.maps as unknown as typeof google.maps,
				map: map as unknown as google.maps.Map,
				props: {
					position: initialPosition,
					options: initialOptions,
					onClick,
					onLoad,
					onUnmount
				}
			}
		});

		await waitFor(() => {
			expect(googleMaps.classes.Marker.instances).toHaveLength(1);
		});

		const marker = googleMaps.classes.Marker.instances[0];

		expect(marker.options).toMatchObject({
			map,
			position: initialPosition,
			title: 'Initial'
		});
		expect(onLoad).toHaveBeenCalledWith(marker);
		expect(googleMaps.event.addListener).toHaveBeenCalledWith(marker, 'click', onClick);

		unmount();

		expect(googleMaps.event.clearInstanceListeners).toHaveBeenCalledWith(marker);
		expect(marker.setMap).toHaveBeenCalledWith(null);
		expect(onUnmount).toHaveBeenCalledWith(marker);
	});

	it('registers with MarkerClusterer context instead of attaching directly to the map', async () => {
		const googleMaps = createGoogleMapsMock();
		const map = new googleMaps.classes.Map(document.createElement('div'), {});
		const markerClusterer = {
			addMarker: vi.fn(),
			removeMarker: vi.fn()
		};

		const { unmount } = render(MapContextHarness, {
			props: {
				component: Marker,
				googleMapsApi: googleMaps.maps as unknown as typeof google.maps,
				map: map as unknown as google.maps.Map,
				markerClusterer,
				props: {
					position: { lat: 35, lng: 139 }
				}
			}
		});

		await waitFor(() => {
			expect(googleMaps.classes.Marker.instances).toHaveLength(1);
		});

		const marker = googleMaps.classes.Marker.instances[0];

		expect(marker.options.map).toBeUndefined();
		expect(markerClusterer.addMarker).toHaveBeenCalledWith(marker);

		unmount();

		expect(markerClusterer.removeMarker).toHaveBeenCalledWith(marker);
		expect(marker.setMap).not.toHaveBeenCalled();
	});
});
