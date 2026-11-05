import { render, waitFor } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import PlaceAutocomplete from '../src/lib/places/PlaceAutocomplete.svelte';
import ProviderHarness from './fixtures/ProviderHarness.svelte';
import { installGoogleMapsMock } from './googleMapsMock';

function selectEvent(place: object) {
	return Object.assign(new Event('gmp-select'), {
		placePrediction: { toPlace: () => place }
	});
}

describe('PlaceAutocomplete', () => {
	it('mounts a PlaceAutocompleteElement with the given options', async () => {
		const mock = installGoogleMapsMock();
		const { container } = render(ProviderHarness, {
			props: {
				component: PlaceAutocomplete,
				props: { placeholder: 'Search', includedRegionCodes: ['jp'], class: 'search' }
			}
		});

		await waitFor(() => expect(mock.classes.PlaceAutocompleteElement.instances).toHaveLength(1));
		const element = mock.classes.PlaceAutocompleteElement.instances[0] as unknown as Record<
			string,
			unknown
		> &
			HTMLElement;

		expect(mock.importLibrary).toHaveBeenCalledWith('places');
		expect(element.placeholder).toBe('Search');
		expect(element.includedRegionCodes).toEqual(['jp']);
		expect(container.querySelector('.search')?.contains(element)).toBe(true);
	});

	it('fetches the requested fields before calling onPlaceSelect', async () => {
		const mock = installGoogleMapsMock();
		const onPlaceSelect = vi.fn();
		render(ProviderHarness, {
			props: { component: PlaceAutocomplete, props: { fields: ['displayName'], onPlaceSelect } }
		});

		await waitFor(() => expect(mock.classes.PlaceAutocompleteElement.instances).toHaveLength(1));
		const element = mock.classes.PlaceAutocompleteElement.instances[0];
		const place = { fetchFields: vi.fn().mockResolvedValue(undefined) };

		element.dispatchEvent(selectEvent(place));

		await waitFor(() => expect(onPlaceSelect).toHaveBeenCalledWith(place));
		expect(place.fetchFields).toHaveBeenCalledWith({ fields: ['displayName'] });
	});

	it('reports fetch failures through onError', async () => {
		const mock = installGoogleMapsMock();
		const onError = vi.fn();
		render(ProviderHarness, { props: { component: PlaceAutocomplete, props: { onError } } });

		await waitFor(() => expect(mock.classes.PlaceAutocompleteElement.instances).toHaveLength(1));
		const element = mock.classes.PlaceAutocompleteElement.instances[0];

		element.dispatchEvent(
			selectEvent({ fetchFields: vi.fn().mockRejectedValue(new Error('nope')) })
		);
		await waitFor(() => expect(onError).toHaveBeenCalledWith(new Error('nope')));

		element.dispatchEvent(new Event('gmp-error'));
		await waitFor(() => expect(onError).toHaveBeenCalledTimes(2));
	});
});
