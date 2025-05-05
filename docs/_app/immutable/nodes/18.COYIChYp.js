import{t as s,b as r}from"../chunks/Ymx3e2y9.js";import"../chunks/hJ702ir1.js";import{y as l,A as d,x as n,B as i,z as g}from"../chunks/CxVNXqCc.js";import{h as c}from"../chunks/CWMV1YJF.js";import"../chunks/CdVlPdQB.js";var p=s(`<h1>OverlayView</h1> <p>A component for placing custom HTML content on the map at a specific geographical location or
	within bounds. It wraps <a href="https://developers.google.com/maps/documentation/javascript/reference/overlay-view#OverlayView" target="_blank" rel="noopener noreferrer"><code class="svelte-rgydg9">google.maps.OverlayView</code></a>.</p> <p>This provides more flexibility than \`InfoWindow\` but requires manual positioning and styling of
	the content within the slot.</p> <h2>Props</h2> <table class="svelte-rgydg9"><thead><tr><th class="svelte-rgydg9">Prop</th><th class="svelte-rgydg9">Type</th><th class="svelte-rgydg9">Description</th></tr></thead><tbody><tr><td class="svelte-rgydg9"><code class="svelte-rgydg9">position</code></td><td class="svelte-rgydg9"><code class="svelte-rgydg9">LatLng | LatLngLiteral</code> (optional)</td><td class="svelte-rgydg9">If provided, the overlay content will be positioned relative to this LatLng. The <code class="svelte-rgydg9">draw</code> logic inside the component attempts to position the top-left corner of the content at this
				point. Custom styling (e.g., \`transform: translate(-50%, -50%)\`) is often needed to center the
				content. Takes precedence over \`bounds\`.</td></tr><tr><td class="svelte-rgydg9"><code class="svelte-rgydg9">bounds</code></td><td class="svelte-rgydg9"><code class="svelte-rgydg9">LatLngBounds | LatLngBoundsLiteral</code> (optional)</td><td class="svelte-rgydg9">If provided (and <code class="svelte-rgydg9">position</code> is not), the overlay content div will be sized and positioned
				to match these geographical bounds.</td></tr><tr><td class="svelte-rgydg9"><code class="svelte-rgydg9">mapPaneName</code></td><td class="svelte-rgydg9"><code class="svelte-rgydg9">keyof google.maps.MapPanes</code> (default: <code class="svelte-rgydg9">'floatPane'</code>)</td><td class="svelte-rgydg9">The map pane on which to render the overlay (e.g., 'overlayLayer', 'markerLayer'). See <a href="https://developers.google.com/maps/documentation/javascript/reference/map#MapPanes" target="_blank" rel="noopener noreferrer">MapPanes docs</a>.</td></tr><tr><td class="svelte-rgydg9"><code class="svelte-rgydg9">onLoad</code></td><td class="svelte-rgydg9"><code class="svelte-rgydg9">(overlayView: OverlayView) => void</code> (optional)</td><td class="svelte-rgydg9">Callback fired when the OverlayView instance is created and added to the map.</td></tr><tr><td class="svelte-rgydg9"><code class="svelte-rgydg9">onUnmount</code></td><td class="svelte-rgydg9"><code class="svelte-rgydg9">(overlayView: OverlayView) => void</code> (optional)</td><td class="svelte-rgydg9">Callback fired before the OverlayView is removed from the map.</td></tr></tbody></table> <h2>Slots</h2> <ul><li><strong>Default Slot:</strong> The HTML content to be placed on the map. You are responsible for
		styling this content, including its position relative to the anchor point (if using \`position\`) and
		its appearance. Use CSS transforms (e.g., \`transform: translate(-50%, -100%)\`) to adjust the anchor
		point.</li></ul> <h2>Example</h2> <pre class="svelte-rgydg9"><!>
</pre>`,1);function u(a){var e=p(),t=l(d(e),16),o=n(t);c(o,()=>`
&lt;GoogleMap {...mapOptions}&gt;
  {/* Example centered above a point */}
  &lt;OverlayView position={ { lat: 35.675, lng: 139.770 } } mapPaneName="floatPane"&gt;
    &lt;div style="background: navy; color: white; padding: 10px; border-radius: 3px; transform: translate(-50%, calc(-100% - 10px)); white-space: nowrap;"&gt;
      Custom HTML Overlay
    &lt;/div&gt;
  &lt;/OverlayView&gt;

  {/* Example filling bounds (styling needed) */}
  &lt;OverlayView bounds={{
      north: 35.69,
      south: 35.685,
      east: 139.765,
      west: 139.76
    }} mapPaneName="overlayLayer"&gt;
    &lt;div style="background: rgba(0, 255, 0, 0.5); border: 1px solid green; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;"&gt;
      Bounds Overlay
    &lt;/div&gt;
  &lt;/OverlayView&gt;
&lt;/GoogleMap&gt;
`),i(),g(t),r(a,e)}export{u as component};
