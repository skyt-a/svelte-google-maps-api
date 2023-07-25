#　svelte-google-maps-api

#　warning:　This repository is under development

## GoogleMap.svelte

`GoogleMap.svelte` is a Svelte component used to embed a Google Map into your application. This component provides a wrapper for Google Maps JavaScript API and exposes a wide range of event handlers for interacting with the map.

### Properties

The following properties can be passed to the GoogleMap component:

- `id`: Unique identifier for the map DOM element.
- `options`: Google Map options.
- `onDblClick`, `onDragEnd`, `onDragStart`, `onMouseDown`, `onMouseMove`, `onMouseOut`, `onMouseOver`, `onMouseUp`, `onRightClick`, `onClick`, `onDrag`, `onCenterChanged`: Event handlers for respective map events.
- `onLoad`: A callback that is invoked when the map is fully loaded.
- `onUnmount`: A callback that is invoked when the map is unmounted.
- `mapContainerStyle`: A string to apply custom styles to the map container.
- `mapContainerClassName`: A class to apply to the map container.

The component also manages its own local state variables such as `element`, `map`, and event listeners.

## LoadScript.svelte

`LoadScript.svelte` is a Svelte component that handles the loading of Google Maps JavaScript API script. It waits for the script to load and then notifies that it's ready to be used.

### Properties

The following properties can be passed to the LoadScript component:

- `apiKey`: Your Google Maps API key.
- `libraries`: An array of Google Map libraries to be loaded with the script.

The component uses the `onMount` lifecycle hook to create a script element and attach it to the document head. Once the script is loaded, it sets the `isReady` store value to `true` to signal that Google Maps API is ready to be used. The `svelteGoogleMapInit` function is attached to the `window` object to serve as a callback once the script is loaded.

The Google Maps API is loaded asynchronously, and the `apiKey` and `libraries` properties determine the URL used to fetch the API.

**Note:** The two components `GoogleMap.svelte` and `LoadScript.svelte` work together, `LoadScript.svelte` loads the Google Maps JavaScript API, and `GoogleMap.svelte` uses it to display and interact with the map. They are designed to be used together in a parent component, with `GoogleMap.svelte` being a child of `LoadScript.svelte`. This way, the map only attempts to load after the API script is ready.