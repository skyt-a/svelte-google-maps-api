import { render, waitFor } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import Circle from '../src/lib/Circle.svelte';
import Polygon from '../src/lib/Polygon.svelte';
import Polyline from '../src/lib/Polyline.svelte';
import Rectangle from '../src/lib/Rectangle.svelte';
import MapHarness from './fixtures/MapHarness.svelte';
import { installGoogleMapsMock, MockLatLng } from './googleMapsMock';

const path = [
	{ lat: 0, lng: 0 },
	{ lat: 1, lng: 1 }
];

describe('Polyline', () => {
	it('draws the path with style props and reports edits', async () => {
		const mock = installGoogleMapsMock();
		const onPathChanged = vi.fn();
		const onClick = vi.fn();
		const { unmount } = render(MapHarness, {
			props: {
				component: Polyline,
				props: { path, strokeColor: '#f00', editable: true, onPathChanged, onClick }
			}
		});

		await waitFor(() => expect(mock.classes.Polyline.instances).toHaveLength(1));
		const polyline = mock.classes.Polyline.instances[0];

		expect(polyline.map).toBe(mock.classes.Map.instances[0]);
		expect(polyline.options).toMatchObject({ strokeColor: '#f00', editable: true });
		expect(
			polyline
				.getPath()
				.getArray()
				.map((point) => point.toJSON())
		).toEqual(path);

		polyline.getPath().push(new MockLatLng(2, 2));
		expect(onPathChanged).toHaveBeenLastCalledWith([...path, { lat: 2, lng: 2 }]);

		polyline.trigger('click', { latLng: null });
		expect(onClick).toHaveBeenCalled();

		unmount();
		expect(polyline.map).toBeNull();
	});
});

describe('Polygon', () => {
	it('accepts a single ring and reports edits as rings', async () => {
		const mock = installGoogleMapsMock();
		const onPathsChanged = vi.fn();
		render(MapHarness, {
			props: { component: Polygon, props: { paths: path, fillColor: '#0f0', onPathsChanged } }
		});

		await waitFor(() => expect(mock.classes.Polygon.instances).toHaveLength(1));
		const polygon = mock.classes.Polygon.instances[0];

		expect(polygon.options).toMatchObject({ fillColor: '#0f0' });
		expect(polygon.getPaths().getLength()).toBe(1);

		polygon.getPaths().getAt(0).setAt(0, new MockLatLng(5, 5));
		expect(onPathsChanged).toHaveBeenLastCalledWith([[{ lat: 5, lng: 5 }, path[1]]]);
	});
});

describe('Circle', () => {
	it('creates the circle and reports center and radius changes', async () => {
		const mock = installGoogleMapsMock();
		const onCenterChanged = vi.fn();
		const onRadiusChanged = vi.fn();
		render(MapHarness, {
			props: {
				component: Circle,
				props: { center: { lat: 1, lng: 2 }, radius: 100, onCenterChanged, onRadiusChanged }
			}
		});

		await waitFor(() => expect(mock.classes.Circle.instances).toHaveLength(1));
		const circle = mock.classes.Circle.instances[0];

		expect(circle.getCenter()?.toJSON()).toEqual({ lat: 1, lng: 2 });
		expect(circle.getRadius()).toBe(100);

		circle.setRadius(250);
		circle.setCenter({ lat: 3, lng: 4 });
		expect(onRadiusChanged).toHaveBeenLastCalledWith(250);
		expect(onCenterChanged).toHaveBeenLastCalledWith({ lat: 3, lng: 4 });
	});
});

describe('Rectangle', () => {
	it('creates the rectangle and reports bounds changes', async () => {
		const mock = installGoogleMapsMock();
		const onBoundsChanged = vi.fn();
		const bounds = { north: 1, south: 0, east: 1, west: 0 };
		render(MapHarness, { props: { component: Rectangle, props: { bounds, onBoundsChanged } } });

		await waitFor(() => expect(mock.classes.Rectangle.instances).toHaveLength(1));
		const rectangle = mock.classes.Rectangle.instances[0];

		expect(rectangle.getBounds()?.toJSON()).toEqual(bounds);

		const next = { north: 2, south: 1, east: 2, west: 1 };
		rectangle.setBounds(next);
		expect(onBoundsChanged).toHaveBeenLastCalledWith(next);
	});
});
