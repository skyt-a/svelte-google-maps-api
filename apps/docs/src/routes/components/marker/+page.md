---
title: Marker
---

The `Marker` component creates and manages markers on the map.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| position | google.maps.LatLng \| google.maps.LatLngLiteral | | Geographical coordinates for the marker |
| options | google.maps.MarkerOptions | | Marker configuration options |
| onLoad | (marker: google.maps.Marker) => void | | Callback when marker is loaded |
| onUnmount | (marker: google.maps.Marker) => void | | Callback before marker is destroyed |

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
| onClickableChanged | () => void | Clickable property changed handler |
| onCursorChanged | () => void | Cursor property changed handler |
| onAnimationChanged | () => void | Animation property changed handler |
| onDraggableChanged | () => void | Draggable property changed handler |
| onFlatChanged | () => void | Flat property changed handler |
| onIconChanged | () => void | Icon property changed handler |
| onPositionChanged | () => void | Position property changed handler |
| onShapeChanged | () => void | Shape property changed handler |
| onTitleChanged | () => void | Title property changed handler |
| onVisibleChanged | () => void | Visible property changed handler |
| onZindexChanged | () => void | Z-index property changed handler |

## Usage

```svelte
<script>
  import { APIProvider, GoogleMap, Marker } from 'svelte-google-maps-api';
  
  const apiKey = 'YOUR_API_KEY';
  const mapOptions = {
    center: { lat: 35.6812362, lng: 139.7649361 },
    zoom: 10
  };
  
  const position = { lat: 35.6812362, lng: 139.7649361 };
  const markerOptions = {
    title: 'Tokyo',
    draggable: true
  };
  
  function handleMarkerClick() {
    alert('Marker clicked!');
  }
</script>

<div style="height: 400px; width: 100%;">
  <APIProvider {apiKey}>
    <GoogleMap id="map" options={mapOptions} mapContainerStyle="width: 100%; height: 100%;">
      <Marker 
        position={position} 
        options={markerOptions}
        onClick={handleMarkerClick}
      />
    </GoogleMap>
  </APIProvider>
</div>
```

## Context

The `Marker` component consumes the context set by `GoogleMap` to access the map instance:

```javascript
const { getMap } = getContext('map') ?? {};
let map = getMap();
```

## Example with Multiple Markers

```svelte
<script>
  import { APIProvider, GoogleMap, Marker } from 'svelte-google-maps-api';
  
  const apiKey = 'YOUR_API_KEY';
  const mapOptions = {
    center: { lat: 35.6812362, lng: 139.7649361 },
    zoom: 8
  };
  
  const locations = [
    { position: { lat: 35.6812362, lng: 139.7649361 }, title: 'Tokyo' },
    { position: { lat: 35.4437078, lng: 139.6380256 }, title: 'Yokohama' },
    { position: { lat: 35.7090259, lng: 139.4631742 }, title: 'Tachikawa' }
  ];
  
  let selectedMarker = null;
  
  function handleMarkerClick(title) {
    selectedMarker = title;
  }
</script>

<div>
  {#if selectedMarker}
    <p>Selected: {selectedMarker}</p>
  {:else}
    <p>Click on a marker to select it</p>
  {/if}
  
  <div style="height: 300px; width: 100%;">
    <APIProvider {apiKey}>
      <GoogleMap id="map" options={mapOptions} mapContainerStyle="width: 100%; height: 100%;">
        {#each locations as location}
          <Marker 
            position={location.position} 
            options={{ title: location.title }}
            onClick={() => handleMarkerClick(location.title)}
          />
        {/each}
      </GoogleMap>
    </APIProvider>
  </div>
</div>
```

## Notes

- The `Marker` component must be a child of the `GoogleMap` component.
- It creates a Google Maps marker and attaches it to the map.
- Event listeners are automatically cleaned up when the component is destroyed.
- The marker is automatically removed from the map when the component is unmounted.
