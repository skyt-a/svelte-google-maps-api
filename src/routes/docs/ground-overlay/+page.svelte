<script lang="ts">
	import { base } from '$app/paths';
</script>

<h1>GroundOverlay</h1>

<p>
	Displays an image overlay over a specified geographical boundary. Corresponds to <a
		href="https://developers.google.com/maps/documentation/javascript/reference/image-overlay#GroundOverlay"
		target="_blank"
		rel="noopener noreferrer"><code>google.maps.GroundOverlay</code></a
	>.
</p>

<h2>Props</h2>
<table>
	<thead><tr><th>Prop</th><th>Type</th><th>Description</th></tr></thead>
	<tbody>
		<tr
			><td><code>url</code></td><td><code>string</code></td><td
				>Required. The URL of the image to overlay.</td
			></tr
		>
		<tr
			><td><code>bounds</code></td><td><code>LatLngBounds | LatLngBoundsLiteral</code></td><td
				>Required. The geographical bounds for the overlay.</td
			></tr
		>
		<tr
			><td><code>options</code></td><td><code>google.maps.GroundOverlayOptions</code> (optional)</td
			><td
				>Additional overlay options. See <a
					href="https://developers.google.com/maps/documentation/javascript/reference/image-overlay#GroundOverlayOptions"
					target="_blank"
					rel="noopener noreferrer">GroundOverlayOptions docs</a
				>. Note that <code>clickable</code> and <code>opacity</code> are also direct props.</td
			></tr
		>
		<tr
			><td><code>clickable</code></td><td><code>boolean</code> (optional)</td><td
				>If true, the ground overlay can receive mouse events.</td
			></tr
		>
		<tr
			><td><code>opacity</code></td><td><code>number</code> (optional)</td><td
				>The opacity of the overlay, between 0.0 (transparent) and 1.0 (opaque).</td
			></tr
		>
		<tr
			><td><i>GroundOverlay Events</i></td><td
				><code>(e: MapMouseEvent) => void</code> (optional)</td
			><td
				>Standard <a
					href="https://developers.google.com/maps/documentation/javascript/reference/image-overlay#GroundOverlay-Events"
					target="_blank"
					rel="noopener noreferrer">google.maps.GroundOverlay events</a
				>: <code>onClick</code>, <code>onDblClick</code>.</td
			></tr
		>
		<tr
			><td><code>onLoad</code></td><td><code>(overlay: GroundOverlay) => void</code> (optional)</td
			><td>Callback fired when the overlay instance is created.</td></tr
		>
		<tr
			><td><code>onUnmount</code></td><td
				><code>(overlay: GroundOverlay) => void</code> (optional)</td
			><td>Callback fired before the overlay is removed.</td></tr
		>
	</tbody>
</table>

<h2>Example</h2>
<pre>
{@html `
&lt;script lang="ts"&gt;
  const imageUrl = 'https://www.example.com/overlay.png'; // Replace with your image URL
  const imageBounds = {
    north: 40.773941,
    south: 40.712216,
    east: -73.96740,
    west: -74.006615
  };
&lt;/script&gt;

&lt;GoogleMap {...mapOptions}&gt;
  &lt;GroundOverlay
    url={imageUrl}
    bounds={imageBounds}
    opacity={0.8}
    clickable={true}
    onClick={() => alert('Overlay Clicked!')}
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
