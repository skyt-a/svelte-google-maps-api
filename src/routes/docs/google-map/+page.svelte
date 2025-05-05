<script lang="ts">
	import { base } from '$app/paths';
</script>

<h1>GoogleMap</h1>

<p>
	The `GoogleMap` component renders the map container div and initializes the `google.maps.Map`
	instance. It must be placed inside an `APIProvider`.
</p>

<h2>Props</h2>

<table>
	<thead>
		<tr>
			<th>Prop</th>
			<th>Type</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>options</code></td>
			<td><code>google.maps.MapOptions</code></td>
			<td
				>Map configuration options (e.g., <code>center</code>, <code>zoom</code>,
				<code>mapId</code>, control options like <code>fullscreenControl: false</code>,
				<code>zoomControlOptions</code>, etc.). See
				<a
					href="https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions"
					target="_blank"
					rel="noopener noreferrer">MapOptions documentation</a
				>.</td
			>
		</tr>
		<tr>
			<td><code>id</code></td>
			<td><code>string</code> (optional)</td>
			<td>Sets the ID attribute of the map container div.</td>
		</tr>
		<tr>
			<td><code>mapContainerStyle</code></td>
			<td><code>string</code> (optional)</td>
			<td
				>Inline styles for the map container div. Defaults to <code>'width:100%;height:100%'</code>.
				**Important:** Ensure the container has a defined height.</td
			>
		</tr>
		<tr>
			<td><code>mapContainerClassName</code></td>
			<td><code>string</code> (optional)</td>
			<td>CSS class name(s) for the map container div.</td>
		</tr>
		<tr>
			<td><code>onLoad</code></td>
			<td><code>((map: google.maps.Map) => void)</code> (optional)</td>
			<td>Callback fired when the map instance is initialized. Receives the map instance.</td>
		</tr>
		<tr>
			<td><code>onUnmount</code></td>
			<td><code>((map: google.maps.Map) => void)</code> (optional)</td>
			<td>Callback fired just before the map instance is destroyed.</td>
		</tr>
		<tr>
			<td><i>Map Events</i></td>
			<td><code>(e: google.maps.MapMouseEvent | ...) => void</code> (optional)</td>
			<td
				>All standard <a
					href="https://developers.google.com/maps/documentation/javascript/reference/map#Map-Events"
					target="_blank"
					rel="noopener noreferrer">google.maps.Map events</a
				>
				are supported as props (e.g., <code>onClick</code>, <code>onBoundsChanged</code>,
				<code>onZoomChanged</code>, <code>onDragEnd</code>). The event names are camelCased (e.g.,
				`bounds_changed` becomes `onBoundsChanged`).</td
			>
		</tr>
	</tbody>
</table>

<h2>Context</h2>

<p>
	<code>GoogleMap</code> provides a context named <code>'map'</code> containing the initialized
	<code>google.maps.Map</code> instance. Child components like `Marker`, `Polyline`, etc., use this context
	automatically.
</p>

<h2>Example</h2>

<pre>
{@html `
&lt;script lang="ts"&gt;
  import { APIProvider, GoogleMap } from 'svelte-google-maps-api';

  const apiKey = 'YOUR_API_KEY';
  const mapOptions = {
    center: { lat: 40.7128, lng: -74.0060 }, // New York
    zoom: 12,
    mapTypeId: 'roadmap',
    disableDefaultUI: true,
    zoomControl: true
  };

  function handleMapLoad(map: google.maps.Map) {
    console.log('Map Loaded!', map);
  }

  function handleMapClick(event: google.maps.MapMouseEvent) {
    console.log('Map Clicked:', event.latLng?.toJSON());
  }
&lt;/script&gt;

&lt;div style="height: 400px; width: 100%;"&gt;
  &lt;APIProvider {apiKey}&gt;
    &lt;GoogleMap
      {...mapOptions}
      onLoad={handleMapLoad}
      onClick={handleMapClick}
      mapContainerClassName="my-custom-map-class"
    /&gt;
    {/* Add Markers, Polylines etc. here */}
  &lt;/APIProvider&gt;
&lt;/div&gt;
`}
</pre>

<style>
	/* Same table/code styling as APIProvider page */
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
