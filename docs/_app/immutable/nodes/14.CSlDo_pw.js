import{t as p,b as h}from"../chunks/Ymx3e2y9.js";import"../chunks/hJ702ir1.js";import{y as e,A as y,x as n,B as a,z as r}from"../chunks/CxVNXqCc.js";import{h as f}from"../chunks/CWMV1YJF.js";import{s as l}from"../chunks/CptybQpF.js";import{b as c}from"../chunks/CdVlPdQB.js";var w=p(`<h1>InfoWindow</h1> <p>Displays content (usually text or HTML) in a popup window on the map, typically anchored to a <a><code class="svelte-rgydg9">Marker</code></a> or <a><code class="svelte-rgydg9">AdvancedMarker</code></a>.</p> <h2>Props</h2> <table class="svelte-rgydg9"><thead><tr><th class="svelte-rgydg9">Prop</th><th class="svelte-rgydg9">Type</th><th class="svelte-rgydg9">Description</th></tr></thead><tbody><tr><td class="svelte-rgydg9"><code class="svelte-rgydg9">anchor</code></td><td class="svelte-rgydg9"><code class="svelte-rgydg9">MVCObject | AdvancedMarkerElement | LatLng | LatLngLiteral</code> (optional)</td><td class="svelte-rgydg9">The anchor point for the InfoWindow. This is typically a <code class="svelte-rgydg9">Marker</code> or <code class="svelte-rgydg9">AdvancedMarkerElement</code> instance (obtained via <code class="svelte-rgydg9">bind:this</code> and potentially <code class="svelte-rgydg9">getMarkerInstance()</code>). If not set, <code class="svelte-rgydg9">position</code> must be provided.</td></tr><tr><td class="svelte-rgydg9"><code class="svelte-rgydg9">position</code></td><td class="svelte-rgydg9"><code class="svelte-rgydg9">LatLng | LatLngLiteral</code> (optional)</td><td class="svelte-rgydg9">The LatLng at which to display this InfoWindow. If the anchor is set, the InfoWindow's
				position is based on the anchor.</td></tr><tr><td class="svelte-rgydg9"><code class="svelte-rgydg9">options</code></td><td class="svelte-rgydg9"><code class="svelte-rgydg9">google.maps.InfoWindowOptions</code> (optional)</td><td class="svelte-rgydg9">Additional InfoWindow options. See <a href="https://developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindowOptions" target="_blank" rel="noopener noreferrer">InfoWindowOptions docs</a>. Note that <code class="svelte-rgydg9">content</code>, <code class="svelte-rgydg9">headerContent</code>, <code class="svelte-rgydg9">position</code>, and <code class="svelte-rgydg9">zIndex</code> are also available as direct props.</td></tr><tr><td class="svelte-rgydg9"><code class="svelte-rgydg9">headerContent</code></td><td class="svelte-rgydg9"><code class="svelte-rgydg9">Element | string</code> (optional)</td><td class="svelte-rgydg9">Content to display in the InfoWindow header. Can be an HTML Element or a string. Overrides <code class="svelte-rgydg9">options.headerContent</code>.</td></tr><tr><td class="svelte-rgydg9"><code class="svelte-rgydg9">zIndex</code></td><td class="svelte-rgydg9"><code class="svelte-rgydg9">number</code> (optional)</td><td class="svelte-rgydg9">The z-index relative to other InfoWindows. Overrides <code class="svelte-rgydg9">options.zIndex</code>.</td></tr><tr><td class="svelte-rgydg9"><code class="svelte-rgydg9">shouldFocus</code></td><td class="svelte-rgydg9"><code class="svelte-rgydg9">boolean</code> (default: <code class="svelte-rgydg9">true</code>)</td><td class="svelte-rgydg9">Whether the InfoWindow should receive focus when opened.</td></tr><tr><td class="svelte-rgydg9"><code class="svelte-rgydg9">isOpen</code></td><td class="svelte-rgydg9"><code class="svelte-rgydg9">boolean</code> (default: <code class="svelte-rgydg9">true</code>)</td><td class="svelte-rgydg9">Controls the open/closed state of the InfoWindow. Use <code class="svelte-rgydg9">bind:isOpen</code> for two-way binding.</td></tr><tr><td class="svelte-rgydg9"><i>InfoWindow Events</i></td><td class="svelte-rgydg9"><code class="svelte-rgydg9">() => void</code> (optional)</td><td class="svelte-rgydg9">Standard <a href="https://developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindow-Events" target="_blank" rel="noopener noreferrer">google.maps.InfoWindow events</a>: <code class="svelte-rgydg9">onCloseClick</code>, <code class="svelte-rgydg9">onDomReady</code>, <code class="svelte-rgydg9">onContentChanged</code>, <code class="svelte-rgydg9">onPositionChanged</code>, <code class="svelte-rgydg9">onZIndexChanged</code>.</td></tr><tr><td class="svelte-rgydg9"><code class="svelte-rgydg9">onLoad</code></td><td class="svelte-rgydg9"><code class="svelte-rgydg9">(infoWindow: InfoWindow) => void</code> (optional)</td><td class="svelte-rgydg9">Callback fired when the InfoWindow instance is created.</td></tr><tr><td class="svelte-rgydg9"><code class="svelte-rgydg9">onUnmount</code></td><td class="svelte-rgydg9"><code class="svelte-rgydg9">(infoWindow: InfoWindow) => void</code> (optional)</td><td class="svelte-rgydg9">Callback fired before the InfoWindow is destroyed.</td></tr></tbody></table> <h2>Slots</h2> <ul><li><strong>Default Slot:</strong> HTML content to be displayed inside the main body of the
		InfoWindow. Overrides the <code class="svelte-rgydg9">options.content</code> prop.</li> <li><strong><code class="svelte-rgydg9">header</code> Slot:</strong> HTML content to be displayed inside the header of the
		InfoWindow. Overrides the <code class="svelte-rgydg9">headerContent</code> and <code class="svelte-rgydg9">options.headerContent</code> props.</li></ul> <h2>Example: Open on Marker Click</h2> <pre class="svelte-rgydg9"><!>
</pre>`,1);function M(g){var o=w(),t=e(y(o),2),d=e(n(t));l(d,"href",`${c??""}/docs/marker`);var i=e(d,2);l(i,"href",`${c??""}/docs/advanced-marker`),a(),r(t);var s=e(t,12),v=n(s);f(v,()=>`
&lt;script lang="ts"&gt;
  import { Marker, InfoWindow } from 'svelte-google-maps-api';
  import AdvancedMarker from './AdvancedMarker.svelte'; // Assuming local path if used

  let showInfoWindow = false;
  let markerComponent: Marker;
  let advMarkerComponent: AdvancedMarker;

  function handleMarkerClick() {
    showInfoWindow = !showInfoWindow;
  }

  function handleClose() {
    showInfoWindow = false;
  }
&lt;/script&gt;

&lt;GoogleMap {...mapOptions}&gt;
  &lt;Marker
    bind:this={markerComponent}
    position={ { lat: 35.681, lng: 139.767 } }
    onClick={handleMarkerClick}
  /&gt;

  {#if showInfoWindow && markerComponent}
    &lt;InfoWindow
      anchor={markerComponent.getMarkerInstance()}
      onCloseClick={handleClose}
      bind:isOpen={showInfoWindow}
    &gt;
      &lt;h3&gt;Standard Marker Info&lt;/h3&gt;
      &lt;p&gt;This info window is anchored to the marker.&lt;/p&gt;
    &lt;/InfoWindow&gt;
  {/if}

  {/* Example with AdvancedMarker */}
  &lt;AdvancedMarker
    bind:this={advMarkerComponent}
    position={ { lat: 35.683, lng: 139.768 } }
    onClick={handleMarkerClick}
  /&gt;

  {#if showInfoWindow && advMarkerComponent}
    {@const instance = advMarkerComponent.getMarkerInstance()}
    {#if instance}
      &lt;InfoWindow
        anchor={instance}
        onCloseClick={handleClose}
        bind:isOpen={showInfoWindow}
      &gt;
        &lt;strong&gt;Advanced Marker Info&lt;/strong&gt;
      &lt;/InfoWindow&gt;
    {/if}
  {/if}
&lt;/GoogleMap&gt;
`),a(),r(s),h(g,o)}export{M as component};
