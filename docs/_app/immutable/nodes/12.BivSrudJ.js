import{t as o,b as d}from"../chunks/Ymx3e2y9.js";import"../chunks/hJ702ir1.js";import{y as l,A as r,x as g,B as c,z as i}from"../chunks/CxVNXqCc.js";import{h as n}from"../chunks/CWMV1YJF.js";import"../chunks/CdVlPdQB.js";var p=o('<h1>HeatmapLayer</h1> <p>Renders a heatmap, which visualizes intensity data at geographical points. Corresponds to <a href="https://developers.google.com/maps/documentation/javascript/reference/visualization#HeatmapLayer" target="_blank" rel="noopener noreferrer"><code class="svelte-rgydg9">google.maps.visualization.HeatmapLayer</code></a>.</p> <p><strong>Requires the <code class="svelte-rgydg9">visualization</code> library to be loaded via `APIProvider`.</strong></p> <h2>Props</h2> <table class="svelte-rgydg9"><thead><tr><th class="svelte-rgydg9">Prop</th><th class="svelte-rgydg9">Type</th><th class="svelte-rgydg9">Description</th></tr></thead><tbody><tr><td class="svelte-rgydg9"><code class="svelte-rgydg9">data</code></td><td class="svelte-rgydg9"><code class="svelte-rgydg9">WeightedLocation[] | LatLng[] | MVCArray&lt;WeightedLocation | LatLng&gt;</code></td><td class="svelte-rgydg9">Required. The data points to visualize. Can be an array of <code class="svelte-rgydg9">google.maps.LatLng</code> objects or <code class="svelte-rgydg9">google.maps.visualization.WeightedLocation</code> objects (<code class="svelte-rgydg9">&lbrace;&#108;&#111;&#99;&#97;&#116;&#105;&#111;&#110;&colon;&#32;&#76;&#97;&#116;&#76;&#110;&#103;&comma;&#32;&#119;&#101;&#105;&#103;&#104;&#116;&colon;&#32;&#110;&#117;&#109;&#98;&#101;&#114;&rbrace;</code>). Note: The component accepts <code class="svelte-rgydg9">LatLngLiteral</code> but converts them internally.</td></tr><tr><td class="svelte-rgydg9"><code class="svelte-rgydg9">options</code></td><td class="svelte-rgydg9"><code class="svelte-rgydg9">google.maps.visualization.HeatmapLayerOptions</code> (optional)</td><td class="svelte-rgydg9">Additional heatmap options (e.g., <code class="svelte-rgydg9">radius</code>, <code class="svelte-rgydg9">opacity</code>, <code class="svelte-rgydg9">gradient</code>). See <a href="https://developers.google.com/maps/documentation/javascript/reference/visualization#HeatmapLayerOptions" target="_blank" rel="noopener noreferrer">HeatmapLayerOptions docs</a>.</td></tr><tr><td class="svelte-rgydg9"><i>Style Props</i></td><td class="svelte-rgydg9"><code class="svelte-rgydg9">boolean | string[] | number</code> (optional)</td><td class="svelte-rgydg9">Direct props like <code class="svelte-rgydg9">dissipating</code>, <code class="svelte-rgydg9">gradient</code>, <code class="svelte-rgydg9">maxIntensity</code>, <code class="svelte-rgydg9">opacity</code>, <code class="svelte-rgydg9">radius</code>.</td></tr><tr><td class="svelte-rgydg9"><code class="svelte-rgydg9">onLoad</code></td><td class="svelte-rgydg9"><code class="svelte-rgydg9">(layer: HeatmapLayer) => void</code> (optional)</td><td class="svelte-rgydg9">Callback fired when the layer instance is created.</td></tr><tr><td class="svelte-rgydg9"><code class="svelte-rgydg9">onUnmount</code></td><td class="svelte-rgydg9"><code class="svelte-rgydg9">(layer: HeatmapLayer) => void</code> (optional)</td><td class="svelte-rgydg9">Callback fired before the layer is removed.</td></tr></tbody></table> <h2>Example</h2> <pre class="svelte-rgydg9"><!>\n</pre>',1);function b(a){var e=p(),t=l(r(e),12),s=g(t);n(s,()=>`
&lt;script lang="ts"&gt;
  // Data can be LatLngLiterals (will be converted)
  const heatmapData = [
    { location: { lat: 35.685, lng: 139.76 }, weight: 3 },
    { location: { lat: 35.686, lng: 139.765 }, weight: 2 },
    { location: { lat: 35.687, lng: 139.77 }, weight: 5 },
    // ... more data
  ];
&lt;/script&gt;

&lt;APIProvider {apiKey} libraries={['visualization']}&gt;
  &lt;GoogleMap {...mapOptions}&gt;
    &lt;HeatmapLayer
      data={heatmapData}
      options={{ radius: 25, opacity: 0.7 }}
    />
  &lt;/GoogleMap&gt;
&lt;/APIProvider&gt;
`),c(),i(t),d(a,e)}export{b as component};
