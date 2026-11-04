<script lang="ts">
	import { onMount } from 'svelte';
	import {
		APIProvider,
		AdvancedMarker,
		BicyclingLayer,
		Circle,
		Data,
		GoogleMap,
		GroundOverlay,
		InfoWindow,
		MapControl,
		MarkerClusterer,
		OverlayView,
		Pin,
		PlaceAutocomplete,
		Polygon,
		Polyline,
		Rectangle,
		StreetViewPanorama,
		TrafficLayer,
		TransitLayer
	} from 'svelte-google-maps-api';
	import RouteDemo from './RouteDemo.svelte';

	interface Props {
		componentName: string;
	}

	let { componentName }: Props = $props();

	const STORYBOOK_API_KEY_STORAGE_KEY = 'svelte-google-maps-api:storybook-google-maps-api-key';
	const fallbackApiKey = import.meta.env.STORYBOOK_GOOGLE_MAPS_API_KEY ?? '';
	const mapId = 'DEMO_MAP_ID';
	const tokyo = { lat: 35.6812362, lng: 139.7649361 };
	const portland = { lat: 45.523, lng: -122.676 };
	const tower = { lat: 35.658584, lng: 139.7454316 };
	const skytree = { lat: 35.710063, lng: 139.8107 };
	const groundOverlayUrl =
		'https://developers.google.com/maps/documentation/javascript/examples/full/images/talkeetna.png';
	const overlayBounds = { north: 35.73, south: 35.64, east: 139.84, west: 139.69 };
	const clusterLocations = [
		tokyo,
		tower,
		skytree,
		{ lat: 35.6895, lng: 139.6917 },
		{ lat: 35.699, lng: 139.774 },
		{ lat: 35.6655, lng: 139.7708 },
		{ lat: 35.7148, lng: 139.7967 }
	];
	const geoJson = {
		type: 'FeatureCollection',
		features: [
			{
				type: 'Feature',
				geometry: {
					type: 'Polygon',
					coordinates: [
						[
							[139.72, 35.67],
							[139.79, 35.67],
							[139.79, 35.71],
							[139.72, 35.71],
							[139.72, 35.67]
						]
					]
				},
				properties: { name: 'Tokyo sample polygon' }
			}
		]
	};

	let apiKey = $state('');
	let apiKeyInput = $state(fallbackApiKey);
	let isApiKeyPanelOpen = $state(false);
	let apiKeyMessage = $state('');
	let isApiKeyReady = $state(false);
	let shouldRememberApiKey = $state(false);

	let center = $state<google.maps.LatLngLiteral>(tokyo);
	let zoom = $state(12);
	let markerPosition = $state<google.maps.LatLngLiteral>(tokyo);
	let infoMarker = $state<google.maps.marker.AdvancedMarkerElement | null>(null);
	let infoWindowOpen = $state(true);
	let linePath = $state<google.maps.LatLngLiteral[]>([tokyo, tower, skytree]);
	let polygonPaths = $state<google.maps.LatLngLiteral[]>([tokyo, tower, skytree]);
	let circleRadius = $state(1200);
	let rectangleBounds = $state(overlayBounds);
	let status = $state('');
	let selectedPlace = $state('');

	const mapCenter = $derived(componentName === 'BicyclingLayer' ? portland : tokyo);

	$effect(() => {
		center = mapCenter;
	});

	onMount(() => {
		let storedApiKey = '';

		try {
			storedApiKey = window.localStorage.getItem(STORYBOOK_API_KEY_STORAGE_KEY) ?? '';
			shouldRememberApiKey = Boolean(storedApiKey);
		} catch {
			apiKeyMessage = 'Could not read the remembered API key.';
		}

		if (!storedApiKey) {
			try {
				storedApiKey = window.sessionStorage.getItem(STORYBOOK_API_KEY_STORAGE_KEY) ?? '';
			} catch {
				apiKeyMessage = apiKeyMessage || 'Could not read the session API key.';
			}
		}

		if (storedApiKey) {
			apiKey = storedApiKey;
			apiKeyInput = storedApiKey;
		} else {
			apiKey = fallbackApiKey;
			apiKeyInput = fallbackApiKey;
		}

		isApiKeyReady = true;
	});

	function saveApiKeyForSession(nextApiKey: string) {
		try {
			window.sessionStorage.setItem(STORYBOOK_API_KEY_STORAGE_KEY, nextApiKey);
		} catch {
			apiKeyMessage = 'Could not save the API key for this tab.';
			return false;
		}

		return true;
	}

	function saveApiKey() {
		const nextApiKey = apiKeyInput.trim();
		if (!nextApiKey) {
			apiKeyMessage = 'Enter an API key.';
			return;
		}

		const shouldReload =
			typeof document !== 'undefined' &&
			Boolean(document.getElementById('svelte-google-maps-api-script')) &&
			apiKey !== nextApiKey;

		const didSaveForSession = saveApiKeyForSession(nextApiKey);

		if (shouldRememberApiKey) {
			try {
				window.localStorage.setItem(STORYBOOK_API_KEY_STORAGE_KEY, nextApiKey);
				apiKeyMessage = 'API key remembered in this browser.';
			} catch {
				apiKeyMessage = didSaveForSession
					? 'API key saved for this tab. Browser remember was unavailable.'
					: 'Could not save the API key.';
			}
		} else if (didSaveForSession) {
			try {
				window.localStorage.removeItem(STORYBOOK_API_KEY_STORAGE_KEY);
			} catch {
				// The session value is enough; a blocked localStorage cleanup should not stop the story.
			}

			apiKeyMessage = 'API key saved for this tab.';
		} else {
			apiKeyMessage = 'Could not save the API key.';
		}

		apiKey = nextApiKey;
		apiKeyInput = nextApiKey;
		isApiKeyPanelOpen = false;

		if (shouldReload) {
			window.location.reload();
		}
	}

	function clearSavedApiKey() {
		const nextApiKey = fallbackApiKey;
		const shouldReload =
			typeof document !== 'undefined' &&
			Boolean(document.getElementById('svelte-google-maps-api-script')) &&
			apiKey !== nextApiKey;

		try {
			window.sessionStorage.removeItem(STORYBOOK_API_KEY_STORAGE_KEY);
		} catch {
			apiKeyMessage = 'Could not clear the tab API key.';
		}

		try {
			window.localStorage.removeItem(STORYBOOK_API_KEY_STORAGE_KEY);
			apiKeyMessage = fallbackApiKey ? 'Using the environment API key.' : 'API key cleared.';
		} catch {
			apiKeyMessage = apiKeyMessage || 'Could not clear the remembered API key.';
		}

		apiKey = nextApiKey;
		apiKeyInput = nextApiKey;
		shouldRememberApiKey = false;
		isApiKeyPanelOpen = !nextApiKey;

		if (shouldReload) {
			window.location.reload();
		}
	}
</script>

{#snippet statusControl(text: string)}
	<MapControl position="TOP_LEFT">
		<div class="control">{text}</div>
	</MapControl>
{/snippet}

{#if isApiKeyReady && !apiKey}
	<div class="api-key-empty-state">
		<form
			class="api-key-card"
			onsubmit={(event) => {
				event.preventDefault();
				saveApiKey();
			}}
		>
			<strong>{componentName}</strong>
			<label for="storybook-google-maps-api-key">Google Maps API key</label>
			<div class="api-key-row">
				<input
					id="storybook-google-maps-api-key"
					type="password"
					autocomplete="off"
					bind:value={apiKeyInput}
					placeholder="Paste an API key"
				/>
				<button type="submit">Apply</button>
			</div>
			<label class="api-key-remember">
				<input type="checkbox" bind:checked={shouldRememberApiKey} />
				<span>Remember in this browser</span>
			</label>
			<p>Shared by all stories in this tab. Use a restricted browser key.</p>
			{#if apiKeyMessage}
				<p class="api-key-message">{apiKeyMessage}</p>
			{/if}
		</form>
	</div>
{:else if isApiKeyReady}
	<div class="api-key-toolbar">
		{#if isApiKeyPanelOpen}
			<form
				class="api-key-popover"
				onsubmit={(event) => {
					event.preventDefault();
					saveApiKey();
				}}
			>
				<label for="storybook-google-maps-api-key-toolbar">Google Maps API key</label>
				<div class="api-key-row">
					<input
						id="storybook-google-maps-api-key-toolbar"
						type="password"
						autocomplete="off"
						bind:value={apiKeyInput}
					/>
					<button type="submit">Save</button>
				</div>
				<label class="api-key-remember">
					<input type="checkbox" bind:checked={shouldRememberApiKey} />
					<span>Remember in this browser</span>
				</label>
				<div class="api-key-actions">
					<button type="button" onclick={() => (isApiKeyPanelOpen = false)}>Close</button>
					<button type="button" onclick={clearSavedApiKey}>Clear</button>
				</div>
				{#if apiKeyMessage}
					<p class="api-key-message">{apiKeyMessage}</p>
				{/if}
			</form>
		{:else}
			<button type="button" class="api-key-toggle" onclick={() => (isApiKeyPanelOpen = true)}>
				API key
			</button>
		{/if}
	</div>
{/if}

{#if isApiKeyReady && apiKey}
	<APIProvider {apiKey}>
		{#if componentName === 'PlaceAutocomplete'}
			<div class="panel-frame">
				<PlaceAutocomplete
					placeholder="Search for a place"
					includedRegionCodes={['jp']}
					onPlaceSelect={(place) =>
						(selectedPlace = `${place.displayName ?? ''} — ${place.formattedAddress ?? ''}`)}
				/>
				<p>{selectedPlace || 'Select a suggestion to fetch its details.'}</p>
			</div>
		{:else if componentName === 'StreetViewPanorama'}
			<div class="map-frame">
				<StreetViewPanorama position={tokyo} pov={{ heading: 165, pitch: 0 }} zoom={1} />
			</div>
		{:else}
			<div class="map-frame">
				<GoogleMap bind:center bind:zoom {mapId}>
					{#if componentName === 'APIProvider' || componentName === 'GoogleMap'}
						<AdvancedMarker position={tokyo} title="Tokyo Station" />
						{@render statusControl(
							`center ${center.lat.toFixed(4)}, ${center.lng.toFixed(4)} · zoom ${zoom}`
						)}
					{:else if componentName === 'AdvancedMarker'}
						<AdvancedMarker bind:position={markerPosition} title="Drag me" draggable>
							<div class="advanced-marker">A</div>
						</AdvancedMarker>
						{@render statusControl(
							`marker ${markerPosition.lat.toFixed(4)}, ${markerPosition.lng.toFixed(4)}`
						)}
					{:else if componentName === 'Pin'}
						<AdvancedMarker position={tokyo} title="Tokyo Station">
							<Pin background="#0f766e" borderColor="#115e59" glyphColor="white" glyphText="T" />
						</AdvancedMarker>
						<AdvancedMarker position={tower} title="Tokyo Tower">
							<Pin background="#dc2626" glyphText="★" glyphColor="white" scale={1.3} />
						</AdvancedMarker>
					{:else if componentName === 'MarkerClusterer'}
						<MarkerClusterer>
							{#each clusterLocations as position, index (index)}
								<AdvancedMarker {position} />
							{/each}
						</MarkerClusterer>
					{:else if componentName === 'InfoWindow'}
						<AdvancedMarker
							position={tokyo}
							bind:marker={infoMarker}
							title="Tokyo Station"
							onClick={() => (infoWindowOpen = true)}
						/>
						{#if infoMarker}
							<InfoWindow anchor={infoMarker} bind:open={infoWindowOpen} headerContent="Tokyo">
								<p>Tokyo Station. Click the marker to reopen.</p>
							</InfoWindow>
						{/if}
					{:else if componentName === 'Polyline'}
						<Polyline bind:path={linePath} strokeColor="#0f766e" strokeWeight={4} editable />
						{@render statusControl(`${linePath.length} vertices (drag to edit)`)}
					{:else if componentName === 'Polygon'}
						<Polygon
							bind:paths={polygonPaths}
							fillColor="#0f766e"
							fillOpacity={0.25}
							strokeColor="#0f766e"
							editable
						/>
					{:else if componentName === 'Circle'}
						<Circle
							center={tokyo}
							bind:radius={circleRadius}
							fillColor="#2563eb"
							fillOpacity={0.2}
							strokeColor="#2563eb"
							editable
						/>
						{@render statusControl(`radius ${Math.round(circleRadius)} m`)}
					{:else if componentName === 'Rectangle'}
						<Rectangle
							bind:bounds={rectangleBounds}
							fillColor="#f59e0b"
							fillOpacity={0.2}
							strokeColor="#f59e0b"
							editable
							draggable
						/>
					{:else if componentName === 'GroundOverlay'}
						<GroundOverlay url={groundOverlayUrl} bounds={overlayBounds} opacity={0.55} />
					{:else if componentName === 'Data'}
						<Data
							{geoJson}
							style={{
								fillColor: '#1d9a8a',
								fillOpacity: 0.25,
								strokeColor: '#1d9a8a',
								strokeWeight: 2
							}}
						/>
					{:else if componentName === 'TrafficLayer'}
						<TrafficLayer />
					{:else if componentName === 'TransitLayer'}
						<TransitLayer />
					{:else if componentName === 'BicyclingLayer'}
						<BicyclingLayer />
					{:else if componentName === 'OverlayView'}
						<OverlayView position={tokyo} pane="overlayMouseTarget">
							<div class="overlay-view">OverlayView</div>
						</OverlayView>
					{:else if componentName === 'MapControl'}
						<MapControl position="TOP_LEFT">
							<button type="button" class="control" onclick={() => (zoom = 12)}>Reset zoom</button>
						</MapControl>
					{:else if componentName === 'RouteRenderer'}
						<RouteDemo origin={tokyo} destination={skytree} onStatus={(next) => (status = next)} />
						{#if status}
							{@render statusControl(status)}
						{/if}
					{/if}
				</GoogleMap>
			</div>
		{/if}
	</APIProvider>
{/if}

<style>
	.map-frame {
		width: 100vw;
		height: 100vh;
	}

	.panel-frame {
		display: grid;
		gap: 12px;
		max-width: 480px;
		padding: 24px;
		font-family: Inter, system-ui, sans-serif;
	}

	.api-key-empty-state {
		min-height: 100vh;
		display: grid;
		place-content: center;
		font-family: Inter, system-ui, sans-serif;
		background: #f5f7fb;
	}

	.api-key-card,
	.api-key-popover {
		background: white;
		border: 1px solid #d6dbe4;
		border-radius: 8px;
		box-shadow: 0 16px 40px rgba(15, 23, 42, 0.12);
		color: #111827;
		display: grid;
		font-family: Inter, system-ui, sans-serif;
		gap: 10px;
		max-width: min(420px, calc(100vw - 32px));
		padding: 18px;
		width: 420px;
	}

	.api-key-card strong {
		font-size: 14px;
	}

	.api-key-card label,
	.api-key-popover label {
		color: #334155;
		font-size: 13px;
		font-weight: 600;
	}

	.api-key-card p,
	.api-key-popover p {
		color: #64748b;
		font-size: 12px;
		line-height: 1.4;
		margin: 0;
	}

	.api-key-row {
		display: grid;
		gap: 8px;
		grid-template-columns: minmax(0, 1fr) auto;
	}

	.api-key-row input {
		border: 1px solid #cbd5e1;
		border-radius: 6px;
		color: #111827;
		font:
			14px/1.4 system-ui,
			sans-serif;
		min-width: 0;
		padding: 9px 10px;
	}

	.api-key-row input:focus {
		border-color: #2563eb;
		box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
		outline: none;
	}

	.api-key-row button,
	.api-key-actions button,
	.api-key-toggle {
		border: 1px solid #cbd5e1;
		border-radius: 6px;
		cursor: pointer;
		font:
			600 13px/1 system-ui,
			sans-serif;
		min-height: 36px;
		padding: 0 12px;
	}

	.api-key-row button {
		background: #2563eb;
		border-color: #2563eb;
		color: white;
	}

	.api-key-actions button,
	.api-key-toggle {
		background: white;
		color: #111827;
	}

	.api-key-toolbar {
		position: fixed;
		right: 14px;
		top: 14px;
		z-index: 10;
	}

	.api-key-popover {
		width: min(380px, calc(100vw - 28px));
	}

	.api-key-actions {
		display: flex;
		gap: 8px;
		justify-content: flex-end;
	}

	.api-key-remember {
		align-items: center;
		color: #475569;
		display: flex;
		font-size: 12px;
		font-weight: 500;
		gap: 8px;
	}

	.api-key-remember input {
		accent-color: #2563eb;
		height: 16px;
		margin: 0;
		width: 16px;
	}

	.api-key-message {
		color: #334155;
	}

	.control,
	.overlay-view {
		background: white;
		border: 1px solid #d1d5db;
		border-radius: 6px;
		box-shadow: 0 8px 24px rgba(15, 23, 42, 0.16);
		color: #111827;
		font:
			14px/1.4 system-ui,
			sans-serif;
		padding: 8px 12px;
	}

	.advanced-marker {
		align-items: center;
		background: #0f766e;
		border: 2px solid white;
		border-radius: 999px;
		box-shadow: 0 6px 18px rgba(15, 23, 42, 0.22);
		color: white;
		display: flex;
		font:
			700 14px/1 system-ui,
			sans-serif;
		height: 32px;
		justify-content: center;
		width: 32px;
	}
</style>
