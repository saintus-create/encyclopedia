import { createMdxComponents } from "@/components/mdx";
import { isLocal, source } from "@/lib/source";
import { DocsPage, DocsBody, DocsCategory } from "fumadocs-ui/page";
import { notFound } from "next/navigation";

export const revalidate = 7200;

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

  return (
    <DocsPage toc={content.toc} full={content.full}>
      <DocsBody>
        {/* Wrapping in <article> matters: Fumadocs's typography plugin uses
            :where() (specificity 0) selectors keyed off the DocsBody div,
            but our global.css article-scoped rules are how we enforce the
            Apple type system. The <article> element lets those win. */}
        <article>
          <h1>{content.title}</h1>
          {content.description ? <p>{content.description}</p> : null}

          <MdxContent
            components={createMdxComponents(params.slug?.[0] === "app")}
          />
          {page.file.name === "index" && (
            <DocsCategory page={page} from={source} />
          )}
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
