import { fireEvent, render, waitFor } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import Autocomplete from '../src/lib/places/Autocomplete.svelte';
import StandaloneSearchBox from '../src/lib/places/StandaloneSearchBox.svelte';
import MapContextHarness from './fixtures/MapContextHarness.svelte';
import MapContextNoSlotHarness from './fixtures/MapContextNoSlotHarness.svelte';
import { createGoogleMapsMock } from './googleMapsMock';

function getListener(
	listeners: Array<{
		instance?: unknown;
		eventName: string;
		handler: (...args: unknown[]) => unknown;
	}>,
	instance: unknown,
	eventName: string
) {
	const listener = listeners.find(
		(candidate) => candidate.instance === instance && candidate.eventName === eventName
	);
	if (!listener) {
		throw new Error(`Listener not found: ${eventName}`);
	}
	return listener;
}

describe('places components', () => {
	it('creates Autocomplete, syncs input value, dispatches place changes, and cleans up', async () => {
		const googleMaps = createGoogleMapsMock();
		const onPlaceChanged = vi.fn();
		const onLoad = vi.fn();
		const onUnmount = vi.fn();

		const { container, unmount } = render(MapContextHarness, {
			props: {
				component: Autocomplete,
				googleMapsApi: googleMaps.maps as unknown as typeof google.maps,
				props: {
					value: 'Initial',
					placeholder: 'Search',
					fields: ['name'],
					onPlaceChanged,
					onLoad,
					onUnmount
				}
			}
		});

		const input = container.querySelector('input');
		if (!input) throw new Error('Autocomplete input was not rendered.');

		await waitFor(() => {
			expect(googleMaps.classes.Autocomplete.instances).toHaveLength(1);
		});

		const autocomplete = googleMaps.classes.Autocomplete.instances[0];

		expect(autocomplete.input).toBe(input);
		expect(autocomplete.options).toMatchObject({ fields: ['name'] });
		expect(onLoad).toHaveBeenCalledWith(autocomplete);
		expect(input.value).toBe('Initial');

		await fireEvent.input(input, { target: { value: 'Typed' } });
		expect(input.value).toBe('Typed');

		getListener(googleMaps.listeners, autocomplete, 'place_changed').handler();

		await waitFor(() => {
			expect(onPlaceChanged).toHaveBeenCalledTimes(1);
			expect(input.value).toBe('Tokyo Station');
		});

		unmount();

		expect(googleMaps.event.clearInstanceListeners).toHaveBeenCalledWith(autocomplete);
		expect(googleMaps.event.clearInstanceListeners).toHaveBeenCalledWith(input);
		expect(onUnmount).toHaveBeenCalledWith(autocomplete);
	});

	it('creates StandaloneSearchBox, handles places changes, and cleans up', async () => {
		const googleMaps = createGoogleMapsMock();
		const onPlacesChanged = vi.fn();
		const onLoad = vi.fn();
		const onUnmount = vi.fn();
		const bounds = { north: 36, south: 35, east: 140, west: 139 };

		const { container, unmount } = render(MapContextNoSlotHarness, {
			props: {
				component: StandaloneSearchBox,
				googleMapsApi: googleMaps.maps as unknown as typeof google.maps,
				props: {
					value: 'Initial',
					bounds,
					onPlacesChanged,
					onLoad,
					onUnmount
				}
			}
		});

		const input = container.querySelector('input');
		if (!input) throw new Error('StandaloneSearchBox input was not rendered.');

		await waitFor(() => {
			expect(googleMaps.classes.SearchBox.instances).toHaveLength(1);
		});

		const searchBox = googleMaps.classes.SearchBox.instances[0];

		expect(searchBox.input).toBe(input);
		expect(searchBox.setBounds).toHaveBeenCalledWith(bounds);
		expect(onLoad).toHaveBeenCalledWith(searchBox);

		getListener(googleMaps.listeners, searchBox, 'places_changed').handler();

		expect(onPlacesChanged).toHaveBeenCalledWith(searchBox.places);

		unmount();

		expect(googleMaps.event.clearInstanceListeners).toHaveBeenCalledWith(searchBox);
		expect(onUnmount).toHaveBeenCalledWith(searchBox);
	});
});
