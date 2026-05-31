import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './tests/smoke',
	timeout: 30_000,
	fullyParallel: true,
	use: {
		baseURL: 'http://127.0.0.1:4173/svelte-google-maps-api/',
		trace: 'on-first-retry'
	},
	webServer: {
		command: 'node scripts/serve-docs-build.mjs',
		url: 'http://127.0.0.1:4173/svelte-google-maps-api/',
		reuseExistingServer: !process.env.CI,
		timeout: 10_000
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] }
		}
	]
});
