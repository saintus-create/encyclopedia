import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";

/**
 * Docs section layout.
 *
 * Anatomy (top → bottom):
 *   1. <SiteNav />              — rendered by root layout (sticky black bar)
 *   2. <DocSubToolbar />        — Apple's white sub-toolbar with the section
 *                                 title left and language picker right,
 *                                 separated by a thin hairline rule.
 *   3. <DocsLayout>             — Fumadocs sidebar + content body.
 *
 * We use the standard DocsLayout (not notebook) because it honors
 * `nav: { enabled: false }` so we don't get a third stacked header.
 */
function DocSubToolbar() {
  return (
    <div className="ad-subnav">
      <div className="ad-subnav-inner">
        <span className="ad-subnav-title">Documentation</span>
        <span className="ad-subnav-meta">
          <span className="ad-subnav-meta-label">Edition</span>
          <span className="ad-subnav-meta-value">1996</span>
        </span>
      </div>
    </div>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <DocSubToolbar />
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
    </>
  );
}
