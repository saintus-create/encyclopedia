import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <span className="font-serif text-xl font-bold tracking-tight">E</span>
    ),
  },
  links: [
    {
      text: "Browse Entries",
      url: "/docs",
      active: "nested-url",
    },
    {
      text: "About",
      url: "/docs/about",
    },
  ],
};
