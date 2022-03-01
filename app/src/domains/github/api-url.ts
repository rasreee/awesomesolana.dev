import { Tag } from '@/domains/tags/types';
import { defaultPaginationParams, PaginationParams } from '@/lib/pagination';

import { GithubReposBrowseParams, GithubReposSearchParams } from './types';

function formatGitHubTopic(name: string) {
  return name.replaceAll('.', '').replaceAll(' ', '-').toLowerCase();
}

function formatTagSearchParam(tag: Tag): string {
  if (tag.type === 'language') return `language:${tag.name}`;
  if (tag.type === 'topic') return `topic=${tag.name}`;
  if (tag.type === 'framework') {
    return `topic=${formatGitHubTopic(tag.name)}`;
  }
  return '';
}

function formatGithubApiQuery({
  keywords = [],
  tags = [],
  per_page = defaultPaginationParams.per_page,
  page = defaultPaginationParams.page,
}: Partial<PaginationParams> &
  Partial<{ keywords: string[]; tags: Tag[] }>): string {
  const params = [
    ...keywords.map((keyword) => keyword.trim()),
    ...tags.map(formatTagSearchParam),
  ]
    .filter(Boolean)
    .join('+');

  const query = params.length ? `?q=${params}` : '';
  const pagination = `${query ? '&' : '?'}page=${page}&per_page=${per_page}`;

  return `${query}${pagination}`;
}

const getSolanaGithubReposQueryUrl = (
  params: Partial<
    GithubReposSearchParams | GithubReposBrowseParams
  > = defaultPaginationParams,
) => {
  return [
    '/search/repositories',
    formatGithubApiQuery({ keywords: ['solana'], ...params }),
  ].join('');
};

export const githubApiUrl = {
  baseUrl: 'https://api.github.com',
  searchRepos: (params: Partial<GithubReposSearchParams>): string =>
    [githubApiUrl.baseUrl, getSolanaGithubReposQueryUrl(params)].join(''),
  browseRepos: (params?: Partial<GithubReposBrowseParams>): string =>
    [githubApiUrl.baseUrl, getSolanaGithubReposQueryUrl(params)].join(''),
};

export const githubSwrKey = {
  route: <Route extends '/search' | '/browse'>(
    route: '/search' | '/browse',
    params: Route extends '/search'
      ? Partial<GithubReposSearchParams>
      : Partial<GithubReposBrowseParams> = {},
  ) => [`/api/github` + route, formatGithubApiQuery(params)].join(''),
};
