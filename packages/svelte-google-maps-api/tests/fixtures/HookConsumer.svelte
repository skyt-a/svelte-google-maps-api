<script lang="ts">
	import { useAPILoadingStatus, useMapsLibrary } from '../../src/lib/hooks.svelte.js';

	const places = useMapsLibrary('places');
	const api = useAPILoadingStatus();
</script>

<p data-testid="status">{api.status}</p>
<p data-testid="places">{places.current ? 'places ready' : 'places loading'}</p>
