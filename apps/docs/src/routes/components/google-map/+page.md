---
title: GoogleMap
---

The GoogleMap component renders a Google Map instance.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| id | string | | Unique identifier for the map container |
| options | google.maps.MapOptions | `{}` | Google Maps configuration options |
| mapContainerStyle | string | 'width:100%;height:100%' | CSS styles for the map container |
| mapContainerClassName | string | | CSS class for the map container |
| onLoad | (map: google.maps.Map) => void | | Callback when map is loaded |
| onUnmount | (map: google.maps.Map) => void | | Callback before map is destroyed |

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
| onCenterChanged | (e: google.maps.MapMouseEvent) => void | Center changed event handler |

## Usage

```svelte
<script>
  import { APIProvider, GoogleMap } from 'svelte-google-maps-api';
  
  const apiKey = 'YOUR_API_KEY';
  const mapOptions = {
    center: { lat: 35.6812362, lng: 139.7649361 },
    zoom: 10
  };
  
  function handleClick(e) {
    console.log('Map clicked at:', e.latLng.lat(), e.latLng.lng());
  }
  
  function handleLoad(map) {
    console.log('Map loaded:', map);
  }
</script>

<div style="height: 400px; width: 100%;">
  <APIProvider {apiKey}>
    <GoogleMap 
      id="map" 
      options={mapOptions} 
      mapContainerStyle="width: 100%; height: 100%;"
      onClick={handleClick}
      onLoad={handleLoad}
    />
  </APIProvider>
</div>
```

## Context

The GoogleMap component consumes the context set by APIProvider and sets its own context with the map instance:

```javascript
setContext('map', { getMap: () => map });
```

This context is used by child components like Marker.

## Example with Event Handling

```svelte
<script>
  import { APIProvider, GoogleMap } from 'svelte-google-maps-api';
  
  const apiKey = 'YOUR_API_KEY';
  const mapOptions = {
    center: { lat: 35.6812362, lng: 139.7649361 },
    zoom: 10
  };
  
  let clickedPosition = null;
  
  function handleClick(e) {
    clickedPosition = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    };
  }
</script>

<div>
  {#if clickedPosition}
    <p>Clicked at: {clickedPosition.lat.toFixed(6)}, {clickedPosition.lng.toFixed(6)}</p>
  {:else}
    <p>Click on the map to see coordinates</p>
  {/if}
  
  <div style="height: 300px; width: 100%;">
    <APIProvider {apiKey}>
      <GoogleMap 
        id="map" 
        options={mapOptions} 
        mapContainerStyle="width: 100%; height: 100%;"
        onClick={handleClick}
      />
    </APIProvider>
  </div>
</div>
```

## Notes

- The GoogleMap component must be a child of the APIProvider component.
- It creates a Google Maps instance and attaches it to the specified DOM element.
- Event listeners are automatically cleaned up when the component is destroyed.
