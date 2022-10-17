import { browser } from '$app/environment';

export function getApiOrigin(isBrowser = browser): string | null {
  const endpoint = import.meta.env.VITE_API;
  const isRelative = !endpoint.startsWith('http');

  let origin = '';

  if (isRelative) {
    origin = isBrowser ? window.location.origin + endpoint : '';
  } else {
    origin = endpoint;
  }

  if (origin.endsWith('/')) origin = origin.slice(0, -1);

  return origin;
}
