<script lang="ts">
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

	const apiKey = import.meta.env.STORYBOOK_GOOGLE_MAPS_API_KEY ?? '';
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
	const kmlUrl = 'https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml';
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

	$: libraries = getLibraries(componentName);

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
</script>

{#if !apiKey}
	<div class="missing-key">
		<strong>{componentName}</strong>
		<span>Set STORYBOOK_GOOGLE_MAPS_API_KEY to run this story with Google Maps.</span>
	</div>
{:else if componentName === 'APIProvider'}
	<div class="map-frame">
		<APIProvider {apiKey}>
			<GoogleMap options={mapOptions} mapContainerStyle="width:100%;height:100%;">
				<Marker position={center} options={{ title: 'APIProvider story marker' }} />
			</GoogleMap>
		</APIProvider>
	</div>
{:else if componentName === 'Autocomplete'}
	<div class="panel-frame">
		<APIProvider {apiKey} libraries={['places']}>
			<Autocomplete placeholder="Search for a place" inputStyle="width:320px;padding:10px;" />
		</APIProvider>
	</div>
{:else if componentName === 'StandaloneSearchBox'}
	<div class="panel-frame">
		<APIProvider {apiKey} libraries={['places']}>
			<StandaloneSearchBox placeholder="Search places" inputStyle="width:320px;padding:10px;" />
		</APIProvider>
	</div>
{:else if componentName === 'StreetViewPanorama'}
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
{:else if componentName === 'StreetViewService'}
	<div class="panel-frame">
		<APIProvider {apiKey}>
			<StreetViewService onLoad={() => (serviceStatus = 'StreetViewService loaded')} />
			<p>{serviceStatus}</p>
		</APIProvider>
	</div>
{:else if componentName === 'DistanceMatrixService'}
	<div class="panel-frame">
		<APIProvider {apiKey}>
			<DistanceMatrixService options={distanceRequest} callback={handleDistanceMatrix} />
			<p>{serviceStatus}</p>
		</APIProvider>
	</div>
{:else}
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
					<Polyline path={path} strokeColor="#0f766e" strokeWeight={4} />
				{:else if componentName === 'Polygon'}
					<Polygon paths={path} fillColor="#0f766e" fillOpacity={0.25} strokeColor="#0f766e" />
				{:else if componentName === 'Circle'}
					<Circle center={center} radius={1200} fillColor="#2563eb" fillOpacity={0.2} strokeColor="#2563eb" />
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
		font-family:
			Inter,
			system-ui,
			sans-serif;
	}

	.missing-key {
		min-height: 100vh;
		display: grid;
		place-content: center;
		gap: 8px;
		font-family:
			Inter,
			system-ui,
			sans-serif;
		color: #1f2937;
		background: #f8fafc;
	}

	.missing-key span {
		color: #64748b;
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
