import { vi } from 'vitest';

type Handler = (...args: unknown[]) => unknown;
type LatLngLike = { lat: number | (() => number); lng: number | (() => number) };

export class MockMVCObject {
	listeners = new Map<string, Set<Handler>>();

	addListener(eventName: string, handler: Handler) {
		const handlers = this.listeners.get(eventName) ?? new Set<Handler>();
		handlers.add(handler);
		this.listeners.set(eventName, handlers);
		return { remove: () => handlers.delete(handler) };
	}

	trigger(eventName: string, ...args: unknown[]) {
		this.listeners.get(eventName)?.forEach((handler) => handler(...args));
	}

	listenerCount(eventName?: string) {
		if (eventName) return this.listeners.get(eventName)?.size ?? 0;
		return [...this.listeners.values()].reduce((total, handlers) => total + handlers.size, 0);
	}
}

export class MockLatLng {
	#lat: number;
	#lng: number;

	constructor(latOrLiteral: number | LatLngLike, lng?: number) {
		if (typeof latOrLiteral === 'number') {
			this.#lat = latOrLiteral;
			this.#lng = lng ?? 0;
		} else {
			this.#lat = read(latOrLiteral.lat);
			this.#lng = read(latOrLiteral.lng);
		}
	}

	lat() {
		return this.#lat;
	}

	lng() {
		return this.#lng;
	}

	toJSON() {
		return { lat: this.#lat, lng: this.#lng };
	}
}

function read(value: number | (() => number)) {
	return typeof value === 'function' ? value() : value;
}

function toLatLng(value: LatLngLike) {
	return value instanceof MockLatLng ? value : new MockLatLng(value);
}

type BoundsLiteral = { north: number; south: number; east: number; west: number };

export class MockLatLngBounds {
	literal: BoundsLiteral;

	constructor(literal: BoundsLiteral | MockLatLngBounds) {
		this.literal = literal instanceof MockLatLngBounds ? literal.literal : literal;
	}

	getSouthWest() {
		return new MockLatLng(this.literal.south, this.literal.west);
	}

	getNorthEast() {
		return new MockLatLng(this.literal.north, this.literal.east);
	}

	toJSON() {
		return this.literal;
	}
}

export class MockMVCArray<T = unknown> extends MockMVCObject {
	items: T[];

	constructor(items: T[] = []) {
		super();
		this.items = [...items];
	}

	getArray() {
		return this.items;
	}

	getAt(index: number) {
		return this.items[index];
	}

	getLength() {
		return this.items.length;
	}

	push(item: T) {
		this.items.push(item);
		this.trigger('insert_at', this.items.length - 1);
		return this.items.length;
	}

	setAt(index: number, item: T) {
		const previous = this.items[index];
		this.items[index] = item;
		this.trigger('set_at', index, previous);
	}

	removeAt(index: number) {
		const [removed] = this.items.splice(index, 1);
		this.trigger('remove_at', index, removed);
		return removed;
	}
}

export const ControlPosition = {
	TOP_LEFT: 1,
	TOP_CENTER: 2,
	TOP_RIGHT: 3,
	BLOCK_START_INLINE_END: 25
} as const;

class MockMap extends MockMVCObject {
	static instances: MockMap[] = [];

	element: HTMLElement;
	options: Record<string, unknown>;
	center: MockLatLng | undefined;
	zoom: number | undefined;
	heading = 0;
	tilt = 0;
	controls: Record<number, MockMVCArray<HTMLElement>> = {};
	fitBounds = vi.fn();

	constructor(element: HTMLElement, options: Record<string, unknown> = {}) {
		super();
		this.element = element;
		this.options = { ...options };
		this.center = options.center ? toLatLng(options.center as LatLngLike) : undefined;
		this.zoom = (options.zoom as number | null) ?? undefined;
		Object.values(ControlPosition).forEach((position) => {
			this.controls[position] = new MockMVCArray<HTMLElement>();
		});
		MockMap.instances.push(this);
	}

	setOptions(options: Record<string, unknown>) {
		Object.assign(this.options, options);
	}

	getCenter() {
		return this.center;
	}

	setCenter(center: LatLngLike) {
		this.center = toLatLng(center);
		this.trigger('center_changed');
	}

	getZoom() {
		return this.zoom;
	}

	setZoom(zoom: number) {
		this.zoom = zoom;
		this.trigger('zoom_changed');
	}

	getHeading() {
		return this.heading;
	}

	setHeading(heading: number) {
		this.heading = heading;
		this.trigger('heading_changed');
	}

	getTilt() {
		return this.tilt;
	}

	setTilt(tilt: number) {
		this.tilt = tilt;
		this.trigger('tilt_changed');
	}

	getBounds() {
		return new MockLatLngBounds({ north: 1, south: 0, east: 1, west: 0 });
	}
}

class MockInfoWindow extends MockMVCObject {
	static instances: MockInfoWindow[] = [];

	content: unknown = null;
	headerContent: unknown = null;
	options: Record<string, unknown> = {};
	position: unknown = null;
	isOpen = false;
	openOptions: unknown = null;

	constructor() {
		super();
		MockInfoWindow.instances.push(this);
	}

	setContent(content: unknown) {
		this.content = content;
	}

	setHeaderContent(content: unknown) {
		this.headerContent = content;
	}

	setOptions(options: Record<string, unknown>) {
		Object.assign(this.options, options);
	}

	setPosition(position: unknown) {
		this.position = position;
	}

	open = vi.fn((options: unknown) => {
		this.isOpen = true;
		this.openOptions = options;
	});

	close = vi.fn(() => {
		if (!this.isOpen) return;
		this.isOpen = false;
		this.trigger('close');
	});
}

class MockShape extends MockMVCObject {
	map: unknown = null;
	options: Record<string, unknown> = {};

	setMap(map: unknown) {
		this.map = map;
	}

	setOptions(options: Record<string, unknown>) {
		Object.assign(this.options, options);
	}
}

class MockPolyline extends MockShape {
	static instances: MockPolyline[] = [];
	path = new MockMVCArray<MockLatLng>();

	constructor(options: { path?: LatLngLike[] } = {}) {
		super();
		if (options.path) this.setPath(options.path);
		MockPolyline.instances.push(this);
	}

	getPath() {
		return this.path;
	}

	setPath(path: LatLngLike[]) {
		this.path = new MockMVCArray(path.map(toLatLng));
	}
}

class MockPolygon extends MockShape {
	static instances: MockPolygon[] = [];
	paths = new MockMVCArray<MockMVCArray<MockLatLng>>();

	constructor(options: { paths?: LatLngLike[] | LatLngLike[][] } = {}) {
		super();
		if (options.paths) this.setPaths(options.paths);
		MockPolygon.instances.push(this);
	}

	getPaths() {
		return this.paths;
	}

	setPaths(paths: LatLngLike[] | LatLngLike[][]) {
		const rings = (paths.length && Array.isArray(paths[0]) ? paths : [paths]) as LatLngLike[][];
		this.paths = new MockMVCArray(rings.map((ring) => new MockMVCArray(ring.map(toLatLng))));
	}
}

class MockCircle extends MockShape {
	static instances: MockCircle[] = [];
	center: MockLatLng | undefined;
	radius = 0;

	constructor(options: { center?: LatLngLike; radius?: number } = {}) {
		super();
		if (options.center) this.center = toLatLng(options.center);
		if (options.radius !== undefined) this.radius = options.radius;
		MockCircle.instances.push(this);
	}

	getCenter() {
		return this.center;
	}

	setCenter(center: LatLngLike) {
		this.center = toLatLng(center);
		this.trigger('center_changed');
	}

	getRadius() {
		return this.radius;
	}

	setRadius(radius: number) {
		this.radius = radius;
		this.trigger('radius_changed');
	}
}

class MockRectangle extends MockShape {
	static instances: MockRectangle[] = [];
	bounds: MockLatLngBounds | undefined;

	constructor(options: { bounds?: BoundsLiteral } = {}) {
		super();
		if (options.bounds) this.bounds = new MockLatLngBounds(options.bounds);
		MockRectangle.instances.push(this);
	}

	getBounds() {
		return this.bounds;
	}

	setBounds(bounds: BoundsLiteral) {
		this.bounds = new MockLatLngBounds(bounds);
		this.trigger('bounds_changed');
	}
}

class MockGroundOverlay extends MockShape {
	static instances: MockGroundOverlay[] = [];
	opacity: number | undefined;

	constructor(
		public url: string,
		public bounds: unknown,
		public overlayOptions: { opacity?: number; clickable?: boolean } = {}
	) {
		super();
		this.opacity = overlayOptions.opacity;
		MockGroundOverlay.instances.push(this);
	}

	setOpacity(opacity: number) {
		this.opacity = opacity;
	}
}

class MockData extends MockShape {
	static instances: MockData[] = [];
	style: unknown = null;
	features = new Set<object>();
	loadCallbacks: Array<(features: object[]) => void> = [];

	constructor(options: { map?: unknown } = {}) {
		super();
		this.map = options.map ?? null;
		MockData.instances.push(this);
	}

	setStyle(style: unknown) {
		this.style = style;
	}

	addGeoJson() {
		const feature = { id: this.features.size };
		this.features.add(feature);
		return [feature];
	}

	loadGeoJson(_url: string, _options: unknown, callback: (features: object[]) => void) {
		this.loadCallbacks.push((features) => {
			features.forEach((feature) => this.features.add(feature));
			callback(features);
		});
	}

	remove(feature: object) {
		this.features.delete(feature);
	}
}

class MockLayer extends MockShape {
	static instances: MockLayer[] = [];

	constructor(options: Record<string, unknown> = {}) {
		super();
		this.options = { ...options };
		MockLayer.instances.push(this);
	}
}

const panes = () => ({
	floatPane: document.createElement('div'),
	mapPane: document.createElement('div'),
	markerLayer: document.createElement('div'),
	overlayLayer: document.createElement('div'),
	overlayMouseTarget: document.createElement('div')
});

class MockOverlayView extends MockMVCObject {
	static panes = panes();
	map: unknown = null;

	// Overridden by the component under test.
	onAdd(): void {
		return undefined;
	}

	draw(): void {
		return undefined;
	}

	onRemove(): void {
		return undefined;
	}

	setMap(map: unknown) {
		const previous = this.map;
		this.map = map;
		if (map && !previous) {
			this.onAdd();
			this.draw();
		} else if (!map && previous) {
			this.onRemove();
		}
	}

	getMap() {
		return this.map;
	}

	getPanes() {
		return this.map ? MockOverlayView.panes : null;
	}

	getProjection() {
		return {
			fromLatLngToDivPixel: (latLng: MockLatLng) => ({ x: latLng.lng() * 10, y: latLng.lat() * 10 })
		};
	}
}

class MockStreetViewPanorama extends MockMVCObject {
	static instances: MockStreetViewPanorama[] = [];
	position: MockLatLng | undefined;
	pov = { heading: 0, pitch: 0 };
	zoom = 1;
	visible = true;
	options: Record<string, unknown>;

	constructor(
		public element: HTMLElement,
		options: Record<string, unknown> = {}
	) {
		super();
		this.options = { ...options };
		if (options.position) this.position = toLatLng(options.position as LatLngLike);
		if (options.pov) this.pov = options.pov as { heading: number; pitch: number };
		MockStreetViewPanorama.instances.push(this);
	}

	setOptions(options: Record<string, unknown>) {
		Object.assign(this.options, options);
	}

	getPosition() {
		return this.position;
	}

	setPosition(position: LatLngLike) {
		this.position = toLatLng(position);
		this.trigger('position_changed');
	}

	getPov() {
		return this.pov;
	}

	setPov(pov: { heading: number; pitch: number }) {
		this.pov = pov;
		this.trigger('pov_changed');
	}

	getZoom() {
		return this.zoom;
	}

	setZoom(zoom: number) {
		this.zoom = zoom;
		this.trigger('zoom_changed');
	}

	setVisible(visible: boolean) {
		this.visible = visible;
	}

	getPano() {
		return 'pano-id';
	}

	getStatus() {
		return 'OK';
	}
}

export class MockAdvancedMarkerElement extends HTMLElement {
	static instances: MockAdvancedMarkerElement[] = [];

	map: unknown = null;
	position: unknown = null;
	zIndex: unknown = null;
	gmpDraggable = false;
	gmpClickable = false;
	collisionBehavior: unknown = null;
	anchorLeft = '-50%';
	anchorTop = '-100%';

	constructor(options: Record<string, unknown> = {}) {
		super();
		Object.assign(this, options);
		MockAdvancedMarkerElement.instances.push(this);
	}
}

export class MockPinElement extends HTMLElement {
	static instances: MockPinElement[] = [];

	background: unknown = null;
	borderColor: unknown = null;
	glyphColor: unknown = null;
	glyphText: unknown = null;
	glyphSrc: unknown = null;
	scale: unknown = null;

	constructor() {
		super();
		MockPinElement.instances.push(this);
	}
}

export class MockPlaceAutocompleteElement extends HTMLElement {
	static instances: MockPlaceAutocompleteElement[] = [];

	constructor(options: Record<string, unknown> = {}) {
		super();
		Object.assign(this, options);
		MockPlaceAutocompleteElement.instances.push(this);
	}
}

customElements.define('mock-advanced-marker', MockAdvancedMarkerElement);
customElements.define('mock-pin', MockPinElement);
customElements.define('mock-place-autocomplete', MockPlaceAutocompleteElement);

const classes = {
	Map: MockMap,
	InfoWindow: MockInfoWindow,
	Polyline: MockPolyline,
	Polygon: MockPolygon,
	Circle: MockCircle,
	Rectangle: MockRectangle,
	GroundOverlay: MockGroundOverlay,
	Data: MockData,
	Layer: MockLayer,
	OverlayView: MockOverlayView,
	StreetViewPanorama: MockStreetViewPanorama,
	AdvancedMarkerElement: MockAdvancedMarkerElement,
	PinElement: MockPinElement,
	PlaceAutocompleteElement: MockPlaceAutocompleteElement
};

/** Installs a fresh `window.google.maps` mock and returns handles for assertions. */
export function installGoogleMapsMock() {
	Object.values(classes).forEach((MockClass) => {
		if ('instances' in MockClass) (MockClass as { instances: unknown[] }).instances = [];
	});
	MockOverlayView.panes = panes();

	const event = {
		clearInstanceListeners: vi.fn((instance: MockMVCObject) => instance.listeners?.clear()),
		addListener: (instance: MockMVCObject, eventName: string, handler: Handler) =>
			instance.addListener(eventName, handler),
		trigger: (instance: MockMVCObject, eventName: string, ...args: unknown[]) =>
			instance.trigger(eventName, ...args)
	};

	const libraries: Record<string, Record<string, unknown>> = {
		core: {
			event,
			LatLng: MockLatLng,
			LatLngBounds: MockLatLngBounds,
			MVCArray: MockMVCArray,
			ControlPosition,
			Size: class {
				constructor(
					public width: number,
					public height: number
				) {}
			}
		},
		maps: {
			Map: MockMap,
			InfoWindow: MockInfoWindow,
			Polyline: MockPolyline,
			Polygon: MockPolygon,
			Circle: MockCircle,
			Rectangle: MockRectangle,
			GroundOverlay: MockGroundOverlay,
			Data: MockData,
			TrafficLayer: class extends MockLayer {},
			TransitLayer: class extends MockLayer {},
			BicyclingLayer: class extends MockLayer {},
			OverlayView: MockOverlayView
		},
		marker: {
			AdvancedMarkerElement: MockAdvancedMarkerElement,
			PinElement: MockPinElement
		},
		places: {
			PlaceAutocompleteElement: MockPlaceAutocompleteElement
		},
		streetView: {
			StreetViewPanorama: MockStreetViewPanorama
		},
		routes: {}
	};

	const importLibrary = vi.fn(async (name: string) => {
		const library = libraries[name];
		if (!library) throw new Error(`Unknown library: ${name}`);
		return library;
	});

	(window as unknown as { google: unknown }).google = {
		maps: { importLibrary, event, OverlayView: MockOverlayView }
	};

	return { classes, libraries, importLibrary, event };
}
