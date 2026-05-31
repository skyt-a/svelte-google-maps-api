import { render, waitFor } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import Circle from '../src/lib/Circle.svelte';
import Polygon from '../src/lib/Polygon.svelte';
import Polyline from '../src/lib/Polyline.svelte';
import Rectangle from '../src/lib/Rectangle.svelte';
import MapContextHarness from './fixtures/MapContextHarness.svelte';
import { createGoogleMapsMock } from './googleMapsMock';

describe('shape components', () => {
	it('creates Polyline, registers path listeners, and clears it on unmount', async () => {
		const googleMaps = createGoogleMapsMock();
		const map = new googleMaps.classes.Map(document.createElement('div'), {});
		const onClick = vi.fn();
		const onPathChanged = vi.fn();
		const onLoad = vi.fn();
		const onUnmount = vi.fn();
		const path = [
			{ lat: 35, lng: 139 },
			{ lat: 36, lng: 140 }
		];

		const { unmount } = render(MapContextHarness, {
			props: {
				component: Polyline,
				googleMapsApi: googleMaps.maps as unknown as typeof google.maps,
				map: map as unknown as google.maps.Map,
				props: {
					path,
					strokeColor: '#ff0000',
					onClick,
					onPathChanged,
					onLoad,
					onUnmount
				}
			}
		});

		await waitFor(() => {
			expect(googleMaps.classes.Polyline.instances).toHaveLength(1);
		});

		const polyline = googleMaps.classes.Polyline.instances[0];

		expect(polyline.options).toMatchObject({
			map,
			path,
			strokeColor: '#ff0000'
		});
		expect(onLoad).toHaveBeenCalledWith(polyline);
		expect(polyline.addListener).toHaveBeenCalledWith('click', onClick);
		expect(googleMaps.event.addListener).toHaveBeenCalledWith(
			polyline.pathArray,
			'insert_at',
			expect.any(Function)
		);

		unmount();

		expect(polyline.setMap).toHaveBeenCalledWith(null);
		expect(onUnmount).toHaveBeenCalledWith(polyline);
	});

	it('creates Polygon, registers path listeners, and clears it on unmount', async () => {
		const googleMaps = createGoogleMapsMock();
		const map = new googleMaps.classes.Map(document.createElement('div'), {});
		const onClick = vi.fn();
		const onPathsChanged = vi.fn();
		const onLoad = vi.fn();
		const onUnmount = vi.fn();
		const paths = [[{ lat: 35, lng: 139 }], [{ lat: 36, lng: 140 }]];

		const { unmount } = render(MapContextHarness, {
			props: {
				component: Polygon,
				googleMapsApi: googleMaps.maps as unknown as typeof google.maps,
				map: map as unknown as google.maps.Map,
				props: {
					paths,
					fillColor: '#00ff00',
					onClick,
					onPathsChanged,
					onLoad,
					onUnmount
				}
			}
		});

		await waitFor(() => {
			expect(googleMaps.classes.Polygon.instances).toHaveLength(1);
		});

		const polygon = googleMaps.classes.Polygon.instances[0];

		expect(polygon.options).toMatchObject({
			map,
			paths,
			fillColor: '#00ff00'
		});
		expect(onLoad).toHaveBeenCalledWith(polygon);
		expect(polygon.addListener).toHaveBeenCalledWith('click', onClick);
		expect(googleMaps.event.addListener).toHaveBeenCalledWith(
			polygon.pathsArray,
			'insert_at',
			expect.any(Function)
		);

		unmount();

		expect(polygon.setMap).toHaveBeenCalledWith(null);
		expect(onUnmount).toHaveBeenCalledWith(polygon);
	});

	it('creates Circle with geometry options and clears it on unmount', async () => {
		const googleMaps = createGoogleMapsMock();
		const map = new googleMaps.classes.Map(document.createElement('div'), {});
		const onCenterChanged = vi.fn();
		const onLoad = vi.fn();
		const onUnmount = vi.fn();
		const center = { lat: 35, lng: 139 };

		const { unmount } = render(MapContextHarness, {
			props: {
				component: Circle,
				googleMapsApi: googleMaps.maps as unknown as typeof google.maps,
				map: map as unknown as google.maps.Map,
				props: {
					center,
					radius: 1000,
					fillOpacity: 0.5,
					onCenterChanged,
					onLoad,
					onUnmount
				}
			}
		});

		await waitFor(() => {
			expect(googleMaps.classes.Circle.instances).toHaveLength(1);
		});

		const circle = googleMaps.classes.Circle.instances[0];

		expect(circle.options).toMatchObject({
			map,
			center,
			radius: 1000,
			fillOpacity: 0.5
		});
		expect(circle.addListener).toHaveBeenCalledWith('center_changed', onCenterChanged);
		expect(onLoad).toHaveBeenCalledWith(circle);

		unmount();

		expect(circle.setMap).toHaveBeenCalledWith(null);
		expect(onUnmount).toHaveBeenCalledWith(circle);
	});

	it('creates Rectangle with bounds options and clears it on unmount', async () => {
		const googleMaps = createGoogleMapsMock();
		const map = new googleMaps.classes.Map(document.createElement('div'), {});
		const onBoundsChanged = vi.fn();
		const onLoad = vi.fn();
		const onUnmount = vi.fn();
		const bounds = { north: 36, south: 35, east: 140, west: 139 };

		const { unmount } = render(MapContextHarness, {
			props: {
				component: Rectangle,
				googleMapsApi: googleMaps.maps as unknown as typeof google.maps,
				map: map as unknown as google.maps.Map,
				props: {
					bounds,
					editable: true,
					onBoundsChanged,
					onLoad,
					onUnmount
				}
			}
		});

		await waitFor(() => {
			expect(googleMaps.classes.Rectangle.instances).toHaveLength(1);
		});

		const rectangle = googleMaps.classes.Rectangle.instances[0];

		expect(rectangle.options).toMatchObject({
			map,
			bounds,
			editable: true
		});
		expect(rectangle.addListener).toHaveBeenCalledWith('bounds_changed', onBoundsChanged);
		expect(onLoad).toHaveBeenCalledWith(rectangle);

		unmount();

		expect(rectangle.setMap).toHaveBeenCalledWith(null);
		expect(onUnmount).toHaveBeenCalledWith(rectangle);
	});
});
