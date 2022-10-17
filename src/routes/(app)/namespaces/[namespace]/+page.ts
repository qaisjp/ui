import { error } from '@sveltejs/kit';
import type { PageLoad } from '@sveltejs/kit';
import type { DescribeNamespaceResponse } from '$types';
import { getClusters } from '$lib/utilities/get-clusters';

export const load: PageLoad = async function ({ parent, params, url }) {
  const { searchParams } = url;
  const data = await parent();

  if (searchParams.has('time-range')) searchParams.delete('time-range');

  const namespace = params.namespace;
  const namespaces: DescribeNamespaceResponse[] = data.namespaces;

  const currentNamespace = namespaces.find(
    (namespaceConfig) => namespaceConfig.namespaceInfo.name === namespace,
  );

  if (!currentNamespace) {
    throw error(404, `The namespace "${namespace}" does not exist.`);
  }

  const clusters = getClusters(currentNamespace);

  return {
    currentNamespace,
    clusters,
  };
};
