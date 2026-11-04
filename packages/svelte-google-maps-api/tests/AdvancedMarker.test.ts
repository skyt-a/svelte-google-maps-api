import { fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import MarkerHarness from './fixtures/MarkerHarness.svelte';
import { installGoogleMapsMock } from './googleMapsMock';

describe('AdvancedMarker', () => {
	it('creates a marker on the map and removes it on unmount', async () => {
		const mock = installGoogleMapsMock();
		const { unmount } = render(MarkerHarness);

		await waitFor(() => expect(mock.classes.AdvancedMarkerElement.instances).toHaveLength(1));
		const marker = mock.classes.AdvancedMarkerElement.instances[0];

		expect(marker.map).toBe(mock.classes.Map.instances[0]);
		expect(marker.position).toEqual({ lat: 35, lng: 139 });
		expect(marker.title).toBe('Tokyo');
		expect(marker.childElementCount).toBe(0);
		expect(mock.importLibrary).toHaveBeenCalledWith('marker');

		unmount();
		expect(marker.map).toBeNull();
	});

	it('uses rendered children as the marker content', async () => {
		const mock = installGoogleMapsMock();
		render(MarkerHarness, { props: { variant: 'content' } });

		await waitFor(() => expect(mock.classes.AdvancedMarkerElement.instances).toHaveLength(1));
		const marker = mock.classes.AdvancedMarkerElement.instances[0];

		expect(marker.querySelector('.custom-marker')).toHaveTextContent('Custom');
	});

	it('attaches children rendered after creation and restores the pin when they go away', async () => {
		const mock = installGoogleMapsMock();
		render(MarkerHarness, { props: { variant: 'delayed' } });

		await waitFor(() => expect(mock.classes.AdvancedMarkerElement.instances).toHaveLength(1));
		const marker = mock.classes.AdvancedMarkerElement.instances[0];
		expect(marker.childElementCount).toBe(0);

		await fireEvent.click(screen.getByText('content'));
		await waitFor(() => expect(marker.querySelector('.late-content')).toHaveTextContent('Late'));

		await fireEvent.click(screen.getByText('content'));
		await waitFor(() => expect(marker.childElementCount).toBe(0));
	});

	it('handles gmp-click and writes drag results back to bind:position', async () => {
		const mock = installGoogleMapsMock();
		const onClick = vi.fn();
		const onPosition = vi.fn();
		render(MarkerHarness, { props: { draggable: true, onClick, onPosition } });

		await waitFor(() => expect(mock.classes.AdvancedMarkerElement.instances).toHaveLength(1));
		const marker = mock.classes.AdvancedMarkerElement.instances[0];

		expect(marker.gmpDraggable).toBe(true);
		expect(marker.gmpClickable).toBe(true);

		marker.dispatchEvent(new Event('gmp-click'));
		expect(onClick).toHaveBeenCalledTimes(1);

		marker.position = { lat: 1, lng: 2 };
		marker.dispatchEvent(new Event('gmp-dragend'));

		await waitFor(() => expect(onPosition).toHaveBeenLastCalledWith({ lat: 1, lng: 2 }));
	});

	it('appends a Pin and keeps its properties in sync', async () => {
		const mock = installGoogleMapsMock();
		render(MarkerHarness, { props: { variant: 'pin' } });

		await waitFor(() => expect(mock.classes.PinElement.instances).toHaveLength(1));
		const marker = mock.classes.AdvancedMarkerElement.instances[0];
		const pin = mock.classes.PinElement.instances[0];

		await waitFor(() => expect(pin.parentElement).toBe(marker));
		expect(pin.background).toBe('#0f766e');
		expect(pin.glyphText).toBe('A');
		expect(pin.scale).toBe(1.2);

		await fireEvent.click(screen.getByText('glyph'));
		expect(pin.glyphText).toBe('B');
	});
});

describe('InfoWindow', () => {
	it('opens anchored to a marker and syncs bind:open', async () => {
		const mock = installGoogleMapsMock();
		const onOpen = vi.fn();
		render(MarkerHarness, { props: { variant: 'infoWindow', onOpen } });

		await waitFor(() => expect(mock.classes.InfoWindow.instances).toHaveLength(1));
		const infoWindow = mock.classes.InfoWindow.instances[0];
		const marker = mock.classes.AdvancedMarkerElement.instances[0];

		expect(infoWindow.open).toHaveBeenCalledWith(
			expect.objectContaining({ map: mock.classes.Map.instances[0], anchor: marker })
		);
		expect((infoWindow.content as HTMLElement).querySelector('.info-content')).toHaveTextContent(
			'Hello'
		);
		expect(infoWindow.headerContent).toBe('Header');

		// Closing from the map (close button) updates the bound value.
		infoWindow.close();
		await waitFor(() => expect(onOpen).toHaveBeenLastCalledWith(false));

		await fireEvent.click(screen.getByText('toggle'));
		await waitFor(() => expect(infoWindow.isOpen).toBe(true));
	});
});
