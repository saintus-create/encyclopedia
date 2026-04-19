import type { Source, VirtualFile } from "fumadocs-core/source";
import { compile, type CompiledPage } from "../compile-md";
import * as path from "node:path";
import { getTitleFromFile } from "../source";
import { meta } from "../meta";
import FastGlob from "fast-glob";
import { readFile } from "node:fs/promises";

const dir = "content";

export async function createLocalSource(): Promise<
  Source<{
    metaData: { title: string; pages: string[] };
    pageData: {
      title: string;
      load: () => Promise<CompiledPage>;
    };
  }>
> {
  const files = await FastGlob(`${dir}/**/*.{mdx,md}`);

  const pages = files.flatMap((file) => {
    const relativePath = path.relative(dir, file);

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

  return {
    files: [...pages, ...meta],
  };
}
