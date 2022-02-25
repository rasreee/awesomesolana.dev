import { authFetch } from '@/common/utils';
import { Tag } from '@/modules/tags';

import { githubApi } from './helpers';
import { RawGitHubRepo } from './types';

export interface GetGithubReposParams {
  query: string;
  tags?: Tag[];
  page?: number;
  perPage?: number;
}

const DEFAULT_PAGE_SIZE = 15;

export async function getGithubRepos(
  params: GetGithubReposParams,
): Promise<RawGitHubRepo[]> {
  const { query, page = 0, perPage = DEFAULT_PAGE_SIZE } = params;

  if (!query.length) return [];

  const response = await authFetch(
    `https://api.github.com/repos?page=${page}&per_page=${perPage}&sort=created`,
  );

  const data = await response.json();

  return data as RawGitHubRepo[];
}

export async function searchGitHubRepos(
  query: string,
  tags: Tag[],
): Promise<RawGitHubRepo[]> {
  console.log(
    'TAGS: ',
    tags.map((tag) => tag.name),
  );
  const url = githubApi.searchRepos(
    [
      'solana',
      query,
      ...tags.map((tag) =>
        tag.category === 'language' ? `language:${tag.name}` : '',
      ),
    ]
      .filter(Boolean)
      .join('+'),
  );

  console.log('SEARCH URL: ', url);
  const response = await authFetch(url);

  const data = (await response.json()) as RawGitHubRepo[];

  return data;
}
