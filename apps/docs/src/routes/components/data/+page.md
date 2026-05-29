---
title: Data
---

The `Data` component manages a `google.maps.Data` layer for GeoJSON features and feature-level events.

## Storybook

[Open the Data story](https://skyt-a.github.io/svelte-google-maps-api/storybook/?path=/story/components-data--basic)

## Props

| Prop | Type | Description |
|------|------|-------------|
| options | `google.maps.Data.DataOptions` | Initial Data layer options. `style`, `controls`, `controlPosition`, and `drawingMode` are also applied reactively. |
| onLoad | `(data: google.maps.Data) => void` | Called after the Data layer is created. |
| onUnmount | `(data: google.maps.Data) => void` | Called before the Data layer is removed. |

## Events

`onClick`, `onDblClick`, `onMouseDown`, `onMouseMove`, `onMouseOut`, `onMouseOver`, `onMouseUp`, `onRightClick`, `onAddFeature`, `onRemoveFeature`, `onRemoveProperty`, `onSetGeometry`, and `onSetProperty` map to the corresponding Google Maps Data events.

## Usage

```svelte
<GoogleMap options={{ center, zoom: 12 }}>
  <Data
    onLoad={(data) => {
      data.addGeoJson(geoJson);
      data.setStyle({ fillColor: '#0f766e', strokeColor: '#0f766e' });
    }}
  />
</GoogleMap>
```
