---
title: Data
---

## Storybook

[Open the Data story](https://skyt-a.github.io/svelte-google-maps-api/storybook/?path=/story/components-data--basic)

`Data` adds a `google.maps.Data` layer for GeoJSON features. Load features from an object or a URL, and style them declaratively.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| geoJson | `object` | | GeoJSON object to add. Replacing it removes the previous features. |
| url | `string` | | URL of a GeoJSON file to load. Changing it removes the previously loaded features. |
| idPropertyName | `string` | | Feature property used as the feature ID. |
| style | `google.maps.Data.StylingFunction \| google.maps.Data.StyleOptions` | | Feature style, or a function returning a style per feature. |
| options | `google.maps.Data.DataOptions` (without `map` and `style`) | | Other options (controls, drawing mode, ...). Creation-only. |
| data | `google.maps.Data \| null` | `null` | The instance. Bindable: read it with `bind:data`. |

### Event Props

| Prop | Type | Description |
|------|------|-------------|
| onClick | `(event: google.maps.Data.MouseEvent) => void` | `click` |
| onDblClick | `(event: google.maps.Data.MouseEvent) => void` | `dblclick` |
| onContextMenu | `(event: google.maps.Data.MouseEvent) => void` | `contextmenu` |
| onMouseDown | `(event: google.maps.Data.MouseEvent) => void` | `mousedown` |
| onMouseUp | `(event: google.maps.Data.MouseEvent) => void` | `mouseup` |
| onMouseOver | `(event: google.maps.Data.MouseEvent) => void` | `mouseover` |
| onMouseOut | `(event: google.maps.Data.MouseEvent) => void` | `mouseout` |
| onAddFeature | `(event: google.maps.Data.AddFeatureEvent) => void` | `addfeature` |
| onRemoveFeature | `(event: google.maps.Data.RemoveFeatureEvent) => void` | `removefeature` |
| onSetGeometry | `(event: google.maps.Data.SetGeometryEvent) => void` | `setgeometry` |
| onSetProperty | `(event: google.maps.Data.SetPropertyEvent) => void` | `setproperty` |
| onRemoveProperty | `(event: google.maps.Data.RemovePropertyEvent) => void` | `removeproperty` |
| onLoad | `(data: google.maps.Data) => void` | Called once after the layer is created. |

## Usage

```svelte
<script lang="ts">
	import { APIProvider, GoogleMap, Data } from 'svelte-google-maps-api';

	const geoJson = {
		type: 'FeatureCollection',
		features: [
			{
				type: 'Feature',
				properties: { name: 'Imperial Palace' },
				geometry: {
					type: 'Polygon',
					coordinates: [
						[
							[139.745, 35.68],
							[139.76, 35.68],
							[139.76, 35.69],
							[139.745, 35.69],
							[139.745, 35.68]
						]
					]
				}
			}
		]
	};

	let selected = $state('');
</script>

<div style="height: 400px;">
	<APIProvider apiKey="YOUR_API_KEY">
		<GoogleMap center={{ lat: 35.685, lng: 139.752 }} zoom={14}>
			<Data
				{geoJson}
				style={{ fillColor: '#0f766e', fillOpacity: 0.3, strokeWeight: 2 }}
				onClick={(event) => (selected = String(event.feature.getProperty('name')))}
			/>
		</GoogleMap>
	</APIProvider>
</div>

<p>{selected}</p>
```

## Notes

- `geoJson` and `url` can be used together; each manages its own features.
- Features added with `bind:data` (for example `data.add(...)`) are not removed automatically when `geoJson` or `url` changes.
