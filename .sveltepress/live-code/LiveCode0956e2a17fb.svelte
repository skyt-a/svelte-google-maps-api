<script lang="ts">
  import { APIProvider, GoogleMap, Marker } from 'svelte-google-maps-api';
  import { writable } from 'svelte/store';

  let userApiKey = '';
  const mapOptions = {
    center: { lat: 35.6812362, lng: 139.7649361 },
    zoom: 12
  };

  interface SimpleMarker {
    id: number;
    position: google.maps.LatLngLiteral;
  }

  const markers = writable<SimpleMarker[]>([]);

  function handleMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng && userApiKey) {
      const newMarker: SimpleMarker = {
        id: Date.now(),
        position: {
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        }
      };
      markers.update(currentMarkers => [...currentMarkers, newMarker]);
    }
  }

  function clearMarkers() {
    markers.set([]);
  }
</script>

<div style="margin-bottom: 1rem;">
  <label for="apiKeyClickToAdd">Enter your API Key:</label>
  <input id="apiKeyClickToAdd" type="text" bind:value={userApiKey} placeholder="YOUR_API_KEY" style="width: 300px; padding: 4px; margin-left: 5px;"/>
</div>

<div style="height: 450px; width: 100%;">
  <div style="margin-bottom: 1rem;">
    <p>Click on the map to add markers. Current markers: {$markers.length}</p>
    <button onclick={clearMarkers} disabled={$markers.length === 0}>Clear All Markers</button>
  </div>

  <div style="height: calc(100% - 90px); width: 100%; border: 1px solid #ccc;">
    {#if !userApiKey}
      <p style="text-align: center; padding: 2rem; color: #555;">Please enter your API key above to load the map.</p>
    {:else}
      {#key userApiKey}
        <APIProvider apiKey={userApiKey}>
          <GoogleMap
            id="click-to-add-markers"
            options={mapOptions}
            mapContainerStyle="width: 100%; height: 100%;"
            onClick={handleMapClick}
          >
            {#each $markers as marker (marker.id)}
              <Marker position={marker.position} />
            {/each}
          </GoogleMap>
        </APIProvider>
      {/key}
    {/if}
  </div>
</div>