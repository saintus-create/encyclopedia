import { visit } from "unist-util-visit";
import type { Transformer } from "unified";
import type { Code, Parent, Root, RootContent } from "mdast";

const FileNameRegex = /file[nN]ame="(.+?)"/;

function toTab(nodes: Code[]) {
  const names = nodes.map((node, i) => {
    const match = FileNameRegex.exec(node.meta ?? "");
    return match?.[1] ?? `Tab ${i}`;
  });

  const itemsArr = {
    type: "ExpressionStatement",
    expression: {
      type: "ArrayExpression",
      elements: names.map((name) => ({
        type: "Literal",
        value: name,
      })),
    },
  };

  return {
    type: "mdxJsxFlowElement",
    name: "Tabs",
    attributes: [
      {
        type: "mdxJsxAttribute",
        name: "items",
        value: {
          type: "mdxJsxAttributeValueExpression",
          data: {
            estree: {
              type: "Program",
              sourceType: "module",
              comments: [],
              body: [itemsArr],
            },
          },
        },
      },
    ],
    children: nodes.map((node, i) => {
      return {
        type: "mdxJsxFlowElement",
        name: "Tab",
        attributes: [
          {
            type: "mdxJsxAttribute",
            name: "value",
            value: names[i],
          },
        ],
        children: [
          {
            ...node,
            meta: node.meta
              ?.replaceAll("switcher", "")
              ?.replace(FileNameRegex, ""),
          },
        ],
      };
    }),
  };
}

/**'
 * A remark plugin to convert Next.js docs Markdown syntax to Fumadocs format
 */
export function remarkCompact(): Transformer<Root, Root> {
  function updateCode(code: Code) {
    if (code.lang === ".env") code.lang = "text";
    if (code.lang === "mjs") code.lang = "js";

    if (code.meta) {
      code.meta = code.meta.replace(FileNameRegex, (_, v) => `title="${v}"`);
    }
  }

  // convert codeblock's switcher meta
  function convertSwitcher(node: Parent) {
    let start = -1;
    let i = 0;

    while (i < node.children.length) {
      const child = node.children[i];
      const isSwitcher =
        child.type === "code" && child.meta && child.meta.includes("switcher");

      if (isSwitcher && start === -1) {
        start = i;
      }

      // if switcher code blocks terminated, convert them to tabs
      const isLast = i === node.children.length - 1;
      if (start !== -1 && (isLast || !isSwitcher)) {
        const end = isSwitcher ? i + 1 : i;
        const targets = node.children.slice(start, end);

        node.children.splice(
          start,
          end - start,
          toTab(targets as Code[]) as RootContent,
        );

        if (isLast) break;
        i = start + 1;
        start = -1;
      } else {
        i++;
      }
    }
  }

  return (tree) => {
    visit(tree, (node) => {
      if (node.type === "code") updateCode(node);

      if ("children" in node) convertSwitcher(node);
    });
  };
}
