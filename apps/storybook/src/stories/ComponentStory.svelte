<script lang="ts">
	import { onMount } from 'svelte';
	import {
		APIProvider,
		AdvancedMarker,
		Autocomplete,
		BicyclingLayer,
		Circle,
		Data,
		DirectionsRenderer,
		DirectionsService,
		DistanceMatrixService,
		DrawingManager,
		GoogleMap,
		GoogleMarkerClusterer,
		GroundOverlay,
		HeatmapLayer,
		InfoBox,
		InfoWindow,
		KmlLayer,
		MapControl,
		Marker,
		MarkerClusterer,
		OverlayView,
		Polygon,
		Polyline,
		Rectangle,
		StandaloneSearchBox,
		StreetViewPanorama,
		StreetViewService,
		TrafficLayer,
		TransitLayer
	} from 'svelte-google-maps-api';
	import type { Library } from 'svelte-google-maps-api';

	export let componentName: string;

	const STORYBOOK_API_KEY_STORAGE_KEY = 'svelte-google-maps-api:storybook-google-maps-api-key';
	const fallbackApiKey = import.meta.env.STORYBOOK_GOOGLE_MAPS_API_KEY ?? '';
	const center = { lat: 35.6812362, lng: 139.7649361 };
	const second = { lat: 35.658584, lng: 139.7454316 };
	const third = { lat: 35.710063, lng: 139.8107 };
	const bounds = {
		north: 35.73,
		south: 35.64,
		east: 139.84,
		west: 139.69
	};
	const path = [center, second, third, center];
	const mapOptions: google.maps.MapOptions = {
		center,
		zoom: 12,
		mapId: 'DEMO_MAP_ID'
	};
	const heatmapData = [
		{ location: center, weight: 3 },
		{ location: second, weight: 2 },
		{ location: third, weight: 4 }
	];
	const kmlUrl =
		'https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml';
	const groundOverlayUrl =
		'https://developers.google.com/maps/documentation/javascript/examples/full/images/talkeetna.png';
	const distanceRequest: google.maps.DistanceMatrixRequest = {
		origins: [center],
		destinations: [second],
		travelMode: 'DRIVING' as google.maps.TravelMode
	};
	const directionsRequest: google.maps.DirectionsRequest = {
		origin: center,
		destination: second,
		travelMode: 'DRIVING' as google.maps.TravelMode
	};
	const clusterLocations = [
		center,
		second,
		third,
		{ lat: 35.6895, lng: 139.6917 },
		{ lat: 35.699, lng: 139.774 }
	];

	let directions: google.maps.DirectionsResult | undefined = undefined;
	let serviceStatus = 'Waiting';
	let dataLoaded = false;
	let apiKey = fallbackApiKey;
	let apiKeyInput = fallbackApiKey;
	let isApiKeyPanelOpen = false;
	let apiKeyMessage = '';

	$: libraries = getLibraries(componentName);

	onMount(() => {
		try {
			const storedApiKey = window.localStorage.getItem(STORYBOOK_API_KEY_STORAGE_KEY);
			if (storedApiKey) {
				apiKey = storedApiKey;
				apiKeyInput = storedApiKey;
			}
		} catch (error) {
			apiKeyMessage = 'Could not read the saved API key.';
		}
	});

	function getLibraries(name: string): Library[] {
		if (name === 'Autocomplete' || name === 'StandaloneSearchBox') return ['places'];
		if (name === 'DrawingManager') return ['drawing'];
		if (name === 'HeatmapLayer') return ['visualization'];
		if (name === 'AdvancedMarker') return ['marker'];
		return [];
	}

	function handleDirectionsResult(
		result: google.maps.DirectionsResult | null,
		status: google.maps.DirectionsStatus
	) {
		serviceStatus = String(status);
		if (result) directions = result;
	}

	function handleDistanceMatrix(
		response: google.maps.DistanceMatrixResponse | null,
		status: google.maps.DistanceMatrixStatus
	) {
		serviceStatus = response ? `${status}: ${response.rows.length} row` : String(status);
	}

	function handleDataLoad(data: google.maps.Data) {
		data.addGeoJson({
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
		} as any);
		data.setStyle({
			fillColor: '#1d9a8a',
			fillOpacity: 0.25,
			strokeColor: '#1d9a8a',
			strokeWeight: 2
		});
		dataLoaded = true;
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

		try {
			window.localStorage.setItem(STORYBOOK_API_KEY_STORAGE_KEY, nextApiKey);
			apiKeyMessage = 'API key saved in this browser.';
		} catch (error) {
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
			window.localStorage.removeItem(STORYBOOK_API_KEY_STORAGE_KEY);
			apiKeyMessage = fallbackApiKey ? 'Using the environment API key.' : 'Saved API key cleared.';
		} catch (error) {
			apiKeyMessage = 'Could not clear the saved API key.';
		}

		apiKey = nextApiKey;
		apiKeyInput = nextApiKey;
		isApiKeyPanelOpen = !nextApiKey;

		if (shouldReload) {
			window.location.reload();
		}
	}
</script>

{#if !apiKey}
	<div class="api-key-empty-state">
		<form class="api-key-card" on:submit|preventDefault={saveApiKey}>
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
			<p>Saved in this browser and reused by all stories.</p>
			{#if apiKeyMessage}
				<p class="api-key-message">{apiKeyMessage}</p>
			{/if}
		</form>
	</div>
{:else}
	<div class="api-key-toolbar">
		{#if isApiKeyPanelOpen}
			<form class="api-key-popover" on:submit|preventDefault={saveApiKey}>
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
				<div class="api-key-actions">
					<button type="button" on:click={() => (isApiKeyPanelOpen = false)}>Close</button>
					<button type="button" on:click={clearSavedApiKey}>Clear</button>
				</div>
				{#if apiKeyMessage}
					<p class="api-key-message">{apiKeyMessage}</p>
				{/if}
			</form>
		{:else}
			<button type="button" class="api-key-toggle" on:click={() => (isApiKeyPanelOpen = true)}>
				API key
			</button>
		{/if}
	</div>
{/if}

{#if apiKey && componentName === 'APIProvider'}
	<div class="map-frame">
		<APIProvider {apiKey}>
			<GoogleMap options={mapOptions} mapContainerStyle="width:100%;height:100%;">
				<Marker position={center} options={{ title: 'APIProvider story marker' }} />
			</GoogleMap>
		</APIProvider>
	</div>
{:else if apiKey && componentName === 'Autocomplete'}
	<div class="panel-frame">
		<APIProvider {apiKey} libraries={['places']}>
			<Autocomplete placeholder="Search for a place" inputStyle="width:320px;padding:10px;" />
		</APIProvider>
	</div>
{:else if apiKey && componentName === 'StandaloneSearchBox'}
	<div class="panel-frame">
		<APIProvider {apiKey} libraries={['places']}>
			<StandaloneSearchBox placeholder="Search places" inputStyle="width:320px;padding:10px;" />
		</APIProvider>
	</div>
{:else if apiKey && componentName === 'StreetViewPanorama'}
	<div class="map-frame">
		<APIProvider {apiKey}>
			<StreetViewPanorama
				position={center}
				pov={{ heading: 165, pitch: 0 }}
				zoom={1}
				containerStyle="width:100%;height:100%;"
			/>
		</APIProvider>
	</div>
{:else if apiKey && componentName === 'StreetViewService'}
	<div class="panel-frame">
		<APIProvider {apiKey}>
			<StreetViewService onLoad={() => (serviceStatus = 'StreetViewService loaded')} />
			<p>{serviceStatus}</p>
		</APIProvider>
	</div>
{:else if apiKey && componentName === 'DistanceMatrixService'}
	<div class="panel-frame">
		<APIProvider {apiKey}>
			<DistanceMatrixService options={distanceRequest} callback={handleDistanceMatrix} />
			<p>{serviceStatus}</p>
		</APIProvider>
	</div>
{:else if apiKey}
	<div class="map-frame">
		<APIProvider {apiKey} {libraries} mapIds={['DEMO_MAP_ID']}>
			<GoogleMap options={mapOptions} mapContainerStyle="width:100%;height:100%;">
				{#if componentName === 'GoogleMap'}
					<Marker position={center} options={{ title: 'Tokyo Station' }} />
				{:else if componentName === 'Marker'}
					<Marker position={center} options={{ title: 'Marker', draggable: true }} />
				{:else if componentName === 'AdvancedMarker'}
					<AdvancedMarker position={center} title="Advanced marker">
						<div class="advanced-marker">A</div>
					</AdvancedMarker>
				{:else if componentName === 'InfoWindow'}
					<Marker position={center} />
					<InfoWindow position={center}>
						<strong>Tokyo Station</strong>
					</InfoWindow>
				{:else if componentName === 'InfoBox'}
					<InfoBox
						position={center}
						options={{
							boxClass: 'storybook-info-box',
							pixelOffset: new google.maps.Size(-80, -40),
							closeBoxURL: ''
						}}
					>
						<div class="info-box">Custom InfoBox</div>
					</InfoBox>
				{:else if componentName === 'Polyline'}
					<Polyline {path} strokeColor="#0f766e" strokeWeight={4} />
				{:else if componentName === 'Polygon'}
					<Polygon paths={path} fillColor="#0f766e" fillOpacity={0.25} strokeColor="#0f766e" />
				{:else if componentName === 'Circle'}
					<Circle
						{center}
						radius={1200}
						fillColor="#2563eb"
						fillOpacity={0.2}
						strokeColor="#2563eb"
					/>
				{:else if componentName === 'Rectangle'}
					<Rectangle {bounds} fillColor="#f59e0b" fillOpacity={0.2} strokeColor="#f59e0b" />
				{:else if componentName === 'Data'}
					<Data onLoad={handleDataLoad} />
					{#if dataLoaded}
						<MapControl position={2 as google.maps.ControlPosition}>
							<div class="control">Data loaded</div>
						</MapControl>
					{/if}
				{:else if componentName === 'HeatmapLayer'}
					<HeatmapLayer data={heatmapData} radius={32} opacity={0.7} />
				{:else if componentName === 'KmlLayer'}
					<KmlLayer url={kmlUrl} preserveViewport />
				{:else if componentName === 'TrafficLayer'}
					<TrafficLayer />
				{:else if componentName === 'TransitLayer'}
					<TransitLayer />
				{:else if componentName === 'BicyclingLayer'}
					<BicyclingLayer />
				{:else if componentName === 'GroundOverlay'}
					<GroundOverlay url={groundOverlayUrl} {bounds} opacity={0.55} />
				{:else if componentName === 'OverlayView'}
					<OverlayView position={center}>
						<div class="overlay-view">OverlayView</div>
					</OverlayView>
				{:else if componentName === 'MapControl'}
					<MapControl position={2 as google.maps.ControlPosition}>
						<button class="control">Map control</button>
					</MapControl>
				{:else if componentName === 'DrawingManager'}
					<DrawingManager drawingControl />
				{:else if componentName === 'DirectionsRenderer'}
					<DirectionsService options={directionsRequest} callback={handleDirectionsResult} />
					{#if directions}
						<DirectionsRenderer {directions} />
					{/if}
				{:else if componentName === 'DirectionsService'}
					<DirectionsService options={directionsRequest} callback={handleDirectionsResult} />
					<MapControl position={2 as google.maps.ControlPosition}>
						<div class="control">Directions: {serviceStatus}</div>
					</MapControl>
				{:else if componentName === 'MarkerClusterer'}
					<MarkerClusterer>
						{#each clusterLocations as position}
							<Marker {position} />
						{/each}
					</MarkerClusterer>
				{:else if componentName === 'GoogleMarkerClusterer'}
					<GoogleMarkerClusterer>
						{#each clusterLocations as position}
							<Marker {position} />
						{/each}
					</GoogleMarkerClusterer>
				{/if}
			</GoogleMap>
		</APIProvider>
	</div>
{/if}

<style>
	.map-frame {
		width: 100vw;
		height: 100vh;
	}

	.panel-frame {
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
		font: 14px/1.4 system-ui, sans-serif;
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
		font: 600 13px/1 system-ui, sans-serif;
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

	.api-key-message {
		color: #334155;
	}

	.control,
	.overlay-view,
	.info-box {
		background: white;
		border: 1px solid #d1d5db;
		border-radius: 6px;
		box-shadow: 0 8px 24px rgba(15, 23, 42, 0.16);
		color: #111827;
		font: 14px/1.4 system-ui, sans-serif;
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
		font: 700 14px/1 system-ui, sans-serif;
		height: 32px;
		justify-content: center;
		width: 32px;
	}
</style>
