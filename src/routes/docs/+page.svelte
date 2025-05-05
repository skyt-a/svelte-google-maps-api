<h1>Getting Started</h1>

<p>Welcome to the documentation for `svelte-google-maps-api`!</p>

<h2>Installation</h2>

<p>Install the library using your preferred package manager:</p>

<pre><code class="language-bash">
  pnpm install svelte-google-maps-api
  # or
  npm install svelte-google-maps-api
  # or
  yarn add svelte-google-maps-api
</code></pre>

<h2>API Key Setup</h2>

<p>You need a Google Maps API Key. Follow these steps:</p>

<ol>
	<li>
		Go to the <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer"
			>Google Cloud Console</a
		>.
	</li>
	<li>Create a new project or select an existing one.</li>
	<li>Enable the "Maps JavaScript API".</li>
	<li>
		Enable any additional libraries needed by the components you plan to use (e.g., `marker`,
		`places`, `visualization`, `routes`). You can find the required libraries in the component
		documentation.
	</li>
	<li>Create an API Key under "Credentials".</li>
	<li>
		**Important:** Secure your API Key! Restrict it to your specific domains (for production) or IP
		addresses (for development) to prevent unauthorized use.
	</li>
</ol>

<h2>Basic Usage</h2>

<p>Wrap your map components with the `APIProvider` and provide your API key.</p>

<pre>
{@html `
&lt;script lang="ts"&gt;
  import {
    APIProvider,
    GoogleMap,
    Marker
  } from 'svelte-google-maps-api';

  const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace!

  const mapOptions = {
    center: { lat: 35.681, lng: 139.767 },
    zoom: 14
  };
&lt;/script&gt;

&lt;div style="height: 400px; width: 100%;"&gt;
  &lt;APIProvider {apiKey} libraries={['marker']}&gt;
    &lt;GoogleMap {...mapOptions} mapContainerStyle="width:100%; height:100%;"&gt;
      &lt;Marker position={mapOptions.center} /&gt;
    &lt;/GoogleMap&gt;
  &lt;/APIProvider&gt;
&lt;/div&gt;
`}
</pre>

<p>Now you can explore the documentation for specific components using the sidebar navigation.</p>

<style>
	pre {
		background-color: #f4f4f4;
		padding: 15px;
		border-radius: 5px;
		overflow-x: auto;
	}
	code {
		font-family: monospace;
	}
</style>
