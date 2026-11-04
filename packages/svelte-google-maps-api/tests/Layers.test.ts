import { render, waitFor } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import Data from '../src/lib/Data.svelte';
import GroundOverlay from '../src/lib/GroundOverlay.svelte';
import BicyclingLayer from '../src/lib/layers/BicyclingLayer.svelte';
import TrafficLayer from '../src/lib/layers/TrafficLayer.svelte';
import TransitLayer from '../src/lib/layers/TransitLayer.svelte';
import MapHarness from './fixtures/MapHarness.svelte';
import { installGoogleMapsMock } from './googleMapsMock';

describe('map layers', () => {
	it.each([
		['TrafficLayer', TrafficLayer],
		['TransitLayer', TransitLayer],
		['BicyclingLayer', BicyclingLayer]
	])('%s attaches to the map and detaches on unmount', async (_name, component) => {
		const mock = installGoogleMapsMock();
		const onLoad = vi.fn();
		const { unmount } = render(MapHarness, { props: { component, props: { onLoad } } });

		await waitFor(() => expect(mock.classes.Layer.instances).toHaveLength(1));
		const layer = mock.classes.Layer.instances[0];

		expect(layer.map).toBe(mock.classes.Map.instances[0]);
		expect(onLoad).toHaveBeenCalledWith(layer);

		unmount();
		expect(layer.map).toBeNull();
	});
});

describe('GroundOverlay', () => {
	it('creates the overlay and updates opacity', async () => {
		const mock = installGoogleMapsMock();
		const bounds = { north: 1, south: 0, east: 1, west: 0 };
		render(MapHarness, {
			props: {
				component: GroundOverlay,
				props: { url: 'https://example.com/a.png', bounds, opacity: 0.5 }
			}
		});

		await waitFor(() => expect(mock.classes.GroundOverlay.instances).toHaveLength(1));
		const overlay = mock.classes.GroundOverlay.instances[0];

		expect(overlay.url).toBe('https://example.com/a.png');
		expect(overlay.bounds).toEqual(bounds);
		expect(overlay.opacity).toBe(0.5);
		expect(overlay.map).toBe(mock.classes.Map.instances[0]);
	});
});

describe('Data', () => {
	it('adds GeoJSON, applies style and removes features on unmount', async () => {
		const mock = installGoogleMapsMock();
		const style = { fillColor: '#123456' };
		const { unmount } = render(MapHarness, {
			props: {
				component: Data,
				props: { geoJson: { type: 'FeatureCollection', features: [] }, style }
			}
		});

		await waitFor(() => expect(mock.classes.Data.instances).toHaveLength(1));
		const data = mock.classes.Data.instances[0];

		expect(data.map).toBe(mock.classes.Map.instances[0]);
		expect(data.style).toEqual(style);
		expect(data.features.size).toBe(1);

		unmount();
		expect(data.features.size).toBe(0);
		expect(data.map).toBeNull();
	});

	it('loads GeoJSON from a URL', async () => {
		const mock = installGoogleMapsMock();
		render(MapHarness, {
			props: { component: Data, props: { url: 'https://example.com/data.json' } }
		});

		await waitFor(() => expect(mock.classes.Data.instances).toHaveLength(1));
		const data = mock.classes.Data.instances[0];

		expect(data.loadCallbacks).toHaveLength(1);
		data.loadCallbacks[0]([{ id: 'a' }]);
		expect(data.features.size).toBe(1);
	});
});
