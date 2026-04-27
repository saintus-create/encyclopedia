import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";

/**
 * We use the *standard* DocsLayout (not the notebook variant) because:
 *   1. It honors `nav: { enabled: false }` so we don't get a second header
 *      stacked under the global black SiteNav.
 *   2. Its sidebar anatomy maps cleanly onto Apple's left rail.
 */
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions}
      sidebar={{
        collapsible: true,
        defaultOpenLevel: 1,
      }}
      containerProps={{
        className: "bg-[var(--ad-paper)]",
      }}
    >
      {children}
    </DocsLayout>
  );
}
