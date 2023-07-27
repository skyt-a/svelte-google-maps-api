<script>
	import GoogleMap from '$lib/GoogleMap.svelte';
	import LoadScript from '$lib/LoadScript.svelte';
	import Marker from '$lib/Marker.svelte';
	let apiKey = '';
</script>

<input type="text" placeholder="api key" bind:value={apiKey} />
<LoadScript {apiKey}>
	<GoogleMap
		options={{
			center: { lat: 0, lng: 0 },
			zoom: 8
		}}
		mapContainerStyle="width:100vw;height:100vh"
		onClick={() => console.log('click')}
		onLoad={(map) => console.log('map loaded', map)}
		onUnmount={(map) => console.log('map unmounted', map)}
		onCenterChanged={(map) => console.log('map center changed', map)}
		onDrag={(map) => console.log('map dragged', map)}
		onDragEnd={(map) => console.log('map drag ended', map)}
		onDblClick={(map) => console.log('map double clicked', map)}
		onMouseUp={(map) => console.log('map mouse up', map)}
		onMouseOver={(map) => console.log('map mouse over', map)}
		onRightClick={(map) => console.log('map right clicked', map)}
		onMouseOut={(map) => console.log('map mouse out', map)}
	>
		<Marker
			position={{ lat: 0, lng: 0 }}
			onClick={(m) => console.log('marker click', m)}
			onDrag={(m) => console.log('marker drag', m)}
			onDragEnd={(m) => console.log('marker drag end', m)}
			onDragStart={(m) => console.log('marker drag start', m)}
			onLoad={(m) => console.log('marker load', m)}
			onRightClick={(m) => console.log('marker right click', m)}
			onMouseOut={(m) => console.log('marker mouse out', m)}
			onMouseOver={(m) => console.log('marker mouse over', m)}
			onMouseUp={(m) => console.log('marker mouse up', m)}
		/>
	</GoogleMap>
</LoadScript>
