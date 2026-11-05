import { fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import ContentHarness from './fixtures/ContentHarness.svelte';
import { ControlPosition, installGoogleMapsMock } from './googleMapsMock';

describe('MapControl', () => {
	it('places its children in the map controls and moves them with position', async () => {
		const mock = installGoogleMapsMock();
		render(ContentHarness, { props: { variant: 'control' } });

		await waitFor(() => expect(mock.classes.Map.instances).toHaveLength(1));
		const map = mock.classes.Map.instances[0];
		await waitFor(() => expect(map.controls[ControlPosition.TOP_LEFT].getLength()).toBe(1));
		expect(map.controls[ControlPosition.TOP_LEFT].getAt(0)).toHaveTextContent('Control');

		await fireEvent.click(screen.getByText('move'));
		expect(map.controls[ControlPosition.TOP_LEFT].getLength()).toBe(0);
		expect(map.controls[ControlPosition.TOP_RIGHT].getLength()).toBe(1);

		await fireEvent.click(screen.getByText('hide'));
		expect(map.controls[ControlPosition.TOP_RIGHT].getLength()).toBe(0);
	});
});

describe('OverlayView', () => {
	it('renders children into the map pane at the projected position', async () => {
		const mock = installGoogleMapsMock();
		render(ContentHarness, { props: { variant: 'overlay' } });

		await waitFor(() => expect(mock.classes.Map.instances).toHaveLength(1));
		const pane = mock.classes.OverlayView.panes.overlayMouseTarget;
		await waitFor(() => expect(pane.querySelector('.overlay')).not.toBeNull());

		const container = pane.firstElementChild as HTMLElement;
		expect(container.style.left).toBe('35px');
		expect(container.style.top).toBe('25px');
		expect(container.style.visibility).toBe('visible');

		await fireEvent.click(screen.getByText('hide'));
		expect(pane.childElementCount).toBe(0);
	});
});
