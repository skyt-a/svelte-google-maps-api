export { default as APIProvider } from './APIProvider.svelte';
export { default as GoogleMap } from './GoogleMap.svelte';
export { default as AdvancedMarker } from './AdvancedMarker.svelte';
export { default as Pin } from './Pin.svelte';
export { default as MarkerClusterer } from './MarkerClusterer.svelte';
export { default as InfoWindow } from './InfoWindow.svelte';
export { default as Polyline } from './Polyline.svelte';
export { default as Polygon } from './Polygon.svelte';
export { default as Circle } from './Circle.svelte';
export { default as Rectangle } from './Rectangle.svelte';
export { default as GroundOverlay } from './GroundOverlay.svelte';
export { default as Data } from './Data.svelte';
export { default as TrafficLayer } from './layers/TrafficLayer.svelte';
export { default as TransitLayer } from './layers/TransitLayer.svelte';
export { default as BicyclingLayer } from './layers/BicyclingLayer.svelte';
export { default as MapControl } from './controls/MapControl.svelte';
export { default as OverlayView } from './overlay/OverlayView.svelte';
export { default as PlaceAutocomplete } from './places/PlaceAutocomplete.svelte';
export { default as RouteRenderer } from './routes/RouteRenderer.svelte';
export { default as StreetViewPanorama } from './street-view/StreetViewPanorama.svelte';

export { useMap, useMapsLibrary, useAPILoadingStatus, type Current } from './hooks.svelte.js';
export type {
	APILoadingStatus,
	LatLngInput,
	Library,
	LibraryMap,
	MapCameraState
} from './types.js';

export * as GoogleMapsMarkerClusterer from '@googlemaps/markerclusterer';
