import type { VirtualFile } from "fumadocs-core/source";

export const meta: VirtualFile[] = [
  {
    type: "meta",
    data: {
      title: "App Router",
      root: true,
      pages: [
        "[Overview](/docs/app)",
        "---Getting Started---",
        "...01-getting-started",
        "---Examples---",
        "[Overview](/docs/app/examples)",
        "...02-examples",
        "---Building Your Application---",
        "...03-building-your-application",
        "---API Reference---",
        "...04-api-reference",
      ],
    },
    path: "01-app/meta.json",
  },
  {
    type: "meta",
    data: {
      title: "Pages Router",
      root: true,
    },
    path: "02-pages/meta.json",
  },
];
