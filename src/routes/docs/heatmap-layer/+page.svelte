<script lang="ts">
  import { base } from '$app/paths';
</script>

<h1>HeatmapLayer</h1>

<p>Renders a heatmap, which visualizes intensity data at geographical points. Corresponds to <a href="https://developers.google.com/maps/documentation/javascript/reference/visualization#HeatmapLayer" target="_blank" rel="noopener noreferrer"><code>google.maps.visualization.HeatmapLayer</code></a>.</p>

<p><strong>Requires the <code>visualization</code> library to be loaded via `APIProvider`.</strong></p>

<h2>Props</h2>
<table>
  <thead><tr><th>Prop</th><th>Type</th><th>Description</th></tr></thead>
  <tbody>
    <tr><td><code>data</code></td><td><code>WeightedLocation[] | LatLng[] | MVCArray&lt;WeightedLocation | LatLng&gt;</code></td><td>Required. The data points to visualize. Can be an array of <code>google.maps.LatLng</code> objects or <code>google.maps.visualization.WeightedLocation</code> objects (<code>{location: LatLng, weight: number}</code>). Note: The component accepts <code>LatLngLiteral</code> but converts them internally.</td></tr>
    <tr><td><code>options</code></td><td><code>google.maps.visualization.HeatmapLayerOptions</code> (optional)</td><td>Additional heatmap options (e.g., <code>radius</code>, <code>opacity</code>, <code>gradient</code>). See <a href="https://developers.google.com/maps/documentation/javascript/reference/visualization#HeatmapLayerOptions" target="_blank" rel="noopener noreferrer">HeatmapLayerOptions docs</a>.</td></tr>
    <tr><td><i>Style Props</i></td><td><code>boolean | string[] | number</code> (optional)</td><td>Direct props like <code>dissipating</code>, <code>gradient</code>, <code>maxIntensity</code>, <code>opacity</code>, <code>radius</code>.</td></tr>
    <tr><td><code>onLoad</code></td><td><code>(layer: HeatmapLayer) => void</code> (optional)</td><td>Callback fired when the layer instance is created.</td></tr>
    <tr><td><code>onUnmount</code></td><td><code>(layer: HeatmapLayer) => void</code> (optional)</td><td>Callback fired before the layer is removed.</td></tr>
  </tbody>
</table>

<h2>Example</h2>
<pre>
{@html `
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
`}
</pre>

<style>
/* Basic table/code styling */
table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
th { background-color: #f2f2f2; }
code { background-color: #f4f4f4; padding: 2px 4px; border-radius: 3px; }
pre { background-color: #f4f4f4; padding: 15px; border-radius: 5px; overflow-x: auto; }
</style> 