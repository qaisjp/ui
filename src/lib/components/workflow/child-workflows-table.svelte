<script lang="ts">
  import Link from '$lib/holocene/link.svelte';
  import Pagination from '$lib/holocene/pagination.svelte';
  import TableHeaderRow from '$lib/holocene/table/table-header-row.svelte';
  import TableRow from '$lib/holocene/table/table-row.svelte';
  import Table from '$lib/holocene/table/table.svelte';
  import { translate } from '$lib/i18n/translate';
  import type { WorkflowExecution } from '$lib/types/workflows';
  import type { ChildWorkflowClosedEvent } from '$lib/utilities/get-workflow-relationships';
  import { routeForEventHistory } from '$lib/utilities/route-for';
  
  import WorkflowStatus from '../workflow-status.svelte';
  

  export let children: ChildWorkflowClosedEvent[] = [];
  export let pendingChildren: WorkflowExecution['pendingChildren'] = [];
  export let namespace: string;

  $: formattedPending = pendingChildren.map((c) => {
    return {
      runId: c.runId,
      workflowId: c.workflowId,
      status: 'Running' as const,
      namespace,
    };
  });

  $: formattedCompleted = children.map((c) => {
    return {
      runId: c.attributes.workflowExecution.runId,
      workflowId: c.attributes.workflowExecution.workflowId,
      status: c.classification,
      namespace: c.attributes?.namespace || namespace,
    };
  });

  $: formattedAll = [...formattedPending, ...formattedCompleted];
</script>

<Pagination
  items={formattedAll}
  itemsPerPage={10}
  let:visibleItems
  aria-label={translate('workflows', 'child-workflows')}
  pageSizeSelectLabel={translate('per-page')}
  previousButtonLabel={translate('previous')}
  nextButtonLabel={translate('next')}
>
  <div slot="pagination-top" />
  <Table class="w-full">
    <caption class="sr-only" slot="caption"
      >{translate('workflows', 'child-workflows')}</caption
    >
    <TableHeaderRow slot="headers">
      <th class="max-md:hidden">Status</th>
      <th>{translate('workflows', 'child-id')}</th>
      <th>{translate('workflows', 'child-run-id')}</th>
    </TableHeaderRow>
    {#each visibleItems as child (child.runId)}
      <TableRow>
        <td class="max-md:hidden">
          <WorkflowStatus status={child.status} />
        </td>
        <td class="hover:text-blue-700 hover:underline">
          <Link
            newTab
            href={routeForEventHistory({
              namespace: child.namespace,
              workflow: child.workflowId,
              run: child.runId,
            })}
          >
            {child.workflowId}
          </Link>
        </td>
        <td class="hover:text-blue-700 hover:underline">
          <Link
            newTab
            href={routeForEventHistory({
              namespace: child.namespace,
              workflow: child.workflowId,
              run: child.runId,
            })}
          >
            {child.runId}
          </Link>
        </td>
      </TableRow>
    {/each}
  </Table>
</Pagination>
