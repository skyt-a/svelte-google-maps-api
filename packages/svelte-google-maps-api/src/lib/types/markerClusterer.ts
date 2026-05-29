import type { Marker } from '@googlemaps/markerclusterer';

export interface MarkerClustererContext {
	addMarker: (marker: Marker) => void;
	removeMarker: (marker: Marker) => void;
}

export type ClusterableMarker = Marker;
