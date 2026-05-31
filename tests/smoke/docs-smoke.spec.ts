import { expect, test } from '@playwright/test';

test('documentation home renders from the GitHub Pages base path', async ({ page }) => {
	await page.goto('./');

	await expect(page).toHaveTitle(/Svelte Google Maps API/);
	await expect(page.getByRole('link', { name: /Svelte Google Maps API/i }).first()).toBeVisible();
	await expect(page.getByRole('link', { name: 'Guide' })).toBeVisible();
	await expect(page.getByRole('link', { name: 'Examples' })).toBeVisible();
	await expect(page.getByRole('link', { name: 'Get Started' })).toBeVisible();
});

test('component docs include the synchronized Storybook entry', async ({ page }) => {
	await page.goto('./components/google-map/');

	await expect(page.getByRole('heading', { name: 'GoogleMap' })).toBeVisible();
	await expect(page.getByRole('link', { name: /Open the GoogleMap story/i })).toHaveAttribute(
		'href',
		/\/storybook\/\?path=\/story\/components-googlemap--basic/
	);
});

test('attached Storybook story renders the shared API key control', async ({ page }) => {
	await page.goto('./storybook/iframe.html?id=components-googlemap--basic&viewMode=story');

	await expect(page.getByLabel('Google Maps API key').first()).toBeVisible();
	await expect(page.getByPlaceholder('Paste an API key').first()).toBeVisible();
});

test('examples page renders without a Google Maps API key', async ({ page }) => {
	await page.goto('./examples/');

	await expect(page.getByText(/Google Maps API key/i).first()).toBeVisible();
	await expect(page.getByText(/Please enter your API key/i).first()).toBeVisible();
});
