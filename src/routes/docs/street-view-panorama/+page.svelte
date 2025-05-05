<script lang="ts">
	import { base } from '$app/paths';
</script>

<h1>StreetViewPanorama</h1>

<p>
	Displays the Street View panorama for a given location. Corresponds to <a
		href="https://developers.google.com/maps/documentation/javascript/reference/street-view#StreetViewPanorama"
		target="_blank"
		rel="noopener noreferrer"><code>google.maps.StreetViewPanorama</code></a
	>.
</p>
<p>Note: This component requires its own container element, similar to `GoogleMap`.</p>

<h2>Props</h2>
<table>
	<thead><tr><th>Prop</th><th>Type</th><th>Description</th></tr></thead>
	<tbody>
		<tr
			><td><code>options</code></td><td
				><code>google.maps.StreetViewPanoramaOptions</code> (optional)</td
			><td
				>Panorama configuration options. See <a
					href="https://developers.google.com/maps/documentation/javascript/reference/street-view#StreetViewPanoramaOptions"
					target="_blank"
					rel="noopener noreferrer">StreetViewPanoramaOptions docs</a
				>.</td
			></tr
		>
		<tr
			><td><code>containerId</code></td><td><code>string</code> (optional)</td><td
				>Sets the ID attribute of the panorama container div.</td
			></tr
		>
		<tr
			><td><code>containerClass</code></td><td><code>string</code> (optional)</td><td
				>CSS class name(s) for the container div.</td
			></tr
		>
		<tr
			><td><code>containerStyle</code></td><td><code>string</code> (optional)</td><td
				>Inline styles for the container div. Defaults to <code>'width:100%;height:100%'</code>.
				Ensure the container has a defined height.</td
			></tr
		>
		<tr
			><td><code>position</code></td><td><code>LatLng | LatLngLiteral</code> (optional)</td><td
				>Sets the initial LatLng position for the Street View camera.</td
			></tr
		>
		<tr
			><td><code>pov</code></td><td><code>google.maps.StreetViewPov</code> (optional)</td><td
				>Sets the initial point of view for the camera (heading, pitch).</td
			></tr
		>
		<tr
			><td><code>zoom</code></td><td><code>number</code> (optional)</td><td
				>Sets the initial zoom level.</td
			></tr
		>
		<tr
			><td><code>pano</code></td><td><code>string</code> (optional)</td><td
				>Sets the panorama ID to display. Takes precedence over <code>position</code> if set.</td
			></tr
		>
		<tr
			><td><code>visible</code></td><td><code>boolean</code> (default: <code>true</code>)</td><td
				>Initial visibility state.</td
			></tr
		>
		<tr
			><td><i>Control Options</i></td><td><code>boolean</code> (optional)</td><td
				>Direct props to configure controls like <code>addressControl</code>,
				<code>enableCloseButton</code>, <code>fullscreenControl</code>, etc.</td
			></tr
		>
		<tr
			><td><i>Panorama Events</i></td><td><code>(...) => void</code> (optional)</td><td
				>Standard <a
					href="https://developers.google.com/maps/documentation/javascript/reference/street-view#StreetViewPanorama-Events"
					target="_blank"
					rel="noopener noreferrer">google.maps.StreetViewPanorama events</a
				>
				like <code>onPanoChanged</code>, <code>onPositionChanged</code>, <code>onPovChanged</code>,
				<code>onVisibleChanged</code>, <code>onZoomChanged</code>, <code>onCloseClick</code>.</td
			></tr
		>
		<tr
			><td><code>onLoad</code></td><td
				><code>(panorama: StreetViewPanorama) => void</code> (optional)</td
			><td>Callback fired when the panorama instance is initialized.</td></tr
		>
		<tr
			><td><code>onUnmount</code></td><td
				><code>(panorama: StreetViewPanorama) => void</code> (optional)</td
			><td>Callback fired before the panorama instance is destroyed.</td></tr
		>
	</tbody>
</table>

<h2>Example</h2>
<pre>
{@html `
&lt;script lang="ts"&gt;
  import { APIProvider, StreetViewPanorama } from 'svelte-google-maps-api';

  const apiKey = 'YOUR_API_KEY';
  const panoramaOptions = {
    position: { lat: 37.869260, lng: -122.254811 }, // Example position
    pov: { heading: 165, pitch: 0 },
    zoom: 1,
    visible: true,
    addressControl: false
  };
&lt;/script&gt;

&lt;div style="height: 400px; width: 100%;"&gt;
  &lt;APIProvider {apiKey}&gt;
    &lt;StreetViewPanorama {...panoramaOptions} /&gt;
  &lt;/APIProvider&gt;
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
