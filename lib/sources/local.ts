import type { Source, VirtualFile } from "fumadocs-core/source";
import { compile, type CompiledPage } from "../compile-md";
import * as path from "node:path";
import { getTitleFromFile } from "../source";
import { meta } from "../meta";
import FastGlob from "fast-glob";
import { readFile } from "node:fs/promises";

const dir = "next.js/docs";

export async function createLocalSource(): Promise<
  Source<{
    metaData: { title: string; pages: string[] };
    pageData: {
      title: string;
      load: () => Promise<CompiledPage>;
    };
  }>
> {
  const files = await FastGlob(`${dir}/**/*.{mdx,json}`);

  const pages = files.flatMap((file) => {
    const relativePath = path.relative(dir, file);
    if (path.extname(file) === ".json") {
      console.warn(
        "We do not handle .json files at the moment, you need to hardcode them",
      );
      return [];
    }

    return {
      type: "page",
      path: relativePath,
      data: {
        title: getTitleFromFile(relativePath),

        async load() {
          const content = await readFile(file);

          return compile(file, content.toString());
        },
      },
    } satisfies VirtualFile;
  });

  pages.sort((a, b) => {
    const titleA = (a as { data: { title: string } }).data.title.toLowerCase();
    const titleB = (b as { data: { title: string } }).data.title.toLowerCase();
    return titleA.localeCompare(titleB);
  });

  return {
    files: [...pages, ...meta],
  };
}
