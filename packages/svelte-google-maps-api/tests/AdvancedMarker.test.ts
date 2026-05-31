import { render, waitFor } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import AdvancedMarker from '../src/lib/AdvancedMarker.svelte';
import MapContextHarness from './fixtures/MapContextHarness.svelte';
import { createGoogleMapsMock } from './googleMapsMock';

describe('AdvancedMarker', () => {
	it('creates an advanced marker with slot content and cleans up', async () => {
		const googleMaps = createGoogleMapsMock();
		const map = new googleMaps.classes.Map(document.createElement('div'), {});
		const onClick = vi.fn();
		const onLoad = vi.fn();
		const onUnmount = vi.fn();
		const initialPosition = { lat: 35, lng: 139 };

		const { unmount } = render(MapContextHarness, {
			props: {
				component: AdvancedMarker,
				googleMapsApi: googleMaps.maps as unknown as typeof google.maps,
				map: map as unknown as google.maps.Map,
				props: {
					position: initialPosition,
					title: 'Initial',
					zIndex: 1,
					onClick,
					onLoad,
					onUnmount
				}
			}
		});

		await waitFor(() => {
			expect(googleMaps.classes.AdvancedMarkerElement.instances).toHaveLength(1);
		});

		const marker = googleMaps.classes.AdvancedMarkerElement.instances[0];

		expect(marker.map).toBe(map);
		expect(marker.position).toEqual(initialPosition);
		expect(marker.title).toBe('Initial');
		expect(marker.zIndex).toBe(1);
		expect(marker.content).toBeInstanceOf(HTMLDivElement);
		expect((marker.content as HTMLDivElement).textContent).toContain('slot content');
		expect(onLoad).toHaveBeenCalledWith(marker);
		expect(marker.addListener).toHaveBeenCalledWith('click', onClick);

		unmount();

		expect(googleMaps.event.clearInstanceListeners).toHaveBeenCalledWith(marker);
		expect(marker.map).toBeNull();
		expect(onUnmount).toHaveBeenCalledWith(marker);
	});

	it('does not create a marker when the marker library is unavailable', async () => {
		const googleMaps = createGoogleMapsMock();
		const map = new googleMaps.classes.Map(document.createElement('div'), {});
		const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
		const mapsWithoutMarkerLibrary = {
			...googleMaps.maps,
			marker: undefined
		};

		render(MapContextHarness, {
			props: {
				component: AdvancedMarker,
				googleMapsApi: mapsWithoutMarkerLibrary as unknown as typeof google.maps,
				map: map as unknown as google.maps.Map,
				props: {
					position: { lat: 35, lng: 139 }
				}
			}
		});

		await waitFor(() => {
			expect(consoleError).toHaveBeenCalledWith(expect.stringContaining('AdvancedMarker requires'));
		});
		expect(googleMaps.classes.AdvancedMarkerElement.instances).toHaveLength(0);

		consoleError.mockRestore();
	});
});
