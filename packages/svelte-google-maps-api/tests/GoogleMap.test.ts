import { fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import CameraHarness from './fixtures/CameraHarness.svelte';
import { installGoogleMapsMock } from './googleMapsMock';

describe('GoogleMap', () => {
	it('creates the map with camera props and creation-only options', async () => {
		const mock = installGoogleMapsMock();
		render(CameraHarness);

		await waitFor(() => expect(mock.classes.Map.instances).toHaveLength(1));
		const map = mock.classes.Map.instances[0];

		expect(map.element).toHaveClass('test-map');
		expect(map.options).toMatchObject({ mapId: 'DEMO_MAP_ID', zoom: 10 });
		expect(map.getCenter()?.toJSON()).toEqual({ lat: 35, lng: 139 });
	});

	it('pushes prop changes to the map', async () => {
		const mock = installGoogleMapsMock();
		render(CameraHarness);
		await waitFor(() => expect(mock.classes.Map.instances).toHaveLength(1));
		const map = mock.classes.Map.instances[0];

		await fireEvent.click(screen.getByText('move'));
		await fireEvent.click(screen.getByText('zoom'));

		expect(map.getCenter()?.toJSON()).toEqual({ lat: 1, lng: 2 });
		expect(map.getZoom()).toBe(4);
	});

	it('writes user camera changes back through bind:center and bind:zoom', async () => {
		const mock = installGoogleMapsMock();
		const onCenter = vi.fn();
		const onZoom = vi.fn();
		render(CameraHarness, { props: { onCenter, onZoom } });
		await waitFor(() => expect(mock.classes.Map.instances).toHaveLength(1));
		const map = mock.classes.Map.instances[0];

		map.setCenter({ lat: 10, lng: 20 });
		map.setZoom(15);

		await waitFor(() => expect(onCenter).toHaveBeenLastCalledWith({ lat: 10, lng: 20 }));
		await waitFor(() => expect(onZoom).toHaveBeenLastCalledWith(15));
	});

	it('forwards map events and removes listeners on unmount', async () => {
		const mock = installGoogleMapsMock();
		const onClick = vi.fn();
		const { unmount } = render(CameraHarness, { props: { onClick } });
		await waitFor(() => expect(mock.classes.Map.instances).toHaveLength(1));
		const map = mock.classes.Map.instances[0];

		map.trigger('click', { latLng: null });
		expect(onClick).toHaveBeenCalledWith({ latLng: null });

		unmount();
		expect(mock.event.clearInstanceListeners).toHaveBeenCalledWith(map);
	});
});
