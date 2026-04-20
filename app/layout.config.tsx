import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <img
        src="/logo.png"
        alt="Encyclopedia of Rhetoric and Composition"
        className="h-8 w-auto"
      />
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

