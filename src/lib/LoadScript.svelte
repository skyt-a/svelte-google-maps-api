<script lang="ts">
	import { isReady } from '$lib/store.js';
	import type { Library } from '$lib/types/googleMap.js';
	import { BROWSER as browser } from 'esm-env';

	export let apiKey = '';
	export let libraries: Library[] = ['places'];

	const initialize = (key: string) => {
		if (!key || key === '') {
			return;
		}
		// @ts-ignore
		window.svelteGoogleMapInit = () => {
			isReady.set(true);
		};
		const url = `//maps.googleapis.com/maps/api/js?${key ? `key=${key}&` : ''}${
			libraries.length > 0 ? `libraries=${libraries.sort().join(',')}&` : ''
		}callback=svelteGoogleMapInit`;
		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = url;
		script.async = true;
		document.head.appendChild(script);
	};
	$: if (browser) {
		initialize(apiKey);
	}
</script>

<slot />
