import { defaultPagination, Pagination } from "../pagination";
import { githubApiQuery } from "./query";
import type { GithubReposApiParams, RawGithubReposResponseData } from "./types";

function getHeaders(accessToken: string): HeadersInit {
  const headers = new Headers();
  headers.set("Accept", "application/vnd.github.v3+json");
  headers.set("Authorization", `token ${accessToken}`);

  return headers;
}

const githubAuthFetch = async (uri: string, accessToken: string) => {
  const res = await fetch(uri, {
    headers: getHeaders(accessToken),
  });

  return res;
};

const getSolanaGithubReposQueryUrl = (
  params: Partial<GithubReposApiParams | Pagination> = defaultPagination
) => {
  return [
    "/search/repositories",
    githubApiQuery({ keywords: ["solana"], ...params }),
  ].join("");
};

export const githubApiUrl = Object.freeze({
  baseUrl: "https://api.github.com",
  searchRepos: (params: Partial<GithubReposApiParams>): string =>
    [githubApiUrl.baseUrl, getSolanaGithubReposQueryUrl(params)].join(""),
  browseRepos: (params?: Partial<Pagination>): string =>
    [githubApiUrl.baseUrl, getSolanaGithubReposQueryUrl(params)].join(""),
});

export async function githubReposFetcher(
  uri: string,
  accessToken: string
): Promise<RawGithubReposResponseData> {
  const reposResponse = await githubAuthFetch(uri, accessToken);

  const data = (await reposResponse.json()) as RawGithubReposResponseData;

  return data;
}
