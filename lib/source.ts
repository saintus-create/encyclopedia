import { loader } from "fumadocs-core/source";
import * as path from "node:path";
import { createLocalSource } from "./sources/local";

export const isLocal = true;

export const source = loader({
  baseUrl: "/docs",
  source: await createLocalSource(),
  slugs(info) {
    const segments = info.flattenedPath
      .split("/")
      .filter((seg) => !(seg.startsWith("(") && seg.endsWith(")")));

    if (segments.at(-1) === "index") {
      segments.pop();
    }

    return segments;
  },
});

export function getTitleFromFile(file: string) {
  const parsed = path.parse(file);
  const name =
    parsed.name === "index" ? path.basename(parsed.dir) : parsed.name;

  const segs = name.split("-");
  const out = segs
    .map((s) => s.slice(0, 1).toUpperCase() + s.slice(1))
    .join(" ");
  return out.length > 0 ? out : "Overview";
}
