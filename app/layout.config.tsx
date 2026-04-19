import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { BookOpenIcon } from "lucide-react";

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <span className="inline-flex flex-row gap-2 items-center font-semibold text-base">
        <BookOpenIcon className="size-5" />
        Encyclopedia of Rhetoric
      </span>
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
