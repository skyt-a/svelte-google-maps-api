<script lang="ts">
	import { base } from '$app/paths';
</script>

<h1>APIProvider</h1>

<p>
	The `APIProvider` component is responsible for loading the Google Maps JavaScript API script and
	providing the necessary context (including the `google.maps` object) to its descendant components.
</p>

<p>It should wrap all other `svelte-google-maps-api` components.</p>

<h2>Props</h2>

<table>
	<thead>
		<tr>
			<th>Prop</th>
			<th>Type</th>
			<th>Required</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>apiKey</code></td>
			<td><code>string</code></td>
			<td>Yes</td>
			<td>Your Google Maps API Key.</td>
		</tr>
		<tr>
			<td><code>libraries</code></td>
			<td><code>Library[]</code></td>
			<td>No</td>
			<td
				>An array of additional Google Maps libraries to load (e.g., <code
					>['marker', 'places', 'visualization']</code
				>). See
				<a
					href="https://developers.google.com/maps/documentation/javascript/libraries"
					target="_blank"
					rel="noopener noreferrer">official documentation</a
				>
				for available libraries. The <code>Library</code> type is exported from the package.</td
			>
		</tr>
		<tr>
			<td><code>language</code></td>
			<td><code>string</code></td>
			<td>No</td>
			<td>The language to use for map controls and labels (e.g., 'en', 'ja').</td>
		</tr>
		<tr>
			<td><code>region</code></td>
			<td><code>string</code></td>
			<td>No</td>
			<td>The region code biases the API results (e.g., 'US', 'JP').</td>
		</tr>
		<tr>
			<td><code>version</code></td>
			<td><code>string</code></td>
			<td>No</td>
			<td
				>The specific version of the Maps JavaScript API to use (e.g., 'weekly', 'quarterly',
				'3.56'). Defaults to the 'release' version.</td
			>
		</tr>
		<tr>
			<td><code>solutionChannel</code></td>
			<td><code>string</code></td>
			<td>No</td>
			<td>For Google Maps Platform usage reporting.</td>
		</tr>
	</tbody>
</table>

<h2>Slots</h2>

<ul>
	<li>
		<strong>Default Slot:</strong> Content placed here will be rendered once the API has successfully
		loaded. This is where you should place your `GoogleMap` and other map components.
	</li>
	<li>
		<strong><code>loading</code> Slot:</strong> Content placed here will be displayed while the API script
		is loading. You can provide a custom loading indicator.
	</li>
	<li>
		<strong><code>error</code> Slot:</strong> Content placed here will be displayed if the API script
		fails to load. It receives an `error` prop containing the Error object.
	</li>
</ul>

<h2>Context</h2>

<p>
	<code>APIProvider</code> provides a context named <code>'svelte-google-maps-api'</code> with the following
	properties:
</p>

<ul>
	<li>
		<code>status</code>: A Svelte readable store (<code
			>Readable&lt;'loading' | 'loaded' | 'error'&gt;</code
		>) indicating the API loading status.
	</li>
	<li>
		<code>googleMapsApi</code>: The loaded <code>google.maps</code> object (<code
			>typeof google.maps | null</code
		>). Available only when status is 'loaded'.
	</li>
	<li>
		<code>error</code>: An <code>Error</code> object if loading failed (<code>Error | null</code>).
	</li>
</ul>

<p>See the <a href="{base}/docs/hooks-context">Hooks / Context</a> page for usage examples.</p>

<style>
	/* Basic table styling */
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
</style>
