export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["images/svelte-google-maps-logo.png","images/svelte-google-maps-logo.svg","sveltepress.svg","sveltepress@3x.png"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml"},
	_: {
		client: {start:"_app/immutable/entry/start.K3E4nXc7.js",app:"_app/immutable/entry/app.D32XhR9c.js",imports:["_app/immutable/entry/start.K3E4nXc7.js","_app/immutable/chunks/Camscgxd.js","_app/immutable/chunks/D0_yjw2a.js","_app/immutable/entry/app.D32XhR9c.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/D0_yjw2a.js","_app/immutable/chunks/Jo_nZczK.js","_app/immutable/chunks/CmgaCqrq.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		prerendered_routes: new Set(["/","/components/api-provider/","/components/google-map/","/components/marker/","/components/advanced-marker/","/components/info-window/","/components/polyline/","/components/polygon/","/components/circle/","/components/rectangle/","/components/heatmap-layer/","/components/kml-layer/","/components/traffic-layer/","/components/transit-layer/","/components/bicycling-layer/","/components/ground-overlay/","/components/map-control/","/components/autocomplete/","/components/overlay-view/","/components/street-view-panorama/","/examples/","/guide/getting-started/"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
