import { Tag } from '@core/search';
import { PaginationParams } from '@utils';

import { formatGithubApiQuery } from './helpers';

export interface GithubReposSearchParams extends PaginationParams {
  keywords: string[];
  tags: Tag[];
}

export interface GithubReposBrowseParams extends PaginationParams {}

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
