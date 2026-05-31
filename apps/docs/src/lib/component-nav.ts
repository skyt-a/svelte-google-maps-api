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
		title: 'Marker',
		to: '/components/marker/',
		storyId: 'components-marker--basic'
	},
	{
		title: 'AdvancedMarker',
		to: '/components/advanced-marker/',
		storyId: 'components-advancedmarker--basic'
	},
	{
		title: 'MarkerClusterer',
		to: '/components/marker-clusterer/',
		storyId: 'components-markerclusterer--basic'
	},
	{
		title: 'GoogleMarkerClusterer',
		to: '/components/google-marker-clusterer/',
		storyId: 'components-googlemarkerclusterer--basic'
	},
	{
		title: 'InfoWindow',
		to: '/components/info-window/',
		storyId: 'components-infowindow--basic'
	},
	{
		title: 'InfoBox',
		to: '/components/info-box/',
		storyId: 'components-infobox--basic'
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
		title: 'Data',
		to: '/components/data/',
		storyId: 'components-data--basic'
	},
	{
		title: 'DrawingManager',
		to: '/components/drawing-manager/',
		storyId: 'components-drawingmanager--basic'
	},
	{
		title: 'DirectionsRenderer',
		to: '/components/directions-renderer/',
		storyId: 'components-directionsrenderer--basic'
	},
	{
		title: 'DirectionsService',
		to: '/components/directions-service/',
		storyId: 'components-directionsservice--basic'
	},
	{
		title: 'DistanceMatrixService',
		to: '/components/distance-matrix-service/',
		storyId: 'components-distancematrixservice--basic'
	},
	{
		title: 'HeatmapLayer',
		to: '/components/heatmap-layer/',
		storyId: 'components-heatmaplayer--basic'
	},
	{
		title: 'KmlLayer',
		to: '/components/kml-layer/',
		storyId: 'components-kmllayer--basic'
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
		title: 'GroundOverlay',
		to: '/components/ground-overlay/',
		storyId: 'components-groundoverlay--basic'
	},
	{
		title: 'MapControl',
		to: '/components/map-control/',
		storyId: 'components-mapcontrol--basic'
	},
	{
		title: 'Autocomplete',
		to: '/components/autocomplete/',
		storyId: 'components-autocomplete--basic'
	},
	{
		title: 'StandaloneSearchBox',
		to: '/components/standalone-search-box/',
		storyId: 'components-standalonesearchbox--basic'
	},
	{
		title: 'OverlayView',
		to: '/components/overlay-view/',
		storyId: 'components-overlayview--basic'
	},
	{
		title: 'StreetViewPanorama',
		to: '/components/street-view-panorama/',
		storyId: 'components-streetviewpanorama--basic'
	},
	{
		title: 'StreetViewService',
		to: '/components/street-view-service/',
		storyId: 'components-streetviewservice--basic'
	}
] as const satisfies readonly ComponentNavItem[];
