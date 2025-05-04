import{t as o,b as d}from"../chunks/Ymx3e2y9.js";import"../chunks/hJ702ir1.js";import{y as l,A as i,x as c,B as n,z as a}from"../chunks/CxVNXqCc.js";import{h as g}from"../chunks/CWMV1YJF.js";import"../chunks/CdVlPdQB.js";var p=o('<h1>DirectionsRenderer</h1> <p>Renders directions obtained from the Directions service. Corresponds to <a href="https://developers.google.com/maps/documentation/javascript/reference/directions#DirectionsRenderer" target="_blank" rel="noopener noreferrer"><code class="svelte-rgydg9">google.maps.DirectionsRenderer</code></a>.</p> <p><strong>Requires the <code class="svelte-rgydg9">routes</code> library to be loaded via `APIProvider`.</strong> You typically\n	use this component in conjunction with `google.maps.DirectionsService` to fetch the directions.</p> <h2>Props</h2> <table class="svelte-rgydg9"><thead><tr><th class="svelte-rgydg9">Prop</th><th class="svelte-rgydg9">Type</th><th class="svelte-rgydg9">Description</th></tr></thead><tbody><tr><td class="svelte-rgydg9"><code class="svelte-rgydg9">directions</code></td><td class="svelte-rgydg9"><code class="svelte-rgydg9">google.maps.DirectionsResult</code> (optional)</td><td class="svelte-rgydg9">The DirectionsResult obtained from the DirectionsService to display.</td></tr><tr><td class="svelte-rgydg9"><code class="svelte-rgydg9">options</code></td><td class="svelte-rgydg9"><code class="svelte-rgydg9">google.maps.DirectionsRendererOptions</code> (optional)</td><td class="svelte-rgydg9">Additional renderer options. See <a href="https://developers.google.com/maps/documentation/javascript/reference/directions#DirectionsRendererOptions" target="_blank" rel="noopener noreferrer">DirectionsRendererOptions docs</a>.</td></tr><tr><td class="svelte-rgydg9"><code class="svelte-rgydg9">routeIndex</code></td><td class="svelte-rgydg9"><code class="svelte-rgydg9">number</code> (optional)</td><td class="svelte-rgydg9">The index of the route to display if the DirectionsResult contains multiple routes.</td></tr><tr><td class="svelte-rgydg9"><code class="svelte-rgydg9">panel</code></td><td class="svelte-rgydg9"><code class="svelte-rgydg9">HTMLElement</code> (optional)</td><td class="svelte-rgydg9">The HTMLElement in which to display the textual directions.</td></tr><tr><td class="svelte-rgydg9"><i>Other Options</i></td><td class="svelte-rgydg9"><code class="svelte-rgydg9">boolean | MarkerOptions | PolylineOptions</code> (optional)</td><td class="svelte-rgydg9">Direct props like <code class="svelte-rgydg9">draggable</code>, <code class="svelte-rgydg9">hideRouteList</code>, <code class="svelte-rgydg9">preserveViewport</code>, <code class="svelte-rgydg9">suppressMarkers</code>, <code class="svelte-rgydg9">suppressInfoWindows</code>, <code class="svelte-rgydg9">suppressPolylines</code>, <code class="svelte-rgydg9">markerOptions</code>, <code class="svelte-rgydg9">polylineOptions</code>.</td></tr><tr><td class="svelte-rgydg9"><code class="svelte-rgydg9">onDirectionsChanged</code></td><td class="svelte-rgydg9"><code class="svelte-rgydg9">() => void</code> (optional)</td><td class="svelte-rgydg9">Event fired when the rendered directions change, usually as a result of user interaction\n				(e.g., dragging a waypoint).</td></tr><tr><td class="svelte-rgydg9"><code class="svelte-rgydg9">onLoad</code></td><td class="svelte-rgydg9"><code class="svelte-rgydg9">(renderer: DirectionsRenderer) => void</code> (optional)</td><td class="svelte-rgydg9">Callback fired when the renderer instance is created.</td></tr><tr><td class="svelte-rgydg9"><code class="svelte-rgydg9">onUnmount</code></td><td class="svelte-rgydg9"><code class="svelte-rgydg9">(renderer: DirectionsRenderer) => void</code> (optional)</td><td class="svelte-rgydg9">Callback fired before the renderer is removed.</td></tr></tbody></table> <h2>Example</h2> <pre class="svelte-rgydg9"><!>\n</pre>',1);function f(s){var e=p(),t=l(i(e),12),r=c(t);g(r,()=>`
&lt;script lang="ts"&gt;
  import { APIProvider, GoogleMap, DirectionsRenderer } from 'svelte-google-maps-api';

  let directionsResult: google.maps.DirectionsResult | undefined = undefined;
  let directionsService: google.maps.DirectionsService | null = null;
  let mapInstance: google.maps.Map | null = null;

  // Function to fetch directions (call this when needed, e.g., on button click)
  async function fetchDirections() {
    if (!google?.maps?.DirectionsService || !directionsService) return;

    const request = {
      origin: 'Tokyo Station, Japan',
      destination: 'Tokyo Tower, Japan',
      travelMode: google.maps.TravelMode.DRIVING
    };
    try {
      const result = await directionsService.route(request);
      directionsResult = result;
    } catch (error) {
      console.error("Error fetching directions:", error);
    }
  }

  function handleMapLoad(map: google.maps.Map) {
    mapInstance = map;
    // Initialize DirectionsService once map and API are ready
    if (google?.maps?.DirectionsService) {
      directionsService = new google.maps.DirectionsService();
      // fetchDirections(); // Optionally fetch directions on load
    }
  }

&lt;/script&gt;

&lt;div style="height: 400px; width: 100%;"&gt;
  &lt;APIProvider {apiKey} libraries={['routes']}&gt;
    &lt;GoogleMap {...mapOptions} onLoad={handleMapLoad}&gt;
      {#if directionsResult}
        &lt;DirectionsRenderer directions={directionsResult} /&gt;
      {/if}
    &lt;/GoogleMap&gt;
  &lt;/APIProvider&gt;
  &lt;button on:click={fetchDirections} disabled={!directionsService}&gt;Get Directions&lt;/button&gt;
&lt;/div&gt;
`),n(),a(t),d(s,e)}export{f as component};
