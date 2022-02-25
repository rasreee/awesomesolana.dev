import type { ParsedUrlQuery } from 'querystring';

import { normalizeQueryParam } from '@/common/utils';

import { GitHubRepo, RawGitHubRepo } from './types';

/**
 * Parse query from urls like :
 * - `[owner]/[repository]`
 */
export function parseGithubQuery(query: ParsedUrlQuery): {
  owner: string;
  repositoryName: string;
} {
  return {
    owner: normalizeQueryParam(query.owner),
    repositoryName: normalizeQueryParam(query.repositoryName),
  };
}

const DEFAULT_PAGE_SIZE = 10;

export const githubApi = {
  baseUrl: 'https://api.github.com',
  searchRepos: (
    q: string,
    sort?: string,
    order?: string,
    per_page = DEFAULT_PAGE_SIZE,
    page = 0,
  ) =>
    [
      githubApi.baseUrl,
      `/search/repositories`,
      `?q=${q}` + `&page=${page}&per_page=${per_page}`,
    ].join(''),
};

export function parseRawGitHubRepo(data: RawGitHubRepo): GitHubRepo {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    language: data.language,
    htmlUrl: data.html_url,
    starsCount: data.stargazers_count,
    watchersCount: data.watchers_count,
    forksCount: data.forks_count,
    openIssuesCount: data.open_issues_count,
    pushedAt: data.pushed_at,
    updatedAt: data.updated_at,
    createdAt: data.created_at,
    topics: data.topics,
    license: data.license,
    owner: data.owner,
  };
}
