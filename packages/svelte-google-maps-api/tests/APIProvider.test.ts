import { render, screen, waitFor } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import { SCRIPT_ID } from '../src/lib/internal/loader.js';
import HookConsumer from './fixtures/HookConsumer.svelte';
import ProviderHarness from './fixtures/ProviderHarness.svelte';
import ProviderSnippetsHarness from './fixtures/ProviderSnippetsHarness.svelte';
import { installGoogleMapsMock } from './googleMapsMock';

describe('APIProvider', () => {
	it('shows the loading snippet until the script loads, then preloads libraries', async () => {
		const onLoad = vi.fn();
		render(ProviderSnippetsHarness, { props: { apiKey: 'KEY', onLoad } });

		expect(screen.getByText('loading map')).toBeInTheDocument();
		expect(screen.queryByText('children')).not.toBeInTheDocument();

		const script = document.getElementById(SCRIPT_ID) as HTMLScriptElement;
		const url = new URL(script.src);
		expect(url.searchParams.get('libraries')).toBe('places');
		expect(url.searchParams.get('language')).toBe('ja');

		const mock = installGoogleMapsMock();
		(window as unknown as Record<string, () => void>)[url.searchParams.get('callback') as string]();

		await waitFor(() => expect(screen.getByText('children')).toBeInTheDocument());
		await waitFor(() => expect(onLoad).toHaveBeenCalledTimes(1));
		expect(mock.importLibrary.mock.calls.map(([name]) => name).sort()).toEqual([
			'core',
			'maps',
			'places'
		]);
	});

	it('renders the error snippet and calls onError when the script fails', async () => {
		const onError = vi.fn();
		render(ProviderSnippetsHarness, { props: { apiKey: 'KEY', onError } });

		const script = document.getElementById(SCRIPT_ID) as HTMLScriptElement;
		script.onerror?.(new Event('error'));

		await waitFor(() =>
			expect(screen.getByText(/custom error: Failed to load/)).toBeInTheDocument()
		);
		expect(onError).toHaveBeenCalledWith(expect.any(Error));
	});

	it('fails fast without an API key', async () => {
		const onError = vi.fn();
		render(ProviderSnippetsHarness, { props: { apiKey: '', onError } });

		await waitFor(() => expect(screen.getByText(/apiKey is required/)).toBeInTheDocument());
		expect(document.getElementById(SCRIPT_ID)).toBeNull();
	});

	it('exposes loading status and libraries through hooks', async () => {
		installGoogleMapsMock();
		render(ProviderHarness, { props: { component: HookConsumer } });

		await waitFor(() => expect(screen.getByTestId('places')).toHaveTextContent('places ready'));
		expect(screen.getByTestId('status')).toHaveTextContent('loaded');
	});
});
