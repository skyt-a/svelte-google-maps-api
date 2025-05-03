## svelte-google-maps-api

**warning:　This repository is under development**

## Feature
・Google Map JavaScript API Wrapper for Svelte<br>
・Svelte 5 Supported

## Install

```
npm install svelte-google-maps-api
```

## Component
### LoadScript

`LoadScript` is a Svelte component that handles the loading of Google Maps JavaScript API script.

#### Properties

| Prop       | Type     | Description |
|------------|----------|-------------|
| `apiKey`   | `string` | Google Maps API Key |
| `libraries` | `string[]` | An array of Google Map libraries to be loaded with the script. |

### GoogleMap

`GoogleMap` is a component for rendering a Google Map.

#### Properties

| Prop                    | Type     | Description |
|-------------------------|----------|-------------|
| id                    | `string` | An identifier for the map container. |
| options               | `google.maps.MapOptions` | Google Map options object. |
| onClick               | `(e: google.maps.MapMouseEvent) => void`| Callback function that is called when the map is clicked. |
| onDblClick            | `(e: google.maps.MapMouseEvent) => void`| Callback function that is called when the map is double clicked. |
| onDragEnd             | `(e: google.maps.MapMouseEvent) => void`| Callback function that is called when the drag ends. |
| onDragStart           | `(e: google.maps.MapMouseEvent) => void`| Callback function that is called when the drag starts. |
| onMouseDown           | `(e: google.maps.MapMouseEvent) => void`| Callback function that is called when the mouse button is pressed. |
| onMouseMove           | `(e: google.maps.MapMouseEvent) => void`| Callback function that is called when the mouse pointer moves. |
| onMouseOut            | `(e: google.maps.MapMouseEvent) => void`| Callback function that is called when the mouse pointer moves out of the map. |
| onMouseOver           | `(e: google.maps.MapMouseEvent) => void`| Callback function that is called when the mouse pointer moves over the map. |
| onMouseUp             | `(e: google.maps.MapMouseEvent) => void`| Callback function that is called when the mouse button is released. |
| onRightClick          | `(e: google.maps.MapMouseEvent) => void`| Callback function that is called when the map is right clicked. |
| onDrag                | `(e: google.maps.MapMouseEvent) => void`| Callback function that is called when the map is dragged. |
| onCenterChanged       | `(e: google.maps.MapMouseEvent) => void`| Callback function that is called when the center of the map changes. |
| onLoad                | `(map: google.maps.Map) => void`| Callback function that is called when the map is loaded. |
| onUnmount             | `(map: google.maps.Map) => void`| Callback function that is called when the map unmounts. |
| mapContainerStyle     | `string`  | Style for the map container. Default is 'width:100%;height:100%'. |
| mapContainerClassName | `string`  | Class name for the map container. |

### Usage

The `GoogleMap` component can be used to render a Google Map:

```svelte
<script lang="ts">
    	import LoadScript from 'svelte-google-maps-api/LoadScript.svelte';
	import GoogleMap from 'svelte-google-maps-api//GoogleMap.svelte';

	const options = {
		zoom: 4,
		center: {lat: -33, lng: 151},
	};

	const handleLoad = (map: google.maps.Map) => {
		
	};
</script>

<LoadScript apiKey={yourApiKey}>
	<GoogleMap {options} onLoad={handleLoad} />
</LoadScript>
```

### Marker

#### Properties

| Property            | Type                                                            | Description                                                                                                                                                                                                                                   |
|---------------------|-----------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| position            | `google.maps.LatLng \| google.maps.LatLngLiteral`       | Specifies the position of the marker.                                                                                                                                                                                                         |
| options             | `google.maps.MarkerOptions`                             | An object containing options for the marker, such as its icon, title, etc.                                                                                                                                                                    |
| onClick             | `((e: google.maps.MapMouseEvent) => void)`              | Event handler for when the marker is clicked.                                                                                                                                                                                                 |
| onClickableChanged  | `(() => void)`                                          | Event handler for when the marker's 'clickable' property is changed.                                                                                                                                                                          |
| onCursorChanged     | `(() => void)`                                          | Event handler for when the marker's 'cursor' property is changed.                                                                                                                                                                             |
| onAnimationChanged  | `(() => void)`                                          | Event handler for when the marker's 'animation' property is changed.                                                                                                                                                                          |
| onDblClick          | `((e: google.maps.MapMouseEvent) => void)`              | Event handler for when the marker is double-clicked.                                                                                                                                                                                          |
| onDrag              | `((e: google.maps.MapMouseEvent) => void)`              | Event handler for when the marker is dragged.                                                                                                                                                                                                 |
| onDragEnd           | `((e: google.maps.MapMouseEvent) => void)`              | Event handler for when the dragging of the marker ends.                                                                                                                                                                                        |
| onDraggableChanged  | `(() => void)`                                          | Event handler for when the marker's 'draggable' property is changed.                                                                                                                                                                          |
| onDragStart         | `((e: google.maps.MapMouseEvent) => void)`              | Event handler for when the dragging of the marker starts.                                                                                                                                                                                      |
| onFlatChanged       | `(() => void)`                                          | Event handler for when the marker's 'flat' property is changed.                                                                                                                                                                               |
| onIconChanged       | `(() => void)`                                          | Event handler for when the marker's 'icon' property is changed.                                                                                                                                                                               |
| onMouseDown         | `((e: google.maps.MapMouseEvent) => void)`              | Event handler for when the mouse button is pressed on the marker.                                                                                                                                                                             |
| onMouseOut          | `((e: google.maps.MapMouseEvent) => void)`              | Event handler for when the mouse leaves the area of the marker.                                                                                                                                                                               |
| onMouseOver         | `((e: google.maps.MapMouseEvent) => void)`              | Event handler for when the mouse enters the area of the marker.                                                                                                                                                                               |
| onMouseUp           | `((e: google.maps.MapMouseEvent) => void)`              | Event handler for when the mouse button is released on the marker.                                                                                                                                                                            |
| onPositionChanged   | `(() => void)`                                          | Event handler for when the marker's 'position' property is changed.                                                                                                                                                                           |
| onRightClick        | `((e: google.maps.MapMouseEvent) => void)`              | Event handler for when the marker is right-clicked.                                                                                                                                                                                           |
| onShapeChanged      | `(() => void)`                                          | Event handler for when the marker's 'shape' property is changed.                                                                                                                                                                              |
| onTitleChanged      | `(() => void)`                                          | Event handler for when the marker's 'title' property is changed.                                                                                                                                                                              |
| onVisibleChanged    | `(() => void)`                                          | Event handler for when the marker's 'visible' property is changed.                                                                                                                                                                            |
| onZindexChanged     | `(() => void)`                                          | Event handler for when the marker's 'zIndex' property is changed.                                                                                                                                                                             |
| onLoad              | `((marker: google.maps.Marker) => void)`                | Event handler for when the marker is added to the map. This event fires after the marker's position has been changed for the first time, but before the marker's `click` event and the map's `mousemove` and `idle` events.                    |
| onUnmount           | `((marker: google.maps.Marker) => void)`                | Event handler for when the marker is removed from the map.                                                                                                                                                                                    |

### Usage

```svelte
<script lang="ts">
	import GoogleMap from 'svelte-google-maps-api//GoogleMap.svelte';
	import Marker from 'svelte-google-maps-api//Marker.svelte';

	const position = {lat: 37.7749, lng: -122.4194};
	const options = {
		draggable: true,
		title: "Hello, World!"
	};
</script>

<GoogleMap>
	<Marker {position} {options} />
</GoogleMap>
```
