import{t as i,b as l}from"../chunks/Ymx3e2y9.js";import"../chunks/hJ702ir1.js";import{y as p,A as s,x as n,B as o,z as g}from"../chunks/CxVNXqCc.js";import{h as d}from"../chunks/CWMV1YJF.js";var c=i('<h1>Getting Started</h1> <p>Welcome to the documentation for `svelte-google-maps-api`!</p> <h2>Installation</h2> <p>Install the library using your preferred package manager:</p> <pre class="svelte-1ad9sgp"><code class="language-bash svelte-1ad9sgp">\n  pnpm install svelte-google-maps-api\n  # or\n  npm install svelte-google-maps-api\n  # or\n  yarn add svelte-google-maps-api\n</code></pre> <h2>API Key Setup</h2> <p>You need a Google Maps API Key. Follow these steps:</p> <ol><li>Go to the <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer">Google Cloud Console</a>.</li> <li>Create a new project or select an existing one.</li> <li>Enable the "Maps JavaScript API".</li> <li>Enable any additional libraries needed by the components you plan to use (e.g., `marker`,\n		`places`, `visualization`, `routes`). You can find the required libraries in the component\n		documentation.</li> <li>Create an API Key under "Credentials".</li> <li>**Important:** Secure your API Key! Restrict it to your specific domains (for production) or IP\n		addresses (for development) to prevent unauthorized use.</li></ol> <h2>Basic Usage</h2> <p>Wrap your map components with the `APIProvider` and provide your API key.</p> <pre class="svelte-1ad9sgp"><!>\n</pre> <p>Now you can explore the documentation for specific components using the sidebar navigation.</p>',1);function y(a){var e=c(),t=p(s(e),20),r=n(t);d(r,()=>`
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
`),o(),g(t),o(2),l(a,e)}export{y as component};
