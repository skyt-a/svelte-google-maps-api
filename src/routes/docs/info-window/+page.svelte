<script lang="ts">
	import { base } from '$app/paths';
</script>

<h1>InfoWindow</h1>

<p>
	Displays content (usually text or HTML) in a popup window on the map, typically anchored to a <a
		href="{base}/docs/marker"><code>Marker</code></a
	>
	or <a href="{base}/docs/advanced-marker"><code>AdvancedMarker</code></a>.
</p>

<h2>Props</h2>

<table>
	<thead>
		<tr><th>Prop</th><th>Type</th><th>Description</th></tr>
	</thead>
	<tbody>
		<tr
			><td><code>anchor</code></td><td
				><code>MVCObject | AdvancedMarkerElement | LatLng | LatLngLiteral</code> (optional)</td
			><td
				>The anchor point for the InfoWindow. This is typically a <code>Marker</code> or
				<code>AdvancedMarkerElement</code>
				instance (obtained via <code>bind:this</code> and potentially
				<code>getMarkerInstance()</code>). If not set, <code>position</code> must be provided.</td
			></tr
		>
		<tr
			><td><code>position</code></td><td><code>LatLng | LatLngLiteral</code> (optional)</td><td
				>The LatLng at which to display this InfoWindow. If the anchor is set, the InfoWindow's
				position is based on the anchor.</td
			></tr
		>
		<tr
			><td><code>options</code></td><td><code>google.maps.InfoWindowOptions</code> (optional)</td
			><td
				>Additional InfoWindow options. See <a
					href="https://developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindowOptions"
					target="_blank"
					rel="noopener noreferrer">InfoWindowOptions docs</a
				>. Note that <code>content</code>, <code>headerContent</code>, <code>position</code>, and
				<code>zIndex</code> are also available as direct props.</td
			></tr
		>
		<tr
			><td><code>headerContent</code></td><td><code>Element | string</code> (optional)</td><td
				>Content to display in the InfoWindow header. Can be an HTML Element or a string. Overrides <code
					>options.headerContent</code
				>.</td
			></tr
		>
		<tr
			><td><code>zIndex</code></td><td><code>number</code> (optional)</td><td
				>The z-index relative to other InfoWindows. Overrides <code>options.zIndex</code>.</td
			></tr
		>
		<tr
			><td><code>shouldFocus</code></td><td><code>boolean</code> (default: <code>true</code>)</td
			><td>Whether the InfoWindow should receive focus when opened.</td></tr
		>
		<tr
			><td><code>isOpen</code></td><td><code>boolean</code> (default: <code>true</code>)</td><td
				>Controls the open/closed state of the InfoWindow. Use <code>bind:isOpen</code> for two-way binding.</td
			></tr
		>
		<tr
			><td><i>InfoWindow Events</i></td><td><code>() => void</code> (optional)</td><td
				>Standard <a
					href="https://developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindow-Events"
					target="_blank"
					rel="noopener noreferrer">google.maps.InfoWindow events</a
				>: <code>onCloseClick</code>, <code>onDomReady</code>, <code>onContentChanged</code>,
				<code>onPositionChanged</code>, <code>onZIndexChanged</code>.</td
			></tr
		>
		<tr
			><td><code>onLoad</code></td><td><code>(infoWindow: InfoWindow) => void</code> (optional)</td
			><td>Callback fired when the InfoWindow instance is created.</td></tr
		>
		<tr
			><td><code>onUnmount</code></td><td
				><code>(infoWindow: InfoWindow) => void</code> (optional)</td
			><td>Callback fired before the InfoWindow is destroyed.</td></tr
		>
	</tbody>
</table>

<h2>Slots</h2>
<ul>
	<li>
		<strong>Default Slot:</strong> HTML content to be displayed inside the main body of the
		InfoWindow. Overrides the <code>options.content</code> prop.
	</li>
	<li>
		<strong><code>header</code> Slot:</strong> HTML content to be displayed inside the header of the
		InfoWindow. Overrides the <code>headerContent</code> and <code>options.headerContent</code> props.
	</li>
</ul>

<h2>Example: Open on Marker Click</h2>

<pre>
{@html `
&lt;script lang="ts"&gt;
  import { Marker, InfoWindow } from 'svelte-google-maps-api';
  import AdvancedMarker from './AdvancedMarker.svelte'; // Assuming local path if used

  let showInfoWindow = false;
  let markerComponent: Marker;
  let advMarkerComponent: AdvancedMarker;

  function handleMarkerClick() {
    showInfoWindow = !showInfoWindow;
  }

  function handleClose() {
    showInfoWindow = false;
  }
&lt;/script&gt;

&lt;GoogleMap {...mapOptions}&gt;
  &lt;Marker
    bind:this={markerComponent}
    position={ { lat: 35.681, lng: 139.767 } }
    onClick={handleMarkerClick}
  /&gt;

  {#if showInfoWindow && markerComponent}
    &lt;InfoWindow
      anchor={markerComponent.getMarkerInstance()}
      onCloseClick={handleClose}
      bind:isOpen={showInfoWindow}
    &gt;
      &lt;h3&gt;Standard Marker Info&lt;/h3&gt;
      &lt;p&gt;This info window is anchored to the marker.&lt;/p&gt;
    &lt;/InfoWindow&gt;
  {/if}

  {/* Example with AdvancedMarker */}
  &lt;AdvancedMarker
    bind:this={advMarkerComponent}
    position={ { lat: 35.683, lng: 139.768 } }
    onClick={handleMarkerClick}
  /&gt;

  {#if showInfoWindow && advMarkerComponent}
    {@const instance = advMarkerComponent.getMarkerInstance()}
    {#if instance}
      &lt;InfoWindow
        anchor={instance}
        onCloseClick={handleClose}
        bind:isOpen={showInfoWindow}
      &gt;
        &lt;strong&gt;Advanced Marker Info&lt;/strong&gt;
      &lt;/InfoWindow&gt;
    {/if}
  {/if}
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
