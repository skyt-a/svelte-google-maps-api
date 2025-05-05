---
title: Rectangle
---

The `Rectangle` component draws a rectangle on the map defined by southwest and northeast coordinates.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| bounds | google.maps.LatLngBounds \| google.maps.LatLngBoundsLiteral | | Bounds of the rectangle |
| options | google.maps.RectangleOptions | | Rectangle configuration options |
| onLoad | (rectangle: google.maps.Rectangle) => void | | Callback when rectangle is loaded |
| onUnmount | (rectangle: google.maps.Rectangle) => void | | Callback before rectangle is destroyed |

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
| onBoundsChanged | () => void | Bounds changed event handler |

## Usage

```svelte
<script>
  import { APIProvider, GoogleMap, Rectangle } from 'svelte-google-maps-api';
  
  const apiKey = 'YOUR_API_KEY';
  const mapOptions = {
    center: { lat: 35.6812362, lng: 139.7649361 },
    zoom: 12
  };
  
  // Rectangle bounds
  const bounds = {
    north: 35.6912362,
    south: 35.6712362,
    east: 139.7749361,
    west: 139.7549361
  };
  
  // Rectangle options
  const rectangleOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35
  };
  
  function handleRectangleClick() {
    alert('Rectangle clicked!');
  }
</script>

<div style="height: 400px; width: 100%;">
  <APIProvider {apiKey}>
    <GoogleMap id="map" options={mapOptions} mapContainerStyle="width: 100%; height: 100%;">
      <Rectangle 
        bounds={bounds} 
        options={rectangleOptions}
        onClick={handleRectangleClick}
      />
    </GoogleMap>
  </APIProvider>
</div>
```

## Editable Rectangle

You can make the rectangle editable by setting the `editable` option to `true`:

```svelte
<script>
  import { APIProvider, GoogleMap, Rectangle } from 'svelte-google-maps-api';
  
  const apiKey = 'YOUR_API_KEY';
  const mapOptions = {
    center: { lat: 35.6812362, lng: 139.7649361 },
    zoom: 12
  };
  
  // Rectangle bounds
  let bounds = {
    north: 35.6912362,
    south: 35.6712362,
    east: 139.7749361,
    west: 139.7549361
  };
  
  // Rectangle options
  const rectangleOptions = {
    strokeColor: '#0000FF',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#0000FF',
    fillOpacity: 0.35,
    editable: true
  };
  
  function handleBoundsChanged(rectangle) {
    // Get the updated bounds
    const newBounds = rectangle.getBounds();
    bounds = {
      north: newBounds.getNorthEast().lat(),
      south: newBounds.getSouthWest().lat(),
      east: newBounds.getNorthEast().lng(),
      west: newBounds.getSouthWest().lng()
    };
    
    console.log('Bounds updated:', bounds);
  }
</script>

<div>
  <p>North: {bounds.north.toFixed(6)}, East: {bounds.east.toFixed(6)}</p>
  <p>South: {bounds.south.toFixed(6)}, West: {bounds.west.toFixed(6)}</p>
  
  <div style="height: 400px; width: 100%;">
    <APIProvider {apiKey}>
      <GoogleMap id="map" options={mapOptions} mapContainerStyle="width: 100%; height: 100%;">
        <Rectangle 
          bounds={bounds} 
          options={rectangleOptions}
          onLoad={(rectangle) => {
            // Add a listener for bounds changes
            google.maps.event.addListener(rectangle, 'bounds_changed', () => handleBoundsChanged(rectangle));
          }}
        />
      </GoogleMap>
    </APIProvider>
  </div>
</div>
```

## Context

The `Rectangle` component consumes the context set by `GoogleMap` to access the map instance:

```javascript
const { getMap } = getContext('map') ?? {};
let map = getMap();
```

## Notes

- The `Rectangle` component must be a child of the `GoogleMap` component.
- It creates a Google Maps rectangle and attaches it to the map.
- Event listeners are automatically cleaned up when the component is destroyed.
- The rectangle is automatically removed from the map when the component is unmounted.
