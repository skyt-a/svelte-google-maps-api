<script lang="ts">
	import { base } from '$app/paths';
</script>

<h1>KmlLayer</h1>

<p>
	Renders geographic data from a KML, KMZ or GeoRSS file hosted on a publicly accessible web server.
	Corresponds to <a
		href="https://developers.google.com/maps/documentation/javascript/reference/kml#KmlLayer"
		target="_blank"
		rel="noopener noreferrer"><code>google.maps.KmlLayer</code></a
	>.
</p>

<p>
	<em
		>Note: The KML file must be publicly accessible; local files are not supported by the Google
		Maps API.</em
	>
</p>

<h2>Props</h2>
<table>
	<thead><tr><th>Prop</th><th>Type</th><th>Description</th></tr></thead>
	<tbody>
		<tr
			><td><code>url</code></td><td><code>string</code> (optional)</td><td
				>The URL of the KML file to display. Required for the layer to render.</td
			></tr
		>
		<tr
			><td><code>options</code></td><td><code>google.maps.KmlLayerOptions</code> (optional)</td><td
				>Additional KML layer options. See <a
					href="https://developers.google.com/maps/documentation/javascript/reference/kml#KmlLayerOptions"
					target="_blank"
					rel="noopener noreferrer">KmlLayerOptions docs</a
				>.</td
			></tr
		>
		<tr
			><td><code>clickable</code></td><td><code>boolean</code> (optional)</td><td
				>If true, the layer receives mouse events.</td
			></tr
		>
		<tr
			><td><code>preserveViewport</code></td><td><code>boolean</code> (optional)</td><td
				>By default, the input map is centered and zoomed to the bounding box of the contents of the
				layer. If this option is set to true, the viewport is left unchanged, unless the map's
				center and zoom were never set.</td
			></tr
		>
		<tr
			><td><code>screenOverlays</code></td><td><code>boolean</code> (optional)</td><td
				>Whether to render screen overlays.</td
			></tr
		>
		<tr
			><td><code>suppressInfoWindows</code></td><td><code>boolean</code> (optional)</td><td
				>Suppress the rendering of info windows when layer features are clicked.</td
			></tr
		>
		<tr
			><td><code>zIndex</code></td><td><code>number</code> (optional)</td><td
				>The z-index of the layer.</td
			></tr
		>
		<tr
			><td><i>KML Layer Events</i></td><td><code>(...) => void</code> (optional)</td><td
				>Standard <a
					href="https://developers.google.com/maps/documentation/javascript/reference/kml#KmlLayer-Events"
					target="_blank"
					rel="noopener noreferrer">google.maps.KmlLayer events</a
				>: <code>onClick</code>, <code>onDefaultViewportChanged</code>,
				<code>onStatusChanged</code>.</td
			></tr
		>
		<tr
			><td><code>onLoad</code></td><td><code>(layer: KmlLayer) => void</code> (optional)</td><td
				>Callback fired when the layer instance is created.</td
			></tr
		>
		<tr
			><td><code>onUnmount</code></td><td><code>(layer: KmlLayer) => void</code> (optional)</td><td
				>Callback fired before the layer is removed.</td
			></tr
		>
	</tbody>
</table>

<h2>Example</h2>
<pre>
{@html `
&lt;script lang="ts"&gt;
  // Example KML file URL (replace with a valid, publicly accessible URL)
  const kmlUrl = "https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml";
&lt;/script&gt;

&lt;GoogleMap {...mapOptions}&gt;
  &lt;KmlLayer
    url={kmlUrl}
    options={{ preserveViewport: false, suppressInfoWindows: true }}
    onClick={(e) => console.log('KML Feature Clicked:', e.featureData)}
    onStatusChanged={() => console.log('KML Status Changed')}
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
