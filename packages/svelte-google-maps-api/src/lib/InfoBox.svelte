<script context="module" lang="ts">
	type Anchor = google.maps.MVCObject;

	export type InfoBoxOptions = {
		alignBottom?: boolean;
		boxClass?: string;
		boxStyle?: Partial<CSSStyleDeclaration>;
		closeBoxMargin?: string;
		closeBoxURL?: string;
		content?: string | Node;
		disableAutoPan?: boolean;
		enableEventPropagation?: boolean;
		infoBoxClearance?: google.maps.Size;
		isHidden?: boolean;
		maxWidth?: number;
		pane?: keyof google.maps.MapPanes;
		pixelOffset?: google.maps.Size;
		position?: google.maps.LatLng;
		visible?: boolean;
		zIndex?: number;
	};

	export type InfoBoxInstance = google.maps.OverlayView & {
		close: () => void;
		getContent: () => string | Node | undefined;
		getPosition: () => google.maps.LatLng | undefined;
		getVisible: () => boolean;
		getZIndex: () => number | undefined;
		hide: () => void;
		open: (map: google.maps.Map | google.maps.StreetViewPanorama, anchor?: Anchor) => void;
		panBox: () => void;
		setContent: (content: string | Node | undefined) => void;
		setOptions: (options?: InfoBoxOptions) => void;
		setPosition: (position: google.maps.LatLng) => void;
		setVisible: (isVisible: boolean) => void;
		setZIndex: (zIndex: number) => void;
		show: () => void;
	};
</script>

<script lang="ts">
	import { getContext, onDestroy, onMount, tick } from 'svelte';
	import { BROWSER as browser } from 'esm-env';
	import type { APIProviderContext } from './APIProvider.svelte';

	export let anchor: Anchor | undefined = undefined;
	export let options: InfoBoxOptions | undefined = undefined;
	export let position: google.maps.LatLng | google.maps.LatLngLiteral | undefined = undefined;
	export let zIndex: number | undefined = undefined;
	export let isOpen = true;

	export let onCloseClick: (() => void) | undefined = undefined;
	export let onDomReady: (() => void) | undefined = undefined;
	export let onContentChanged: (() => void) | undefined = undefined;
	export let onPositionChanged: (() => void) | undefined = undefined;
	export let onZindexChanged: (() => void) | undefined = undefined;
	export let onLoad: ((infoBox: InfoBoxInstance) => void) | undefined = undefined;
	export let onUnmount: ((infoBox: InfoBoxInstance) => void) | undefined = undefined;

	let infoBoxInstance: InfoBoxInstance | null = null;
	let contentWrapper: HTMLDivElement | null = null;
	let listeners: google.maps.MapsEventListener[] = [];
	let listenerDeps: unknown[] = [];

	const { status, googleMapsApi } = getContext<APIProviderContext>('svelte-google-maps-api');
	const map = getContext<google.maps.Map>('map');

	onMount(() => {
		tick().then(initializeInfoBox);
	});

	function toLatLng(
		nextPosition: google.maps.LatLng | google.maps.LatLngLiteral | undefined
	): google.maps.LatLng | undefined {
		if (!nextPosition || !googleMapsApi) return undefined;
		if (nextPosition instanceof googleMapsApi.LatLng) return nextPosition;
		return new googleMapsApi.LatLng(nextPosition.lat, nextPosition.lng);
	}

	function createInfoBox(initialOptions: InfoBoxOptions): InfoBoxInstance {
		if (!googleMapsApi) {
			throw new Error('[InfoBox] Google Maps API is not loaded.');
		}

		const mapsApi = googleMapsApi;
		const overlay = new mapsApi.OverlayView() as InfoBoxInstance;
		const state = {
			alignBottom: false,
			boxClass: 'infoBox',
			boxStyle: {} as Partial<CSSStyleDeclaration>,
			closeBoxMargin: '2px',
			closeBoxURL: 'https://www.google.com/intl/en_us/mapfiles/close.gif',
			content: '' as string | Node | undefined,
			domListeners: [] as Array<() => void>,
			enableEventPropagation: false,
			isVisible: true,
			maxWidth: 0,
			paneName: 'floatPane' as keyof google.maps.MapPanes,
			pixelOffset: new mapsApi.Size(0, 0),
			positionValue: undefined as google.maps.LatLng | undefined,
			zIndexValue: undefined as number | undefined,
			container: document.createElement('div')
		};

		state.container.style.position = 'absolute';

		function getAnchorPosition(nextAnchor: Anchor | undefined): google.maps.LatLng | undefined {
			if (!nextAnchor) return undefined;

			const anchorWithPosition = nextAnchor as Anchor & {
				getPosition?: () => google.maps.LatLng | undefined;
				position?: google.maps.LatLng | google.maps.LatLngLiteral;
			};
			const nextPosition = anchorWithPosition.getPosition?.() ?? anchorWithPosition.position;

			return toLatLng(nextPosition);
		}

		function preventMapEventPropagation() {
			const events = [
				'click',
				'contextmenu',
				'dblclick',
				'mousedown',
				'mousemove',
				'mouseout',
				'mouseover',
				'mouseup',
				'touchend',
				'touchstart'
			];

			events.forEach((eventName) => {
				const handler = (event: Event) => event.stopPropagation();
				state.container.addEventListener(eventName, handler);
				state.domListeners.push(() => state.container.removeEventListener(eventName, handler));
			});
		}

		function render() {
			state.domListeners.forEach((removeListener) => removeListener());
			state.domListeners = [];
			state.container.replaceChildren();
			state.container.className = state.boxClass;
			state.container.style.cssText = 'position:absolute;';
			state.container.style.display = state.isVisible ? '' : 'none';
			if (state.maxWidth > 0) state.container.style.maxWidth = `${state.maxWidth}px`;
			if (state.zIndexValue !== undefined) {
				state.container.style.zIndex = String(state.zIndexValue);
			}
			Object.assign(state.container.style, state.boxStyle);

			if (!state.enableEventPropagation) {
				preventMapEventPropagation();
			}

			if (state.closeBoxURL !== '') {
				const closeButton = document.createElement('img');
				closeButton.alt = 'Close';
				closeButton.src = state.closeBoxURL;
				closeButton.style.cssText = `cursor:pointer;float:right;margin:${state.closeBoxMargin};`;
				closeButton.addEventListener('click', (event) => {
					event.stopPropagation();
					mapsApi.event.trigger(overlay, 'closeclick');
					overlay.close();
				});
				state.container.appendChild(closeButton);
			}

			if (typeof state.content === 'string') {
				const contentElement = document.createElement('div');
				contentElement.innerHTML = state.content;
				state.container.appendChild(contentElement);
			} else if (state.content) {
				state.container.appendChild(state.content);
			}
		}

		overlay.onAdd = () => {
			const pane = overlay.getPanes()?.[state.paneName];
			if (!pane) return;

			render();
			pane.appendChild(state.container);
			mapsApi.event.trigger(overlay, 'domready');
		};

		overlay.draw = () => {
			const projection = overlay.getProjection();
			if (!projection || !state.positionValue) return;

			const point = projection.fromLatLngToDivPixel(state.positionValue);
			if (!point) return;

			state.container.style.left = `${point.x + state.pixelOffset.width}px`;
			state.container.style.top = `${
				point.y + state.pixelOffset.height - (state.alignBottom ? state.container.offsetHeight : 0)
			}px`;
		};

		overlay.onRemove = () => {
			state.domListeners.forEach((removeListener) => removeListener());
			state.domListeners = [];

			if (state.container.parentNode) {
				state.container.parentNode.removeChild(state.container);
			}
		};

		overlay.close = () => overlay.setMap(null);
		overlay.getContent = () => state.content;
		overlay.getPosition = () => state.positionValue;
		overlay.getVisible = () => state.isVisible;
		overlay.getZIndex = () => state.zIndexValue;
		overlay.hide = () => overlay.setVisible(false);
		overlay.open = (nextMap, nextAnchor) => {
			const anchorPosition = getAnchorPosition(nextAnchor);
			if (anchorPosition) {
				overlay.setPosition(anchorPosition);
			}

			overlay.setMap(nextMap);
		};
		overlay.panBox = () => undefined;
		overlay.setContent = (nextContent) => {
			state.content = nextContent;
			render();
			mapsApi.event.trigger(overlay, 'content_changed');
		};
		overlay.setOptions = (nextOptions: InfoBoxOptions = {}) => {
			if (nextOptions.alignBottom !== undefined) state.alignBottom = nextOptions.alignBottom;
			if (nextOptions.boxClass !== undefined) state.boxClass = nextOptions.boxClass;
			if (nextOptions.boxStyle !== undefined) state.boxStyle = nextOptions.boxStyle;
			if (nextOptions.closeBoxMargin !== undefined)
				state.closeBoxMargin = nextOptions.closeBoxMargin;
			if (nextOptions.closeBoxURL !== undefined) state.closeBoxURL = nextOptions.closeBoxURL;
			if (nextOptions.enableEventPropagation !== undefined) {
				state.enableEventPropagation = nextOptions.enableEventPropagation;
			}
			if (nextOptions.maxWidth !== undefined) state.maxWidth = nextOptions.maxWidth;
			if (nextOptions.pane !== undefined) state.paneName = nextOptions.pane;
			if (nextOptions.pixelOffset !== undefined) state.pixelOffset = nextOptions.pixelOffset;
			if (nextOptions.position !== undefined) overlay.setPosition(nextOptions.position);
			if (nextOptions.visible !== undefined) overlay.setVisible(nextOptions.visible);
			if (nextOptions.isHidden !== undefined) overlay.setVisible(!nextOptions.isHidden);
			if (nextOptions.zIndex !== undefined) overlay.setZIndex(nextOptions.zIndex);
			if (nextOptions.content !== undefined) overlay.setContent(nextOptions.content);

			render();
			overlay.draw();
		};
		overlay.setPosition = (nextPosition) => {
			state.positionValue = nextPosition;
			overlay.draw();
			mapsApi.event.trigger(overlay, 'position_changed');
		};
		overlay.setVisible = (nextVisible) => {
			state.isVisible = nextVisible;
			state.container.style.display = nextVisible ? '' : 'none';
		};
		overlay.setZIndex = (nextZIndex) => {
			state.zIndexValue = nextZIndex;
			state.container.style.zIndex = String(nextZIndex);
			mapsApi.event.trigger(overlay, 'zindex_changed');
		};
		overlay.show = () => overlay.setVisible(true);

		overlay.setOptions(initialOptions);

		return overlay;
	}

	function clearListeners() {
		if (!googleMapsApi) return;
		listeners.forEach((listener) => googleMapsApi.event.removeListener(listener));
		listeners = [];
	}

	function addListener(eventName: string, handler: (() => void) | undefined) {
		if (infoBoxInstance && handler && googleMapsApi) {
			listeners.push(googleMapsApi.event.addListener(infoBoxInstance, eventName, handler));
		}
	}

	function setupListeners() {
		if (!infoBoxInstance || !googleMapsApi) return;

		clearListeners();
		addListener('closeclick', onCloseClick);
		addListener('domready', onDomReady);
		addListener('content_changed', onContentChanged);
		addListener('position_changed', onPositionChanged);
		addListener('zindex_changed', onZindexChanged);
	}

	function openInfoBox() {
		if (!infoBoxInstance || !map) return;

		if (!isOpen) {
			infoBoxInstance.close();
			return;
		}

		if (anchor) {
			infoBoxInstance.open(map, anchor);
		} else if (infoBoxInstance.getPosition()) {
			infoBoxInstance.open(map);
		}
	}

	function initializeInfoBox() {
		if (!browser || $status !== 'loaded' || !googleMapsApi || !map || infoBoxInstance) return;

		infoBoxInstance = createInfoBox({
			...(options ?? {}),
			content: contentWrapper ?? options?.content,
			position: toLatLng(position ?? options?.position),
			zIndex: zIndex ?? options?.zIndex
		});
		setupListeners();
		openInfoBox();
		onLoad?.(infoBoxInstance);
	}

	$: if ($status === 'loaded' && !infoBoxInstance) {
		tick().then(initializeInfoBox);
	}

	$: if (infoBoxInstance && options) {
		infoBoxInstance.setOptions(options);
	}

	$: if (infoBoxInstance && position) {
		const nextPosition = toLatLng(position);
		if (nextPosition) infoBoxInstance.setPosition(nextPosition);
	}

	$: if (infoBoxInstance && zIndex !== undefined) {
		infoBoxInstance.setZIndex(zIndex);
	}

	$: listenerDeps = [
		onCloseClick,
		onDomReady,
		onContentChanged,
		onPositionChanged,
		onZindexChanged
	];

	$: if (infoBoxInstance && googleMapsApi && browser && listenerDeps) {
		setupListeners();
	}

	$: if (infoBoxInstance && map) {
		openInfoBox();
	}

	onDestroy(() => {
		if (infoBoxInstance) {
			clearListeners();
			onUnmount?.(infoBoxInstance);
			infoBoxInstance.close();
			infoBoxInstance = null;
		}
	});
</script>

<div bind:this={contentWrapper}>
	<slot />
</div>
