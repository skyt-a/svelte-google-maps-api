<script lang="ts">
	import { base } from '$app/paths';
</script>

<h1>AdvancedMarker</h1>

<p>
	Renders the newer <a
		href="https://developers.google.com/maps/documentation/javascript/reference/marker#AdvancedMarkerElement"
		target="_blank"
		rel="noopener noreferrer"><code>google.maps.marker.AdvancedMarkerElement</code></a
	>, which allows for customization using HTML/CSS via the default slot.
</p>

<p><strong>Requires the <code>marker</code> library to be loaded via `APIProvider`.</strong></p>

<h2>Props</h2>

<table>
	<thead>
		<tr><th>Prop</th><th>Type</th><th>Description</th></tr>
	</thead>
	<tbody>
		<tr
			><td><code>position</code></td><td><code>LatLng | LatLngLiteral</code> (optional)</td><td
				>The marker's geographical location.</td
			></tr
		>
		<tr
			><td><code>title</code></td><td><code>string</code> (optional)</td><td>Rollover text.</td></tr
		>
		<tr
			><td><code>zIndex</code></td><td><code>number</code> (optional)</td><td
				>The marker's z-index relative to other markers.</td
			></tr
		>
		<tr
			><td><code>element</code></td><td><code>HTMLElement</code> (optional)</td><td
				>A pre-rendered HTMLElement to use as the marker content. If provided, the default slot is
				ignored.</td
			></tr
		>
		<tr
			><td><code>gmpDraggable</code></td><td><code>boolean</code> (optional)</td><td
				>If true, the marker can be dragged. (Note: Corresponds to the native `gmpDraggable`
				property).</td
			></tr
		>
		<tr
			><td><code>onClick</code></td><td><code>(e: MapMouseEvent) => void</code> (optional)</td><td
				>Callback for click events.</td
			></tr
		>
		<tr
			><td><code>onDrag</code></td><td><code>(e: MapMouseEvent) => void</code> (optional)</td><td
				>Callback during drag events. (Corresponds to `gmp-drag` native event).</td
			></tr
		>
		<tr
			><td><code>onDragStart</code></td><td><code>(e: MapMouseEvent) => void</code> (optional)</td
			><td>Callback when dragging starts. (Corresponds to `gmp-dragstart` native event).</td></tr
		>
		<tr
			><td><code>onDragEnd</code></td><td><code>(e: MapMouseEvent) => void</code> (optional)</td><td
				>Callback when dragging ends. (Corresponds to `gmp-dragend` native event).</td
			></tr
		>
		<tr
			><td><code>onLoad</code></td><td
				><code>(marker: AdvancedMarkerElement) => void</code> (optional)</td
			><td>Callback fired when the marker instance is created.</td></tr
		>
		<tr
			><td><code>onUnmount</code></td><td
				><code>(marker: AdvancedMarkerElement) => void</code> (optional)</td
			><td>Callback fired before the marker is removed.</td></tr
		>
	</tbody>
</table>

<h2>Slots</h2>

<ul>
	<li>
		<strong>Default Slot:</strong> HTML content to be rendered as the marker. Ignored if the
		<code>element</code> prop is provided. If empty, a default Google Maps pin is displayed.
	</li>
</ul>

<h2>Methods</h2>

<p>
	You can get the underlying <code>AdvancedMarkerElement</code> instance by using
	<code>bind:this</code>
	on the component and then calling the <code>getMarkerInstance()</code> method.
</p>

<pre><code class="language-svelte">
<!-- &lt;script lang="ts"&gt;
  let advMarkerComponent: AdvancedMarker;

  function getNativeInstance() {
    const instance = advMarkerComponent?.getMarkerInstance();
    console.log(instance);
  }
&lt;/script&gt;

&lt;AdvancedMarker bind:this={advMarkerComponent} position={...} /&gt;
&lt;button on:click={getNativeInstance}&gt;Get Instance&lt;/button&gt; -->
</code></pre>

<h2>Example</h2>

<pre>
{@html `
&lt;GoogleMap {...mapOptions} mapId="YOUR_MAP_ID"&gt; // mapId recommended
  &lt;AdvancedMarker position={ { lat: 35.683, lng: 139.768 } } title="Custom Marker"&gt;
    &lt;div style="background: red; color: white; padding: 5px; border-radius: 50%; width: 20px; height: 20px; text-align: center; line-height: 20px;"&gt;
      P
    &lt;/div&gt;
  &lt;/AdvancedMarker&gt;
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
