import { fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import ClustererHarness from './fixtures/ClustererHarness.svelte';
import { installGoogleMapsMock } from './googleMapsMock';

const clusterers = vi.hoisted(() => [] as Array<Record<string, ReturnType<typeof vi.fn>>>);

vi.mock('@googlemaps/markerclusterer', () => ({
	MarkerClusterer: vi.fn().mockImplementation((options: unknown) => {
		const instance = {
			options,
			markers: new Set<unknown>(),
			addMarker: vi.fn(function (this: { markers: Set<unknown> }, marker: unknown) {
				this.markers.add(marker);
			}),
			removeMarker: vi.fn(function (this: { markers: Set<unknown> }, marker: unknown) {
				this.markers.delete(marker);
			}),
			render: vi.fn(),
			clearMarkers: vi.fn(),
			setMap: vi.fn()
		};
		clusterers.push(instance as never);
		return instance;
	})
}));

describe('MarkerClusterer', () => {
	it('clusters child AdvancedMarkers instead of adding them to the map', async () => {
		const mock = installGoogleMapsMock();
		const { unmount } = render(ClustererHarness);

		await waitFor(() => expect(mock.classes.AdvancedMarkerElement.instances).toHaveLength(3));
		const clusterer = clusterers[0] as unknown as {
			markers: Set<unknown>;
			render: ReturnType<typeof vi.fn>;
			clearMarkers: ReturnType<typeof vi.fn>;
			setMap: ReturnType<typeof vi.fn>;
			addMarker: ReturnType<typeof vi.fn>;
		};

		await waitFor(() => expect(clusterer.markers.size).toBe(3));
		expect(clusterer.addMarker).toHaveBeenCalledWith(expect.anything(), true);
		expect(
			mock.classes.AdvancedMarkerElement.instances.every((marker) => marker.map === null)
		).toBe(true);
		await waitFor(() => expect(clusterer.render).toHaveBeenCalled());

		await fireEvent.click(screen.getByText('shrink'));
		await waitFor(() => expect(clusterer.markers.size).toBe(1));

		unmount();
		expect(clusterer.clearMarkers).toHaveBeenCalled();
		expect(clusterer.setMap).toHaveBeenCalledWith(null);
	});
});
