import Link from "next/link";
import { HomeSearch } from "@/components/home-search";

const LETTERS = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "k",
  "l", "m", "n", "o", "p", "q", "r", "s", "t", "u",
  "v", "w", "y",
];

const FEATURED = [
  {
    eyebrow: "Foundational figure",
    title: "Aristotle",
    description:
      "The classical taxonomy of ethos, pathos, and logos, and the architecture every later rhetoric is measured against.",
    href: "/docs/a/aristotle",
  },
  {
    eyebrow: "Core concept",
    title: "Argument",
    description:
      "From Toulmin's claim-warrant-data to dialectical, Rogerian, and visual modes — how arguments are built and judged.",
    href: "/docs/a/argument",
  },
  {
    eyebrow: "Method",
    title: "Composition Studies",
    description:
      "The discipline that grew up around the writing process: invention, drafting, revision, and the teaching of writing.",
    href: "/docs/c",
  },
];

const SECTIONS = [
  {
    heading: "Classical & Ancient",
    letters: ["a", "b", "c", "d", "e"],
  },
  {
    heading: "Modern Rhetoric",
    letters: ["f", "g", "h", "i", "k", "l", "m"],
  },
  {
    heading: "Composition & Theory",
    letters: ["n", "o", "p", "q", "r", "s"],
  },
  {
    heading: "Genre, Style & Beyond",
    letters: ["t", "u", "v", "w", "y"],
  },
];

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col bg-[var(--ad-paper)]">
      {/* === Sub-header (Apple "Documentation" band) ============================ */}
      <section className="border-b border-[var(--ad-rule-soft)] bg-[var(--ad-paper)]">
        <div className="mx-auto flex w-full max-w-[1024px] flex-col gap-6 px-4 pt-12 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-[12px] font-semibold tracking-[0.06em] text-[var(--ad-muted)] uppercase">
              Documentation
            </p>
            <h1 className="text-[40px] leading-[1.05] font-semibold tracking-tight text-[var(--ad-ink)] md:text-[48px]">
              Encyclopedia
            </h1>
            <p className="mt-3 max-w-[640px] text-[17px] leading-[1.47] text-[var(--ad-muted)]">
              274 entries on rhetoric and composition — figures, terms, methods,
              and movements from ancient times to the information age.
            </p>
          </div>
          <div className="w-full md:w-[320px]">
            <HomeSearch />
          </div>
        </div>
      </section>

      {/* === Two-column layout: left rail + main =============================== */}
      <div className="mx-auto flex w-full max-w-[1024px] flex-col gap-10 px-4 py-10 md:flex-row md:gap-12">
        {/* ——— Left rail: categories ——— */}
        <aside className="md:w-[200px] md:shrink-0">
          <nav className="md:sticky md:top-16">
            <p className="mb-3 text-[12px] font-semibold tracking-[0.04em] text-[var(--ad-ink)] uppercase">
              Categories
            </p>
            <ul className="space-y-1.5 border-l border-[var(--ad-rule-soft)] pl-3">
              {SECTIONS.map((s) => (
                <li key={s.heading}>
                  <Link
                    href={`/docs/${s.letters[0]}`}
                    className="block text-[13px] leading-[1.4] text-[var(--ad-blue)] no-underline hover:underline"
                  >
                    {s.heading}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/docs"
                  className="block text-[13px] leading-[1.4] text-[var(--ad-muted)] no-underline hover:text-[var(--ad-ink)]"
                >
                  All entries
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/about"
                  className="block text-[13px] leading-[1.4] text-[var(--ad-muted)] no-underline hover:text-[var(--ad-ink)]"
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* ——— Main content ——— */}
        <div className="min-w-0 flex-1">
          {/* Featured */}
          <section>
            <h2 className="mb-5 text-[24px] font-semibold tracking-tight text-[var(--ad-ink)]">
              Featured
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {FEATURED.map((f) => (
                <Link
                  key={f.href}
                  href={f.href}
                  className="group flex flex-col rounded-[var(--r)] border border-[var(--ad-rule-soft)] bg-[var(--ad-card)] p-5 no-underline transition-colors hover:border-[var(--ad-rule)] hover:bg-[var(--ad-card-hover)]"
                >
                  <span className="mb-2 text-[12px] font-semibold tracking-[0.04em] text-[var(--ad-muted)] uppercase">
                    {f.eyebrow}
                  </span>
                  <span className="text-[20px] font-semibold leading-[1.2] tracking-tight text-[var(--ad-ink)]">
                    {f.title}
                  </span>
                  <span className="mt-2 text-[14px] leading-[1.45] text-[var(--ad-ink-2)]">
                    {f.description}
                  </span>
                  <span className="mt-4 text-[13px] font-medium text-[var(--ad-blue)] group-hover:underline">
                    Read entry →
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Browse by letter — Apple "Technologies" grid analogue */}
          <section className="mt-12">
            <h2 className="mb-5 text-[24px] font-semibold tracking-tight text-[var(--ad-ink)]">
              Browse alphabetically
            </h2>
            <div className="grid grid-cols-5 gap-2 sm:grid-cols-8 md:grid-cols-10">
              {LETTERS.map((l) => (
                <Link
                  key={l}
                  href={`/docs/${l}`}
                  aria-label={`Browse entries starting with ${l.toUpperCase()}`}
                  className="grid h-[56px] place-items-center rounded-[var(--r-sm)] border border-[var(--ad-rule-soft)] bg-[var(--ad-card)] text-[18px] font-medium text-[var(--ad-ink)] no-underline transition-colors hover:border-[var(--ad-blue)] hover:text-[var(--ad-blue)]"
                >
                  {l.toUpperCase()}
                </Link>
              ))}
            </div>
          </section>

          {/* Section index — column list, Apple framework-rail anatomy */}
          <section className="mt-12">
            <h2 className="mb-5 text-[24px] font-semibold tracking-tight text-[var(--ad-ink)]">
              Sections
            </h2>
            <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {SECTIONS.map((s) => (
                <div key={s.heading}>
                  <h3 className="mb-2 text-[15px] font-semibold tracking-tight text-[var(--ad-ink)]">
                    {s.heading}
                  </h3>
                  <ul className="flex flex-wrap gap-x-3 gap-y-1">
                    {s.letters.map((l) => (
                      <li key={l}>
                        <Link
                          href={`/docs/${l}`}
                          className="text-[14px] text-[var(--ad-blue)] no-underline hover:underline"
                        >
                          {l.toUpperCase()}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
