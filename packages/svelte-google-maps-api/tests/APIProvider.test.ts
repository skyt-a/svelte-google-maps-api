import { render, screen, waitFor } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import APIProviderHarness from './fixtures/APIProviderHarness.svelte';
import { createGoogleMapsMock } from './googleMapsMock';

describe('APIProvider', () => {
	it('renders the error slot and calls onError when no credential is provided', async () => {
		const onError = vi.fn();
		const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);

		render(APIProviderHarness, {
			props: {
				onError
			}
		});

		await waitFor(() => {
			expect(screen.getByTestId('error').textContent).toBe(
				'apiKey or googleMapsClientId is required'
			);
		});
		expect(onError).toHaveBeenCalledWith(expect.any(Error));
		expect(consoleError).toHaveBeenCalled();

		consoleError.mockRestore();
	});

	it('creates the Google Maps script with sorted libraries and loads the default slot', async () => {
		const googleMaps = createGoogleMapsMock();
		const onLoad = vi.fn();

		render(APIProviderHarness, {
			props: {
				apiKey: 'test-key',
				libraries: ['places', 'marker'],
				language: 'ja',
				region: 'JP',
				id: 'maps-script',
				onLoad
			}
		});

		expect(screen.getByTestId('loading')).not.toBeNull();

		const script = document.getElementById('maps-script') as HTMLScriptElement;
		const src = new URL(script.src);

		expect(src.searchParams.get('key')).toBe('test-key');
		expect(src.searchParams.get('libraries')).toBe('marker,places');
		expect(src.searchParams.get('language')).toBe('ja');
		expect(src.searchParams.get('region')).toBe('JP');
		expect(src.searchParams.get('callback')).toBe('__svelteGoogleMapApiCallback__');

		(window as typeof window & { google: { maps: typeof google.maps } }).google = {
			maps: googleMaps.maps as unknown as typeof google.maps
		};
		(
			window as typeof window & { __svelteGoogleMapApiCallback__: () => void }
		).__svelteGoogleMapApiCallback__();

		await waitFor(() => {
			expect(screen.getByTestId('loaded')).not.toBeNull();
		});
		expect(googleMaps.importLibrary).toHaveBeenCalledWith('marker');
		expect(googleMaps.importLibrary).toHaveBeenCalledWith('places');
		expect(onLoad).toHaveBeenCalledTimes(1);
	});
});
