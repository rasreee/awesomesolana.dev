function formatGitHubTopic(name: string) {
  return name.replaceAll(".", "").replaceAll(" ", "-").toLowerCase();
}

function formatTagSearchParam(tag: Tag): string {
  if (tag.type === "language") return `language:${tag.name}`;
  if (tag.type === "topic") return `topic=${tag.name}`;
  if (tag.type === "framework") {
    return `topic=${formatGitHubTopic(tag.name)}`;
  }
  return "";
}

type Pagination = { page: number; per_page: number };

const defaultPagination = { page: 0, per_page: 10 };

function formatGithubApiQuery({
  keywords = [],
  tags = [],
  page = defaultPagination.page,
  per_page = defaultPagination.per_page,
}: Partial<Pagination> & Partial<{ keywords: string[]; tags: Tag[] }>): string {
  const params = [
    ...keywords.map((keyword) => keyword.trim()),
    ...tags.map(formatTagSearchParam),
  ]
    .filter(Boolean)
    .join("+");

  const query = params.length ? `?q=${params}` : "";
  const pagination = `${query ? "&" : "?"}page=${page}&per_page=${per_page}`;

  return `${query}${pagination}`;
}

const getSolanaGithubReposQueryUrl = (params: any) => {
  return [
    "/search/repositories",
    formatGithubApiQuery({ keywords: ["solana"], ...params }),
  ].join("");
};

export const githubApiUrl = {
  baseUrl: "https://api.github.com",
  browseRepos: (params: any = defaultPagination): string =>
    [githubApiUrl.baseUrl, getSolanaGithubReposQueryUrl(params)].join(""),
};

interface GithubUser {
  id: number;
  /* Username */
  login: string;
  /* Profile picture URL */
  avatar_url: string;
  /* User Profile URL */
  html_url: string;
}

interface RawGitHubRepo {
  id: number;
  /* Handle for the repo */
  name: string;
  full_name: string;
  /* Description of the repo */
  description: string;
  /* Programming language the repo was written with */
  language: string;
  /* Repo Profile URL */
  html_url: string;
  /* When the repo was created */
  created_at: DateString;
  /* When the repo was pushed to */
  pushed_at: DateString;
  /* When the repo was updated */
  updated_at: DateString;
  /* Number of forks */
  forks_count: number;
  /* Number of stars */
  stargazers_count: number;
  /* Number of waters */
  watchers_count: number;
  /* Number of open issues */
  open_issues_count: number;
  /* Owner of the repo */
  owner: GithubUser;
  topics: string[];
  license?: {
    key: string;
    name: string;
    node_id: string;
    url: string;
    spdx_id: string;
  };
}

interface RawGithubReposResponse {
  incomplete_results: boolean;
  items: RawGitHubRepo[];
  total_count: number;
}

import fetch from "node-fetch";
import { Headers, HeadersInit } from "node-fetch";

import environment from "./environment";
import { DateString, Tag } from "./types";

function getHeaders(): HeadersInit {
  const headers = new Headers();
  headers.set("Accept", "application/vnd.github.v3+json");
  headers.set("Authorization", `token ${environment.github.accessToken}`);

  return headers;
}

const githubAuthFetch = async (uri: string) => {
  const res = await fetch(uri, {
    headers: getHeaders(),
  });

  return res;
};

export async function githubJsonFetch(
  uri: string
): Promise<RawGithubReposResponse> {
  const reposResponse = await githubAuthFetch(uri);

  const data = (await reposResponse.json()) as RawGithubReposResponse;

  return data;
}
