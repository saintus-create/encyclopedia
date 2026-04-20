import Link from "next/link";
import type { ReactNode } from "react";

export function BibliographyCard({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose mt-8 rounded-lg border bg-fd-card text-fd-card-foreground">
      <div className="flex items-center gap-2 border-b px-4 py-3">
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
      </div>
      <div className="px-4 py-4 text-sm leading-relaxed text-fd-muted-foreground [&>p]:mb-2 [&>p:last-child]:mb-0 whitespace-pre-wrap font-mono">
        {children}
      </div>
    </div>
  );
}

export function SeeAlsoCard({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose mt-6 rounded-lg border bg-fd-card text-fd-card-foreground">
      <div className="flex items-center gap-2 border-b px-4 py-3">
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
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <span className="text-xs font-semibold uppercase tracking-wider text-fd-muted-foreground">
          See Also
        </span>
      </div>
      <div className="flex flex-wrap gap-2 px-4 py-4">{children}</div>
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
      className="inline-flex items-center rounded-md border border-fd-border bg-fd-background px-3 py-1 text-sm font-medium text-fd-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
    >
      {children}
    </Link>
  );
}
