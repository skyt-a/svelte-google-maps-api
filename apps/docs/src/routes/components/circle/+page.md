---
title: Circle
---

The `Circle` component draws a circle on the map with a specified center and radius.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| center | google.maps.LatLng \| google.maps.LatLngLiteral | | Center coordinates of the circle |
| options | google.maps.CircleOptions | | Circle configuration options |
| onLoad | (circle: google.maps.Circle) => void | | Callback when circle is loaded |
| onUnmount | (circle: google.maps.Circle) => void | | Callback before circle is destroyed |

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
| onCenterChanged | () => void | Center changed event handler |
| onRadiusChanged | () => void | Radius changed event handler |

## Usage

```svelte
<script>
  import { APIProvider, GoogleMap, Circle } from 'svelte-google-maps-api';
  
  const apiKey = 'YOUR_API_KEY';
  const mapOptions = {
    center: { lat: 35.6812362, lng: 139.7649361 },
    zoom: 12
  };
  
  // Circle center and options
  const center = { lat: 35.6812362, lng: 139.7649361 };
  const circleOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    radius: 1000 // in meters
  };
  
  function handleCircleClick() {
    alert('Circle clicked!');
  }
</script>

<div style="height: 400px; width: 100%;">
  <APIProvider {apiKey}>
    <GoogleMap id="map" options={mapOptions} mapContainerStyle="width: 100%; height: 100%;">
      <Circle 
        center={center} 
        options={circleOptions}
        onClick={handleCircleClick}
      />
    </GoogleMap>
  </APIProvider>
</div>
```

## Editable Circle

You can make the circle editable by setting the `editable` option to `true`:

```svelte
<script>
  import { APIProvider, GoogleMap, Circle } from 'svelte-google-maps-api';
  
  const apiKey = 'YOUR_API_KEY';
  const mapOptions = {
    center: { lat: 35.6812362, lng: 139.7649361 },
    zoom: 12
  };
  
  // Circle center and options
  let center = { lat: 35.6812362, lng: 139.7649361 };
  let radius = 1000; // in meters
  
  const circleOptions = {
    strokeColor: '#0000FF',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#0000FF',
    fillOpacity: 0.35,
    radius,
    editable: true
  };
  
  function handleCircleChanges(circle) {
    // Get the updated center and radius
    const newCenter = {
      lat: circle.getCenter().lat(),
      lng: circle.getCenter().lng()
    };
    const newRadius = circle.getRadius();
    
    center = newCenter;
    radius = newRadius;
    
    console.log('Circle updated:', { center, radius });
  }
</script>

<div>
  <p>Circle center: {center.lat.toFixed(6)}, {center.lng.toFixed(6)}</p>
  <p>Circle radius: {radius.toFixed(2)} meters</p>
  
  <div style="height: 400px; width: 100%;">
    <APIProvider {apiKey}>
      <GoogleMap id="map" options={mapOptions} mapContainerStyle="width: 100%; height: 100%;">
        <Circle 
          center={center} 
          options={circleOptions}
          onLoad={(circle) => {
            // Add listeners for center and radius changes
            google.maps.event.addListener(circle, 'center_changed', () => handleCircleChanges(circle));
            google.maps.event.addListener(circle, 'radius_changed', () => handleCircleChanges(circle));
          }}
        />
      </GoogleMap>
    </APIProvider>
  </div>
</div>
```

## Context

The `Circle` component consumes the context set by `GoogleMap` to access the map instance:

```javascript
const { getMap } = getContext('map') ?? {};
let map = getMap();
```

## Notes

- The `Circle` component must be a child of the `GoogleMap` component.
- It creates a Google Maps circle and attaches it to the map.
- The radius is specified in meters.
- Event listeners are automatically cleaned up when the component is destroyed.
- The circle is automatically removed from the map when the component is unmounted.
