/// <reference types="@sveltejs/kit" />

declare module '@crownframework/svelte-error-boundary';
declare module '@sveltejs/svelte-virtual-list';

interface Window {
  Prism: {
    highlightAll: () => void;
    highlightElement: (
      element: Element,
      async?: boolean,
      highlightCallback?: () => void,
    ) => void;
  };
}

declare namespace svelte.JSX {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T> {
    'onclick-outside': () => void;
  }
}
