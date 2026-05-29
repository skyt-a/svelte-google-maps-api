import type { StorybookConfig } from '@storybook/svelte-vite';

const config: StorybookConfig = {
	stories: ['../src/**/*.stories.@(ts|svelte)'],
	addons: [],
	framework: {
		name: '@storybook/svelte-vite',
		options: {}
	},
	viteFinal: async (config) => {
		const { svelte } = await import('@sveltejs/vite-plugin-svelte');

		return {
			...config,
			plugins: [svelte(), ...(config.plugins ?? [])]
		};
	},
	docs: {
		autodocs: true
	}
};

export default config;
