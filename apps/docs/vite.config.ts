import { defineConfig } from 'vite';
import { sveltepress } from '@sveltepress/vite';
import { defaultTheme } from '@sveltepress/theme-default';

const componentItems = [
	{ title: 'APIProvider', to: '/components/api-provider/' },
	{ title: 'GoogleMap', to: '/components/google-map/' },
	{ title: 'Marker', to: '/components/marker/' },
	{ title: 'AdvancedMarker', to: '/components/advanced-marker/' },
	{ title: 'MarkerClusterer', to: '/components/marker-clusterer/' },
	{ title: 'GoogleMarkerClusterer', to: '/components/google-marker-clusterer/' },
	{ title: 'InfoWindow', to: '/components/info-window/' },
	{ title: 'InfoBox', to: '/components/info-box/' },
	{ title: 'Polyline', to: '/components/polyline/' },
	{ title: 'Polygon', to: '/components/polygon/' },
	{ title: 'Circle', to: '/components/circle/' },
	{ title: 'Rectangle', to: '/components/rectangle/' },
	{ title: 'Data', to: '/components/data/' },
	{ title: 'DrawingManager', to: '/components/drawing-manager/' },
	{ title: 'DirectionsRenderer', to: '/components/directions-renderer/' },
	{ title: 'DirectionsService', to: '/components/directions-service/' },
	{ title: 'DistanceMatrixService', to: '/components/distance-matrix-service/' },
	{ title: 'HeatmapLayer', to: '/components/heatmap-layer/' },
	{ title: 'KmlLayer', to: '/components/kml-layer/' },
	{ title: 'TrafficLayer', to: '/components/traffic-layer/' },
	{ title: 'TransitLayer', to: '/components/transit-layer/' },
	{ title: 'BicyclingLayer', to: '/components/bicycling-layer/' },
	{ title: 'GroundOverlay', to: '/components/ground-overlay/' },
	{ title: 'MapControl', to: '/components/map-control/' },
	{ title: 'Autocomplete', to: '/components/autocomplete/' },
	{ title: 'StandaloneSearchBox', to: '/components/standalone-search-box/' },
	{ title: 'OverlayView', to: '/components/overlay-view/' },
	{ title: 'StreetViewPanorama', to: '/components/street-view-panorama/' },
	{ title: 'StreetViewService', to: '/components/street-view-service/' }
];

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
						items: componentItems
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
							items: componentItems
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
