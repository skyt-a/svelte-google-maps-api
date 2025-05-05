<script lang="ts">
  import { APIProvider, GoogleMap } from 'svelte-google-maps-api';

  let userApiKey = '';
  const mapOptions = {
    center: { lat: 35.6812362, lng: 139.7649361 },
    zoom: 10
  };
</script>

<div style="margin-bottom: 1rem;">
  <label for="apiKeyBasic">Enter your API Key:</label>
  <input id="apiKeyBasic" type="text" bind:value={userApiKey} placeholder="YOUR_API_KEY" style="width: 300px; padding: 4px; margin-left: 5px;"/>
</div>

<div style="height: 400px; width: 100%; border: 1px solid #ccc;">
  {#if !userApiKey}
    <p style="text-align: center; padding: 2rem; color: #555;">Please enter your API key above to load the map.</p>
  {:else}
    {#key userApiKey}
      <APIProvider apiKey={userApiKey}>
        <GoogleMap
          id="basic-map"
          options={mapOptions}
          mapContainerStyle="width: 100%; height: 100%;"
        />
      </APIProvider>
    {/key}
  {/if}
</div>