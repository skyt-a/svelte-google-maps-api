import { describe, expect, it, vi } from 'vitest';
import { buildScriptUrl, loadMapsApi, SCRIPT_ID } from '../src/lib/internal/loader.js';

describe('loader', () => {
	it('builds the bootstrap URL with async loading and a callback', () => {
		const url = new URL(
			buildScriptUrl({
				apiKey: 'KEY',
				libraries: ['places', 'marker', 'places'],
				language: 'ja',
				region: 'JP',
				mapIds: ['a', 'b']
			})
		);

		expect(url.origin + url.pathname).toBe('https://maps.googleapis.com/maps/api/js');
		expect(url.searchParams.get('key')).toBe('KEY');
		expect(url.searchParams.get('v')).toBe('weekly');
		expect(url.searchParams.get('loading')).toBe('async');
		expect(url.searchParams.get('callback')).toBeTruthy();
		expect(url.searchParams.get('libraries')).toBe('marker,places');
		expect(url.searchParams.get('language')).toBe('ja');
		expect(url.searchParams.get('region')).toBe('JP');
		expect(url.searchParams.get('map_ids')).toBe('a,b');
	});

	it('injects the script once and resolves when the callback fires', async () => {
		const first = loadMapsApi({ apiKey: 'KEY', nonce: 'abc' });
		const second = loadMapsApi({ apiKey: 'KEY' });

		const scripts = document.querySelectorAll(`script#${SCRIPT_ID}`);
		expect(scripts).toHaveLength(1);
		expect((scripts[0] as HTMLScriptElement).nonce).toBe('abc');
		expect(second).toBe(first);

		const callbackName = new URL((scripts[0] as HTMLScriptElement).src).searchParams.get(
			'callback'
		) as string;
		(window as unknown as Record<string, () => void>)[callbackName]();

		await expect(first).resolves.toBeUndefined();
	});

	it('warns when loaded again with different options', () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

		loadMapsApi({ apiKey: 'KEY' });
		loadMapsApi({ apiKey: 'KEY', language: 'en' });

		expect(warn).toHaveBeenCalledWith(expect.stringContaining('already loaded'));
		warn.mockRestore();
	});

	it('rejects and allows a retry when the script fails', async () => {
		const promise = loadMapsApi({ apiKey: 'KEY' });
		const script = document.getElementById(SCRIPT_ID) as HTMLScriptElement;

		script.onerror?.(new Event('error'));

		await expect(promise).rejects.toThrow('Failed to load');
		expect(document.getElementById(SCRIPT_ID)).toBeNull();
		expect(loadMapsApi({ apiKey: 'KEY' })).not.toBe(promise);
	});

	it('reuses an API that was loaded by another script', async () => {
		(window as unknown as { google: unknown }).google = { maps: { importLibrary: vi.fn() } };

		await expect(loadMapsApi({ apiKey: 'KEY' })).resolves.toBeUndefined();
		expect(document.getElementById(SCRIPT_ID)).toBeNull();
	});
});
