import { render, waitFor } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import BicyclingLayer from '../src/lib/layers/BicyclingLayer.svelte';
import HeatmapLayer from '../src/lib/HeatmapLayer.svelte';
import KmlLayer from '../src/lib/layers/KmlLayer.svelte';
import TrafficLayer from '../src/lib/layers/TrafficLayer.svelte';
import TransitLayer from '../src/lib/layers/TransitLayer.svelte';
import MapContextHarness from './fixtures/MapContextHarness.svelte';
import { createGoogleMapsMock } from './googleMapsMock';

describe('map layer components', () => {
	it('creates TrafficLayer with the map and clears it on unmount', async () => {
		const googleMaps = createGoogleMapsMock();
		const map = new googleMaps.classes.Map(document.createElement('div'), {});
		const onLoad = vi.fn();
		const onUnmount = vi.fn();

		const { unmount } = render(MapContextHarness, {
			props: {
				component: TrafficLayer,
				googleMapsApi: googleMaps.maps as unknown as typeof google.maps,
				map: map as unknown as google.maps.Map,
				props: {
					onLoad,
					onUnmount
				}
			}
		});

		await waitFor(() => {
			expect(googleMaps.classes.TrafficLayer.instances).toHaveLength(1);
		});

		const layer = googleMaps.classes.TrafficLayer.instances[0];

		expect(layer.map).toBe(map);
		expect(onLoad).toHaveBeenCalledWith(layer);

		unmount();

		expect(layer.setMap).toHaveBeenCalledWith(null);
		expect(onUnmount).toHaveBeenCalledWith(layer);
	});

	it('attaches BicyclingLayer and TransitLayer to the map', async () => {
		const googleMaps = createGoogleMapsMock();
		const map = new googleMaps.classes.Map(document.createElement('div'), {});

		const bicycling = render(MapContextHarness, {
			props: {
				component: BicyclingLayer,
				googleMapsApi: googleMaps.maps as unknown as typeof google.maps,
				map: map as unknown as google.maps.Map
			}
		});
		const transit = render(MapContextHarness, {
			props: {
				component: TransitLayer,
				googleMapsApi: googleMaps.maps as unknown as typeof google.maps,
				map: map as unknown as google.maps.Map
			}
		});

		await waitFor(() => {
			expect(googleMaps.classes.BicyclingLayer.instances).toHaveLength(1);
			expect(googleMaps.classes.TransitLayer.instances).toHaveLength(1);
		});

		const bicyclingLayer = googleMaps.classes.BicyclingLayer.instances[0];
		const transitLayer = googleMaps.classes.TransitLayer.instances[0];

		expect(bicyclingLayer.setMap).toHaveBeenCalledWith(map);
		expect(transitLayer.setMap).toHaveBeenCalledWith(map);

		bicycling.unmount();
		transit.unmount();

		expect(bicyclingLayer.setMap).toHaveBeenLastCalledWith(null);
		expect(transitLayer.setMap).toHaveBeenLastCalledWith(null);
	});

	it('creates KmlLayer with options, wires events, and clears it on unmount', async () => {
		const googleMaps = createGoogleMapsMock();
		const map = new googleMaps.classes.Map(document.createElement('div'), {});
		const onClick = vi.fn();
		const onLoad = vi.fn();
		const onUnmount = vi.fn();

		const { unmount } = render(MapContextHarness, {
			props: {
				component: KmlLayer,
				googleMapsApi: googleMaps.maps as unknown as typeof google.maps,
				map: map as unknown as google.maps.Map,
				props: {
					url: 'https://example.com/layer.kml',
					preserveViewport: true,
					onClick,
					onLoad,
					onUnmount
				}
			}
		});

		await waitFor(() => {
			expect(googleMaps.classes.KmlLayer.instances).toHaveLength(1);
		});

		const layer = googleMaps.classes.KmlLayer.instances[0];

		expect(layer.options).toMatchObject({
			map,
			url: 'https://example.com/layer.kml',
			preserveViewport: true
		});
		expect(layer.addListener).toHaveBeenCalledWith('click', onClick);
		expect(onLoad).toHaveBeenCalledWith(layer);

		unmount();

		expect(layer.setMap).toHaveBeenCalledWith(null);
		expect(onUnmount).toHaveBeenCalledWith(layer);
	});

	it('creates HeatmapLayer, converts literal data, and clears it on unmount', async () => {
		const googleMaps = createGoogleMapsMock();
		const map = new googleMaps.classes.Map(document.createElement('div'), {});
		const onLoad = vi.fn();
		const onUnmount = vi.fn();
		const consoleLog = vi.spyOn(console, 'log').mockImplementation(() => undefined);
		const data = [
			{ lat: 35, lng: 139 },
			{ location: { lat: 36, lng: 140 }, weight: 2 }
		];

		const { unmount } = render(MapContextHarness, {
			props: {
				component: HeatmapLayer,
				googleMapsApi: googleMaps.maps as unknown as typeof google.maps,
				map: map as unknown as google.maps.Map,
				props: {
					data,
					opacity: 0.6,
					onLoad,
					onUnmount
				}
			}
		});

		await waitFor(() => {
			expect(googleMaps.classes.HeatmapLayer.instances).toHaveLength(1);
		});

		const layer = googleMaps.classes.HeatmapLayer.instances[0];

		expect(layer.options.map).toBe(map);
		expect(layer.options.opacity).toBe(0.6);
		expect(layer.data).toHaveLength(2);
		expect(layer.data[0]).toBeInstanceOf(googleMaps.classes.LatLng);
		expect(onLoad).toHaveBeenCalledWith(layer);

		unmount();

		expect(layer.setMap).toHaveBeenCalledWith(null);
		expect(onUnmount).toHaveBeenCalledWith(layer);
		consoleLog.mockRestore();
	});
});
