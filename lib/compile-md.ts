import { createCompiler } from "@fumadocs/mdx-remote";
import type { TableOfContents } from "fumadocs-core/server";
import type { MDXComponents } from "mdx/types";
import type { FC } from "react";
import { remarkCompact } from "./remark-compact";

export interface CompiledPage {
  full?: boolean;
  source?: string;

  title?: string;
  description?: string;

  toc: TableOfContents;
  body: FC<{ components?: MDXComponents }>;
}

const cache = new Map<string, Promise<CompiledPage>>();

const compiler = createCompiler({
  remarkPlugins: (v) => [remarkCompact, ...v],
  remarkImageOptions: false,
  rehypeCodeOptions: {
    lazy: true,
    tab: false,
    experimentalJSEngine: true,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  },
});

export async function compile(filePath: string, source: string) {
  const key = `${filePath}:${source}`;
  const cached = cache.get(key);

  if (cached) return cached;
  console.time(`compile md: ${filePath}`);
  const compiling = compiler
    .compile({
      filePath,
      source,
    })
    .then((compiled) => ({
      body: compiled.body,
      toc: compiled.toc,
      ...compiled.frontmatter,
    }))
    .finally(() => {
      console.timeEnd(`compile md: ${filePath}`);
    });

  cache.set(key, compiling);

  return compiling;
}
