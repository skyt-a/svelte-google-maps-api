<script lang="ts">
	import APIProvider from '../../src/lib/APIProvider.svelte';

	interface Props {
		apiKey: string;
		onLoad?: () => void;
		onError?: (error: Error) => void;
	}

	let { apiKey, onLoad, onError }: Props = $props();
</script>

<APIProvider {apiKey} libraries={['places']} language="ja" region="JP" {onLoad} {onError}>
	<p>children</p>
	{#snippet loading()}<p>loading map</p>{/snippet}
	{#snippet error(err)}<p>custom error: {err.message}</p>{/snippet}
</APIProvider>
