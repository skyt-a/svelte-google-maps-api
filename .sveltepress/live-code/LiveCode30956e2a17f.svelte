<script lang="ts">
  import { APIProvider, GoogleMap, Marker } from 'svelte-google-maps-api';
  import { writable } from 'svelte/store';

  let userApiKey = '';
  const initialPosition = { lat: 35.6812362, lng: 139.7649361 };
  const mapOptions = {
    center: initialPosition,
    zoom: 12
  };

  const markerPosition = writable(initialPosition);

  function handleDragEnd(event: CustomEvent<google.maps.MapMouseEvent>) {
    if (event.detail.latLng) {
      markerPosition.set({
        lat: event.detail.latLng.lat(),
        lng: event.detail.latLng.lng()
      });
    }
  }
</script>

<div style="margin-bottom: 1rem;">
  <label for="apiKeyDraggable">Enter your API Key:</label>
  <input id="apiKeyDraggable" type="text" bind:value={userApiKey} placeholder="YOUR_API_KEY" style="width: 300px; padding: 4px; margin-left: 5px;"/>
</div>

<div style="height: 450px; width: 100%;">
  <p style="margin-bottom: 0.5rem; font-family: monospace;">
    Marker Position: {$markerPosition.lat.toFixed(6)}, {$markerPosition.lng.toFixed(6)}
  </p>
  <p style="margin-bottom: 1rem;">Drag the marker to update its position.</p>

  <div style="height: calc(100% - 90px); width: 100%; border: 1px solid #ccc;">
    {#if !userApiKey}
      <p style="text-align: center; padding: 2rem; color: #555;">Please enter your API key above to load the map.</p>
    {:else}
      {#key userApiKey}
        <APIProvider apiKey={userApiKey}>
          <GoogleMap
            id="draggable-marker-map"
            options={mapOptions}
            mapContainerStyle="width: 100%; height: 100%;"
          >
            <Marker
              position={$markerPosition}
              options={{ draggable: true }}
              on:dragend={handleDragEnd} 
            />
          </GoogleMap>
        </APIProvider>
      {/key}
    {/if}
  </div>
</div>