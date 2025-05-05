<script lang="ts">
  import { APIProvider, GoogleMap, Marker, InfoWindow } from 'svelte-google-maps-api';
  import { writable } from 'svelte/store';

  let userApiKey = '';
  const mapOptions = {
    center: { lat: 35.6812362, lng: 139.7649361 },
    zoom: 11
  };

  const locations = [
    { id: 1, position: { lat: 35.6812362, lng: 139.7649361 }, title: 'Tokyo Station' },
    { id: 2, position: { lat: 35.7100627, lng: 139.8107004 }, title: 'Tokyo Skytree' },
    { id: 3, position: { lat: 35.6586414, lng: 139.7454329 }, title: 'Tokyo Tower' }
  ];

  const selectedMarkerId = writable<number | null>(null);
  let mapInstance: google.maps.Map | null = null;
  let markerInstances: { [key: number]: google.maps.Marker } = {};

  function handleMarkerClick(locationId: number) {
    selectedMarkerId.set(locationId);
  }

  function closeInfoWindow() {
    selectedMarkerId.set(null);
  }
</script>

<div style="margin-bottom: 1rem;">
  <label for="apiKeyInteractive">Enter your API Key:</label>
  <input id="apiKeyInteractive" type="text" bind:value={userApiKey} placeholder="YOUR_API_KEY" style="width: 300px; padding: 4px; margin-left: 5px;"/>
</div>

<div style="height: 450px; width: 100%; border: 1px solid #ccc;">
  {#if !userApiKey}
    <p style="text-align: center; padding: 2rem; color: #555;">Please enter your API key above to load the map.</p>
  {:else}
    {#key userApiKey}
      <APIProvider apiKey={userApiKey}>
        <GoogleMap
          bind:map={mapInstance}
          id="interactive-map"
          options={mapOptions}
          mapContainerStyle="width: 100%; height: 100%;"
        >
          {#each locations as location (location.id)}
            <Marker
              bind:marker={markerInstances[location.id]}
              position={location.position}
              title={location.title}
              onClick={() => handleMarkerClick(location.id)}
            />
          {/each}

          {#if $selectedMarkerId !== null}
            {@const selectedLocation = locations.find(l => l.id === $selectedMarkerId)}
            {#if selectedLocation && markerInstances[$selectedMarkerId]}
              <InfoWindow
                anchor={markerInstances[$selectedMarkerId]}
                options={{ pixelOffset: new google.maps.Size(0, -35) }} 
                on:closeclick={closeInfoWindow}
              >
                <div>
                  <strong>{selectedLocation.title}</strong>
                  <p>Lat: {selectedLocation.position.lat.toFixed(6)}, Lng: {selectedLocation.position.lng.toFixed(6)}</p>
                </div>
              </InfoWindow>
            {/if}
          {/if}
        </GoogleMap>
      </APIProvider>
    {/key}
  {/if}
</div>