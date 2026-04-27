import { createMdxComponents } from "@/components/mdx";
import { isLocal, source } from "@/lib/source";
import { DocsPage, DocsBody, DocsCategory } from "fumadocs-ui/page";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 7200;

const LETTER_NAME: Record<string, string> = {
  a: "A",
  b: "B",
  c: "C",
  d: "D",
  e: "E",
  f: "F",
  g: "G",
  h: "H",
  i: "I",
  k: "K",
  l: "L",
  m: "M",
  n: "N",
  o: "O",
  p: "P",
  q: "Q",
  r: "R",
  s: "S",
  t: "T",
  u: "U",
  v: "V",
  w: "W",
  y: "Y",
};

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  let content = await page.data.load();

  if (content.source) {
    const sourcePage = source.getPage(content.source.split("/"));
    if (!sourcePage)
      throw new Error(
        `unresolved source in frontmatter of ${page.file.path}: ${content.source}`,
      );
    content = await sourcePage.data.load();
  }

  const MdxContent = content.body;

  const slugSegs = params.slug ?? [];
  const isIndex = page.file.name === "index";
  const sectionLetter =
    slugSegs.length > 0 && LETTER_NAME[slugSegs[0]] ? slugSegs[0] : null;
  const sectionLabel = sectionLetter ? LETTER_NAME[sectionLetter] : null;

  // Apple uses a single capitalized noun ("Protocol", "Article", "Structure")
  // in regular weight gray above each H1 to disambiguate the page kind.
  // Encyclopedia mapping: index = "Section", root index = "Overview",
  // article pages = "Article".
  const eyebrow = isIndex
    ? sectionLabel
      ? "Section"
      : "Overview"
    : "Article";

  return (
    <DocsPage toc={content.toc} full={content.full}>
      <DocsBody>
        {/*
          `not-prose` is the single most important class on this page.
          Fumadocs's DocsBody wraps every page in <div class="prose">, which
          activates @tailwindcss/typography rules with selector specificity
          (0,1,0) — strong enough to defeat any plain `article h1 { … }`
          rule we write. The `not-prose` opt-out switches all those
          :where(...):not([class~=not-prose]) rules off for this subtree, so
          our Apple type scale in global.css (specificity (0,0,3)) wins
          cleanly against Tailwind Preflight (specificity (0,0,1)).
        */}
        <article className="not-prose ad-article">
          {/* Breadcrumb — Apple's "Framework / Symbol" hairline above H1 */}
          <nav className="ad-breadcrumb" aria-label="Breadcrumb">
            <Link href="/docs">All entries</Link>
            {sectionLabel && (
              <>
                <span aria-hidden> / </span>
                <Link href={`/docs/${sectionLetter}`}>{sectionLabel}</Link>
              </>
            )}
          </nav>

          {/* Eyebrow — Apple's "Protocol" / "Article" disambiguator */}
          <p className="ad-eyebrow">{eyebrow}</p>

          <h1>{content.title}</h1>
          {content.description ? (
            <p className="ad-lead">{content.description}</p>
          ) : null}

          <MdxContent
            components={createMdxComponents(params.slug?.[0] === "app")}
          />
          {isIndex && <DocsCategory page={page} from={source} />}
        </article>
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams(): { slug?: string[] }[] {
  if (isLocal) return source.generateParams();
  return [];
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const content = await page.data.load();
  return {
    title: page.data.title,
    description: content.description,
  };
}
