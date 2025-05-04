<script lang="ts">
	import { base } from '$app/paths';
</script>

<div class="docs-layout">
	<nav class="sidebar">
		<h2>Svelte Google Maps API</h2>
		<ul>
			<li><a href="{base}/docs">Getting Started</a></li>
			<li><a href="{base}/docs/api-provider">APIProvider</a></li>
			<li><a href="{base}/docs/google-map">GoogleMap</a></li>
			<li><a href="{base}/docs/marker">Marker</a></li>
			<li><a href="{base}/docs/advanced-marker">AdvancedMarker</a></li>
			<li><a href="{base}/docs/info-window">InfoWindow</a></li>
			<li><a href="{base}/docs/polyline">Polyline</a></li>
			<li><a href="{base}/docs/polygon">Polygon</a></li>
			<li><a href="{base}/docs/circle">Circle</a></li>
			<li><a href="{base}/docs/rectangle">Rectangle</a></li>
			<li><a href="{base}/docs/heatmap-layer">HeatmapLayer</a></li>
			<li><a href="{base}/docs/ground-overlay">GroundOverlay</a></li>
			<li><a href="{base}/docs/directions-renderer">DirectionsRenderer</a></li>
			<!-- <li><a href="{base}/docs/traffic-layer">TrafficLayer</a></li> -->
			<!-- <li><a href="{base}/docs/transit-layer">TransitLayer</a></li> -->
			<!-- <li><a href="{base}/docs/bicycling-layer">BicyclingLayer</a></li> -->
			<li><a href="{base}/docs/kml-layer">KmlLayer</a></li>
			<li><a href="{base}/docs/map-control">MapControl</a></li>
			<li><a href="{base}/docs/autocomplete">Autocomplete</a></li>
			<li><a href="{base}/docs/overlay-view">OverlayView</a></li>
			<li><a href="{base}/docs/street-view-panorama">StreetViewPanorama</a></li>
			<li><a href="{base}/docs/hooks-context">Hooks / Context</a></li>
			<!-- Add more links as pages are created -->
		</ul>
	</nav>

	<main class="main-content">
		<slot />
	</main>
</div>

<style>
	/* More modern font stack */
	:global(body) {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
			'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
		margin: 0;
		color: #333;
	}

	.docs-layout {
		display: flex;
	}

	.sidebar {
		width: 260px; /* Slightly wider */
		padding: 25px;
		border-right: 1px solid #eaeaea;
		height: 100vh;
		overflow-y: auto;
		position: sticky;
		top: 0;
		background-color: #fdfdfd;
	}

	.sidebar h2 {
		margin-top: 0;
		margin-bottom: 20px;
		font-size: 1.3em;
		color: #111;
	}

	.sidebar ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.sidebar li a {
		text-decoration: none;
		color: #444; /* Slightly darker text */
		display: block;
		padding: 8px 0; /* Increased padding */
		border-radius: 4px;
		transition: background-color 0.2s ease, color 0.2s ease;
		margin-bottom: 2px;
		padding-left: 10px; /* Indent links slightly */
	}

	/* Basic active link styling (can be enhanced with page context) */
	/* This requires knowing the current page, which might need $page store */
	/* .sidebar li a.active {
		background-color: #e0e0e0;
		font-weight: 500;
		color: #000;
	} */

	.sidebar li a:hover {
		color: #0056b3;
		background-color: #f0f0f0;
	}

	.main-content {
		flex: 1;
		padding: 40px 50px; /* Increased padding */
		max-width: 900px;
		margin: 0 auto;
	}

	/* Improve typography in main content */
	.main-content h1 {
		border-bottom: 1px solid #eee;
		padding-bottom: 10px;
		margin-bottom: 30px;
		font-size: 2.2em;
		font-weight: 600;
	}

	.main-content h2 {
		border-bottom: 1px solid #eee;
		padding-bottom: 8px;
		margin-top: 40px;
		margin-bottom: 20px;
		font-size: 1.8em;
		font-weight: 500;
	}

	.main-content p,
	.main-content li {
		line-height: 1.7;
	}

	/* Style tables and code blocks (copied from other pages) */
	table {
		width: 100%;
		border-collapse: collapse;
		margin-bottom: 20px;
		font-size: 0.95em;
	}
	th,
	td {
		border: 1px solid #ddd;
		padding: 10px 12px; /* Adjust padding */
		text-align: left;
		vertical-align: top;
	}
	th {
		background-color: #f7f7f7; /* Lighter header */
		font-weight: 500;
	}
	code {
		background-color: #e9e9e9; /* Slightly different code background */
		padding: 3px 6px;
		border-radius: 4px;
		font-size: 0.9em;
		font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
	}
	pre {
		background-color: #f6f8fa; /* Common GitHub code block color */
		padding: 16px;
		border-radius: 6px;
		overflow-x: auto;
		border: 1px solid #eaeaea;
	}
	pre code {
		background-color: transparent;
		padding: 0;
		border-radius: 0;
		font-size: 0.85em;
		border: none;
	}
</style>
