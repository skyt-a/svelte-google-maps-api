---
title: Examples
---

Here are some examples of how to use the Svelte Google Maps API library.

**Note:** You need a Google Maps API key to view these examples. Enter your key in the input field provided for each demo.

## Basic Map

A simple map with default options.

```svelte live title="BasicMap.svelte"
<script lang="ts">
  import { APIProvider, GoogleMap } from 'svelte-google-maps-api';

  let userApiKey = '';
  const mapOptions = {
    center: { lat: 35.6812362, lng: 139.7649361 },
    zoom: 10
  };
</script>

<div style="margin-bottom: 1rem;">
  <label for="apiKeyBasic">Enter your API Key:</label>
  <input id="apiKeyBasic" type="text" bind:value={userApiKey} placeholder="YOUR_API_KEY" style="width: 300px; padding: 4px; margin-left: 5px;"/>
</div>

<div style="height: 400px; width: 100%; border: 1px solid #ccc;">
  {#if !userApiKey}
    <p style="text-align: center; padding: 2rem; color: #555;">Please enter your API key above to load the map.</p>
  {:else}
    {#key userApiKey}
      <APIProvider apiKey={userApiKey}>
        <GoogleMap
          id="basic-map"
          options={mapOptions}
          mapContainerStyle="width: 100%; height: 100%;"
        />
      </APIProvider>
    {/key}
  {/if}
</div>
```

## Map with Marker

A map with a single marker.

```svelte live title="MapWithMarker.svelte"
<script lang="ts">
  import { APIProvider, GoogleMap, Marker } from 'svelte-google-maps-api';

  let userApiKey = '';
  const mapOptions = {
    center: { lat: 35.6812362, lng: 139.7649361 },
    zoom: 12
  };
  const position = { lat: 35.6812362, lng: 139.7649361 };
</script>

<div style="margin-bottom: 1rem;">
  <label for="apiKeyMarker">Enter your API Key:</label>
  <input id="apiKeyMarker" type="text" bind:value={userApiKey} placeholder="YOUR_API_KEY" style="width: 300px; padding: 4px; margin-left: 5px;"/>
</div>

<div style="height: 400px; width: 100%; border: 1px solid #ccc;">
  {#if !userApiKey}
    <p style="text-align: center; padding: 2rem; color: #555;">Please enter your API key above to load the map.</p>
  {:else}
    {#key userApiKey}
      <APIProvider apiKey={userApiKey}>
        <GoogleMap
          id="map-with-marker"
          options={mapOptions}
          mapContainerStyle="width: 100%; height: 100%;"
        >
          <Marker {position} />
        </GoogleMap>
      </APIProvider>
    {/key}
  {/if}
</div>
```

## Interactive Map with Multiple Markers

A map with multiple markers that can be clicked to show information.

```svelte live title="InteractiveMarkers.svelte"
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
```

## Draggable Marker

A map with a draggable marker that updates its position when dragged.

```svelte live title="DraggableMarker.svelte"
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
```

## Click to Add Markers

A map where clicking adds new markers.

```svelte live title="ClickToAddMarkers.svelte"
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
```
