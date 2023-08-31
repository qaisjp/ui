import type { Eventual } from '$lib/types/global';

export const isVersionNewer = async (
  recommendedVersion: Eventual<string>,
  currentVersion: string,
): Promise<boolean> => {
  if (!recommendedVersion || !currentVersion) {
    return false;
  }

  const [major1, minor1, patch1] = (await recommendedVersion)
    .split('.')
    .map(Number);
  const [major2, minor2, patch2] = currentVersion.split('.').map(Number);

  if (major1 !== major2) {
    return major1 > major2;
  } else if (minor1 !== minor2) {
    return minor1 > minor2;
  } else {
    return patch1 > patch2;
  }
};
