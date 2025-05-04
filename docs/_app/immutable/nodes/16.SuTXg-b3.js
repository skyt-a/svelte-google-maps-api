import{t as l,b as a}from"../chunks/Ymx3e2y9.js";import"../chunks/hJ702ir1.js";import{y as r,A as g,x as n,B as d,z as i}from"../chunks/CxVNXqCc.js";import{h as p}from"../chunks/CWMV1YJF.js";import"../chunks/CdVlPdQB.js";var c=l(`<h1>MapControl</h1> <p>Allows adding custom HTML elements as controls to the map at specified positions.</p> <h2>Props</h2> <table class="svelte-rgydg9"><thead><tr><th class="svelte-rgydg9">Prop</th><th class="svelte-rgydg9">Type</th><th class="svelte-rgydg9">Description</th></tr></thead><tbody><tr><td class="svelte-rgydg9"><code class="svelte-rgydg9">position</code></td><td class="svelte-rgydg9"><code class="svelte-rgydg9">google.maps.ControlPosition</code></td><td class="svelte-rgydg9">Required. The position on the map where the control should appear (e.g., <code class="svelte-rgydg9">google.maps.ControlPosition.TOP_LEFT</code>). Use the numeric enum value directly (e.g., <code class="svelte-rgydg9">1</code> for TOP_LEFT) if accessing the
				enum is inconvenient.</td></tr></tbody></table> <h2>Slots</h2> <ul><li><strong>Default Slot:</strong> The HTML content (buttons, divs, etc.) to be displayed as the map
		control.</li></ul> <h2>Example</h2> <pre class="svelte-rgydg9"><!>
</pre>`,1);function T(o){var t=c(),e=r(g(t),14),s=n(e);p(s,()=>`
&lt;GoogleMap {...mapOptions}&gt;
  {/* TOP_LEFT = 1, TOP_CENTER = 2, TOP_RIGHT = 3, etc. */}
  &lt;MapControl position={1}&gt;
    &lt;button style="margin: 10px; background: white; padding: 5px;"&gt;My Custom Control&lt;/button&gt;
  &lt;/MapControl&gt;

  &lt;MapControl position={7} /* BOTTOM_CENTER */&gt;
    &lt;div style="background: rgba(0,0,0,0.6); color: white; padding: 5px;"&gt;Custom Info&lt;/div&gt;
  &lt;/MapControl&gt;
&lt;/GoogleMap&gt;
`),d(),i(e),a(o,t)}export{T as component};
