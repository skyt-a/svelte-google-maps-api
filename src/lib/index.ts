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

// Export types as well
export * from './types/googleMap.js';
