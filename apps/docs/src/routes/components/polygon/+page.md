---
title: Polygon
---

The `Polygon` component draws a closed shape on the map defined by a series of coordinates.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| paths | google.maps.LatLng[][] \| google.maps.LatLngLiteral[][] | | Array of coordinates that define the polygon |
| options | google.maps.PolygonOptions | | Polygon configuration options |
| onLoad | (polygon: google.maps.Polygon) => void | | Callback when polygon is loaded |
| onUnmount | (polygon: google.maps.Polygon) => void | | Callback before polygon is destroyed |

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
  import { APIProvider, GoogleMap, Polygon } from 'svelte-google-maps-api';
  
  const apiKey = 'YOUR_API_KEY';
  const mapOptions = {
    center: { lat: 35.6812362, lng: 139.7649361 },
    zoom: 12
  };
  
  // Define a path for the polygon
  const paths = [
    { lat: 35.6812362, lng: 139.7649361 }, // Tokyo
    { lat: 35.4437078, lng: 139.6380256 }, // Yokohama
    { lat: 35.7090259, lng: 139.4631742 }  // Tachikawa
  ];
  
  // Polygon options
  const polygonOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35
  };
  
  function handlePolygonClick() {
    alert('Polygon clicked!');
  }
</script>

<div style="height: 400px; width: 100%;">
  <APIProvider {apiKey}>
    <GoogleMap id="map" options={mapOptions} mapContainerStyle="width: 100%; height: 100%;">
      <Polygon 
        paths={paths} 
        options={polygonOptions}
        onClick={handlePolygonClick}
      />
    </GoogleMap>
  </APIProvider>
</div>
```

## Editable Polygon

You can make the polygon editable by setting the `editable` option to `true`:

```svelte
<script>
  import { APIProvider, GoogleMap, Polygon } from 'svelte-google-maps-api';
  
  const apiKey = 'YOUR_API_KEY';
  const mapOptions = {
    center: { lat: 35.6812362, lng: 139.7649361 },
    zoom: 12
  };
  
  // Define a path for the polygon
  let paths = [
    { lat: 35.6812362, lng: 139.7649361 }, // Tokyo
    { lat: 35.4437078, lng: 139.6380256 }, // Yokohama
    { lat: 35.7090259, lng: 139.4631742 }  // Tachikawa
  ];
  
  // Polygon options
  const polygonOptions = {
    strokeColor: '#0000FF',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#0000FF',
    fillOpacity: 0.35,
    editable: true
  };
  
  function handlePathsChanged(polygon) {
    // Get the updated paths
    const newPaths = polygon.getPath().getArray().map(latLng => ({
      lat: latLng.lat(),
      lng: latLng.lng()
    }));
    
    paths = newPaths;
    console.log('Paths updated:', paths);
  }
</script>

<div style="height: 400px; width: 100%;">
  <APIProvider {apiKey}>
    <GoogleMap id="map" options={mapOptions} mapContainerStyle="width: 100%; height: 100%;">
      <Polygon 
        paths={paths} 
        options={polygonOptions}
        onLoad={(polygon) => {
          // Add a listener for path changes
          google.maps.event.addListener(polygon.getPath(), 'set_at', () => handlePathsChanged(polygon));
          google.maps.event.addListener(polygon.getPath(), 'insert_at', () => handlePathsChanged(polygon));
        }}
      />
    </GoogleMap>
  </APIProvider>
</div>
```

## Polygon with Hole

You can create a polygon with holes by providing an array of arrays of coordinates:

```svelte
<script>
  import { APIProvider, GoogleMap, Polygon } from 'svelte-google-maps-api';
  
  const apiKey = 'YOUR_API_KEY';
  const mapOptions = {
    center: { lat: 35.6812362, lng: 139.7649361 },
    zoom: 12
  };
  
  // Define paths for the polygon with a hole
  const paths = [
    // Outer path
    [
      { lat: 35.6912362, lng: 139.7549361 },
      { lat: 35.6712362, lng: 139.7549361 },
      { lat: 35.6712362, lng: 139.7749361 },
      { lat: 35.6912362, lng: 139.7749361 }
    ],
    // Inner path (hole)
    [
      { lat: 35.6862362, lng: 139.7599361 },
      { lat: 35.6762362, lng: 139.7599361 },
      { lat: 35.6762362, lng: 139.7699361 },
      { lat: 35.6862362, lng: 139.7699361 }
    ]
  ];
  
  // Polygon options
  const polygonOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35
  };
</script>

<div style="height: 400px; width: 100%;">
  <APIProvider {apiKey}>
    <GoogleMap id="map" options={mapOptions} mapContainerStyle="width: 100%; height: 100%;">
      <Polygon 
        paths={paths} 
        options={polygonOptions}
      />
    </GoogleMap>
  </APIProvider>
</div>
```

## Context

The `Polygon` component consumes the context set by `GoogleMap` to access the map instance:

```javascript
const { getMap } = getContext('map') ?? {};
let map = getMap();
```

## Notes

- The `Polygon` component must be a child of the `GoogleMap` component.
- It creates a Google Maps polygon and attaches it to the map.
- Event listeners are automatically cleaned up when the component is destroyed.
- The polygon is automatically removed from the map when the component is unmounted.
