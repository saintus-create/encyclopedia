import { Callout } from "fumadocs-ui/components/callout";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import { Tabs, Tab } from "fumadocs-ui/components/tabs";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { Check, X } from "lucide-react";
import { Fragment, type ReactNode } from "react";

const isRemoteImage = true;

const mdxComponents = {
  ...defaultMdxComponents,
  blockquote: Callout,
  Tabs,
  Tab,
  Check,
  Cross: X,
  Image: ({
    srcDark,
    srcLight,
    ...props
  }: {
    srcDark: string;
    srcLight: string;

    width: `${number}` | number;
    height: `${number}` | number;
    alt: string;
  }) => (
    <div className="not-prose my-6 rounded-xl p-1 bg-gradient-to-br from-white/10 to-black/10 border shadow-lg">
      <ImageZoom
        src={isRemoteImage ? `https://nextjs.org${srcLight}` : srcLight}
        loading="lazy"
        {...props}
        className="rounded-lg block dark:hidden"
      />
      <ImageZoom
        src={isRemoteImage ? `https://nextjs.org${srcDark}` : srcDark}
        loading="lazy"
        {...props}
        className="rounded-lg hidden dark:block"
      />
    </div>
  ),
};

export function createMdxComponents(isAppRouter: boolean) {
  return {
    ...mdxComponents,
    AppOnly: ({ children }: { children: ReactNode }) =>
      isAppRouter ? <Fragment>{children}</Fragment> : null,
    PagesOnly: ({ children }: { children: ReactNode }) =>
      !isAppRouter ? <Fragment>{children}</Fragment> : null,
  };
}
