## svelte-google-maps-api

**warning:　This repository is under development**

・Google Map JavaScript API Wrapper for Svelte
・Svelte 4 Supported

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
| `id`                    | `string` | An identifier for the map container. |
| `options`               | `google.maps.MapOptions` | Google Map options object. Default is `{}`. |
| `onDblClick`            | `Function`| Callback function that is called when the map is double clicked. |
| `onDragEnd`             | `Function`| Callback function that is called when the drag ends. |
| `onDragStart`           | `Function`| Callback function that is called when the drag starts. |
| `onMouseDown`           | `Function`| Callback function that is called when the mouse button is pressed. |
| `onMouseMove`           | `Function`| Callback function that is called when the mouse pointer moves. |
| `onMouseOut`            | `Function`| Callback function that is called when the mouse pointer moves out of the map. |
| `onMouseOver`           | `Function`| Callback function that is called when the mouse pointer moves over the map. |
| `onMouseUp`             | `Function`| Callback function that is called when the mouse button is released. |
| `onRightClick`          | `Function`| Callback function that is called when the map is right clicked. |
| `onClick`               | `Function`| Callback function that is called when the map is clicked. |
| `onDrag`                | `Function`| Callback function that is called when the map is dragged. |
| `onCenterChanged`       | `Function`| Callback function that is called when the center of the map changes. |
| `onLoad`                | `Function`| Callback function that is called when the map is loaded. |
| `onUnmount`             | `Function`| Callback function that is called when the map unmounts. |
| `mapContainerStyle`     | `string`  | Style for the map container. Default is 'width:100%;height:100%'. |
| `mapContainerClassName` | `string`  | Class name for the map container. |

### Usage

The `GoogleMap` component can be used to render a Google Map:

```svelte
<script lang="ts">
	// import the component and other necessary things
    import LoadScript from 'svelte-google-maps-api/LoadScript.svelte';
	import GoogleMap from 'svelte-google-maps-api//GoogleMap.svelte';

	const options = {
		zoom: 4,
		center: {lat: -33, lng: 151},
	};

	const handleLoad = (map: google.maps.Map) => {
		// do something with the loaded map
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
| position            | `google.maps.LatLng \| google.maps.LatLngLiteral \| null`       | Specifies the position of the marker.                                                                                                                                                                                                         |
| options             | `google.maps.MarkerOptions \| null`                             | An object containing options for the marker, such as its icon, title, etc.                                                                                                                                                                    |
| onClick             | `((e: google.maps.MapMouseEvent) => void) \| null`              | Event handler for when the marker is clicked.                                                                                                                                                                                                 |
| onClickableChanged  | `(() => void) \| null`                                          | Event handler for when the marker's 'clickable' property is changed.                                                                                                                                                                          |
| onCursorChanged     | `(() => void) \| null`                                          | Event handler for when the marker's 'cursor' property is changed.                                                                                                                                                                             |
| onAnimationChanged  | `(() => void) \| null`                                          | Event handler for when the marker's 'animation' property is changed.                                                                                                                                                                          |
| onDblClick          | `((e: google.maps.MapMouseEvent) => void) \| null`              | Event handler for when the marker is double-clicked.                                                                                                                                                                                          |
| onDrag              | `((e: google.maps.MapMouseEvent) => void) \| null`              | Event handler for when the marker is dragged.                                                                                                                                                                                                 |
| onDragEnd           | `((e: google.maps.MapMouseEvent) => void) \| null`              | Event handler for when the dragging of the marker ends.                                                                                                                                                                                        |
| onDraggableChanged  | `(() => void) \| null`                                          | Event handler for when the marker's 'draggable' property is changed.                                                                                                                                                                          |
| onDragStart         | `((e: google.maps.MapMouseEvent) => void) \| null`              | Event handler for when the dragging of the marker starts.                                                                                                                                                                                      |
| onFlatChanged       | `(() => void) \| null`                                          | Event handler for when the marker's 'flat' property is changed.                                                                                                                                                                               |
| onIconChanged       | `(() => void) \| null`                                          | Event handler for when the marker's 'icon' property is changed.                                                                                                                                                                               |
| onMouseDown         | `((e: google.maps.MapMouseEvent) => void) \| null`              | Event handler for when the mouse button is pressed on the marker.                                                                                                                                                                             |
| onMouseOut          | `((e: google.maps.MapMouseEvent) => void) \| null`              | Event handler for when the mouse leaves the area of the marker.                                                                                                                                                                               |
| onMouseOver         | `((e: google.maps.MapMouseEvent) => void) \| null`              | Event handler for when the mouse enters the area of the marker.                                                                                                                                                                               |
| onMouseUp           | `((e: google.maps.MapMouseEvent) => void) \| null`              | Event handler for when the mouse button is released on the marker.                                                                                                                                                                            |
| onPositionChanged   | `(() => void) \| null`                                          | Event handler for when the marker's 'position' property is changed.                                                                                                                                                                           |
| onRightClick        | `((e: google.maps.MapMouseEvent) => void) \| null`              | Event handler for when the marker is right-clicked.                                                                                                                                                                                           |
| onShapeChanged      | `(() => void) \| null`                                          | Event handler for when the marker's 'shape' property is changed.                                                                                                                                                                              |
| onTitleChanged      | `(() => void) \| null`                                          | Event handler for when the marker's 'title' property is changed.                                                                                                                                                                              |
| onVisibleChanged    | `(() => void) \| null`                                          | Event handler for when the marker's 'visible' property is changed.                                                                                                                                                                            |
| onZindexChanged     | `(() => void) \| null`                                          | Event handler for when the marker's 'zIndex' property is changed.                                                                                                                                                                             |
| onLoad              | `((marker: google.maps.Marker) => void) \| null`                | Event handler for when the marker is added to the map. This event fires after the marker's position has been changed for the first time, but before the marker's `click` event and the map's `mousemove` and `idle` events.                    |
| onUnmount           | `((marker: google.maps.Marker) => void) \| null`                | Event handler for when the marker is removed from the map.                                                                                                                                                                                    |

### Usage

```svelte
<script lang="ts">
	import GoogleMap from 'svelte-google-maps-api//GoogleMap.svelte';
	import Marker from 'svelte-google-maps-api//Marker.svelte';

    const position = {lat: 37.7749, lng: -122.4194};  // Coordinates for San Francisco
	const options = {
		draggable: true,
		title: "Hello, World!"
	};
</script>

<GoogleMap>
	<Marker {position} {options} />
</GoogleMap>
```