import memoizeOne from 'memoize-one';

import { Tag } from '@/domains/tags/tags.types';
import { isEqualTag } from '@/domains/tags/tags.utils';
import { defaultPaginationParams, PaginationParams } from '@/lib/pagination';

import { GithubReposBrowseParams, GithubReposSearchParams } from './types';

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

function formatGithubApiQuery({
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

  const query = params.length ? `?q=${params}` : '';
  const pagination = `${query ? '&' : '?'}page=${page}&per_page=${per_page}`;

  return `${query}${pagination}`;
}

export const githubApiRoute = {
  searchRepos: (params?: Partial<GithubReposSearchParams>) =>
    [
      `/search/repositories`,
      formatGithubApiQuery({ keywords: ['solana'], ...params }),
    ].join(''),
  browseRepos: (params?: Partial<GithubReposBrowseParams>) =>
    [
      `/search/repositories`,
      formatGithubApiQuery({ keywords: ['solana'], ...params }),
    ].join(''),
};

export const githubApiUrl = {
  baseUrl: 'https://api.github.com',
  searchRepos: ({
    page,
    per_page,
    tags,
    keywords = [],
  }: Partial<GithubReposSearchParams>) =>
    [
      githubApiUrl.baseUrl,
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
      githubApiUrl.baseUrl,
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
