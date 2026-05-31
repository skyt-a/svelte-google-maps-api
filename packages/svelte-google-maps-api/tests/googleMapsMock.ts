import { vi } from 'vitest';

type Listener = {
	instance?: unknown;
	eventName: string;
	handler: (...args: unknown[]) => unknown;
	remove: ReturnType<typeof vi.fn>;
};

function createListener(
	instance: unknown,
	eventName: string,
	handler: (...args: unknown[]) => unknown
) {
	return {
		instance,
		eventName,
		handler,
		remove: vi.fn()
	};
}

function removeUndefinedValues(options: Record<string, unknown>) {
	return Object.fromEntries(Object.entries(options).filter(([, value]) => value !== undefined));
}

class MockMVCArray<T = unknown> {
	static instances: MockMVCArray[] = [];

	items: T[];

	constructor(items: T[] = []) {
		this.items = items;
		MockMVCArray.instances.push(this);
	}

	push(item: T) {
		this.items.push(item);
		return this.items.length;
	}

	getLength() {
		return this.items.length;
	}

	getAt(index: number) {
		return this.items[index];
	}

	removeAt(index: number) {
		return this.items.splice(index, 1)[0];
	}

	forEach(callback: (item: T, index: number) => void) {
		this.items.forEach(callback);
	}
}

export function createGoogleMapsMock() {
	const listeners: Listener[] = [];
	const panes = {
		floatPane: document.createElement('div'),
		mapPane: document.createElement('div'),
		markerLayer: document.createElement('div'),
		overlayLayer: document.createElement('div'),
		overlayMouseTarget: document.createElement('div')
	};

	Object.values(panes).forEach((pane) => document.body.appendChild(pane));

	const event = {
		addListener: vi.fn(
			(instance: unknown, eventName: string, handler: (...args: unknown[]) => unknown) => {
				const listener = createListener(instance, eventName, handler);
				listeners.push(listener);
				return listener;
			}
		),
		removeListener: vi.fn((listener: Listener) => {
			listener.remove();
		}),
		clearInstanceListeners: vi.fn(),
		trigger: vi.fn((instance: unknown, eventName: string, ...args: unknown[]) => {
			listeners
				.filter((listener) => listener.instance === instance && listener.eventName === eventName)
				.forEach((listener) => listener.handler(...args));
		})
	};

	function addInstanceListener(
		instance: unknown,
		eventName: string,
		handler: (...args: unknown[]) => unknown
	) {
		const listener = createListener(instance, eventName, handler);
		listeners.push(listener);
		return listener;
	}

	class MockLatLng {
		latValue: number;
		lngValue: number;

		constructor(lat: number, lng: number) {
			this.latValue = lat;
			this.lngValue = lng;
		}

		lat() {
			return this.latValue;
		}

		lng() {
			return this.lngValue;
		}

		toJSON() {
			return {
				lat: this.latValue,
				lng: this.lngValue
			};
		}
	}

	class MockLatLngBounds {
		value: unknown;

		constructor(value?: unknown) {
			this.value = value;
		}

		getSouthWest() {
			return new MockLatLng(10, 20);
		}

		getNorthEast() {
			return new MockLatLng(30, 50);
		}

		toJSON() {
			return this.value ?? { south: 10, west: 20, north: 30, east: 50 };
		}
	}

	class MockSize {
		width: number;
		height: number;

		constructor(width: number, height: number) {
			this.width = width;
			this.height = height;
		}
	}

	class MockPoint {
		x: number;
		y: number;

		constructor(x: number, y: number) {
			this.x = x;
			this.y = y;
		}
	}

	class MockOverlayView {
		static instances: MockOverlayView[] = [];

		map: unknown = null;

		constructor() {
			MockOverlayView.instances.push(this);
		}

		onAdd() {
			return undefined;
		}

		draw() {
			return undefined;
		}

		onRemove() {
			return undefined;
		}

		setMap(map: unknown) {
			this.map = map;
			if (map) {
				this.onAdd();
				this.draw();
			} else {
				this.onRemove();
			}
		}

		getPanes() {
			return panes;
		}

		getProjection() {
			return {
				fromLatLngToDivPixel: (latLng: unknown) => {
					if (latLng instanceof MockLatLng) {
						return new MockPoint(latLng.lng(), latLng.lat());
					}
					return new MockPoint(25, 35);
				}
			};
		}
	}

	class MockMap {
		static instances: MockMap[] = [];

		element: HTMLElement;
		options: Record<string, unknown>;
		controls: Record<number, MockMVCArray<Node>>;
		setOptions = vi.fn((options: Record<string, unknown>) => {
			this.options = {
				...this.options,
				...options
			};
		});

		constructor(element: HTMLElement, options: Record<string, unknown>) {
			this.element = element;
			this.options = options;
			this.controls = {
				1: new MockMVCArray<Node>(),
				2: new MockMVCArray<Node>(),
				3: new MockMVCArray<Node>()
			};
			MockMap.instances.push(this);
		}
	}

	class MockMapObject {
		static instances: MockMapObject[] = [];

		options: Record<string, unknown>;
		map: unknown;
		addListener = vi.fn((eventName: string, handler: (...args: unknown[]) => unknown) =>
			addInstanceListener(this, eventName, handler)
		);
		setMap = vi.fn((map: unknown) => {
			this.map = map;
		});
		setOptions = vi.fn((options: Record<string, unknown>) => {
			this.options = {
				...this.options,
				...options
			};
		});

		constructor(options: Record<string, unknown> = {}) {
			this.options = removeUndefinedValues(options);
			this.map = options.map;
			MockMapObject.instances.push(this);
		}
	}

	function createMapObjectClass(name: string) {
		return class extends MockMapObject {
			static instances: MockMapObject[] = [];

			constructor(options: Record<string, unknown> = {}) {
				super(options);
				(this.constructor as typeof MockMapObject).instances.push(this);
			}

			static get displayName() {
				return name;
			}
		};
	}

	class MockMarker extends createMapObjectClass('Marker') {
		position: unknown;
		setPosition = vi.fn((position: unknown) => {
			this.position = position;
		});

		constructor(options: Record<string, unknown>) {
			super(options);
			this.position = options.position;
		}
	}

	class MockPolyline extends createMapObjectClass('Polyline') {
		path: unknown;
		pathArray = new MockMVCArray();
		setPath = vi.fn((path: unknown) => {
			this.path = path;
		});
		setDraggable = vi.fn();
		setEditable = vi.fn();
		setVisible = vi.fn();
		getPath = vi.fn(() => this.pathArray);

		constructor(options: Record<string, unknown>) {
			super(options);
			this.path = options.path;
		}
	}

	class MockPolygon extends createMapObjectClass('Polygon') {
		paths: unknown;
		pathsArray = new MockMVCArray([new MockMVCArray()]);
		setPaths = vi.fn((paths: unknown) => {
			this.paths = paths;
		});
		setDraggable = vi.fn();
		setEditable = vi.fn();
		setVisible = vi.fn();
		getPaths = vi.fn(() => this.pathsArray);

		constructor(options: Record<string, unknown>) {
			super(options);
			this.paths = options.paths;
		}
	}

	class MockCircle extends createMapObjectClass('Circle') {
		center: unknown;
		radius: unknown;
		setCenter = vi.fn((center: unknown) => {
			this.center = center;
		});
		setRadius = vi.fn((radius: unknown) => {
			this.radius = radius;
		});
		setDraggable = vi.fn();
		setEditable = vi.fn();
		setVisible = vi.fn();

		constructor(options: Record<string, unknown>) {
			super(options);
			this.center = options.center;
			this.radius = options.radius;
		}
	}

	class MockRectangle extends createMapObjectClass('Rectangle') {
		bounds: unknown;
		setBounds = vi.fn((bounds: unknown) => {
			this.bounds = bounds;
		});
		setDraggable = vi.fn();
		setEditable = vi.fn();
		setVisible = vi.fn();

		constructor(options: Record<string, unknown>) {
			super(options);
			this.bounds = options.bounds;
		}
	}

	class MockInfoWindow extends createMapObjectClass('InfoWindow') {
		isClosed = false;
		position: unknown;
		zIndex: number | undefined;
		open = vi.fn();
		close = vi.fn(() => {
			this.isClosed = true;
		});
		setPosition = vi.fn((position: unknown) => {
			this.position = position;
		});
		setZIndex = vi.fn((zIndex: number) => {
			this.zIndex = zIndex;
		});

		constructor(options: Record<string, unknown>) {
			super(options);
			this.position = options.position;
			this.zIndex = options.zIndex as number | undefined;
		}
	}

	class MockAdvancedMarkerElement {
		static instances: MockAdvancedMarkerElement[] = [];

		map: unknown;
		position: unknown;
		title: string | undefined;
		zIndex: number | undefined;
		gmpDraggable: boolean | undefined;
		content: unknown;
		options: Record<string, unknown>;
		addListener = vi.fn((eventName: string, handler: (...args: unknown[]) => unknown) =>
			addInstanceListener(this, eventName, handler)
		);

		constructor(options: Record<string, unknown>) {
			this.options = removeUndefinedValues(options);
			this.map = options.map;
			this.position = options.position;
			this.title = options.title as string | undefined;
			this.zIndex = options.zIndex as number | undefined;
			this.gmpDraggable = options.gmpDraggable as boolean | undefined;
			this.content = options.content;
			MockAdvancedMarkerElement.instances.push(this);
		}
	}

	class MockGroundOverlay {
		static instances: MockGroundOverlay[] = [];

		url: string;
		bounds: unknown;
		options: Record<string, unknown>;
		map: unknown;
		opacity: number | undefined;
		addListener = vi.fn((eventName: string, handler: (...args: unknown[]) => unknown) =>
			addInstanceListener(this, eventName, handler)
		);
		setMap = vi.fn((map: unknown) => {
			this.map = map;
		});
		setOpacity = vi.fn((opacity: number) => {
			this.opacity = opacity;
		});
		getUrl = vi.fn(() => this.url);

		constructor(url: string, bounds: unknown, options: Record<string, unknown>) {
			this.url = url;
			this.bounds = bounds;
			this.options = removeUndefinedValues(options);
			this.map = options.map;
			this.opacity = options.opacity as number | undefined;
			MockGroundOverlay.instances.push(this);
		}
	}

	class MockLayer extends MockMapObject {
		static instances: MockLayer[] = [];

		constructor(options: Record<string, unknown> = {}) {
			super(options);
			MockLayer.instances.push(this);
		}
	}

	class MockTrafficLayer extends MockLayer {
		static instances: MockTrafficLayer[] = [];

		constructor(options: Record<string, unknown> = {}) {
			super(options);
			MockTrafficLayer.instances.push(this);
		}
	}

	class MockBicyclingLayer extends MockLayer {
		static instances: MockBicyclingLayer[] = [];

		constructor() {
			super();
			MockBicyclingLayer.instances.push(this);
		}
	}

	class MockTransitLayer extends MockLayer {
		static instances: MockTransitLayer[] = [];

		constructor() {
			super();
			MockTransitLayer.instances.push(this);
		}
	}

	class MockKmlLayer extends MockLayer {
		static instances: MockKmlLayer[] = [];

		url: string | undefined;
		getUrl = vi.fn(() => this.url);

		constructor(options: Record<string, unknown> = {}) {
			super(options);
			this.url = options.url as string | undefined;
			MockKmlLayer.instances.push(this);
		}
	}

	class MockHeatmapLayer extends MockLayer {
		static instances: MockHeatmapLayer[] = [];

		data: unknown;
		setData = vi.fn((data: unknown) => {
			this.data = data;
		});

		constructor(options: Record<string, unknown>) {
			super(options);
			this.data = options.data;
			MockHeatmapLayer.instances.push(this);
		}
	}

	class MockDirectionsRenderer extends MockMapObject {
		static instances: MockDirectionsRenderer[] = [];

		setDirections = vi.fn();
		setRouteIndex = vi.fn();
		setPanel = vi.fn();

		constructor(options: Record<string, unknown>) {
			super(options);
			MockDirectionsRenderer.instances.push(this);
		}
	}

	class MockDrawingManager extends MockMapObject {
		static instances: MockDrawingManager[] = [];

		drawingMode: unknown;
		setDrawingMode = vi.fn((drawingMode: unknown) => {
			this.drawingMode = drawingMode;
		});

		constructor(options: Record<string, unknown>) {
			super(options);
			this.drawingMode = options.drawingMode;
			MockDrawingManager.instances.push(this);
		}
	}

	class MockData extends MockMapObject {
		static instances: MockData[] = [];

		setControlPosition = vi.fn();
		setControls = vi.fn();
		setDrawingMode = vi.fn();
		setStyle = vi.fn();

		constructor(options: Record<string, unknown>) {
			super(options);
			MockData.instances.push(this);
		}
	}

	class MockDirectionsService {
		static instances: MockDirectionsService[] = [];

		route = vi.fn();

		constructor() {
			MockDirectionsService.instances.push(this);
		}
	}

	class MockDistanceMatrixService {
		static instances: MockDistanceMatrixService[] = [];

		getDistanceMatrix = vi.fn();

		constructor() {
			MockDistanceMatrixService.instances.push(this);
		}
	}

	class MockStreetViewService {
		static instances: MockStreetViewService[] = [];

		constructor() {
			MockStreetViewService.instances.push(this);
		}
	}

	class MockStreetViewPanorama extends MockMapObject {
		static instances: MockStreetViewPanorama[] = [];

		element: HTMLElement;
		setPosition = vi.fn();
		setPov = vi.fn();
		setZoom = vi.fn();
		setPano = vi.fn();
		setVisible = vi.fn();

		constructor(element: HTMLElement, options: Record<string, unknown>) {
			super(options);
			this.element = element;
			MockStreetViewPanorama.instances.push(this);
		}
	}

	class MockAutocomplete {
		static instances: MockAutocomplete[] = [];

		input: HTMLInputElement;
		options: Record<string, unknown>;
		place: { name: string } = { name: 'Tokyo Station' };
		addListener = vi.fn((eventName: string, handler: (...args: unknown[]) => unknown) =>
			addInstanceListener(this, eventName, handler)
		);
		getPlace = vi.fn(() => this.place);
		setOptions = vi.fn((options: Record<string, unknown>) => {
			this.options = {
				...this.options,
				...options
			};
		});

		constructor(input: HTMLInputElement, options: Record<string, unknown>) {
			this.input = input;
			this.options = removeUndefinedValues(options);
			MockAutocomplete.instances.push(this);
		}
	}

	class MockSearchBox {
		static instances: MockSearchBox[] = [];

		input: HTMLInputElement;
		options: Record<string, unknown> | undefined;
		bounds: unknown;
		places: Array<{ name: string }> = [{ name: 'Tokyo Station' }];
		addListener = vi.fn((eventName: string, handler: (...args: unknown[]) => unknown) =>
			addInstanceListener(this, eventName, handler)
		);
		getPlaces = vi.fn(() => this.places);
		setBounds = vi.fn((bounds: unknown) => {
			this.bounds = bounds;
		});

		constructor(input: HTMLInputElement, options?: Record<string, unknown>) {
			this.input = input;
			this.options = options;
			MockSearchBox.instances.push(this);
		}
	}

	const importLibrary = vi.fn(() => Promise.resolve({}));

	const maps = {
		Map: MockMap,
		Marker: MockMarker,
		Polyline: MockPolyline,
		Polygon: MockPolygon,
		Circle: MockCircle,
		Rectangle: MockRectangle,
		InfoWindow: MockInfoWindow,
		GroundOverlay: MockGroundOverlay,
		DirectionsRenderer: MockDirectionsRenderer,
		DirectionsService: MockDirectionsService,
		DistanceMatrixService: MockDistanceMatrixService,
		Data: MockData,
		KmlLayer: MockKmlLayer,
		TrafficLayer: MockTrafficLayer,
		BicyclingLayer: MockBicyclingLayer,
		TransitLayer: MockTransitLayer,
		StreetViewPanorama: MockStreetViewPanorama,
		StreetViewService: MockStreetViewService,
		OverlayView: MockOverlayView,
		LatLng: MockLatLng,
		LatLngBounds: MockLatLngBounds,
		Size: MockSize,
		Point: MockPoint,
		MVCArray: MockMVCArray,
		ControlPosition: {
			TOP_LEFT: 1,
			TOP_CENTER: 2,
			TOP_RIGHT: 3
		},
		drawing: {
			DrawingManager: MockDrawingManager,
			OverlayType: {
				MARKER: 'marker',
				CIRCLE: 'circle'
			}
		},
		marker: {
			AdvancedMarkerElement: MockAdvancedMarkerElement
		},
		visualization: {
			HeatmapLayer: MockHeatmapLayer
		},
		places: {
			Autocomplete: MockAutocomplete,
			SearchBox: MockSearchBox
		},
		event,
		importLibrary
	};

	return {
		maps,
		event,
		importLibrary,
		listeners,
		panes,
		classes: {
			Map: MockMap,
			Marker: MockMarker,
			AdvancedMarkerElement: MockAdvancedMarkerElement,
			Polyline: MockPolyline,
			Polygon: MockPolygon,
			Circle: MockCircle,
			Rectangle: MockRectangle,
			InfoWindow: MockInfoWindow,
			GroundOverlay: MockGroundOverlay,
			TrafficLayer: MockTrafficLayer,
			BicyclingLayer: MockBicyclingLayer,
			TransitLayer: MockTransitLayer,
			KmlLayer: MockKmlLayer,
			HeatmapLayer: MockHeatmapLayer,
			DirectionsRenderer: MockDirectionsRenderer,
			DirectionsService: MockDirectionsService,
			DistanceMatrixService: MockDistanceMatrixService,
			DrawingManager: MockDrawingManager,
			Data: MockData,
			Autocomplete: MockAutocomplete,
			SearchBox: MockSearchBox,
			OverlayView: MockOverlayView,
			StreetViewPanorama: MockStreetViewPanorama,
			StreetViewService: MockStreetViewService,
			LatLng: MockLatLng,
			LatLngBounds: MockLatLngBounds,
			Size: MockSize,
			Point: MockPoint,
			MVCArray: MockMVCArray
		}
	};
}

export function installGoogleMapsMock() {
	const googleMaps = createGoogleMapsMock();
	(window as typeof window & { google: { maps: typeof google.maps } }).google = {
		maps: googleMaps.maps as unknown as typeof google.maps
	};
	return googleMaps;
}
