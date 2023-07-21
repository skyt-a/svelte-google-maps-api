<script lang="ts">
	import { isReady } from '$lib/store.js';
	import { onMount, createEventDispatcher } from 'svelte';
	import type { Library } from '$lib/types/googleMap.js';

	export let apiKey = '';
	export let libraries: Library[] = ['places'];

	const dispatch = createEventDispatcher();

	onMount(() => {
		// @ts-ignore global custom event for google maps script callback
		window.svelteGoogleMapInit = () => {
			isReady.update(() => true);
		};

		const url = `//maps.googleapis.com/maps/api/js?${apiKey ? `key=${apiKey}&` : ''}${
			libraries.length > 0 ? `libraries=${libraries.sort().join(',')}&` : ''
		}callback=svelteGoogleMapInit`;
		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = url;
		script.async = true;
		document.head.appendChild(script);
	});
</script>

<slot />
