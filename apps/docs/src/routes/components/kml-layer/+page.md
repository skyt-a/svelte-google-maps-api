---
title: KmlLayer
---
A component to display data from a KML (Keyhole Markup Language) file on the map.

Must be used within a `<GoogleMap>` component.

**Note:** KML layers load KML files from a publicly accessible URL. Local files are not supported.

```svelte
<script lang="ts">
  import { APIProvider, GoogleMap, KmlLayer } from 'svelte-google-maps-api';
  import { GOOGLE_MAPS_API_KEY } from '$env/static/private';

  // Example KML URL (replace with your own publicly accessible KML file)
  const kmlUrl = 'https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml';
</script>

<APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
  <GoogleMap initialCenter={{ lat: 45.518, lng: -122.672 }} initialZoom={11}>
    <KmlLayer url={kmlUrl} suppressInfoWindows={true} />
  </GoogleMap>
</APIProvider>
```

## Props

| Prop                | Type                                    | Default     | Description                                                                                                                          |
| :------------------ | :-------------------------------------- | :---------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| `url`               | `string \| undefined`                   | `undefined` | The public URL of the KML file to load. **Required**. Changing the URL will cause the layer to re-initialize.                      |
| `options`           | `google.maps.KmlLayerOptions \| undefined` | `undefined` | Initialization options for the KML layer. Takes precedence over individual props.                                                     |
| `clickable`         | `boolean \| undefined`                  | `undefined` | Whether features in the layer are clickable.                                                                                      |
| `preserveViewport`  | `boolean \| undefined`                  | `undefined` | Whether to prevent the map from adjusting its viewport to fit the KML file's content if it contains viewport information. Defaults to `false`. |
| `screenOverlays`    | `boolean \| undefined`                  | `undefined` | Whether to display screen overlays from the KML file.                                                                              |
| `suppressInfoWindows`| `boolean \| undefined`                  | `undefined` | Whether to suppress the display of info windows when features are clicked.                                                        |
| `zIndex`            | `number \| undefined`                   | `undefined` | The z-index of the layer.                                                                                                           |

## Events

| Event                      | Type                                           | Description                                                                                                |
| :------------------------- | :--------------------------------------------- | :------------------------------------------------------------------------------------------------------- |
| `onClick`                  | `((e: google.maps.KmlMouseEvent) => void) \| undefined` | Fired when a feature in the layer is clicked. The event object contains information about the clicked feature. |
| `onDefaultViewportChanged` | `(() => void) \| undefined`                   | Fired when the layer's default viewport has loaded.                                                       |
| `onStatusChanged`          | `(() => void) \| undefined`                   | Fired when the layer's loading status changes.                                                            |
| `onLoad`                   | `((layer: google.maps.KmlLayer) => void) \| undefined` | Fired when the layer has successfully loaded. Receives the instance.                                     |
| `onUnmount`                | `((layer: google.maps.KmlLayer) => void) \| undefined` | Fired when the component is destroyed. Receives the instance.                                            |

## Binding

This component does not support the `bind:` directive. 