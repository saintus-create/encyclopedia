import type { Source, VirtualFile } from "fumadocs-core/source";
import { compile, type CompiledPage } from "../compile-md";
import * as path from "node:path";
import { getTitleFromFile } from "../source";
import { meta } from "../meta";
import FastGlob from "fast-glob";
import { readFile } from "node:fs/promises";

const dir = "content";

/**
 * Lightweight frontmatter extractor. We only need `title` and `description`,
 * so a tiny regex pass beats pulling in gray-matter (which lacks types here).
 * Handles the standard `--- ... ---` block at the top of the file. Returns
 * an empty object if no frontmatter is present.
 */
function extractFrontmatter(raw: string): {
  title?: string;
  description?: string;
} {
  if (!raw.startsWith("---")) return {};
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return {};
  const fm = raw.slice(3, end);

  const out: { title?: string; description?: string } = {};
  for (const line of fm.split("\n")) {
    const m = line.match(/^(title|description):\s*(.+?)\s*$/);
    if (!m) continue;
    let value = m[2];
    // Strip matching surrounding quotes if present.
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    out[m[1] as "title" | "description"] = value;
  }
  return out;
}

export async function createLocalSource(): Promise<
  Source<{
    metaData: { title: string; pages: string[] };
    pageData: {
      title: string;
      description?: string;
      load: () => Promise<CompiledPage>;
    };
  }>
> {
  const files = await FastGlob(`${dir}/**/*.{mdx,md}`);

  const pages = await Promise.all(
    files.map(async (file) => {
      const relativePath = path.relative(dir, file);
      const raw = await readFile(file, "utf8");
      const fm = extractFrontmatter(raw);

      const title =
        fm.title && fm.title.trim().length > 0
          ? fm.title.trim()
          : getTitleFromFile(relativePath);

      const description =
        fm.description && fm.description.trim().length > 0
          ? fm.description.trim()
          : undefined;

      return {
        type: "page",
        path: relativePath,
        data: {
          title,
          description,
          async load() {
            return compile(file, raw);
          },
        },
      } satisfies VirtualFile;
    }),
  );

  return {
    files: [...pages, ...meta],
  };
}
