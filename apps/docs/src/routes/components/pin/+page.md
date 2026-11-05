---
title: Pin
---

## Storybook

[Open the Pin story](https://skyt-a.github.io/svelte-google-maps-api/storybook/?path=/story/components-pin--basic)

`Pin` customises the default Advanced Marker pin with a `google.maps.marker.PinElement`. Use it as a child of `AdvancedMarker`.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| background | `string` | | Pin background color. |
| borderColor | `string` | | Pin border color. |
| glyphColor | `string` | | Color of the glyph (the circle or text in the middle). |
| glyphText | `string` | | Text shown inside the pin. |
| glyphSrc | `string \| URL` | | Image URL shown inside the pin. |
| scale | `number` | | Pin size multiplier. |

All props are reactive and update the pin in place.

## Usage

```svelte
<script lang="ts">
	import { APIProvider, GoogleMap, AdvancedMarker, Pin } from 'svelte-google-maps-api';
</script>

<div style="height: 400px;">
	<APIProvider apiKey="YOUR_API_KEY">
		<GoogleMap center={{ lat: 35.6812, lng: 139.7671 }} zoom={13} mapId="DEMO_MAP_ID">
			<AdvancedMarker position={{ lat: 35.6812, lng: 139.7671 }}>
				<Pin background="#2563eb" borderColor="#1e3a8a" glyphColor="white" glyphText="A" scale={1.2} />
			</AdvancedMarker>
		</GoogleMap>
	</APIProvider>
</div>
```

## Notes

- `Pin` must be a direct or nested child of `AdvancedMarker`; it throws otherwise.
- Like every Advanced Marker, it needs a map with a `mapId`.
- `glyphText` and `glyphSrc` replace the deprecated `glyph` option of `PinElement`.
