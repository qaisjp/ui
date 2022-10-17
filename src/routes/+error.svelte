<script lang="ts">
  import '../app.css';
  import { page } from '$app/stores';

  import Error from '$lib/components/error.svelte';
  import { isNetworkError } from '$lib/utilities/is-network-error';
  import { parseWithBigInt } from '$lib/utilities/parse-with-big-int';

  export let error: globalThis.Error;
  export let status: number;

  let requestFromAPIError: Record<string, any>;

  try {
    requestFromAPIError = parseWithBigInt(error.message);

    if (isNetworkError(requestFromAPIError)) {
      status = requestFromAPIError.statusCode;
    }
  } catch (e) {}
</script>

<Error error={$page.error} status={$page.status} />
