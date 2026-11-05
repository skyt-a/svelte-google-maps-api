import { render, waitFor } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import StreetViewPanorama from '../src/lib/street-view/StreetViewPanorama.svelte';
import ProviderHarness from './fixtures/ProviderHarness.svelte';
import { installGoogleMapsMock } from './googleMapsMock';

describe('StreetViewPanorama', () => {
	it('creates a panorama in its own container and forwards events', async () => {
		const mock = installGoogleMapsMock();
		const onPanoChanged = vi.fn();
		const onLoad = vi.fn();
		const { unmount } = render(ProviderHarness, {
			props: {
				component: StreetViewPanorama,
				props: {
					position: { lat: 1, lng: 2 },
					pov: { heading: 90, pitch: 0 },
					class: 'pano',
					onPanoChanged,
					onLoad
				}
			}
		});

		await waitFor(() => expect(mock.classes.StreetViewPanorama.instances).toHaveLength(1));
		const panorama = mock.classes.StreetViewPanorama.instances[0];

		expect(mock.importLibrary).toHaveBeenCalledWith('streetView');
		expect(panorama.element).toHaveClass('pano');
		expect(panorama.getPosition()?.toJSON()).toEqual({ lat: 1, lng: 2 });
		expect(panorama.getPov()).toEqual({ heading: 90, pitch: 0 });
		expect(onLoad).toHaveBeenCalledWith(panorama);

		panorama.trigger('pano_changed');
		expect(onPanoChanged).toHaveBeenCalledWith('pano-id');

		unmount();
		expect(mock.event.clearInstanceListeners).toHaveBeenCalledWith(panorama);
	});
});
