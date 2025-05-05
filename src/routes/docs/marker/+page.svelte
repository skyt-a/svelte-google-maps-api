<script lang="ts">
	import { base } from '$app/paths';
</script>

<h1>Marker</h1>

<p>
	Renders a standard <a
		href="https://developers.google.com/maps/documentation/javascript/reference/marker#Marker"
		target="_blank"
		rel="noopener noreferrer"><code>google.maps.Marker</code></a
	>.
</p>

<h2>Props</h2>

<table>
	<thead>
		<tr><th>Prop</th><th>Type</th><th>Description</th></tr>
	</thead>
	<tbody>
		<tr
			><td><code>position</code></td><td><code>LatLng | LatLngLiteral</code></td><td
				>Required. The marker's geographical location.</td
			></tr
		>
		<tr
			><td><code>options</code></td><td><code>google.maps.MarkerOptions</code> (optional)</td><td
				>Additional marker options (e.g., <code>title</code>, <code>icon</code>,
				<code>draggable</code>, <code>label</code>). See
				<a
					href="https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions"
					target="_blank"
					rel="noopener noreferrer">MarkerOptions docs</a
				>.</td
			></tr
		>
		<tr
			><td><i>Marker Events</i></td><td><code>(...) => void</code> (optional)</td><td
				>All standard <a
					href="https://developers.google.com/maps/documentation/javascript/reference/marker#Marker-Events"
					target="_blank"
					rel="noopener noreferrer">google.maps.Marker events</a
				>
				are supported as props (e.g., <code>onClick</code>, <code>onDragEnd</code>,
				<code>onPositionChanged</code>).</td
			></tr
		>
		<tr
			><td><code>onLoad</code></td><td><code>(marker: Marker) => void</code> (optional)</td><td
				>Callback fired when the marker instance is created.</td
			></tr
		>
		<tr
			><td><code>onUnmount</code></td><td><code>(marker: Marker) => void</code> (optional)</td><td
				>Callback fired before the marker is removed from the map.</td
			></tr
		>
	</tbody>
</table>

<h2>Example</h2>

<pre>
{@html `
&lt;GoogleMap {...mapOptions}&gt;
  &lt;Marker
    position={ { lat: 35.681, lng: 139.767 } }
    title="Standard Marker"
    options={ { icon: '...', draggable: true } }
    onClick={ (e) => console.log('Marker clicked:', e) }
    onDragEnd={ (e) => console.log('Marker drag ended:', e.latLng?.toJSON()) }
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
