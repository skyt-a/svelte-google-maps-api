<script lang="ts">
	import { base } from '$app/paths';
</script>

<h1>DirectionsRenderer</h1>

<p>
	Renders directions obtained from the Directions service. Corresponds to <a
		href="https://developers.google.com/maps/documentation/javascript/reference/directions#DirectionsRenderer"
		target="_blank"
		rel="noopener noreferrer"><code>google.maps.DirectionsRenderer</code></a
	>.
</p>

<p>
	<strong>Requires the <code>routes</code> library to be loaded via `APIProvider`.</strong> You typically
	use this component in conjunction with `google.maps.DirectionsService` to fetch the directions.
</p>

<h2>Props</h2>
<table>
	<thead><tr><th>Prop</th><th>Type</th><th>Description</th></tr></thead>
	<tbody>
		<tr
			><td><code>directions</code></td><td><code>google.maps.DirectionsResult</code> (optional)</td
			><td>The DirectionsResult obtained from the DirectionsService to display.</td></tr
		>
		<tr
			><td><code>options</code></td><td
				><code>google.maps.DirectionsRendererOptions</code> (optional)</td
			><td
				>Additional renderer options. See <a
					href="https://developers.google.com/maps/documentation/javascript/reference/directions#DirectionsRendererOptions"
					target="_blank"
					rel="noopener noreferrer">DirectionsRendererOptions docs</a
				>.</td
			></tr
		>
		<tr
			><td><code>routeIndex</code></td><td><code>number</code> (optional)</td><td
				>The index of the route to display if the DirectionsResult contains multiple routes.</td
			></tr
		>
		<tr
			><td><code>panel</code></td><td><code>HTMLElement</code> (optional)</td><td
				>The HTMLElement in which to display the textual directions.</td
			></tr
		>
		<tr
			><td><i>Other Options</i></td><td
				><code>boolean | MarkerOptions | PolylineOptions</code> (optional)</td
			><td
				>Direct props like <code>draggable</code>, <code>hideRouteList</code>,
				<code>preserveViewport</code>, <code>suppressMarkers</code>,
				<code>suppressInfoWindows</code>, <code>suppressPolylines</code>,
				<code>markerOptions</code>, <code>polylineOptions</code>.</td
			></tr
		>
		<tr
			><td><code>onDirectionsChanged</code></td><td><code>() => void</code> (optional)</td><td
				>Event fired when the rendered directions change, usually as a result of user interaction
				(e.g., dragging a waypoint).</td
			></tr
		>
		<tr
			><td><code>onLoad</code></td><td
				><code>(renderer: DirectionsRenderer) => void</code> (optional)</td
			><td>Callback fired when the renderer instance is created.</td></tr
		>
		<tr
			><td><code>onUnmount</code></td><td
				><code>(renderer: DirectionsRenderer) => void</code> (optional)</td
			><td>Callback fired before the renderer is removed.</td></tr
		>
	</tbody>
</table>

<h2>Example</h2>
<pre>
{@html `
&lt;script lang="ts"&gt;
  import { APIProvider, GoogleMap, DirectionsRenderer } from 'svelte-google-maps-api';

  let directionsResult: google.maps.DirectionsResult | undefined = undefined;
  let directionsService: google.maps.DirectionsService | null = null;
  let mapInstance: google.maps.Map | null = null;

  // Function to fetch directions (call this when needed, e.g., on button click)
  async function fetchDirections() {
    if (!google?.maps?.DirectionsService || !directionsService) return;

    const request = {
      origin: 'Tokyo Station, Japan',
      destination: 'Tokyo Tower, Japan',
      travelMode: google.maps.TravelMode.DRIVING
    };
    try {
      const result = await directionsService.route(request);
      directionsResult = result;
    } catch (error) {
      console.error("Error fetching directions:", error);
    }
  }

  function handleMapLoad(map: google.maps.Map) {
    mapInstance = map;
    // Initialize DirectionsService once map and API are ready
    if (google?.maps?.DirectionsService) {
      directionsService = new google.maps.DirectionsService();
      // fetchDirections(); // Optionally fetch directions on load
    }
  }

&lt;/script&gt;

&lt;div style="height: 400px; width: 100%;"&gt;
  &lt;APIProvider {apiKey} libraries={['routes']}&gt;
    &lt;GoogleMap {...mapOptions} onLoad={handleMapLoad}&gt;
      {#if directionsResult}
        &lt;DirectionsRenderer directions={directionsResult} /&gt;
      {/if}
    &lt;/GoogleMap&gt;
  &lt;/APIProvider&gt;
  &lt;button on:click={fetchDirections} disabled={!directionsService}&gt;Get Directions&lt;/button&gt;
&lt;/div&gt;
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
