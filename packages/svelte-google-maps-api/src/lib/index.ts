import APIProvider from './APIProvider.svelte';
import GoogleMap from './GoogleMap.svelte';
import Marker from './Marker.svelte';
import AdvancedMarker from './AdvancedMarker.svelte';
import InfoWindow from './InfoWindow.svelte';
import Polyline from './Polyline.svelte';
import Polygon from './Polygon.svelte';
import Circle from './Circle.svelte';
import Rectangle from './Rectangle.svelte';
import HeatmapLayer from './HeatmapLayer.svelte';
import GroundOverlay from './GroundOverlay.svelte';
import DirectionsRenderer from './DirectionsRenderer.svelte';
import DirectionsService from './DirectionsService.svelte';
import DistanceMatrixService from './DistanceMatrixService.svelte';
import DrawingManager from './DrawingManager.svelte';
import Data from './Data.svelte';
import MarkerClusterer from './MarkerClusterer.svelte';
import GoogleMarkerClusterer from './GoogleMarkerClusterer.svelte';
import InfoBox from './InfoBox.svelte';
import TrafficLayer from './layers/TrafficLayer.svelte';
import TransitLayer from './layers/TransitLayer.svelte';
import BicyclingLayer from './layers/BicyclingLayer.svelte';
import KmlLayer from './layers/KmlLayer.svelte';
import Autocomplete from './places/Autocomplete.svelte';
import StandaloneSearchBox from './places/StandaloneSearchBox.svelte';
import OverlayView from './overlay/OverlayView.svelte';
import StreetViewPanorama from './street-view/StreetViewPanorama.svelte';
import StreetViewService from './street-view/StreetViewService.svelte';
import MapControl from './controls/MapControl.svelte';

const FLOAT_PANE = 'floatPane';
const MAP_PANE = 'mapPane';
const MARKER_LAYER = 'markerLayer';
const OVERLAY_LAYER = 'overlayLayer';
const OVERLAY_MOUSE_TARGET = 'overlayMouseTarget';

export {
	APIProvider,
	GoogleMap,
	Marker,
	AdvancedMarker,
	InfoWindow,
	Polyline,
	Polygon,
	Circle,
	Rectangle,
	Data,
	HeatmapLayer,
	GroundOverlay,
	DirectionsRenderer,
	DirectionsService,
	DistanceMatrixService,
	DrawingManager,
	MarkerClusterer,
	GoogleMarkerClusterer,
	InfoBox,
	TrafficLayer,
	TransitLayer,
	BicyclingLayer,
	KmlLayer,
	Autocomplete,
	StandaloneSearchBox,
	OverlayView,
	StreetViewPanorama,
	StreetViewService,
	MapControl,
	FLOAT_PANE,
	MAP_PANE,
	MARKER_LAYER,
	OVERLAY_LAYER,
	OVERLAY_MOUSE_TARGET
};

export * from './types/googleMap.js';
export * from './types/markerClusterer.js';
export * as GoogleMapsMarkerClusterer from '@googlemaps/markerclusterer';
