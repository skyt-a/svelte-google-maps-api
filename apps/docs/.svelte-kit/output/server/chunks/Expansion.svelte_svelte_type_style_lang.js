import { T as getContext, M as spread_attributes } from "./index.js";
import "./client.js";
import { b as base } from "./paths.js";
import { w as writable, i as get } from "./exports.js";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
const getStores = () => {
  const stores$1 = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores$1.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores$1.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores$1.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
const themeOptions = { "navbar": [{ "title": "Guide", "to": "/guide/getting-started" }, { "title": "Components", "items": [{ "title": "APIProvider", "to": "/components/api-provider/" }, { "title": "GoogleMap", "to": "/components/google-map/" }, { "title": "Marker", "to": "/components/marker/" }, { "title": "AdvancedMarker", "to": "/components/advanced-marker/" }, { "title": "InfoWindow", "to": "/components/info-window/" }, { "title": "Polyline", "to": "/components/polyline/" }, { "title": "Polygon", "to": "/components/polygon/" }, { "title": "Circle", "to": "/components/circle/" }, { "title": "Rectangle", "to": "/components/rectangle/" }, { "title": "HeatmapLayer", "to": "/components/heatmap-layer/" }, { "title": "KmlLayer", "to": "/components/kml-layer/" }, { "title": "TrafficLayer", "to": "/components/traffic-layer/" }, { "title": "TransitLayer", "to": "/components/transit-layer/" }, { "title": "BicyclingLayer", "to": "/components/bicycling-layer/" }, { "title": "GroundOverlay", "to": "/components/ground-overlay/" }, { "title": "MapControl", "to": "/components/map-control/" }, { "title": "Autocomplete", "to": "/components/autocomplete/" }, { "title": "OverlayView", "to": "/components/overlay-view/" }, { "title": "StreetViewPanorama", "to": "/components/street-view-panorama/" }] }, { "title": "Examples", "to": "/examples" }, { "title": "GitHub", "to": "https://github.com/skyt-a/svelte-google-maps-api", "external": true }], "sidebar": { "/guide/": [{ "title": "Guide", "items": [{ "title": "Getting Started", "to": "/guide/getting-started" }] }], "/components/": [{ "title": "Components", "items": [{ "title": "APIProvider", "to": "/components/api-provider/" }, { "title": "GoogleMap", "to": "/components/google-map/" }, { "title": "Marker", "to": "/components/marker/" }, { "title": "AdvancedMarker", "to": "/components/advanced-marker/" }, { "title": "InfoWindow", "to": "/components/info-window/" }, { "title": "Polyline", "to": "/components/polyline/" }, { "title": "Polygon", "to": "/components/polygon/" }, { "title": "Circle", "to": "/components/circle/" }, { "title": "Rectangle", "to": "/components/rectangle/" }, { "title": "HeatmapLayer", "to": "/components/heatmap-layer/" }, { "title": "KmlLayer", "to": "/components/kml-layer/" }, { "title": "TrafficLayer", "to": "/components/traffic-layer/" }, { "title": "TransitLayer", "to": "/components/transit-layer/" }, { "title": "BicyclingLayer", "to": "/components/bicycling-layer/" }, { "title": "GroundOverlay", "to": "/components/ground-overlay/" }, { "title": "MapControl", "to": "/components/map-control/" }, { "title": "Autocomplete", "to": "/components/autocomplete/" }, { "title": "OverlayView", "to": "/components/overlay-view/" }, { "title": "StreetViewPanorama", "to": "/components/street-view-panorama/" }] }] }, "github": "https://github.com/skyt-a/svelte-google-maps-api", "logo": "/images/svelte-google-maps-logo.png" };
function External($$payload, $$props) {
  const { $$slots, $$events, ...rest } = $$props;
  $$payload.out += `<svg${spread_attributes(
    {
      ...rest,
      width: "1em",
      height: "1em",
      viewBox: "0 0 24 24"
    },
    null,
    void 0,
    void 0,
    3
  )}><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path strokeDasharray="36" strokeDashoffset="36" d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="36;0"></animate></path><path strokeDasharray="12" strokeDashoffset="12" d="M13 11L20 4"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.3s" values="12;0"></animate></path><path strokeDasharray="8" strokeDashoffset="8" d="M21 3H15M21 3V9"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.9s" dur="0.2s" values="8;0"></animate></path></g></svg>`;
}
function getPathFromBase(path) {
  if (path === "/")
    return base || "/";
  if (!base || !path.startsWith("/") || (path === base || path.startsWith("".concat(base, "/"))))
    return path;
  return "".concat(base).concat(path);
}
function parseImageSrc(src) {
  if (src.startsWith("//"))
    return src;
  return getPathFromBase(src);
}
var __spreadArray = function(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var sidebarCollapsed = writable(true);
var tocCollapsed = writable(true);
var navCollapsed = writable(true);
var anchors = writable([]);
var pages = writable([]);
var scrollY = writable(0);
var oldScrollY = writable(0);
var scrollDirection = writable("up");
var isDark = writable(false);
var sidebar = writable(true);
var showHeader = writable(true);
var resolvedSidebar = writable(Object.entries(themeOptions.sidebar || {}).reduce(function(all, _a) {
  var item = _a[1];
  return __spreadArray(__spreadArray([], all, true), item, true);
}, []));
scrollY.subscribe(function(sy) {
  var nextDirection = sy - get(oldScrollY) > 0 ? "down" : "up";
  if (nextDirection !== get(scrollDirection))
    scrollDirection.set(nextDirection);
});
resolvedSidebar.subscribe(function(sidebar2) {
  pages.set(sidebar2.reduce(function(allPages, item) {
    return Array.isArray(item.items) ? __spreadArray(__spreadArray([], allPages, true), item.items, true) : __spreadArray(__spreadArray([], allPages, true), [item], false);
  }, []));
});
sidebarCollapsed.subscribe(function(v) {
  if (!v)
    tocCollapsed.set(true);
});
tocCollapsed.subscribe(function(v) {
  if (!v)
    sidebarCollapsed.set(true);
});
function resolveSidebar(routeId) {
  var _a;
  if (!routeId)
    return;
  var key = Object.keys(themeOptions.sidebar || {}).find(function(key2) {
    return routeId.startsWith(key2);
  });
  if (key)
    resolvedSidebar.set(((_a = themeOptions.sidebar) === null || _a === void 0 ? void 0 : _a[key]) || []);
}
const siteConfig = { "title": "Svelte Google Maps API", "description": "A Svelte component library for integrating Google Maps JavaScript API into Svelte applications" };
export {
  External as E,
  tocCollapsed as a,
  page as b,
  scrollDirection as c,
  sidebarCollapsed as d,
  resolveSidebar as e,
  showHeader as f,
  getPathFromBase as g,
  html as h,
  isDark as i,
  sidebar as j,
  anchors as k,
  navCollapsed as n,
  parseImageSrc as p,
  resolvedSidebar as r,
  siteConfig as s,
  themeOptions as t
};
