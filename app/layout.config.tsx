import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

/**
 * Layout options shared by HomeLayout and DocsLayout.
 *
 * The Apple-style black top bar is rendered by <SiteNav /> at the root
 * layout level, so we disable Fumadocs's own nav here to avoid stacking
 * two nav strips. The links field is still consumed where applicable.
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    enabled: false,
  },
  links: [
    { text: "Browse", url: "/docs", active: "nested-url" },
    { text: "About", url: "/docs/about" },
  ],
  githubUrl: "https://github.com/saintus-create/encyclopedia",
};
