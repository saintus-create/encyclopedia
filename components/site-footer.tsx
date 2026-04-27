import Link from "next/link";

/**
 * Apple-style footer: light-grey bg, dense small-caps link columns,
 * copyright rule at the bottom.
 */
export function SiteFooter() {
  const columns: { heading: string; links: { label: string; href: string }[] }[] =
    [
      {
        heading: "Browse",
        links: [
          { label: "All entries", href: "/docs" },
          { label: "A — D", href: "/docs/a" },
          { label: "E — H", href: "/docs/e" },
          { label: "I — M", href: "/docs/i" },
          { label: "N — S", href: "/docs/n" },
          { label: "T — Y", href: "/docs/t" },
        ],
      },
      {
        heading: "Featured",
        links: [
          { label: "Aristotle", href: "/docs/a/aristotle" },
          { label: "Argument", href: "/docs/a/argument" },
          { label: "Rhetoric", href: "/docs/r" },
          { label: "Composition", href: "/docs/c" },
        ],
      },
      {
        heading: "About",
        links: [
          { label: "About this edition", href: "/docs/about" },
          {
            label: "Source repository",
            href: "https://github.com/saintus-create/encyclopedia",
          },
        ],
      },
    ];

  return (
    <footer className="mt-auto bg-[var(--ad-footer)] text-[var(--ad-footer-fg)]">
      <div className="mx-auto w-full max-w-[1024px] px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="mb-3 text-[12px] font-semibold tracking-tight text-[var(--ad-ink)]">
                {col.heading}
              </h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-[12px] text-[var(--ad-footer-fg)] no-underline transition-colors hover:underline hover:text-[var(--ad-ink)]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-[var(--ad-rule)] pt-6 text-[12px] leading-5 text-[var(--ad-footer-fg)]">
          <p>
            Encyclopedia of Rhetoric and Composition · Garland Reference
            Library of the Humanities, Vol. 1389 · edited by Theresa Enos ·
            Routledge, 1996.
          </p>
          <p className="mt-1">
            Republished as an open reference. Cite responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
}
