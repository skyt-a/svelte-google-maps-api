import{t as o,b as d}from"../chunks/Ymx3e2y9.js";import"../chunks/hJ702ir1.js";import{y as l,A as a,x as g,B as c,z as n}from"../chunks/CxVNXqCc.js";import{h as v}from"../chunks/CWMV1YJF.js";import"../chunks/CdVlPdQB.js";var y=o(`<h1>GroundOverlay</h1> <p>Displays an image overlay over a specified geographical boundary. Corresponds to <a href="https://developers.google.com/maps/documentation/javascript/reference/image-overlay#GroundOverlay" target="_blank" rel="noopener noreferrer"><code class="svelte-rgydg9">google.maps.GroundOverlay</code></a>.</p> <h2>Props</h2> <table class="svelte-rgydg9"><thead><tr><th class="svelte-rgydg9">Prop</th><th class="svelte-rgydg9">Type</th><th class="svelte-rgydg9">Description</th></tr></thead><tbody><tr><td class="svelte-rgydg9"><code class="svelte-rgydg9">url</code></td><td class="svelte-rgydg9"><code class="svelte-rgydg9">string</code></td><td class="svelte-rgydg9">Required. The URL of the image to overlay.</td></tr><tr><td class="svelte-rgydg9"><code class="svelte-rgydg9">bounds</code></td><td class="svelte-rgydg9"><code class="svelte-rgydg9">LatLngBounds | LatLngBoundsLiteral</code></td><td class="svelte-rgydg9">Required. The geographical bounds for the overlay.</td></tr><tr><td class="svelte-rgydg9"><code class="svelte-rgydg9">options</code></td><td class="svelte-rgydg9"><code class="svelte-rgydg9">google.maps.GroundOverlayOptions</code> (optional)</td><td class="svelte-rgydg9">Additional overlay options. See <a href="https://developers.google.com/maps/documentation/javascript/reference/image-overlay#GroundOverlayOptions" target="_blank" rel="noopener noreferrer">GroundOverlayOptions docs</a>. Note that <code class="svelte-rgydg9">clickable</code> and <code class="svelte-rgydg9">opacity</code> are also direct props.</td></tr><tr><td class="svelte-rgydg9"><code class="svelte-rgydg9">clickable</code></td><td class="svelte-rgydg9"><code class="svelte-rgydg9">boolean</code> (optional)</td><td class="svelte-rgydg9">If true, the ground overlay can receive mouse events.</td></tr><tr><td class="svelte-rgydg9"><code class="svelte-rgydg9">opacity</code></td><td class="svelte-rgydg9"><code class="svelte-rgydg9">number</code> (optional)</td><td class="svelte-rgydg9">The opacity of the overlay, between 0.0 (transparent) and 1.0 (opaque).</td></tr><tr><td class="svelte-rgydg9"><i>GroundOverlay Events</i></td><td class="svelte-rgydg9"><code class="svelte-rgydg9">(e: MapMouseEvent) => void</code> (optional)</td><td class="svelte-rgydg9">Standard <a href="https://developers.google.com/maps/documentation/javascript/reference/image-overlay#GroundOverlay-Events" target="_blank" rel="noopener noreferrer">google.maps.GroundOverlay events</a>: <code class="svelte-rgydg9">onClick</code>, <code class="svelte-rgydg9">onDblClick</code>.</td></tr><tr><td class="svelte-rgydg9"><code class="svelte-rgydg9">onLoad</code></td><td class="svelte-rgydg9"><code class="svelte-rgydg9">(overlay: GroundOverlay) => void</code> (optional)</td><td class="svelte-rgydg9">Callback fired when the overlay instance is created.</td></tr><tr><td class="svelte-rgydg9"><code class="svelte-rgydg9">onUnmount</code></td><td class="svelte-rgydg9"><code class="svelte-rgydg9">(overlay: GroundOverlay) => void</code> (optional)</td><td class="svelte-rgydg9">Callback fired before the overlay is removed.</td></tr></tbody></table> <h2>Example</h2> <pre class="svelte-rgydg9"><!>
</pre>`,1);function b(s){var e=y(),t=l(a(e),10),r=g(t);v(r,()=>`
&lt;script lang="ts"&gt;
  const imageUrl = 'https://www.example.com/overlay.png'; // Replace with your image URL
  const imageBounds = {
    north: 40.773941,
    south: 40.712216,
    east: -73.96740,
    west: -74.006615
  };
&lt;/script&gt;

&lt;GoogleMap {...mapOptions}&gt;
  &lt;GroundOverlay
    url={imageUrl}
    bounds={imageBounds}
    opacity={0.8}
    clickable={true}
    onClick={() => alert('Overlay Clicked!')}
  />
&lt;/GoogleMap&gt;
`),c(),n(t),d(s,e)}export{b as component};
