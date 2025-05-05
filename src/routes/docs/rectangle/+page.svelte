<script lang="ts">
	import { base } from '$app/paths';
</script>

<h1>Rectangle</h1>

<p>
	Draws a rectangle on the map, corresponding to <a
		href="https://developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle"
		target="_blank"
		rel="noopener noreferrer"><code>google.maps.Rectangle</code></a
	>.
</p>

<h2>Props</h2>
<table>
	<thead><tr><th>Prop</th><th>Type</th><th>Description</th></tr></thead>
	<tbody>
		<tr
			><td><code>bounds</code></td><td><code>LatLngBounds | LatLngBoundsLiteral</code></td><td
				>Required. The bounds of the rectangle.</td
			></tr
		>
		<tr
			><td><code>options</code></td><td><code>google.maps.RectangleOptions</code> (optional)</td><td
				>Additional rectangle options. See <a
					href="https://developers.google.com/maps/documentation/javascript/reference/polygon#RectangleOptions"
					target="_blank"
					rel="noopener noreferrer">RectangleOptions docs</a
				>.</td
			></tr
		>
		<tr
			><td><code>draggable</code></td><td><code>boolean</code> (optional)</td><td
				>If set to true, the user can drag this rectangle over the map.</td
			></tr
		>
		<tr
			><td><code>editable</code></td><td><code>boolean</code> (optional)</td><td
				>If set to true, the user can edit this rectangle by dragging the control points.</td
			></tr
		>
		<tr
			><td><code>visible</code></td><td><code>boolean</code> (optional)</td><td
				>Whether the rectangle is visible.</td
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
			><td><i>Rectangle Events</i></td><td><code>(...) => void</code> (optional)</td><td
				>Standard <a
					href="https://developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle-Events"
					target="_blank"
					rel="noopener noreferrer">google.maps.Rectangle events</a
				>
				like <code>onClick</code>, <code>onBoundsChanged</code>, <code>onDragEnd</code>, etc.</td
			></tr
		>
		<tr
			><td><code>onLoad</code></td><td><code>(rectangle: Rectangle) => void</code> (optional)</td
			><td>Callback fired when the rectangle instance is created.</td></tr
		>
		<tr
			><td><code>onUnmount</code></td><td><code>(rectangle: Rectangle) => void</code> (optional)</td
			><td>Callback fired before the rectangle is removed.</td></tr
		>
	</tbody>
</table>

<h2>Example</h2>
<pre>
{@html `
&lt;GoogleMap {...mapOptions}&gt;
  &lt;Rectangle
    bounds={{
      north: 35.70,
      south: 35.69,
      east: 139.78,
      west: 139.77
    }}
    strokeColor="#FFC107"
    strokeOpacity={0.8}
    strokeWeight={2}
    fillColor="#FFC107"
    fillOpacity={0.35}
    editable={true}
    onBoundsChanged={ () => console.log('Rectangle bounds changed') }
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
