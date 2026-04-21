import Link from "next/link";
import type { ReactNode } from "react";

/**
 * BibliographyCard — collapsible section, not a heavy bordered card.
 * Just a top divider with a labeled toggle and indented content.
 */
export function BibliographyCard({ children }: { children: ReactNode }) {
  return (
    <details className="not-prose group mt-8 border-t border-fd-border pt-4">
      <summary className="flex cursor-pointer list-none items-center justify-between select-none">
        <span className="text-sm text-fd-muted-foreground">Bibliography</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-fd-muted-foreground transition-transform duration-200 group-open:rotate-180"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>
      <div className="mt-4 text-sm leading-7 text-fd-muted-foreground [&>p]:mt-3 [&>p:first-child]:mt-0">
        {children}
      </div>
    </details>
  );
}

/**
 * SeeAlsoCard — light section with simple link chips.
 */
export function SeeAlsoCard({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose mt-6 border-t border-fd-border pt-4">
      <div className="text-sm text-fd-muted-foreground mb-3">See also</div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

export function SeeAlsoLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center rounded border border-fd-border px-3 py-1 text-sm text-fd-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
    >
      {children}
    </Link>
  );
}
