<script lang="ts">
	import { base } from '$app/paths';
</script>

<h1>Circle</h1>

<p>
	Draws a circle on the map, corresponding to <a
		href="https://developers.google.com/maps/documentation/javascript/reference/polygon#Circle"
		target="_blank"
		rel="noopener noreferrer"><code>google.maps.Circle</code></a
	>.
</p>

<h2>Props</h2>
<table>
	<thead><tr><th>Prop</th><th>Type</th><th>Description</th></tr></thead>
	<tbody>
		<tr
			><td><code>center</code></td><td><code>LatLng | LatLngLiteral</code></td><td
				>Required. The center of the circle.</td
			></tr
		>
		<tr
			><td><code>radius</code></td><td><code>number</code></td><td
				>Required. The radius in meters on the Earth's surface.</td
			></tr
		>
		<tr
			><td><code>options</code></td><td><code>google.maps.CircleOptions</code> (optional)</td><td
				>Additional circle options. See <a
					href="https://developers.google.com/maps/documentation/javascript/reference/polygon#CircleOptions"
					target="_blank"
					rel="noopener noreferrer">CircleOptions docs</a
				>.</td
			></tr
		>
		<tr
			><td><code>draggable</code></td><td><code>boolean</code> (optional)</td><td
				>If set to true, the user can drag this circle over the map.</td
			></tr
		>
		<tr
			><td><code>editable</code></td><td><code>boolean</code> (optional)</td><td
				>If set to true, the user can edit this circle by dragging the control points.</td
			></tr
		>
		<tr
			><td><code>visible</code></td><td><code>boolean</code> (optional)</td><td
				>Whether the circle is visible.</td
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
			><td><i>Circle Events</i></td><td><code>(...) => void</code> (optional)</td><td
				>Standard <a
					href="https://developers.google.com/maps/documentation/javascript/reference/polygon#Circle-Events"
					target="_blank"
					rel="noopener noreferrer">google.maps.Circle events</a
				>
				like <code>onClick</code>, <code>onCenterChanged</code>, <code>onRadiusChanged</code>, etc.</td
			></tr
		>
		<tr
			><td><code>onLoad</code></td><td><code>(circle: Circle) => void</code> (optional)</td><td
				>Callback fired when the circle instance is created.</td
			></tr
		>
		<tr
			><td><code>onUnmount</code></td><td><code>(circle: Circle) => void</code> (optional)</td><td
				>Callback fired before the circle is removed.</td
			></tr
		>
	</tbody>
</table>

<h2>Example</h2>
<pre>
{@html `
&lt;GoogleMap {...mapOptions}&gt;
  &lt;Circle
    center={ { lat: 35.678, lng: 139.775 } }
    radius={500} // meters
    strokeColor="#008000"
    strokeOpacity={0.8}
    strokeWeight={2}
    fillColor="#008000"
    fillOpacity={0.3}
    editable={true}
    draggable={true}
    onCenterChanged={ () => console.log('Circle center changed') }
    onRadiusChanged={ () => console.log('Circle radius changed') }
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
