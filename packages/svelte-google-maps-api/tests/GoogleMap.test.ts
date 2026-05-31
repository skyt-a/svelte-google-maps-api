import { render, screen, waitFor } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import GoogleMap from '../src/lib/GoogleMap.svelte';
import MapContextHarness from './fixtures/MapContextHarness.svelte';
import { createGoogleMapsMock } from './googleMapsMock';

describe('GoogleMap', () => {
	it('creates a map, wires events, and cleans up on unmount', async () => {
		const googleMaps = createGoogleMapsMock();
		const onLoad = vi.fn();
		const onUnmount = vi.fn();
		const onClick = vi.fn();
		const initialOptions = { center: { lat: 35, lng: 139 }, zoom: 10 };

		const { unmount } = render(MapContextHarness, {
			props: {
				component: GoogleMap,
				googleMapsApi: googleMaps.maps as unknown as typeof google.maps,
				props: {
					options: initialOptions,
					onLoad,
					onUnmount,
					onClick,
					mapContainerStyle: 'height: 320px; width: 640px;'
				}
			}
		});

		await waitFor(() => {
			expect(googleMaps.classes.Map.instances).toHaveLength(1);
		});

		const map = googleMaps.classes.Map.instances[0];

		expect(onLoad).toHaveBeenCalledWith(map);
		expect(map.options).toEqual(initialOptions);
		expect(screen.getByTestId('slot-content')).not.toBeNull();
		expect(googleMaps.event.addListener).toHaveBeenCalledWith(map, 'click', onClick);

		unmount();

		expect(onUnmount).toHaveBeenCalledWith(map);
		expect(googleMaps.event.clearInstanceListeners).toHaveBeenCalledWith(map);
	});
});
