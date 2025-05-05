---
title: StreetViewPanorama
---
A component to display Street View panoramas.

Must be used within an `<APIProvider>` component.

```svelte
<script lang="ts">
  import { APIProvider, GoogleMap, StreetViewPanorama } from 'svelte-google-maps-api';
  import { GOOGLE_MAPS_API_KEY } from '$env/static/private';

  let panorama: google.maps.StreetViewPanorama | null = null;

  const position = { lat: 40.729884, lng: -73.990988 }; // Example: Near Washington Square Park
</script>

<APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
  <div style="height: 600px; width: 100%;">
    <!-- You can either display the map and link the panorama to it -->
    <GoogleMap initialCenter={position} initialZoom={14}>
       <StreetViewPanorama bind:panorama {position} />
    </GoogleMap>

    <!-- Or display the panorama directly -->
    <!-- <div style="height: 600px; width: 100%;">
      <StreetViewPanorama {position} />
    </div> -->
  </div>
</APIProvider>

<button on:click={() => panorama?.setZoom(panorama.getZoom()! + 1)}>Zoom In</button>
```

## Props

| Prop                  | Type                                                   | Default           | Description                                                                   |
| :-------------------- | :----------------------------------------------------- | :---------------- | :---------------------------------------------------------------------------- |
| `options`             | `google.maps.StreetViewPanoramaOptions \| undefined` | `undefined`       | Initialization options for the panorama. Takes precedence over individual props. |
| `containerId`         | `string \| undefined`                                  | `undefined`       | The ID for the div element that displays the panorama.                        |
| `containerClass`      | `string`                                               | `''`              | The class name for the div element that displays the panorama.                  |
| `containerStyle`      | `string`                                               | `'width:100%;height:100%;'` | The style for the div element that displays the panorama.                     |
| `position`            | `google.maps.LatLng \| google.maps.LatLngLiteral \| undefined` | `undefined`       | The initial position for the panorama.                                        |
| `pov`                 | `google.maps.StreetViewPov \| undefined`               | `undefined`       | The initial Point of View for the panorama.                                     |
| `zoom`                | `number \| undefined`                                  | `undefined`       | The initial zoom level for the panorama.                                        |
| `pano`                | `string \| undefined`                                  | `undefined`       | The specific panorama ID to display. Takes precedence over `position`.         |
| `addressControl`      | `boolean \| undefined`                                 | `undefined`       | Whether to display the address control.                                       |
| `enableCloseButton`   | `boolean \| undefined`                                 | `undefined`       | Whether to display the close button.                                          |
| `fullscreenControl`   | `boolean \| undefined`                                 | `undefined`       | Whether to display the fullscreen control.                                    |
| `imageDateControl`    | `boolean \| undefined`                                 | `undefined`       | Whether to display the image date control.                                    |
| `linksControl`        | `boolean \| undefined`                                 | `undefined`       | Whether to display the links control.                                         |
| `motionTracking`      | `boolean \| undefined`                                 | `undefined`       | Whether to enable motion tracking.                                            |
| `motionTrackingControl` | `boolean \| undefined`                                 | `undefined`       | Whether to display the motion tracking control.                               |
| `panControl`          | `boolean \| undefined`                                 | `undefined`       | Whether to display the pan control.                                           |
| `scrollwheel`         | `boolean \| undefined`                                 | `undefined`       | Whether to enable zooming via the scroll wheel.                                 |
| `zoomControl`         | `boolean \| undefined`                                 | `undefined`       | Whether to display the zoom control.                                          |
| `visible`             | `boolean`                                              | `true`            | Whether the panorama is initially visible.                                    |

## Events

| Event               | Type                                                   | Description                                                     |
| :------------------ | :----------------------------------------------------- | :------------------------------------------------------------ |
| `onCloseClick`      | `(() => void) \| undefined`                            | Fired when the close button is clicked.                         |
| `onPanoChanged`     | `(() => void) \| undefined`                            | Fired when the panorama ID changes.                             |
| `onPositionChanged` | `(() => void) \| undefined`                            | Fired when the panorama position changes.                       |
| `onPovChanged`      | `(() => void) \| undefined`                            | Fired when the panorama Point of View (pov) changes.            |
| `onResize`          | `(() => void) \| undefined`                            | Fired when the panorama size changes.                           |
| `onStatusChanged`   | `(() => void) \| undefined`                            | Fired when the panorama loading status changes.                 |
| `onVisibleChanged`  | `(() => void) \| undefined`                            | Fired when the panorama visibility changes.                     |
| `onZoomChanged`     | `(() => void) \| undefined`                            | Fired when the panorama zoom level changes.                     |
| `onLoad`            | `((panorama: google.maps.StreetViewPanorama) => void) \| undefined` | Fired when the panorama is loaded. Receives the instance.       |
| `onUnmount`         | `((panorama: google.maps.StreetViewPanorama) => void) \| undefined` | Fired when the component is destroyed. Receives the instance. |

## Binding

You can access the `google.maps.StreetViewPanorama` instance using `bind:panorama`.

```svelte
<script lang="ts">
  import { StreetViewPanorama } from 'svelte-google-maps-api';
  let panorama: google.maps.StreetViewPanorama | null = null;
</script>

<StreetViewPanorama bind:panorama />

<button disabled={!panorama} on:click={() => panorama?.setZoom(1)}>
  Reset Zoom
</button>
``` 