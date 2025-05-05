---
title: InfoWindow
---

The `InfoWindow` component creates and manages info windows on the map, which can display content when opened.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| position | google.maps.LatLng \| google.maps.LatLngLiteral | | Geographical coordinates for the info window |
| options | google.maps.InfoWindowOptions | | Info window configuration options |
| onLoad | (infoWindow: google.maps.InfoWindow) => void | | Callback when info window is loaded |
| onUnmount | (infoWindow: google.maps.InfoWindow) => void | | Callback before info window is destroyed |
| anchor | google.maps.MVCObject | null | The anchor to which the info window is attached |

### Event Handler Props

| Prop | Type | Description |
|------|------|-------------|
| onCloseClick | () => void | Close click event handler |
| onContentChanged | () => void | Content changed event handler |
| onDomReady | () => void | DOM ready event handler |
| onPositionChanged | () => void | Position changed event handler |
| onZindexChanged | () => void | Z-index changed event handler |

## Usage

```svelte
<script>
  import { APIProvider, GoogleMap, Marker, InfoWindow } from 'svelte-google-maps-api';
  
  const apiKey = 'YOUR_API_KEY';
  const mapOptions = {
    center: { lat: 35.6812362, lng: 139.7649361 },
    zoom: 12
  };
  
  const position = { lat: 35.6812362, lng: 139.7649361 };
  let showInfoWindow = true;
  let markerRef;
  
  function handleMarkerLoad(marker) {
    markerRef = marker;
  }
  
  function toggleInfoWindow() {
    showInfoWindow = !showInfoWindow;
  }
</script>

<div style="height: 400px; width: 100%;">
  <APIProvider {apiKey}>
    <GoogleMap id="map" options={mapOptions} mapContainerStyle="width: 100%; height: 100%;">
      <Marker 
        position={position}
        onLoad={handleMarkerLoad}
        onClick={toggleInfoWindow}
      />
      
      {#if showInfoWindow && markerRef}
        <InfoWindow anchor={markerRef} onCloseClick={toggleInfoWindow}>
          <div>
            <h3>Tokyo</h3>
            <p>The capital city of Japan</p>
          </div>
        </InfoWindow>
      {/if}
    </GoogleMap>
  </APIProvider>
</div>
```

## Using with Position

You can also use the InfoWindow with a position instead of anchoring it to a marker:

```svelte
<script>
  import { APIProvider, GoogleMap, InfoWindow } from 'svelte-google-maps-api';
  
  const apiKey = 'YOUR_API_KEY';
  const mapOptions = {
    center: { lat: 35.6812362, lng: 139.7649361 },
    zoom: 12
  };
  
  const position = { lat: 35.6812362, lng: 139.7649361 };
  let showInfoWindow = true;
  
  function toggleInfoWindow() {
    showInfoWindow = !showInfoWindow;
  }
</script>

<div style="height: 400px; width: 100%;">
  <APIProvider {apiKey}>
    <GoogleMap id="map" options={mapOptions} mapContainerStyle="width: 100%; height: 100%;">
      {#if showInfoWindow}
        <InfoWindow position={position} onCloseClick={toggleInfoWindow}>
          <div>
            <h3>Tokyo</h3>
            <p>The capital city of Japan</p>
          </div>
        </InfoWindow>
      {/if}
    </GoogleMap>
  </APIProvider>
</div>
```

## Context

The `InfoWindow` component consumes the context set by `GoogleMap` to access the map instance:

```javascript
const { getMap } = getContext('map') ?? {};
let map = getMap();
```

## Notes

- The `InfoWindow` component must be a child of the `GoogleMap` component.
- It can be anchored to a marker or other MVCObject, or positioned directly on the map.
- The content of the info window is provided as a slot.
- Event listeners are automatically cleaned up when the component is destroyed.
- The info window is automatically removed from the map when the component is unmounted.
