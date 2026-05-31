import { render, screen, waitFor } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import MapControl from '../src/lib/controls/MapControl.svelte';
import MapContextHarness from './fixtures/MapContextHarness.svelte';
import { createGoogleMapsMock } from './googleMapsMock';

describe('MapControl', () => {
	it('adds slot content to the requested map controls array and removes it on unmount', async () => {
		const googleMaps = createGoogleMapsMock();
		const map = new googleMaps.classes.Map(document.createElement('div'), {});
		const position = googleMaps.maps.ControlPosition.TOP_LEFT;
		const consoleLog = vi.spyOn(console, 'log').mockImplementation(() => undefined);

		const { unmount } = render(MapContextHarness, {
			props: {
				component: MapControl,
				googleMapsApi: googleMaps.maps as unknown as typeof google.maps,
				map: map as unknown as google.maps.Map,
				props: {
					position
				}
			}
		});

		await waitFor(() => {
			expect(map.controls[position].getLength()).toBe(1);
		});

		const controlElement = map.controls[position].getAt(0);

		expect(controlElement.contains(screen.getByTestId('slot-content'))).toBe(true);

		unmount();

		expect(map.controls[position].getLength()).toBe(0);
		consoleLog.mockRestore();
	});
});
