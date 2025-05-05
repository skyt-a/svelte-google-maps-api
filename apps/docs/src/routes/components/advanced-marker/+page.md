---
title: AdvancedMarker
---

The `AdvancedMarker` component creates and manages advanced markers on the map, allowing for custom HTML content.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| position | google.maps.LatLng \| google.maps.LatLngLiteral | | Geographical coordinates for the marker |
| options | google.maps.marker.AdvancedMarkerElementOptions | | Advanced marker configuration options |
| onLoad | (marker: google.maps.marker.AdvancedMarkerElement) => void | | Callback when marker is loaded |
| onUnmount | (marker: google.maps.marker.AdvancedMarkerElement) => void | | Callback before marker is destroyed |

### Event Handler Props

| Prop | Type | Description |
|------|------|-------------|
| onClick | (e: google.maps.MapMouseEvent) => void | Click event handler |
| onDblClick | (e: google.maps.MapMouseEvent) => void | Double click event handler |
| onDrag | (e: google.maps.MapMouseEvent) => void | Drag event handler |
| onDragEnd | (e: google.maps.MapMouseEvent) => void | Drag end event handler |
| onDragStart | (e: google.maps.MapMouseEvent) => void | Drag start event handler |
| onMouseDown | (e: google.maps.MapMouseEvent) => void | Mouse down event handler |
| onMouseOut | (e: google.maps.MapMouseEvent) => void | Mouse out event handler |
| onMouseOver | (e: google.maps.MapMouseEvent) => void | Mouse over event handler |
| onMouseUp | (e: google.maps.MapMouseEvent) => void | Mouse up event handler |
| onRightClick | (e: google.maps.MapMouseEvent) => void | Right click event handler |

## Usage

```svelte
<script>
  import { APIProvider, GoogleMap, AdvancedMarker } from 'svelte-google-maps-api';
  
  const apiKey = 'YOUR_API_KEY';
  const mapOptions = {
    center: { lat: 35.6812362, lng: 139.7649361 },
    zoom: 12
  };
  
  const position = { lat: 35.6812362, lng: 139.7649361 };
  const markerOptions = {
    title: 'Tokyo',
    draggable: true
  };
  
  function handleMarkerClick() {
    alert('Advanced Marker clicked!');
  }
</script>

<div style="height: 400px; width: 100%;">
  <APIProvider {apiKey}>
    <GoogleMap id="map" options={mapOptions} mapContainerStyle="width: 100%; height: 100%;">
      <AdvancedMarker 
        position={position} 
        options={markerOptions}
        onClick={handleMarkerClick}
      />
    </GoogleMap>
  </APIProvider>
</div>
```

## Custom Content

One of the main advantages of `AdvancedMarker` is the ability to use custom HTML content:

```svelte
<script>
  import { APIProvider, GoogleMap, AdvancedMarker } from 'svelte-google-maps-api';
  
  const apiKey = 'YOUR_API_KEY';
  const mapOptions = {
    center: { lat: 35.6812362, lng: 139.7649361 },
    zoom: 12
  };
  
  const position = { lat: 35.6812362, lng: 139.7649361 };
  
  // Create a custom element for the marker
  let customElement;
  
  function createCustomElement() {
    const element = document.createElement('div');
    element.className = 'custom-marker';
    element.innerHTML = `
      <div style="background-color: #4285F4; color: white; padding: 8px 12px; border-radius: 4px; font-weight: bold;">
        Tokyo
      </div>
    `;
    return element;
  }
  
  function handleLoad(marker) {
    customElement = createCustomElement();
    marker.content = customElement;
  }
</script>

<div style="height: 400px; width: 100%;">
  <APIProvider {apiKey}>
    <GoogleMap id="map" options={mapOptions} mapContainerStyle="width: 100%; height: 100%;">
      <AdvancedMarker 
        position={position}
        onLoad={handleLoad}
      />
    </GoogleMap>
  </APIProvider>
</div>
```

## Context

The `AdvancedMarker` component consumes the context set by `GoogleMap` to access the map instance:

```javascript
const { getMap } = getContext('map') ?? {};
let map = getMap();
```

## Notes

- The `AdvancedMarker` component must be a child of the `GoogleMap` component.
- It requires the Google Maps "marker" library to be loaded.
- It allows for custom HTML content, making it more flexible than the standard `Marker` component.
- Event listeners are automatically cleaned up when the component is destroyed.
- The marker is automatically removed from the map when the component is unmounted.
