<script lang="ts">
  import { page } from '$app/stores';

  import PageTitle from '$lib/components/page-title.svelte';
  import EmptyState from '$lib/holocene/empty-state.svelte';
  import Link from '$lib/holocene/link.svelte';
  import Pagination from '$lib/holocene/pagination.svelte';
  import TableHeaderRow from '$lib/holocene/table/table-header-row.svelte';
  import TableRow from '$lib/holocene/table/table-row.svelte';
  import Table from '$lib/holocene/table/table.svelte';
  import { translate } from '$lib/i18n/translate';
  import { namespaces } from '$lib/stores/namespaces';
  import { routeForNamespace } from '$lib/utilities/route-for';
</script>

<PageTitle title="Namespaces" url={$page.url.href} />
<h1 data-testid="namespace-selector-title" class="mb-8 text-2xl">
  {translate('namespaces')}
</h1>
{#if $namespaces?.length > 0}
  <Pagination
    items={$namespaces}
    let:visibleItems
    aria-label={translate('namespaces')}
    pageSizeSelectLabel={translate('per-page')}
    previousButtonLabel={translate('previous')}
    nextButtonLabel={translate('next')}
  >
    <Table variant="fancy" class="w-full">
      <caption class="sr-only" slot="caption">{translate('namespaces')}</caption
      >
      <TableHeaderRow slot="headers">
        <th>{translate('name')}</th>
      </TableHeaderRow>
      {#each visibleItems as namespace}
        <TableRow>
          <td>
            <Link
              href={routeForNamespace({
                namespace: namespace.namespaceInfo.name,
              })}>{namespace.namespaceInfo.name}</Link
            >
          </td>
        </TableRow>
      {/each}
    </Table>
  </Pagination>
{:else}
  <EmptyState
    title={translate('namespaces', 'namespaces-empty-state-title')}
    content={translate('namespaces', 'namespaces-empty-state-content')}
  />
{/if}
