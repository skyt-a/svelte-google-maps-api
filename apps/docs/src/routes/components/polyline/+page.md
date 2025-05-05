---
title: Polyline
---

The `Polyline` component draws a line on the map connecting a series of locations.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| path | google.maps.LatLng[] \| google.maps.LatLngLiteral[] | | Array of coordinates that define the line |
| options | google.maps.PolylineOptions | | Polyline configuration options |
| onLoad | (polyline: google.maps.Polyline) => void | | Callback when polyline is loaded |
| onUnmount | (polyline: google.maps.Polyline) => void | | Callback before polyline is destroyed |

### Event Handler Props

| Prop | Type | Description |
|------|------|-------------|
| onClick | (e: google.maps.MapMouseEvent) => void | Click event handler |
| onDblClick | (e: google.maps.MapMouseEvent) => void | Double click event handler |
| onDrag | (e: google.maps.MapMouseEvent) => void | Drag event handler |
| onDragEnd | (e: google.maps.MapMouseEvent) => void | Drag end event handler |
| onDragStart | (e: google.maps.MapMouseEvent) => void | Drag start event handler |
| onMouseDown | (e: google.maps.MapMouseEvent) => void | Mouse down event handler |
| onMouseMove | (e: google.maps.MapMouseEvent) => void | Mouse move event handler |
| onMouseOut | (e: google.maps.MapMouseEvent) => void | Mouse out event handler |
| onMouseOver | (e: google.maps.MapMouseEvent) => void | Mouse over event handler |
| onMouseUp | (e: google.maps.MapMouseEvent) => void | Mouse up event handler |
| onRightClick | (e: google.maps.MapMouseEvent) => void | Right click event handler |

## Usage

```svelte
<script>
  import { APIProvider, GoogleMap, Polyline } from 'svelte-google-maps-api';
  
  const apiKey = 'YOUR_API_KEY';
  const mapOptions = {
    center: { lat: 35.6812362, lng: 139.7649361 },
    zoom: 12
  };
  
  // Define a path for the polyline
  const path = [
    { lat: 35.6812362, lng: 139.7649361 }, // Tokyo
    { lat: 35.4437078, lng: 139.6380256 }, // Yokohama
    { lat: 35.7090259, lng: 139.4631742 }  // Tachikawa
  ];
  
  // Polyline options
  const polylineOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 3
  };
  
  function handlePolylineClick() {
    alert('Polyline clicked!');
  }
</script>

<div style="height: 400px; width: 100%;">
  <APIProvider {apiKey}>
    <GoogleMap id="map" options={mapOptions} mapContainerStyle="width: 100%; height: 100%;">
      <Polyline 
        path={path} 
        options={polylineOptions}
        onClick={handlePolylineClick}
      />
    </GoogleMap>
  </APIProvider>
</div>
```

## Editable Polyline

You can make the polyline editable by setting the `editable` option to `true`:

```svelte
<script>
  import { APIProvider, GoogleMap, Polyline } from 'svelte-google-maps-api';
  
  const apiKey = 'YOUR_API_KEY';
  const mapOptions = {
    center: { lat: 35.6812362, lng: 139.7649361 },
    zoom: 12
  };
  
  // Define a path for the polyline
  let path = [
    { lat: 35.6812362, lng: 139.7649361 }, // Tokyo
    { lat: 35.4437078, lng: 139.6380256 }, // Yokohama
    { lat: 35.7090259, lng: 139.4631742 }  // Tachikawa
  ];
  
  // Polyline options
  const polylineOptions = {
    strokeColor: '#0000FF',
    strokeOpacity: 0.8,
    strokeWeight: 4,
    editable: true
  };
  
  function handlePathChanged(polyline) {
    // Get the updated path
    const newPath = polyline.getPath().getArray().map(latLng => ({
      lat: latLng.lat(),
      lng: latLng.lng()
    }));
    
    path = newPath;
    console.log('Path updated:', path);
  }
</script>

<div style="height: 400px; width: 100%;">
  <APIProvider {apiKey}>
    <GoogleMap id="map" options={mapOptions} mapContainerStyle="width: 100%; height: 100%;">
      <Polyline 
        path={path} 
        options={polylineOptions}
        onLoad={(polyline) => {
          // Add a listener for path changes
          google.maps.event.addListener(polyline.getPath(), 'set_at', () => handlePathChanged(polyline));
          google.maps.event.addListener(polyline.getPath(), 'insert_at', () => handlePathChanged(polyline));
        }}
      />
    </GoogleMap>
  </APIProvider>
</div>
```

## Context

The `Polyline` component consumes the context set by `GoogleMap` to access the map instance:

```javascript
const { getMap } = getContext('map') ?? {};
let map = getMap();
```

## Notes

- The `Polyline` component must be a child of the `GoogleMap` component.
- It creates a Google Maps polyline and attaches it to the map.
- Event listeners are automatically cleaned up when the component is destroyed.
- The polyline is automatically removed from the map when the component is unmounted.
