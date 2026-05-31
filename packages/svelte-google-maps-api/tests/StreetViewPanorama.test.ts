import { render, waitFor } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import StreetViewPanorama from '../src/lib/street-view/StreetViewPanorama.svelte';
import MapContextHarness from './fixtures/MapContextHarness.svelte';
import { createGoogleMapsMock } from './googleMapsMock';

describe('StreetViewPanorama', () => {
	it('creates a panorama, wires events, and calls unmount callback', async () => {
		const googleMaps = createGoogleMapsMock();
		const onPovChanged = vi.fn();
		const onLoad = vi.fn();
		const onUnmount = vi.fn();
		const position = { lat: 35, lng: 139 };
		const pov = { heading: 90, pitch: 0 };

		const { unmount } = render(MapContextHarness, {
			props: {
				component: StreetViewPanorama,
				googleMapsApi: googleMaps.maps as unknown as typeof google.maps,
				props: {
					position,
					pov,
					zoom: 2,
					containerId: 'street-view',
					onPovChanged,
					onLoad,
					onUnmount
				}
			}
		});

		await waitFor(() => {
			expect(googleMaps.classes.StreetViewPanorama.instances).toHaveLength(1);
		});

		const panorama = googleMaps.classes.StreetViewPanorama.instances[0];

		expect(panorama.options).toMatchObject({
			pov,
			zoom: 2,
			visible: true
		});
		expect(panorama.options.position).toEqual(position);
		expect(panorama.addListener).toHaveBeenCalledWith('pov_changed', onPovChanged);
		expect(onLoad).toHaveBeenCalledWith(panorama);

		unmount();

		expect(onUnmount).toHaveBeenCalledWith(panorama);
	});
});
