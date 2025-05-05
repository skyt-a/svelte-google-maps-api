<script lang="ts">
	import GoogleMap from '$lib/GoogleMap.svelte';
	import APIProvider from '$lib/APIProvider.svelte';
	import Marker from '$lib/Marker.svelte';
	import AdvancedMarker from '$lib/AdvancedMarker.svelte';
	import InfoWindow from '$lib/InfoWindow.svelte';
	import Polyline from '$lib/Polyline.svelte';
	import Polygon from '$lib/Polygon.svelte';
	import Circle from '$lib/Circle.svelte';
	import Rectangle from '$lib/Rectangle.svelte';
	import HeatmapLayer from '$lib/HeatmapLayer.svelte';
	import GroundOverlay from '$lib/GroundOverlay.svelte';
	import DirectionsRenderer from '$lib/DirectionsRenderer.svelte';
	import MapControl from '$lib/controls/MapControl.svelte';
	import TrafficLayer from '$lib/layers/TrafficLayer.svelte';
	import TransitLayer from '$lib/layers/TransitLayer.svelte';
	import BicyclingLayer from '$lib/layers/BicyclingLayer.svelte';
	import KmlLayer from '$lib/layers/KmlLayer.svelte';
	import Autocomplete from '$lib/places/Autocomplete.svelte';
	import OverlayView from '$lib/overlay/OverlayView.svelte';
	import StreetViewPanorama from '$lib/street-view/StreetViewPanorama.svelte';

	let apiKey = '';

	let showInfoWindow = false;
	let advancedMarkerInstance: google.maps.marker.AdvancedMarkerElement | null = null;
	let advMarkerComponent: AdvancedMarker;
	let heatmapData = [
		{ location: { lat: 35.685, lng: 139.76 }, weight: 3 },
		{ location: { lat: 35.686, lng: 139.765 }, weight: 2 },
		{ location: { lat: 35.687, lng: 139.77 }, weight: 5 },
		{ location: { lat: 35.684, lng: 139.77 }, weight: 1 },
		{ location: { lat: 35.683, lng: 139.765 }, weight: 4 }
	];

	const groundOverlayBounds = {
		north: 35.695,
		south: 35.69,
		east: 139.765,
		west: 139.76
	};
	const groundOverlayUrl =
		'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png';

	let directionsResult: google.maps.DirectionsResult | undefined = undefined;
	let directionsStatus: string = 'Click button to fetch directions';

	let showTraffic = false;
	let showTransit = false;
	let showBicycling = false;

	let autocompleteValue = '';
	let selectedPlace: google.maps.places.PlaceResult | null = null;

	let showStreetView = false;
	let streetViewPosition = { lat: 35.681, lng: 139.767 };

	function handleMarkerClick() {
		showInfoWindow = !showInfoWindow;
	}

	function handleInfoWindowClose() {
		showInfoWindow = false;
	}

	function handleCustomControlClick() {
		alert('Custom control clicked!');
	}

	function calculateRoute() {
		if (
			typeof window === 'undefined' ||
			!window.google ||
			!window.google.maps ||
			!window.google.maps.DirectionsService
		) {
			directionsStatus = 'Google Maps API or Directions Service not ready';
			console.error('[+page] Google Maps API or Directions Service not available on window');
			return;
		}

		directionsStatus = 'Calculating...';
		const directionsServiceInstance = new window.google.maps.DirectionsService();

		const request: google.maps.DirectionsRequest = {
			origin: { lat: 35.681, lng: 139.767 },
			destination: { lat: 35.658, lng: 139.745 },
			travelMode: google.maps.TravelMode.DRIVING
		};

		directionsServiceInstance.route(request, (result, status) => {
			if (status === google.maps.DirectionsStatus.OK && result) {
				directionsResult = result;
				directionsStatus = 'Route calculated successfully';
				console.log('[+page] Directions Result:', result);
			} else {
				directionsResult = undefined;
				directionsStatus = `Error calculating directions: ${status}`;
				console.error('[+page] Directions request failed due to ' + status);
			}
		});
	}
</script>

<div style="padding: 10px; display: flex; gap: 20px; flex-wrap: wrap;">
	<input type="text" placeholder="API Key" bind:value={apiKey} style="flex-grow: 1;" />
	<Autocomplete
		bind:value={autocompleteValue}
		on:place_changed={(e) => {
			selectedPlace = e.detail;
			console.log('Place selected:', selectedPlace);
		}}
		placeholder="Search for a place"
		options={{ fields: ['name', 'geometry'] }}
		inputClass="my-autocomplete-input"
	/>
	<button on:click={calculateRoute}>Calculate Route</button>
	<span>{directionsStatus}</span>
	<button on:click={() => (showStreetView = !showStreetView)}
		>{showStreetView ? 'Hide' : 'Show'} Street View</button
	>
	<div>
		<label><input type="checkbox" bind:checked={showTraffic} /> Traffic</label>
		<label><input type="checkbox" bind:checked={showTransit} /> Transit</label>
		<label><input type="checkbox" bind:checked={showBicycling} /> Bicycling</label>
	</div>
</div>

<div style="display: flex; height: calc(100vh - 80px);">
	<!-- Adjust height based on controls above -->
	<div style="flex: 1; position: relative;">
		<APIProvider {apiKey} libraries={['marker', 'visualization', 'routes', 'places']}>
			<!-- Add 'places' -->
			<GoogleMap
				options={{
					center: { lat: 35.681, lng: 139.767 },
					zoom: 14,
					mapId: 'e7e5672a39c9414b'
				}}
				mapContainerStyle="width:100%;height:100%;"
			>
				<Marker position={{ lat: 35.681, lng: 139.767 }} onClick={handleMarkerClick} />

				<AdvancedMarker
					bind:this={advMarkerComponent}
					position={{ lat: 35.683, lng: 139.768 }}
					onClick={handleMarkerClick}
				>
					<div style="background: blue; color: white; padding: 5px; border-radius: 5px;">ADV</div>
				</AdvancedMarker>

				{#if showInfoWindow && advMarkerComponent}
					{@const markerInstance = advMarkerComponent.getMarkerInstance()}
					{#if markerInstance}
						<InfoWindow
							anchor={markerInstance}
							onCloseClick={handleInfoWindowClose}
							bind:isOpen={showInfoWindow}
						>
							<p>Advanced Marker Info Window</p>
							<p>Position: {JSON.stringify({ lat: 35.683, lng: 139.768 })}</p>
						</InfoWindow>
					{/if}
				{/if}

				<Polyline
					path={[
						{ lat: 35.68, lng: 139.76 },
						{ lat: 35.682, lng: 139.765 },
						{ lat: 35.68, lng: 139.77 }
					]}
					strokeColor="#FF0000"
					strokeOpacity={0.8}
					strokeWeight={2}
				/>

				<Polygon
					paths={[
						[
							{ lat: 35.688, lng: 139.768 },
							{ lat: 35.685, lng: 139.772 },
							{ lat: 35.688, lng: 139.775 }
						] as google.maps.LatLngLiteral[]
					]}
					strokeColor="#0000FF"
					strokeOpacity={0.8}
					strokeWeight={2}
					fillColor="#0000FF"
					fillOpacity={0.35}
				/>

				<Circle
					center={{ lat: 35.678, lng: 139.775 }}
					radius={200}
					strokeColor="#00FF00"
					strokeOpacity={0.8}
					strokeWeight={2}
					fillColor="#00FF00"
					fillOpacity={0.35}
				/>

				<Rectangle
					bounds={{
						north: 35.678,
						south: 35.675,
						east: 139.765,
						west: 139.76
					}}
					strokeColor="#FFFF00"
					strokeOpacity={0.8}
					strokeWeight={2}
					fillColor="#FFFF00"
					fillOpacity={0.35}
				/>

				{#if heatmapData.length > 0}
					<HeatmapLayer data={heatmapData} options={{ radius: 20, opacity: 0.6 }} />
				{/if}

				<GroundOverlay
					url={groundOverlayUrl}
					bounds={groundOverlayBounds}
					options={{ opacity: 0.7 }}
				/>

				{#if directionsResult}
					<DirectionsRenderer directions={directionsResult} />
				{/if}

				<MapControl position={1}>
					<button
						on:click={handleCustomControlClick}
						style="margin: 10px; background: white; padding: 5px; border: 1px solid #ccc;"
						>Custom Button</button
					>
				</MapControl>

				<!-- Simple Layers Toggles -->
				{#if showTraffic} <TrafficLayer /> {/if}
				{#if showTransit} <TransitLayer /> {/if}
				{#if showBicycling} <BicyclingLayer /> {/if}

				<!-- OverlayView Example -->
				<OverlayView position={{ lat: 35.675, lng: 139.77 }}>
					<div
						style="background: rgba(255, 0, 255, 0.7); color: white; padding: 10px; border-radius: 5px; transform: translate(-50%, -100%);"
					>
						<!-- Center above point -->
						Custom Overlay!
					</div>
				</OverlayView>
			</GoogleMap>
		</APIProvider>
	</div>

	<!-- StreetView Container -->
	{#if showStreetView}
		<div style="flex: 1; border-left: 1px solid #ccc;">
			<APIProvider {apiKey}>
				<!-- Separate provider for SV or reuse? Reusing might be complex -->
				<StreetViewPanorama
					position={streetViewPosition}
					containerStyle="width:100%;height:100%;"
					onPanoChanged={() => console.log('SV Pano Changed')}
					onPositionChanged={() => console.log('SV Pos Changed')}
				/>
			</APIProvider>
		</div>
	{/if}
</div>
