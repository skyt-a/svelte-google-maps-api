<script lang="ts">
	import { base } from '$app/paths';
</script>

<h1>MapControl</h1>

<p>Allows adding custom HTML elements as controls to the map at specified positions.</p>

<h2>Props</h2>
<table>
	<thead><tr><th>Prop</th><th>Type</th><th>Description</th></tr></thead>
	<tbody>
		<tr
			><td><code>position</code></td><td><code>google.maps.ControlPosition</code></td><td
				>Required. The position on the map where the control should appear (e.g., <code
					>google.maps.ControlPosition.TOP_LEFT</code
				>). Use the numeric enum value directly (e.g., <code>1</code> for TOP_LEFT) if accessing the
				enum is inconvenient.</td
			></tr
		>
	</tbody>
</table>

<h2>Slots</h2>
<ul>
	<li>
		<strong>Default Slot:</strong> The HTML content (buttons, divs, etc.) to be displayed as the map
		control.
	</li>
</ul>

<h2>Example</h2>
<pre>
{@html `
&lt;GoogleMap {...mapOptions}&gt;
  {/* TOP_LEFT = 1, TOP_CENTER = 2, TOP_RIGHT = 3, etc. */}
  &lt;MapControl position={1}&gt;
    &lt;button style="margin: 10px; background: white; padding: 5px;"&gt;My Custom Control&lt;/button&gt;
  &lt;/MapControl&gt;

  &lt;MapControl position={7} /* BOTTOM_CENTER */&gt;
    &lt;div style="background: rgba(0,0,0,0.6); color: white; padding: 5px;"&gt;Custom Info&lt;/div&gt;
  &lt;/MapControl&gt;
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
