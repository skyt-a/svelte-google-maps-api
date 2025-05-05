import { defineConfig } from 'vite';
import { sveltepress } from '@sveltepress/vite';
import { defaultTheme } from '@sveltepress/theme-default';

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
						items: [
							{ title: 'APIProvider', to: '/components/api-provider/' },
							{ title: 'GoogleMap', to: '/components/google-map/' },
							{ title: 'Marker', to: '/components/marker/' },
							{ title: 'AdvancedMarker', to: '/components/advanced-marker/' },
							{ title: 'InfoWindow', to: '/components/info-window/' },
							{ title: 'Polyline', to: '/components/polyline/' },
							{ title: 'Polygon', to: '/components/polygon/' },
							{ title: 'Circle', to: '/components/circle/' },
							{ title: 'Rectangle', to: '/components/rectangle/' },
							{ title: 'HeatmapLayer', to: '/components/heatmap-layer/' },
							{ title: 'KmlLayer', to: '/components/kml-layer/' },
							{ title: 'TrafficLayer', to: '/components/traffic-layer/' },
							{ title: 'TransitLayer', to: '/components/transit-layer/' },
							{ title: 'BicyclingLayer', to: '/components/bicycling-layer/' },
							{ title: 'GroundOverlay', to: '/components/ground-overlay/' },
							{ title: 'MapControl', to: '/components/map-control/' },
							{ title: 'Autocomplete', to: '/components/autocomplete/' },
							{ title: 'OverlayView', to: '/components/overlay-view/' },
							{
								title: 'StreetViewPanorama',
								to: '/components/street-view-panorama/'
							}
						]
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
							items: [
								{ title: 'APIProvider', to: '/components/api-provider/' },
								{ title: 'GoogleMap', to: '/components/google-map/' },
								{ title: 'Marker', to: '/components/marker/' },
								{ title: 'AdvancedMarker', to: '/components/advanced-marker/' },
								{ title: 'InfoWindow', to: '/components/info-window/' },
								{ title: 'Polyline', to: '/components/polyline/' },
								{ title: 'Polygon', to: '/components/polygon/' },
								{ title: 'Circle', to: '/components/circle/' },
								{ title: 'Rectangle', to: '/components/rectangle/' },
								{ title: 'HeatmapLayer', to: '/components/heatmap-layer/' },
								{ title: 'KmlLayer', to: '/components/kml-layer/' },
								{ title: 'TrafficLayer', to: '/components/traffic-layer/' },
								{ title: 'TransitLayer', to: '/components/transit-layer/' },
								{ title: 'BicyclingLayer', to: '/components/bicycling-layer/' },
								{ title: 'GroundOverlay', to: '/components/ground-overlay/' },
								{ title: 'MapControl', to: '/components/map-control/' },
								{ title: 'Autocomplete', to: '/components/autocomplete/' },
								{ title: 'OverlayView', to: '/components/overlay-view/' },
								{
									title: 'StreetViewPanorama',
									to: '/components/street-view-panorama/'
								}
							]
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
