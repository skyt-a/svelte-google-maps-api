# DrawingManager

The `DrawingManager` component provides a graphical interface for users to draw overlays on the map, including markers, polylines, polygons, rectangles, and circles.

## Basic Usage

```svelte
<script>
  import { APIProvider, GoogleMap, DrawingManager } from 'svelte-google-maps-api';
</script>

<APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={['drawing']}>
  <GoogleMap
    zoom={12}
    center={{ lat: 35.6812362, lng: 139.7649361 }}
    options={{ mapTypeId: 'roadmap' }}
  >
    <DrawingManager
      drawingControl={true}
      drawingControlOptions={{
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.MARKER,
          google.maps.drawing.OverlayType.CIRCLE,
          google.maps.drawing.OverlayType.POLYGON,
          google.maps.drawing.OverlayType.POLYLINE,
          google.maps.drawing.OverlayType.RECTANGLE
        ]
      }}
    />
  </GoogleMap>
</APIProvider>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `drawingMode` | `google.maps.drawing.OverlayType \| null` | `null` | The current drawing mode |
| `drawingControl` | `boolean` | `true` | Whether the drawing control UI is displayed |
| `drawingControlOptions` | `google.maps.drawing.DrawingControlOptions` | `undefined` | Options for the drawing control |
| `circleOptions` | `google.maps.CircleOptions` | `undefined` | Default options for circles |
| `markerOptions` | `google.maps.MarkerOptions` | `undefined` | Default options for markers |
| `polygonOptions` | `google.maps.PolygonOptions` | `undefined` | Default options for polygons |
| `polylineOptions` | `google.maps.PolylineOptions` | `undefined` | Default options for polylines |
| `rectangleOptions` | `google.maps.RectangleOptions` | `undefined` | Default options for rectangles |

## Events

| Event | Type | Description |
|-------|------|-------------|
| `onCircleComplete` | `(circle: google.maps.Circle) => void` | Called when a circle is completed |
| `onMarkerComplete` | `(marker: google.maps.Marker) => void` | Called when a marker is completed |
| `onOverlayComplete` | `(event: google.maps.drawing.OverlayCompleteEvent) => void` | Called when any overlay is completed |
| `onPolygonComplete` | `(polygon: google.maps.Polygon) => void` | Called when a polygon is completed |
| `onPolylineComplete` | `(polyline: google.maps.Polyline) => void` | Called when a polyline is completed |
| `onRectangleComplete` | `(rectangle: google.maps.Rectangle) => void` | Called when a rectangle is completed |
| `onDrawingModeChange` | `() => void` | Called when the drawing mode changes |
| `onLoad` | `(drawingManager: google.maps.drawing.DrawingManager) => void` | Called when the DrawingManager is loaded |
| `onUnmount` | `(drawingManager: google.maps.drawing.DrawingManager) => void` | Called when the DrawingManager is unmounted |

## Example with Custom Styling

```svelte
<script>
  import { APIProvider, GoogleMap, DrawingManager } from 'svelte-google-maps-api';

  let drawnShapes = [];

  function handleOverlayComplete(event) {
    drawnShapes.push(event.overlay);
    // You can store the overlay for later manipulation
    console.log('New shape drawn:', event.type);
  }
</script>

<APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={['drawing']}>
  <GoogleMap
    zoom={12}
    center={{ lat: 35.6812362, lng: 139.7649361 }}
    options={{ mapTypeId: 'roadmap' }}
  >
    <DrawingManager
      drawingControl={true}
      circleOptions={{
        fillColor: '#ff0000',
        fillOpacity: 0.35,
        strokeWeight: 2,
        clickable: true,
        editable: true,
        zIndex: 1
      }}
      polygonOptions={{
        fillColor: '#00ff00',
        fillOpacity: 0.35,
        strokeWeight: 2,
        clickable: true,
        editable: true,
        zIndex: 1
      }}
      rectangleOptions={{
        fillColor: '#0000ff',
        fillOpacity: 0.35,
        strokeWeight: 2,
        clickable: true,
        editable: true,
        zIndex: 1
      }}
      onOverlayComplete={handleOverlayComplete}
    />
  </GoogleMap>
</APIProvider>
```

## Drawing Mode Control

You can programmatically control the drawing mode:

```svelte
<script>
  import { APIProvider, GoogleMap, DrawingManager } from 'svelte-google-maps-api';

  let drawingMode = null;
</script>

<APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={['drawing']}>
  <div>
    <button onclick={() => drawingMode = google.maps.drawing.OverlayType.MARKER}>
      Draw Marker
    </button>
    <button onclick={() => drawingMode = google.maps.drawing.OverlayType.POLYGON}>
      Draw Polygon
    </button>
    <button onclick={() => drawingMode = null}>
      Stop Drawing
    </button>
  </div>
  
  <GoogleMap
    zoom={12}
    center={{ lat: 35.6812362, lng: 139.7649361 }}
    options={{ mapTypeId: 'roadmap' }}
  >
    <DrawingManager
      {drawingMode}
      drawingControl={false}
    />
  </GoogleMap>
</APIProvider>
```

## Note

Remember to include the `drawing` library when initializing the API Provider:

```svelte
<APIProvider apiKey={YOUR_API_KEY} libraries={['drawing']}>
```