import { redirect } from '@sveltejs/kit';

import { routeForWorkflows } from '$lib/utilities/route-for';
import { getNamespace } from '$lib/utilities/get-namespace';

export const load = async ({ parent }) => {
  const data = await parent();

  const namespaces = data.namespaces;
  const defaultNamespace = data?.settings?.defaultNamespace;

  const namespace = getNamespace({ namespaces, defaultNamespace });
  const href = routeForWorkflows({
    namespace,
  });

  throw redirect(307, href);
};
