<script lang="ts">
	import { base } from '$app/paths';
</script>

<h1>Polyline</h1>

<p>
	Draws a polyline (a series of connected line segments) on the map, corresponding to <a
		href="https://developers.google.com/maps/documentation/javascript/reference/polygon#Polyline"
		target="_blank"
		rel="noopener noreferrer"><code>google.maps.Polyline</code></a
	>.
</p>

<h2>Props</h2>
<table>
	<thead><tr><th>Prop</th><th>Type</th><th>Description</th></tr></thead>
	<tbody>
		<tr
			><td><code>path</code></td><td
				><code>MVCArray&lt;LatLng&gt; | (LatLng | LatLngLiteral)[]</code></td
			><td>Required. The vertices of the polyline.</td></tr
		>
		<tr
			><td><code>options</code></td><td><code>google.maps.PolylineOptions</code> (optional)</td><td
				>Additional polyline options (e.g., <code>strokeColor</code>, <code>strokeWeight</code>,
				<code>strokeOpacity</code>, <code>geodesic</code>, <code>zIndex</code>). See
				<a
					href="https://developers.google.com/maps/documentation/javascript/reference/polygon#PolylineOptions"
					target="_blank"
					rel="noopener noreferrer">PolylineOptions docs</a
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
				>If set to true, the user can edit this shape by dragging the control points displayed at
				the vertices and on each segment.</td
			></tr
		>
		<tr
			><td><code>visible</code></td><td><code>boolean</code> (optional)</td><td
				>Whether the polyline is visible on the map.</td
			></tr
		>
		<tr
			><td><i>Style Props</i></td><td><code>string | number</code> (optional)</td><td
				>Direct props like <code>strokeColor</code>, <code>strokeOpacity</code>,
				<code>strokeWeight</code>, <code>zIndex</code> can be used instead of the
				<code>options</code> object.</td
			></tr
		>
		<tr
			><td><i>Polyline Events</i></td><td><code>(...) => void</code> (optional)</td><td
				>Standard <a
					href="https://developers.google.com/maps/documentation/javascript/reference/polygon#Polyline-Events"
					target="_blank"
					rel="noopener noreferrer">google.maps.Polyline events</a
				>
				like <code>onClick</code>, <code>onDblClick</code>, <code>onDragEnd</code>, etc.</td
			></tr
		>
		<tr
			><td><code>onPathChanged</code></td><td
				><code>(newPath: MVCArray&lt;LatLng&gt;) => void</code> (optional)</td
			><td
				>Custom event fired when the polyline's path is changed (e.g., by dragging points when
				editable).</td
			></tr
		>
		<tr
			><td><code>onLoad</code></td><td><code>(polyline: Polyline) => void</code> (optional)</td><td
				>Callback fired when the polyline instance is created.</td
			></tr
		>
		<tr
			><td><code>onUnmount</code></td><td><code>(polyline: Polyline) => void</code> (optional)</td
			><td>Callback fired before the polyline is removed.</td></tr
		>
	</tbody>
</table>

<h2>Example</h2>
<pre>
{@html `
&lt;GoogleMap {...mapOptions}&gt;
  &lt;Polyline
    path={[
      { lat: 35.680, lng: 139.760 },
      { lat: 35.682, lng: 139.765 },
      { lat: 35.680, lng: 139.770 }
    ]}
    strokeColor="#FF0000"
    strokeOpacity={0.8}
    strokeWeight={3}
    editable={true}
    onPathChanged={ (newPath) => console.log('Path changed:', newPath.getArray().map(p=>p.toJSON())) }
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
