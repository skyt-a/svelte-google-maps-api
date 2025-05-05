---
title: OverlayView
---
A component for displaying custom HTML elements (`<slot>`) as an overlay at a specified position or bounds on the map.
Wraps `google.maps.OverlayView` to integrate Svelte components into map panes.

Must be used within a `<GoogleMap>` component.

```svelte
<script lang="ts">
  import { APIProvider, GoogleMap, OverlayView } from 'svelte-google-maps-api';
  import { GOOGLE_MAPS_API_KEY } from '$env/static/private';

  const center = { lat: 34.0522, lng: -118.2437 }; // Los Angeles
</script>

<APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
  <GoogleMap initialCenter={center} initialZoom={12}>
    <!-- Position-based Overlay -->
    <OverlayView position={center} mapPaneName="floatPane">
      <div style="background: rgba(255, 0, 0, 0.7); color: white; padding: 10px; border-radius: 5px; transform: translate(-50%, -100%);">
        Hello from OverlayView! (at center)
      </div>
    </OverlayView>

    <!-- Bounds-based Overlay (Example) -->
    <OverlayView bounds={{ north: 34.06, south: 34.04, east: -118.23, west: -118.25 }} mapPaneName="overlayLayer">
       <div style="border: 2px dashed blue; background: rgba(0, 0, 255, 0.2); width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; color: blue;">
         Bounds Overlay
       </div>
    </OverlayView>
  </GoogleMap>
</APIProvider>
```

## Props

| Prop          | Type                                                                 | Default       | Description                                                                                                                                                                        |
| :------------ | :------------------------------------------------------------------- | :------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `position`    | `google.maps.LatLng \| google.maps.LatLngLiteral \| undefined`        | `undefined`   | The single geographical coordinate where the overlay should be displayed. If provided along with `bounds`, `position` takes precedence.                                              |
| `bounds`      | `google.maps.LatLngBounds \| google.maps.LatLngBoundsLiteral \| undefined` | `undefined`   | The geographical bounds where the overlay should be displayed. If provided, the slot content will be stretched to fit these bounds. Used only if `position` is not provided.      |
| `mapPaneName` | `keyof google.maps.MapPanes`                                       | `'floatPane'` | The name of the map pane where the overlay's container element should be added. See [MapPanes documentation](https://developers.google.com/maps/documentation/javascript/reference/map#MapPanes) for available pane names. |

**Note:** You cannot specify both `position` and `bounds` simultaneously. Provide one or the other, or neither (in which case the overlay won't be displayed).

## Events

| Event       | Type                                                      | Description                                                                                             |
| :---------- | :-------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- |
| `onLoad`    | `((overlayView: google.maps.OverlayView) => void) \| undefined` | Fired when the overlay view is created and added to the map. Receives the instance.                   |
| `onUnmount` | `((overlayView: google.maps.OverlayView) => void) \| undefined` | Fired when the component is destroyed and the overlay view is removed from the map. Receives the instance. |

## Binding

This component does not support the `bind:` directive.

## Slots

*   **default:** Place the custom HTML elements or Svelte components to be displayed on the map. The styling of the slot content (specifically `position`, `left`, `top`, `width`, `height`) is managed internally by the `OverlayView` component based on the `position` or `bounds` prop. You can style the content itself (background, padding, etc.) as usual. When using `position`, it's common to adjust the styling for offset from the anchor point (e.g., `transform: translate(-50%, -100%);` to center the content above the tip like a marker). 