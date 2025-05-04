import{t as o,b as l}from"../chunks/Ymx3e2y9.js";import"../chunks/hJ702ir1.js";import{y as d,A as c,x as n,B as v,z as p}from"../chunks/CxVNXqCc.js";import{h as r}from"../chunks/CWMV1YJF.js";import"../chunks/CdVlPdQB.js";var i=o('<h1>GoogleMap</h1> <p>The `GoogleMap` component renders the map container div and initializes the `google.maps.Map`\n	instance. It must be placed inside an `APIProvider`.</p> <h2>Props</h2> <table class="svelte-gkwbav"><thead><tr><th class="svelte-gkwbav">Prop</th><th class="svelte-gkwbav">Type</th><th class="svelte-gkwbav">Description</th></tr></thead><tbody><tr><td class="svelte-gkwbav"><code class="svelte-gkwbav">options</code></td><td class="svelte-gkwbav"><code class="svelte-gkwbav">google.maps.MapOptions</code></td><td class="svelte-gkwbav">Map configuration options (e.g., <code class="svelte-gkwbav">center</code>, <code class="svelte-gkwbav">zoom</code>, <code class="svelte-gkwbav">mapId</code>, control options like <code class="svelte-gkwbav">fullscreenControl: false</code>, <code class="svelte-gkwbav">zoomControlOptions</code>, etc.). See <a href="https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions" target="_blank" rel="noopener noreferrer">MapOptions documentation</a>.</td></tr><tr><td class="svelte-gkwbav"><code class="svelte-gkwbav">id</code></td><td class="svelte-gkwbav"><code class="svelte-gkwbav">string</code> (optional)</td><td class="svelte-gkwbav">Sets the ID attribute of the map container div.</td></tr><tr><td class="svelte-gkwbav"><code class="svelte-gkwbav">mapContainerStyle</code></td><td class="svelte-gkwbav"><code class="svelte-gkwbav">string</code> (optional)</td><td class="svelte-gkwbav">Inline styles for the map container div. Defaults to <code class="svelte-gkwbav">\'width:100%;height:100%\'</code>.\n				**Important:** Ensure the container has a defined height.</td></tr><tr><td class="svelte-gkwbav"><code class="svelte-gkwbav">mapContainerClassName</code></td><td class="svelte-gkwbav"><code class="svelte-gkwbav">string</code> (optional)</td><td class="svelte-gkwbav">CSS class name(s) for the map container div.</td></tr><tr><td class="svelte-gkwbav"><code class="svelte-gkwbav">onLoad</code></td><td class="svelte-gkwbav"><code class="svelte-gkwbav">((map: google.maps.Map) => void)</code> (optional)</td><td class="svelte-gkwbav">Callback fired when the map instance is initialized. Receives the map instance.</td></tr><tr><td class="svelte-gkwbav"><code class="svelte-gkwbav">onUnmount</code></td><td class="svelte-gkwbav"><code class="svelte-gkwbav">((map: google.maps.Map) => void)</code> (optional)</td><td class="svelte-gkwbav">Callback fired just before the map instance is destroyed.</td></tr><tr><td class="svelte-gkwbav"><i>Map Events</i></td><td class="svelte-gkwbav"><code class="svelte-gkwbav">(e: google.maps.MapMouseEvent | ...) => void</code> (optional)</td><td class="svelte-gkwbav">All standard <a href="https://developers.google.com/maps/documentation/javascript/reference/map#Map-Events" target="_blank" rel="noopener noreferrer">google.maps.Map events</a> are supported as props (e.g., <code class="svelte-gkwbav">onClick</code>, <code class="svelte-gkwbav">onBoundsChanged</code>, <code class="svelte-gkwbav">onZoomChanged</code>, <code class="svelte-gkwbav">onDragEnd</code>). The event names are camelCased (e.g.,\n				`bounds_changed` becomes `onBoundsChanged`).</td></tr></tbody></table> <h2>Context</h2> <p><code class="svelte-gkwbav">GoogleMap</code> provides a context named <code class="svelte-gkwbav">\'map\'</code> containing the initialized <code class="svelte-gkwbav">google.maps.Map</code> instance. Child components like `Marker`, `Polyline`, etc., use this context\n	automatically.</p> <h2>Example</h2> <pre class="svelte-gkwbav"><!>\n</pre>',1);function w(a){var e=i(),t=d(c(e),14),s=n(t);r(s,()=>`
&lt;script lang="ts"&gt;
  import { APIProvider, GoogleMap } from 'svelte-google-maps-api';

  const apiKey = 'YOUR_API_KEY';
  const mapOptions = {
    center: { lat: 40.7128, lng: -74.0060 }, // New York
    zoom: 12,
    mapTypeId: 'roadmap',
    disableDefaultUI: true,
    zoomControl: true
  };

  function handleMapLoad(map: google.maps.Map) {
    console.log('Map Loaded!', map);
  }

  function handleMapClick(event: google.maps.MapMouseEvent) {
    console.log('Map Clicked:', event.latLng?.toJSON());
  }
&lt;/script&gt;

&lt;div style="height: 400px; width: 100%;"&gt;
  &lt;APIProvider {apiKey}&gt;
    &lt;GoogleMap
      {...mapOptions}
      onLoad={handleMapLoad}
      onClick={handleMapClick}
      mapContainerClassName="my-custom-map-class"
    /&gt;
    {/* Add Markers, Polylines etc. here */}
  &lt;/APIProvider&gt;
&lt;/div&gt;
`),v(),p(t),l(a,e)}export{w as component};
