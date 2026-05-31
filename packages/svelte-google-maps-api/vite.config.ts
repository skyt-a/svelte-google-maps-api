import { svelte } from '@sveltejs/vite-plugin-svelte';
import { svelteTesting } from '@testing-library/svelte/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [svelte(), svelteTesting()],
	test: {
		environment: 'jsdom',
		clearMocks: true,
		include: ['tests/**/*.{test,spec}.{ts,js}'],
		setupFiles: ['./vitest-setup-client.ts']
	}
});
