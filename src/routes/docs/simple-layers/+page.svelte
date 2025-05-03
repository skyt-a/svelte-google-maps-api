<script lang="ts">
	import { base } from '$app/paths';
</script>

<h1>Simple Layers</h1>

<p>These components toggle specific map layers on or off when they are mounted or unmounted.</p>

<h2>TrafficLayer</h2>
<p>
	Displays real-time traffic conditions. Corresponds to <a
		href="https://developers.google.com/maps/documentation/javascript/reference/map#TrafficLayer"
		target="_blank"
		rel="noopener noreferrer"><code>google.maps.TrafficLayer</code></a
	>.
</p>
<pre>{@html `{#if showTraffic} <TrafficLayer /> {/if}`}</pre>

<h2>TransitLayer</h2>
<p>
	Displays the public transit network. Corresponds to <a
		href="https://developers.google.com/maps/documentation/javascript/reference/map#TransitLayer"
		target="_blank"
		rel="noopener noreferrer"><code>google.maps.TransitLayer</code></a
	>.
</p>
<pre>{@html `{#if showTransit} <TransitLayer /> {/if}`}</pre>

<h2>BicyclingLayer</h2>
<p>
	Displays bicycle paths, suggested routes, and other overlays specific to bicycling. Corresponds to <a
		href="https://developers.google.com/maps/documentation/javascript/reference/map#BicyclingLayer"
		target="_blank"
		rel="noopener noreferrer"><code>google.maps.BicyclingLayer</code></a
	>.
</p>
<pre>{@html `{#if showBicycling} <BicyclingLayer /> {/if}`}</pre>

<h2>Props & Events (for all three)</h2>
<table>
	<thead><tr><th>Prop/Event</th><th>Type</th><th>Description</th></tr></thead>
	<tbody>
		<tr
			><td><code>onLoad</code></td><td><code>(layer: LayerInstance) => void</code> (optional)</td
			><td>Callback fired when the layer instance is created.</td></tr
		>
		<tr
			><td><code>onUnmount</code></td><td><code>(layer: LayerInstance) => void</code> (optional)</td
			><td>Callback fired before the layer is removed.</td></tr
		>
	</tbody>
</table>
<p>
	<em
		>Note: These layers currently do not accept additional options via props after initialization.</em
	>
</p>

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
