import Link from "next/link";
import type { ReactNode } from "react";

export function BibliographyCard({ children }: { children: ReactNode }) {
  return (
    <details className="not-prose group mt-8 rounded-lg border border-fd-border bg-fd-card text-fd-card-foreground">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 select-none">
        <span className="flex items-center gap-2">
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
            className="text-fd-muted-foreground"
          >
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          <span className="text-xs font-semibold uppercase tracking-wider text-fd-muted-foreground">
            Bibliography
          </span>
        </span>
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
      <div className="border-t border-fd-border px-4 py-4 text-sm leading-7 text-fd-muted-foreground [&>p]:border-b [&>p]:border-fd-border/50 [&>p]:pb-3 [&>p]:pt-3 [&>p:first-child]:pt-0 [&>p:last-child]:border-b-0 [&>p:last-child]:pb-0">
        {children}
      </div>
    </details>
  );
}

export function SeeAlsoCard({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose mt-4 rounded-lg border border-fd-border bg-fd-card text-fd-card-foreground">
      <div className="flex items-center gap-2 border-b border-fd-border px-4 py-3">
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
          className="text-fd-muted-foreground"
        >
          <path d="M9 18 15 12 9 6" />
        </svg>
        <span className="text-xs font-semibold uppercase tracking-wider text-fd-muted-foreground">
          See Also
        </span>
      </div>
      <div className="flex flex-wrap gap-2 px-4 py-3">{children}</div>
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
      className="inline-flex items-center rounded-md border border-fd-border bg-fd-background px-3 py-1 text-sm text-fd-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
    >
      {children}
    </Link>
  );
}

