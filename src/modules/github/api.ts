import { PaginationParams } from '@/common/utils';
import { Tag } from '@/modules/tags';

import { formatGithubApiQuery } from './helpers';

export interface GithubReposSearchParams extends PaginationParams {
  keywords: string[];
  filters: Tag[];
}

export interface GithubReposBrowseParams extends PaginationParams {}

export const githubApi = {
  baseUrl: 'https://api.github.com',
  searchRepos: ({
    page,
    per_page,
    filters,
    keywords,
  }: GithubReposSearchParams) =>
    [
      githubApi.baseUrl,
      `/search/repositories`,
      formatGithubApiQuery({
        keywords: ['solana', ...keywords],
        filters,
        page,
        per_page,
      }),
    ].join(''),
  browseRepos: ({ page, per_page }: GithubReposBrowseParams) =>
    [
      githubApi.baseUrl,
      `/search/repositories`,
      formatGithubApiQuery({ keywords: ['solana'], page, per_page }),
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
