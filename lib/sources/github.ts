import type { Source, VirtualFile } from "fumadocs-core/source";
import { Octokit } from "octokit";
import { compile, type CompiledPage } from "../compile-md";
import * as path from "node:path";
import { getTitleFromFile } from "../source";
import { meta } from "../meta";

const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN || process.env.GITHUB_TOKEN;
if (!token) throw new Error(`environment variable GITHUB_PERSONAL_ACCESS_TOKEN is needed.`);

const config = {
  owner: "vercel",
  repo: "next.js",
};

export const octokit = new Octokit({
  auth: token,
  request: {
    fetch: (request: any, opts?: any) => {
      return fetch(request, {
        ...opts,
        cache: "force-cache",
      });
    },
  },
});

async function fetchBlob(url: string): Promise<string> {
  console.time(`fetch ${url}`);
  const res = await fetch(url, {
    cache: "force-cache",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  const { content: base64 } = (await res.json()) as {
    content: string;
  };

  console.timeEnd(`fetch ${url}`);
  return Buffer.from(base64, "base64").toString();
}

/**
 * @returns Sha code of `/docs` directory in GitHub repo
 */
async function getDocsSha() {
  const out = await octokit.request(
    "GET /repos/{owner}/{repo}/git/trees/{tree_sha}",
    {
      ...config,
      tree_sha: "canary",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );

  const docs = out.data.tree.find((item) => item.path === "docs");
  return docs?.sha;
}

export async function createGitHubSource(): Promise<
  Source<{
    metaData: { title: string; pages: string[] }; // Your custom type
    pageData: {
      title: string;
      load: () => Promise<CompiledPage>;
    }; // Your custom type
  }>
> {
  const sha = await getDocsSha();
  if (!sha) throw new Error("Failed to find sha of docs directory");

  const out = await octokit.request(
    "GET /repos/{owner}/{repo}/git/trees/{tree_sha}",
    {
      ...config,
      tree_sha: sha,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
      recursive: "true",
    },
  );

  const pages = out.data.tree.flatMap((file) => {
    if (!file.path || !file.url || file.type === "tree") return [];

    if (path.extname(file.path) === ".json") {
      console.warn(
        "We do not handle .json files at the moment, you need to hardcode them",
      );
      return [];
    }

    return {
      type: "page",
      path: file.path,
      data: {
        title: getTitleFromFile(file.path),

        async load() {
          const content = await fetchBlob(file.url as string);

          return compile(file.path!, content);
        },
      },
    } satisfies VirtualFile;
  });

  pages.sort((a, b) => {
    const titleA = (a as { data: { title: string } }).data.title.toLowerCase();
    const titleB = (b as { data: { title: string } }).data.title.toLowerCase();
    return titleA.localeCompare(titleB);
  });

  return {
    files: [...pages, ...meta],
  };
}
