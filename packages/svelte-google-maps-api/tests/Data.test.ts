import { render, screen, waitFor } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import Data from '../src/lib/Data.svelte';
import MapContextHarness from './fixtures/MapContextHarness.svelte';
import { createGoogleMapsMock } from './googleMapsMock';

describe('Data', () => {
	it('creates a Data layer, applies options, registers listeners, and cleans up', async () => {
		const googleMaps = createGoogleMapsMock();
		const map = new googleMaps.classes.Map(document.createElement('div'), {});
		const onClick = vi.fn();
		const onAddFeature = vi.fn();
		const onLoad = vi.fn();
		const onUnmount = vi.fn();
		const options = {
			controls: ['Point'],
			drawingMode: 'Point',
			style: { visible: true }
		};

		const { unmount } = render(MapContextHarness, {
			props: {
				component: Data,
				googleMapsApi: googleMaps.maps as unknown as typeof google.maps,
				map: map as unknown as google.maps.Map,
				props: {
					options,
					onClick,
					onAddFeature,
					onLoad,
					onUnmount
				}
			}
		});

		await waitFor(() => {
			expect(googleMaps.classes.Data.instances).toHaveLength(1);
		});

		const data = googleMaps.classes.Data.instances[0];

		expect(data.options).toMatchObject({ map });
		expect(data.setControls).toHaveBeenCalledWith(options.controls);
		expect(data.setDrawingMode).toHaveBeenCalledWith(options.drawingMode);
		expect(data.setStyle).toHaveBeenCalledWith(options.style);
		expect(googleMaps.event.addListener).toHaveBeenCalledWith(data, 'click', onClick);
		expect(googleMaps.event.addListener).toHaveBeenCalledWith(data, 'addfeature', onAddFeature);
		expect(screen.getByTestId('slot-content')).not.toBeNull();
		expect(onLoad).toHaveBeenCalledWith(data);

		unmount();

		expect(data.setMap).toHaveBeenCalledWith(null);
		expect(onUnmount).toHaveBeenCalledWith(data);
	});
});
