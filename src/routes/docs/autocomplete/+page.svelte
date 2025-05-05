<script lang="ts">
	import { base } from '$app/paths';
</script>

<h1>Autocomplete</h1>

<p>
	Provides a text input field that shows place predictions based on user input, using <a
		href="https://developers.google.com/maps/documentation/javascript/reference/places-widget#Autocomplete"
		target="_blank"
		rel="noopener noreferrer"><code>google.maps.places.Autocomplete</code></a
	>.
</p>

<p><strong>Requires the <code>places</code> library to be loaded via `APIProvider`.</strong></p>

<h2>Props</h2>
<table>
	<thead><tr><th>Prop</th><th>Type</th><th>Description</th></tr></thead>
	<tbody>
		<tr
			><td><code>value</code></td><td><code>string</code></td><td
				>Bindable prop representing the current value of the input field.</td
			></tr
		>
		<tr
			><td><code>options</code></td><td
				><code>google.maps.places.AutocompleteOptions</code> (optional)</td
			><td
				>Options for the Autocomplete instance (e.g., <code>bounds</code>, <code>fields</code>,
				<code>types</code>). See
				<a
					href="https://developers.google.com/maps/documentation/javascript/reference/places-widget#AutocompleteOptions"
					target="_blank"
					rel="noopener noreferrer">AutocompleteOptions docs</a
				>.
				<strong>Specifying <code>fields</code> is highly recommended to control costs.</strong></td
			></tr
		>
		<tr
			><td><i>Input Attributes</i></td><td><code>string | boolean</code> (optional)</td><td
				>Standard HTML input attributes like <code>placeholder</code>, <code>inputId</code> (for
				<code>id</code>), <code>inputClass</code> (for <code>class</code>), <code>inputStyle</code>
				(for <code>style</code>), <code>disabled</code>.</td
			></tr
		>
		<tr
			><td><i>Autocomplete Options</i></td><td
				><code>LatLngBounds | LatLngBoundsLiteral | ComponentRestrictions | string[]</code> (optional)</td
			><td
				>Direct props for common Autocomplete options: <code>bounds</code>,
				<code>componentRestrictions</code>, <code>fields</code>, <code>strictBounds</code>,
				<code>types</code>. These override values in the main <code>options</code> object if provided.</td
			></tr
		>
		<tr
			><td><code>onLoad</code></td><td
				><code>(autocomplete: Autocomplete) => void</code> (optional)</td
			><td>Callback fired when the Autocomplete instance is initialized.</td></tr
		>
		<tr
			><td><code>onUnmount</code></td><td
				><code>(autocomplete: Autocomplete) => void</code> (optional)</td
			><td>Callback fired before the instance is destroyed.</td></tr
		>
	</tbody>
</table>

<h2>Events</h2>
<ul>
	<li>
		<strong><code>on:place_changed</code></strong>: Fired when a place is selected from the
		predictions. The event detail (<code>event.detail</code>) contains the
		<a
			href="https://developers.google.com/maps/documentation/javascript/reference/places-service#PlaceResult"
			target="_blank"
			rel="noopener noreferrer"><code>google.maps.places.PlaceResult</code></a
		> object for the selected place.
	</li>
</ul>

<h2>Example</h2>
<pre>
{@html `
&lt;script lang="ts"&gt;
  import { Autocomplete } from 'svelte-google-maps-api';
  let selectedPlace: google.maps.places.PlaceResult | null = null;
  let inputValue = '';
&lt;/script&gt;

&lt;APIProvider {apiKey} libraries={['places']}&gt;
  &lt;Autocomplete
    bind:value={inputValue}
    placeholder="Search for places..."
    options={{ fields: ['name', 'geometry', 'formatted_address'], types: ['geocode'] }}
    on:place_changed={(e) => {
      selectedPlace = e.detail;
      console.log('Selected:', selectedPlace);
      // Optionally move map, display info, etc.
    }}
  /&gt;
&lt;/APIProvider&gt;

{#if selectedPlace}
  &lt;p&gt;Selected: {selectedPlace.name} ({selectedPlace.formatted_address})&lt;/p&gt;
{/if}
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
