import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";
import { Body } from "./layout.client";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Body>
      <DocsLayout
        tree={source.pageTree}
        {...baseOptions}
        sidebar={{
          prefetch: false,
          defaultOpenLevel: 0,
        }}
      >
        {children}
      </DocsLayout>
    </Body>
  );
}
