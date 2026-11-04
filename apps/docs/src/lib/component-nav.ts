export type ComponentNavItem = {
	title: string;
	to: string;
	storyId: string;
};

export const componentItems = [
	{
		title: 'APIProvider',
		to: '/components/api-provider/',
		storyId: 'components-apiprovider--basic'
	},
	{
		title: 'GoogleMap',
		to: '/components/google-map/',
		storyId: 'components-googlemap--basic'
	},
	{
		title: 'AdvancedMarker',
		to: '/components/advanced-marker/',
		storyId: 'components-advancedmarker--basic'
	},
	{
		title: 'Pin',
		to: '/components/pin/',
		storyId: 'components-pin--basic'
	},
	{
		title: 'MarkerClusterer',
		to: '/components/marker-clusterer/',
		storyId: 'components-markerclusterer--basic'
	},
	{
		title: 'InfoWindow',
		to: '/components/info-window/',
		storyId: 'components-infowindow--basic'
	},
	{
		title: 'Polyline',
		to: '/components/polyline/',
		storyId: 'components-polyline--basic'
	},
	{
		title: 'Polygon',
		to: '/components/polygon/',
		storyId: 'components-polygon--basic'
	},
	{
		title: 'Circle',
		to: '/components/circle/',
		storyId: 'components-circle--basic'
	},
	{
		title: 'Rectangle',
		to: '/components/rectangle/',
		storyId: 'components-rectangle--basic'
	},
	{
		title: 'GroundOverlay',
		to: '/components/ground-overlay/',
		storyId: 'components-groundoverlay--basic'
	},
	{
		title: 'Data',
		to: '/components/data/',
		storyId: 'components-data--basic'
	},
	{
		title: 'TrafficLayer',
		to: '/components/traffic-layer/',
		storyId: 'components-trafficlayer--basic'
	},
	{
		title: 'TransitLayer',
		to: '/components/transit-layer/',
		storyId: 'components-transitlayer--basic'
	},
	{
		title: 'BicyclingLayer',
		to: '/components/bicycling-layer/',
		storyId: 'components-bicyclinglayer--basic'
	},
	{
		title: 'MapControl',
		to: '/components/map-control/',
		storyId: 'components-mapcontrol--basic'
	},
	{
		title: 'OverlayView',
		to: '/components/overlay-view/',
		storyId: 'components-overlayview--basic'
	},
	{
		title: 'PlaceAutocomplete',
		to: '/components/place-autocomplete/',
		storyId: 'components-placeautocomplete--basic'
	},
	{
		title: 'RouteRenderer',
		to: '/components/route-renderer/',
		storyId: 'components-routerenderer--basic'
	},
	{
		title: 'StreetViewPanorama',
		to: '/components/street-view-panorama/',
		storyId: 'components-streetviewpanorama--basic'
	}
] as const satisfies readonly ComponentNavItem[];
