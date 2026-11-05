/**
 * Maps JavaScript API libraries that can be loaded with `google.maps.importLibrary()`.
 * Each key maps to the object that `importLibrary()` resolves with.
 */
export interface LibraryMap {
	core: google.maps.CoreLibrary;
	maps: google.maps.MapsLibrary;
	marker: google.maps.MarkerLibrary;
	places: google.maps.PlacesLibrary;
	routes: google.maps.RoutesLibrary;
	geometry: google.maps.GeometryLibrary;
	geocoding: google.maps.GeocodingLibrary;
	streetView: google.maps.StreetViewLibrary;
	elevation: google.maps.ElevationLibrary;
	journeySharing: google.maps.JourneySharingLibrary;
	addressValidation: google.maps.AddressValidationLibrary;
	airQuality: google.maps.AirQualityLibrary;
}

export type Library = keyof LibraryMap;

export type APILoadingStatus = 'loading' | 'loaded' | 'error';

export type LatLngInput =
	| google.maps.LatLng
	| google.maps.LatLngLiteral
	| google.maps.LatLngAltitude
	| google.maps.LatLngAltitudeLiteral;

export interface MapCameraState {
	center: google.maps.LatLngLiteral;
	zoom: number;
	heading: number;
	tilt: number;
}
