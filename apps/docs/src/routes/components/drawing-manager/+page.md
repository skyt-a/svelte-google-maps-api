---
title: DrawingManager
---

## Storybook

[Open the DrawingManager story](https://skyt-a.github.io/svelte-google-maps-api/storybook/?path=/story/components-drawingmanager--basic)

The `DrawingManager` component provides Google Maps drawing controls for markers, polylines, polygons, rectangles, and circles.

The Google Maps Drawing Library is deprecated and is not available in the weekly channel (`v=3.65`). Use `version="3.64"` while that Maps JavaScript API version remains supported, or migrate drawing UI to a custom implementation.

## Props

| Prop                  | Type                                                    | Default | Description                   |
| --------------------- | ------------------------------------------------------- | ------- | ----------------------------- |
| drawingMode           | `google.maps.drawing.OverlayType \| null`               | `null`  | Active drawing mode.          |
| drawingControl        | `boolean`                                               | `true`  | Shows the drawing control UI. |
| drawingControlOptions | `google.maps.drawing.DrawingControlOptions`             |         | Drawing control options.      |
| markerOptions         | `google.maps.MarkerOptions`                             |         | Options for drawn markers.    |
| circleOptions         | `google.maps.CircleOptions`                             |         | Options for drawn circles.    |
| polygonOptions        | `google.maps.PolygonOptions`                            |         | Options for drawn polygons.   |
| polylineOptions       | `google.maps.PolylineOptions`                           |         | Options for drawn polylines.  |
| rectangleOptions      | `google.maps.RectangleOptions`                          |         | Options for drawn rectangles. |
| onLoad                | `(manager: google.maps.drawing.DrawingManager) => void` |         | Called after creation.        |
| onUnmount             | `(manager: google.maps.drawing.DrawingManager) => void` |         | Called before teardown.       |

## Events

`onCircleComplete`, `onMarkerComplete`, `onOverlayComplete`, `onPolygonComplete`, `onPolylineComplete`, `onRectangleComplete`, and `onDrawingModeChange` map to the Google Maps drawing events.

## Usage

```svelte
<APIProvider apiKey="YOUR_API_KEY" libraries={['drawing']} version="3.64">
	<GoogleMap options={{ center, zoom: 12 }} mapContainerStyle="width: 100%; height: 400px;">
		<DrawingManager
			drawingControl
			onOverlayComplete={(event) => console.log(event.type, event.overlay)}
		/>
	</GoogleMap>
</APIProvider>
```
