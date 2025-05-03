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
	HeatmapLayer,
	GroundOverlay,
	DirectionsRenderer
};

// Export layers
export * from './layers/TrafficLayer.svelte';
export * from './layers/TransitLayer.svelte';
export * from './layers/BicyclingLayer.svelte';
export * from './layers/KmlLayer.svelte';
export * from './HeatmapLayer.svelte';
export * from './GroundOverlay.svelte';

// Export places
export * from './places/Autocomplete.svelte';

// Export overlay
export * from './overlay/OverlayView.svelte';

// Export street view
export * from './street-view/StreetViewPanorama.svelte';

// Export controls
export * from './controls/MapControl.svelte';

export * from './types/googleMap.js';
