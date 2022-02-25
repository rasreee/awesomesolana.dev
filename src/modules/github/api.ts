import { PaginationParams } from '@/common/utils';
import { Tag } from '@/modules/tags';

import { formatGithubApiQuery } from './helpers';

export interface GithubReposSearchParams extends PaginationParams {
  q: string;
  filters: Tag[];
}

export interface GithubReposBrowseParams extends PaginationParams {}

export const githubApi = {
  baseUrl: 'https://api.github.com',
  searchRepos: ({ page, per_page, filters, q }: GithubReposSearchParams) =>
    [
      githubApi.baseUrl,
      `/search/repositories`,
      formatGithubApiQuery({ q, filters, page, per_page }),
    ].join(''),
  browseRepos: ({ page, per_page }: GithubReposBrowseParams) =>
    [
      githubApi.baseUrl,
      `/search/repositories`,
      formatGithubApiQuery({ page, per_page }),
    ].join(''),
};
