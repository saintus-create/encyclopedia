import { defineDocs, defineConfig } from 'fumadocs-mdx/config';
import { remarkCompact } from './lib/remark-compact';

export const docs = defineDocs({
  dir: 'content',
  docs: {
    mdxOptions: {
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
    },
  },
});

export default defineConfig();