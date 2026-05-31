import { render, screen, waitFor } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import GroundOverlay from '../src/lib/GroundOverlay.svelte';
import InfoBox from '../src/lib/InfoBox.svelte';
import InfoWindow from '../src/lib/InfoWindow.svelte';
import OverlayView from '../src/lib/overlay/OverlayView.svelte';
import MapContextHarness from './fixtures/MapContextHarness.svelte';
import { createGoogleMapsMock, installGoogleMapsMock } from './googleMapsMock';

describe('overlay components', () => {
	it('creates InfoWindow with slot content, opens it, wires events, and closes on unmount', async () => {
		const googleMaps = createGoogleMapsMock();
		const map = new googleMaps.classes.Map(document.createElement('div'), {});
		const consoleLog = vi.spyOn(console, 'log').mockImplementation(() => undefined);
		const onCloseClick = vi.fn();
		const onLoad = vi.fn();
		const onUnmount = vi.fn();

		const { unmount } = render(MapContextHarness, {
			props: {
				component: InfoWindow,
				googleMapsApi: googleMaps.maps as unknown as typeof google.maps,
				map: map as unknown as google.maps.Map,
				props: {
					position: { lat: 35, lng: 139 },
					zIndex: 4,
					onCloseClick,
					onLoad,
					onUnmount
				}
			}
		});

		await waitFor(() => {
			expect(googleMaps.classes.InfoWindow.instances).toHaveLength(1);
		});

		const infoWindow = googleMaps.classes.InfoWindow.instances[0];

		expect(infoWindow.options.position).toEqual({ lat: 35, lng: 139 });
		expect(infoWindow.options.content).toBeInstanceOf(HTMLDivElement);
		expect(infoWindow.open).toHaveBeenCalledWith({ map, anchor: undefined, shouldFocus: true });
		expect(infoWindow.addListener).toHaveBeenCalledWith('closeclick', expect.any(Function));
		expect(onLoad).toHaveBeenCalledWith(infoWindow);

		unmount();

		expect(googleMaps.event.clearInstanceListeners).toHaveBeenCalledWith(infoWindow);
		expect(infoWindow.close).toHaveBeenCalled();
		expect(onUnmount).toHaveBeenCalledWith(infoWindow);
		consoleLog.mockRestore();
	});

	it('creates InfoBox, attaches content to panes, and closes on unmount', async () => {
		const googleMaps = createGoogleMapsMock();
		const map = new googleMaps.classes.Map(document.createElement('div'), {});
		const position = new googleMaps.classes.LatLng(35, 139);
		const onCloseClick = vi.fn();
		const onLoad = vi.fn();
		const onUnmount = vi.fn();

		const { unmount } = render(MapContextHarness, {
			props: {
				component: InfoBox,
				googleMapsApi: googleMaps.maps as unknown as typeof google.maps,
				map: map as unknown as google.maps.Map,
				props: {
					position,
					zIndex: 10,
					onCloseClick,
					onLoad,
					onUnmount
				}
			}
		});

		await waitFor(() => {
			expect(onLoad).toHaveBeenCalledTimes(1);
		});

		const infoBox = onLoad.mock.calls[0]?.[0];
		if (!infoBox) throw new Error('InfoBox was not loaded.');

		expect(infoBox.getPosition()).toBe(position);
		expect(infoBox.getZIndex()).toBe(10);
		expect(googleMaps.event.addListener).toHaveBeenCalledWith(infoBox, 'closeclick', onCloseClick);

		unmount();

		expect(onUnmount).toHaveBeenCalledWith(infoBox);
		expect(infoBox.getVisible()).toBe(true);
	});

	it('creates GroundOverlay with url and bounds, wires events, and clears it on unmount', async () => {
		const googleMaps = createGoogleMapsMock();
		const map = new googleMaps.classes.Map(document.createElement('div'), {});
		const bounds = { north: 36, south: 35, east: 140, west: 139 };
		const onClick = vi.fn();
		const onLoad = vi.fn();
		const onUnmount = vi.fn();

		const { unmount } = render(MapContextHarness, {
			props: {
				component: GroundOverlay,
				googleMapsApi: googleMaps.maps as unknown as typeof google.maps,
				map: map as unknown as google.maps.Map,
				props: {
					url: 'https://example.com/overlay.png',
					bounds,
					opacity: 0.75,
					onClick,
					onLoad,
					onUnmount
				}
			}
		});

		await waitFor(() => {
			expect(googleMaps.classes.GroundOverlay.instances).toHaveLength(1);
		});

		const overlay = googleMaps.classes.GroundOverlay.instances[0];

		expect(overlay.url).toBe('https://example.com/overlay.png');
		expect(overlay.bounds).toEqual(bounds);
		expect(overlay.options).toMatchObject({ map, opacity: 0.75 });
		expect(overlay.addListener).toHaveBeenCalledWith('click', onClick);
		expect(onLoad).toHaveBeenCalledWith(overlay);

		unmount();

		expect(overlay.setMap).toHaveBeenCalledWith(null);
		expect(onUnmount).toHaveBeenCalledWith(overlay);
	});

	it('creates OverlayView, positions slot content, and removes it on unmount', async () => {
		const googleMaps = installGoogleMapsMock();
		const map = new googleMaps.classes.Map(document.createElement('div'), {});
		const consoleLog = vi.spyOn(console, 'log').mockImplementation(() => undefined);
		const appendedDisplayValues: string[] = [];
		const originalAppendChild = googleMaps.panes.floatPane.appendChild.bind(
			googleMaps.panes.floatPane
		);
		const appendChild = vi
			.spyOn(googleMaps.panes.floatPane, 'appendChild')
			.mockImplementation((node) => {
				appendedDisplayValues.push((node as HTMLElement).style.display);
				return originalAppendChild(node);
			});
		const onLoad = vi.fn();
		const onUnmount = vi.fn();

		const { unmount } = render(MapContextHarness, {
			props: {
				component: OverlayView,
				googleMapsApi: googleMaps.maps as unknown as typeof google.maps,
				map: map as unknown as google.maps.Map,
				props: {
					position: { lat: 35, lng: 139 },
					onLoad,
					onUnmount
				}
			}
		});

		await waitFor(() => {
			expect(onLoad).toHaveBeenCalledTimes(1);
		});

		const overlay = onLoad.mock.calls[0]?.[0];
		if (!overlay) throw new Error('OverlayView was not loaded.');

		await waitFor(() => {
			expect(screen.queryByTestId('slot-content')).not.toBeNull();
			expect(googleMaps.panes.floatPane.textContent).toContain('slot content');
		});
		expect(appendedDisplayValues).toEqual(['none']);
		expect(screen.getByTestId('slot-content').parentElement?.style.display).toBe('');

		unmount();

		expect(onUnmount).toHaveBeenCalledWith(overlay);
		appendChild.mockRestore();
		consoleLog.mockRestore();
	});
});
