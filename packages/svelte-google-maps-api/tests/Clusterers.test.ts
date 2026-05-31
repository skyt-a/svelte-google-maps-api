import { render, screen, waitFor } from '@testing-library/svelte';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import GoogleMarkerClusterer from '../src/lib/GoogleMarkerClusterer.svelte';
import MarkerClusterer from '../src/lib/MarkerClusterer.svelte';
import MapContextHarness from './fixtures/MapContextHarness.svelte';
import { createGoogleMapsMock } from './googleMapsMock';

const clustererMock = vi.hoisted(() => {
	class MockMarkerClusterer {
		static instances: MockMarkerClusterer[] = [];

		options: Record<string, unknown>;
		addMarkerCalls: unknown[][] = [];
		removeMarkerCalls: unknown[][] = [];
		renderCalls = 0;
		clearMarkersCalls: unknown[][] = [];
		setMapCalls: unknown[][] = [];

		constructor(options: Record<string, unknown>) {
			this.options = options;
			MockMarkerClusterer.instances.push(this);
		}

		addMarker(...args: unknown[]) {
			this.addMarkerCalls.push(args);
		}

		removeMarker(...args: unknown[]) {
			this.removeMarkerCalls.push(args);
		}

		render() {
			this.renderCalls += 1;
		}

		clearMarkers(...args: unknown[]) {
			this.clearMarkersCalls.push(args);
		}

		setMap(...args: unknown[]) {
			this.setMapCalls.push(args);
		}
	}

	return {
		MockMarkerClusterer
	};
});

vi.mock('@googlemaps/markerclusterer', () => ({
	MarkerClusterer: clustererMock.MockMarkerClusterer
}));

describe('marker clusterer components', () => {
	beforeEach(() => {
		clustererMock.MockMarkerClusterer.instances = [];
	});

	it('creates MarkerClusterer, syncs markers, adapts onClick, and cleans up', async () => {
		const googleMaps = createGoogleMapsMock();
		const map = new googleMaps.classes.Map(document.createElement('div'), {});
		const marker = new googleMaps.classes.Marker({ position: { lat: 35, lng: 139 } });
		const onClick = vi.fn();
		const onLoad = vi.fn();
		const onUnmount = vi.fn();

		const { unmount } = render(MapContextHarness, {
			props: {
				component: MarkerClusterer,
				googleMapsApi: googleMaps.maps as unknown as typeof google.maps,
				map: map as unknown as google.maps.Map,
				props: {
					markers: [marker],
					onClick,
					onLoad,
					onUnmount
				}
			}
		});

		await waitFor(() => {
			expect(clustererMock.MockMarkerClusterer.instances).toHaveLength(1);
		});

		const clusterer = clustererMock.MockMarkerClusterer.instances[0];

		expect(clusterer.options.map).toBe(map);
		expect(clusterer.addMarkerCalls).toContainEqual([marker, true]);
		expect(clusterer.renderCalls).toBeGreaterThan(0);
		expect(screen.getByTestId('slot-content')).not.toBeNull();
		expect(onLoad).toHaveBeenCalledWith(clusterer);

		const onClusterClick = clusterer.options.onClusterClick;
		if (typeof onClusterClick !== 'function') throw new Error('onClusterClick was not configured.');

		const cluster = { markers: [marker] };
		onClusterClick({}, cluster);

		expect(onClick).toHaveBeenCalledWith(cluster);

		unmount();

		expect(clusterer.clearMarkersCalls).toContainEqual([true]);
		expect(clusterer.setMapCalls).toContainEqual([null]);
		expect(onUnmount).toHaveBeenCalledWith(clusterer);
	});

	it('creates GoogleMarkerClusterer with the provided onClusterClick callback', async () => {
		const googleMaps = createGoogleMapsMock();
		const map = new googleMaps.classes.Map(document.createElement('div'), {});
		const marker = new googleMaps.classes.Marker({ position: { lat: 35, lng: 139 } });
		const onClusterClick = vi.fn();
		const onLoad = vi.fn();

		const { unmount } = render(MapContextHarness, {
			props: {
				component: GoogleMarkerClusterer,
				googleMapsApi: googleMaps.maps as unknown as typeof google.maps,
				map: map as unknown as google.maps.Map,
				props: {
					markers: [marker],
					onClusterClick,
					onLoad
				}
			}
		});

		await waitFor(() => {
			expect(clustererMock.MockMarkerClusterer.instances).toHaveLength(1);
		});

		const clusterer = clustererMock.MockMarkerClusterer.instances[0];

		expect(clusterer.options.map).toBe(map);
		expect(clusterer.options.onClusterClick).toBe(onClusterClick);
		expect(clusterer.addMarkerCalls).toContainEqual([marker, true]);
		expect(onLoad).toHaveBeenCalledWith(clusterer);

		unmount();

		expect(clusterer.clearMarkersCalls).toContainEqual([true]);
		expect(clusterer.setMapCalls).toContainEqual([null]);
	});
});
