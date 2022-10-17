<script lang="ts">
  import { BannersState } from '$lib/models/banner-state';
  import BannerTemporalVersion from './banner-temporal-version.svelte';
  import BannerUIVersion from './banner-ui-version.svelte';

  export let uiVersionInfo: UiVersionInfo;
  export let settings: Settings;
  export let cluster: temporal.api.workflowservice.v1.IGetClusterInfoResponse;

  let shownBanner = BannersState.TemporalVersion;
  const notifyOnNewVersion = settings.notifyOnNewVersion;
</script>

{#if notifyOnNewVersion}
  {#if shownBanner === BannersState.TemporalVersion}
    <BannerTemporalVersion {cluster} bind:shownBanner />
  {:else if shownBanner === BannersState.UIVersion}
    <BannerUIVersion {uiVersionInfo} bind:shownBanner />
  {/if}
{/if}
