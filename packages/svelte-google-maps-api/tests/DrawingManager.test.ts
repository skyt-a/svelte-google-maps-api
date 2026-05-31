import { render, waitFor } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import DrawingManager from '../src/lib/DrawingManager.svelte';
import MapContextHarness from './fixtures/MapContextHarness.svelte';
import { createGoogleMapsMock } from './googleMapsMock';

describe('DrawingManager', () => {
	it('creates the drawing manager, wires events, and cleans up', async () => {
		const googleMaps = createGoogleMapsMock();
		const map = new googleMaps.classes.Map(document.createElement('div'), {});
		const onCircleComplete = vi.fn();
		const onLoad = vi.fn();
		const onUnmount = vi.fn();

		const { unmount } = render(MapContextHarness, {
			props: {
				component: DrawingManager,
				googleMapsApi: googleMaps.maps as unknown as typeof google.maps,
				map: map as unknown as google.maps.Map,
				props: {
					drawingMode: 'marker',
					drawingControl: true,
					onCircleComplete,
					onLoad,
					onUnmount
				}
			}
		});

		await waitFor(() => {
			expect(googleMaps.classes.DrawingManager.instances).toHaveLength(1);
		});

		const drawingManager = googleMaps.classes.DrawingManager.instances[0];

		expect(drawingManager.options).toMatchObject({
			map,
			drawingMode: 'marker',
			drawingControl: true
		});
		expect(onLoad).toHaveBeenCalledWith(drawingManager);
		expect(googleMaps.event.addListener).toHaveBeenCalledWith(
			drawingManager,
			'circlecomplete',
			onCircleComplete
		);

		unmount();

		expect(googleMaps.event.clearInstanceListeners).toHaveBeenCalledWith(drawingManager);
		expect(drawingManager.setMap).toHaveBeenCalledWith(null);
		expect(onUnmount).toHaveBeenCalledWith(drawingManager);
	});
});
