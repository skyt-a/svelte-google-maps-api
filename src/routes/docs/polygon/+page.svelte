<script lang="ts">
	import { base } from '$app/paths';
</script>

<h1>Polygon</h1>

<p>
	Draws a polygon (a filled area with a border) on the map, corresponding to <a
		href="https://developers.google.com/maps/documentation/javascript/reference/polygon#Polygon"
		target="_blank"
		rel="noopener noreferrer"><code>google.maps.Polygon</code></a
	>.
</p>

<h2>Props</h2>
<table>
	<thead><tr><th>Prop</th><th>Type</th><th>Description</th></tr></thead>
	<tbody>
		<tr
			><td><code>paths</code></td><td
				><code>MVCArray&lt;PathType&gt; | PathType[]</code><br />(where PathType is
				<code>MVCArray&lt;LatLng&gt; | (LatLng | LatLngLiteral)[]</code>)</td
			><td
				>Required. The vertices of the polygon, potentially including multiple paths for holes.</td
			></tr
		>
		<tr
			><td><code>options</code></td><td><code>google.maps.PolygonOptions</code> (optional)</td><td
				>Additional polygon options (e.g., <code>fillColor</code>, <code>strokeWeight</code>,
				<code>geodesic</code>). See
				<a
					href="https://developers.google.com/maps/documentation/javascript/reference/polygon#PolygonOptions"
					target="_blank"
					rel="noopener noreferrer">PolygonOptions docs</a
				>.</td
			></tr
		>
		<tr
			><td><code>draggable</code></td><td><code>boolean</code> (optional)</td><td
				>If set to true, the user can drag this shape over the map.</td
			></tr
		>
		<tr
			><td><code>editable</code></td><td><code>boolean</code> (optional)</td><td
				>If set to true, the user can edit this shape by dragging the control points.</td
			></tr
		>
		<tr
			><td><code>visible</code></td><td><code>boolean</code> (optional)</td><td
				>Whether the polygon is visible on the map.</td
			></tr
		>
		<tr
			><td><i>Style Props</i></td><td><code>string | number</code> (optional)</td><td
				>Direct props like <code>fillColor</code>, <code>fillOpacity</code>,
				<code>strokeColor</code>, <code>strokeOpacity</code>, <code>strokeWeight</code>,
				<code>zIndex</code>.</td
			></tr
		>
		<tr
			><td><i>Polygon Events</i></td><td><code>(...) => void</code> (optional)</td><td
				>Standard <a
					href="https://developers.google.com/maps/documentation/javascript/reference/polygon#Polygon-Events"
					target="_blank"
					rel="noopener noreferrer">google.maps.Polygon events</a
				>
				like <code>onClick</code>, <code>onDblClick</code>, <code>onDragEnd</code>, etc.</td
			></tr
		>
		<tr
			><td><code>onPathsChanged</code></td><td
				><code>(newPaths: MVCArray&lt;MVCArray&lt;LatLng&gt;&gt;) => void</code> (optional)</td
			><td>Custom event fired when the polygon's paths are changed.</td></tr
		>
		<tr
			><td><code>onLoad</code></td><td><code>(polygon: Polygon) => void</code> (optional)</td><td
				>Callback fired when the polygon instance is created.</td
			></tr
		>
		<tr
			><td><code>onUnmount</code></td><td><code>(polygon: Polygon) => void</code> (optional)</td><td
				>Callback fired before the polygon is removed.</td
			></tr
		>
	</tbody>
</table>

<h2>Example</h2>
<pre>
{@html `
&lt;GoogleMap {...mapOptions}&gt;
  &lt;Polygon
    paths={[
      [
        { lat: 35.690, lng: 139.765 },
        { lat: 35.688, lng: 139.770 },
        { lat: 35.690, lng: 139.775 },
        { lat: 35.692, lng: 139.770 }
      ] // Outer path
      // You can add inner paths (arrays of LatLngLiterals) here for holes
    ]}
    strokeColor="#FF0000"
    strokeOpacity={0.8}
    strokeWeight={2}
    fillColor="#FF0000"
    fillOpacity={0.35}
    editable={true}
  />
&lt;/GoogleMap&gt;
`}
</pre>

<style>
	/* Basic table/code styling */
	table {
		width: 100%;
		border-collapse: collapse;
		margin-bottom: 20px;
	}
	th,
	td {
		border: 1px solid #ddd;
		padding: 8px;
		text-align: left;
	}
	th {
		background-color: #f2f2f2;
	}
	code {
		background-color: #f4f4f4;
		padding: 2px 4px;
		border-radius: 3px;
	}
	pre {
		background-color: #f4f4f4;
		padding: 15px;
		border-radius: 5px;
		overflow-x: auto;
	}
</style>
