---
title: InfoBox
---

The `InfoBox` component renders custom styled content in a Google Maps overlay pane.

## Storybook

[Open the InfoBox story](https://skyt-a.github.io/svelte-google-maps-api/storybook/?path=/story/components-infobox--basic)

## Props

| Prop | Type | Description |
|------|------|-------------|
| anchor | `google.maps.MVCObject` | Optional anchor object. |
| position | `google.maps.LatLng \| google.maps.LatLngLiteral` | Position used when no anchor is provided. |
| options | `InfoBoxOptions` | InfoBox options such as `boxClass`, `boxStyle`, `pixelOffset`, and `closeBoxURL`. |
| zIndex | `number` | Overlay z-index. |
| isOpen | `boolean` | Opens or closes the InfoBox. |
| onLoad | `(infoBox) => void` | Called after creation. |
| onUnmount | `(infoBox) => void` | Called before removal. |

## Events

`onCloseClick`, `onDomReady`, `onContentChanged`, `onPositionChanged`, and `onZindexChanged` map to the corresponding InfoBox events.

## Usage

```svelte
<InfoBox position={center} options={{ closeBoxURL: '', boxClass: 'info-box' }}>
  <strong>Custom overlay content</strong>
</InfoBox>
```
