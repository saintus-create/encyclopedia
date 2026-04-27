import "./global.css";
import { RootProvider } from "fumadocs-ui/provider";
import type { ReactNode } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export const metadata = {
  title: {
    default: "Encyclopedia of Rhetoric & Composition",
    template: "%s | Encyclopedia of Rhetoric & Composition",
  },
  description:
    "A reference encyclopedia of rhetoric and composition: communication from ancient times to the information age.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col antialiased">
        <RootProvider>
          <SiteNav />
          <div className="flex flex-1 flex-col">{children}</div>
          <SiteFooter />
        </RootProvider>
      </body>
    </html>
  );
}
