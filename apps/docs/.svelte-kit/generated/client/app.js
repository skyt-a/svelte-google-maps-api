export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20'),
	() => import('./nodes/21'),
	() => import('./nodes/22'),
	() => import('./nodes/23')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/components/advanced-marker": [3],
		"/components/api-provider": [4],
		"/components/autocomplete": [5],
		"/components/bicycling-layer": [6],
		"/components/circle": [7],
		"/components/google-map": [8],
		"/components/ground-overlay": [9],
		"/components/heatmap-layer": [10],
		"/components/info-window": [11],
		"/components/kml-layer": [12],
		"/components/map-control": [13],
		"/components/marker": [14],
		"/components/overlay-view": [15],
		"/components/polygon": [16],
		"/components/polyline": [17],
		"/components/rectangle": [18],
		"/components/street-view-panorama": [19],
		"/components/traffic-layer": [20],
		"/components/transit-layer": [21],
		"/examples": [22],
		"/guide/getting-started": [23]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.js';