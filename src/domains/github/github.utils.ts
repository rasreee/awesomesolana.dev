import memoizeOne from 'memoize-one';

import { Tag } from '@/domains/tags/tags.types';
import { isEqualTag } from '@/domains/tags/tags.utils';
import { defaultPaginationParams, PaginationParams } from '@/lib/utils';

import {
  GithubRepo,
  GithubReposBrowseParams,
  GithubReposResponse,
  GithubReposSearchParams,
  RawGitHubRepo,
  RawGithubReposResponse,
} from './github.types';

export const githubApi = {
  baseUrl: 'https://api.github.com',
  searchRepos: ({
    page,
    per_page,
    tags,
    keywords = [],
  }: Partial<GithubReposSearchParams>) =>
    [
      githubApi.baseUrl,
      `/search/repositories`,
      formatGithubApiQuery({
        keywords: ['solana', ...keywords],
        tags,
        page,
        per_page,
      }),
    ].join(''),
  browseRepos: (params?: Partial<GithubReposBrowseParams>) =>
    [
      githubApi.baseUrl,
      `/search/repositories`,
      formatGithubApiQuery({ keywords: ['solana'], ...params }),
    ].join(''),
};

export const githubSwrKey = {
  route: <Route extends '/search' | '/browse'>(
    route: '/search' | '/browse',
    params: Route extends '/search'
      ? Partial<GithubReposSearchParams>
      : Partial<GithubReposBrowseParams> = {},
  ) => [`/api/github` + route, formatGithubApiQuery(params)].join(''),
};

export function parseRawGitHubRepo(data: RawGitHubRepo): GithubRepo {
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

function formatGitHubTopic(name: string) {
  return name.replaceAll('.', '').replaceAll(' ', '-').toLowerCase();
}

const memoizedFormatGithubTopic = memoizeOne(formatGitHubTopic);

function formatTagSearchParam(tag: Tag): string {
  if (tag.type === 'language') return `language:${tag.name}`;
  if (tag.type === 'topic') return `topic=${tag.name}`;
  if (tag.type === 'framework') {
    return `topic=${memoizedFormatGithubTopic(tag.name)}`;
  }
  return '';
}

const memoizedFormatTagParam = memoizeOne(formatTagSearchParam, ([a], [b]) =>
  isEqualTag(a, b),
);

export function formatGithubApiQuery({
  keywords = [],
  tags = [],
  per_page = defaultPaginationParams.per_page,
  page = defaultPaginationParams.page,
}: Partial<PaginationParams> &
  Partial<{ keywords: string[]; tags: Tag[] }>): string {
  const params = [
    ...keywords.map((keyword) => keyword.trim()),
    ...tags.map(memoizedFormatTagParam),
  ]
    .filter(Boolean)
    .join('+');

  const query = params.length ? `?q=${encodeURIComponent(params)}` : '';
  const pagination = `${query ? '&' : '?'}page=${page}&per_page=${per_page}`;

  return `${query}${pagination}`;
}

function getHeaders(): HeadersInit {
  const headers: HeadersInit = new Headers();
  headers.set('Accept', 'application/vnd.github.v3+json');
  process.env.GITHUB_ACCESS_TOKEN &&
    headers.set('Authorization', `token ${process.env.GITHUB_ACCESS_TOKEN}`);

  return headers;
}

async function githubAuthFetch(uri: string): Promise<Response> {
  const res = await fetch(uri, {
    headers: getHeaders(),
  });

  return res;
}

export async function githubReposJsonFetch(
  uri: string,
): Promise<GithubReposResponse> {
  const reposResponse = await githubAuthFetch(uri);

  const data = (await reposResponse.json()) as RawGithubReposResponse;

  const result: GithubReposResponse = {
    totalCount: data.total_count,
    incompleteResults: data.incomplete_results,
    items: data.items.map(parseRawGitHubRepo),
  };

  return result;
}
