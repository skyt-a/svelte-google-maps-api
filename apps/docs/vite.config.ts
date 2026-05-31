import { defineConfig } from 'vite';
import { sveltepress } from '@sveltepress/vite';
import { defaultTheme } from '@sveltepress/theme-default';
import { componentItems } from './src/lib/component-nav.js';

const navComponentItems = componentItems.map(({ title, to }) => ({ title, to }));

export default defineConfig({
	// base パスは GitHub Pages 用なのでそのままで良いか確認が必要
	base: '/svelte-google-maps-api/',
	plugins: [
		sveltepress({
			theme: defaultTheme({
				navbar: [
					{ title: 'Guide', to: '/guide/getting-started' },
					{
						title: 'Components',
						items: navComponentItems
					},
					{ title: 'Examples', to: '/examples' },
					{
						title: 'GitHub',
						to: 'https://github.com/skyt-a/svelte-google-maps-api',
						external: true
					}
				],
				sidebar: {
					'/guide/': [
						{
							title: 'Guide',
							items: [{ title: 'Getting Started', to: '/guide/getting-started' }]
						}
					],
					'/components/': [
						{
							title: 'Components',
							items: navComponentItems
						}
					]
				},
				github: 'https://github.com/skyt-a/svelte-google-maps-api',
				logo: '/images/svelte-google-maps-logo.png'
			}),
			siteConfig: {
				title: 'Svelte Google Maps API',
				description:
					'A Svelte component library for integrating Google Maps JavaScript API into Svelte applications'
			}
		})
	]
	// ssr と build.rollupOptions は Turborepo が解決するため削除
});
