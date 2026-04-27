import Link from "next/link";
import type { ReactNode } from "react";

/**
 * BibliographyCard — collapsible list. No card chrome, just a labeled
 * top divider with indented content. Matches the encyclopedia's
 * editorial restraint while keeping the Replit-paper background.
 */
export function BibliographyCard({ children }: { children: ReactNode }) {
  return (
    <details className="not-prose group mt-10 border-t border-[var(--rep-rule)] pt-4">
      <summary className="flex cursor-pointer list-none items-center justify-between select-none">
        <span className="text-[12px] font-medium uppercase tracking-[0.06em] text-[var(--rep-ink-muted)]">
          Bibliography
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
          className="text-[var(--rep-ink-muted)] transition-transform duration-200 group-open:rotate-180"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>
      <div className="mt-4 text-[14px] leading-7 text-[var(--rep-ink-soft)] [&>p]:mt-3 [&>p:first-child]:mt-0">
        {children}
      </div>
    </details>
  );
}

/**
 * SeeAlsoCard — flat divider section, populated with pill-style links.
 * Cross-reference UI for the encyclopedia.
 */
export function SeeAlsoCard({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose mt-10 border-t border-[var(--rep-rule)] pt-4">
      <div className="mb-3 text-[12px] font-medium uppercase tracking-[0.06em] text-[var(--rep-ink-muted)]">
        See also
      </div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

/**
 * SeeAlsoLink — pill in the Replit Workstation outlined-tile style.
 * Default state: paper background + hairline border.
 * Hover: orange accent.
 */
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
      className="inline-flex items-center rounded-md border border-[var(--rep-rule)] bg-white px-3 py-1.5 text-[13px] font-medium text-[var(--rep-ink)] no-underline transition hover:border-[var(--rep-orange)] hover:bg-[var(--rep-orange-soft)] hover:text-[var(--rep-orange)]"
    >
      {children}
    </Link>
  );
}
