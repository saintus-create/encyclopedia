import Link from "next/link";

/**
 * Apple-style global top bar.
 *
 * Anatomy: 44px tall, near-black background, light text, a wordmark on
 * the left, three sparse text links in the center, a search affordance
 * on the right. Sticky to the viewport.
 */
export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 h-11 w-full bg-[var(--ad-nav)] text-[var(--ad-nav-fg)]">
      <nav className="mx-auto flex h-full max-w-[1024px] items-center px-4 text-[12px]">
        {/* Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2 text-[14px] font-semibold tracking-tight text-[var(--ad-nav-fg)] no-underline"
        >
          <span aria-hidden className="text-[16px] leading-none">
            ✦
          </span>
          <span>Encyclopedia of Rhetoric &amp; Composition</span>
        </Link>

        {/* Center links */}
        <ul className="ml-10 hidden flex-1 items-center gap-7 md:flex">
          {[
            { label: "Browse", href: "/docs" },
            { label: "Featured", href: "/docs/a/aristotle" },
            { label: "About", href: "/docs/about" },
          ].map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-[12px] text-[var(--ad-nav-fg-dim)] no-underline transition-colors hover:text-[var(--ad-nav-fg)]"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right-side spacer (search affordance lives in sub-header) */}
        <div className="ml-auto flex items-center gap-4 md:ml-0">
          <Link
            href="/docs"
            className="text-[12px] text-[var(--ad-nav-fg-dim)] no-underline transition-colors hover:text-[var(--ad-nav-fg)]"
          >
            All entries →
          </Link>
        </div>
      </nav>
    </header>
  );
}
