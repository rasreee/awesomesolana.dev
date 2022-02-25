import useSWR, { SWRResponse } from 'swr';

import { authFetch, fetcher } from '@/common/utils';
import { Tag } from '@/modules/tags';

import { parseRawGitHubRepo } from './helpers';
import { GitHubApiResponse, GitHubRepo, RawGitHubRepo } from './types';

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

export function useSearchGithubRepos(
  query: string,
  tags: Tag[],
): Pick<SWRResponse<GitHubRepo[], Error>, 'data' | 'error'> {
  function formatTagParam(tag: Tag): string {
    if (tag.category === 'language') return `language:${tag.name}`;
    if (tag.category === 'topic') return `topic:${tag.name}`;
    return '';
  }
  function formatQuery(query: string, tags: Tag[]): string {
    return ['solana', query, ...tags.map((tag) => formatTagParam(tag))]
      .filter(Boolean)
      .join('+');
  }

  const { data: rawData, error } = useSWR<GitHubApiResponse, Error>(
    tags.length ? `/api/github?q=${formatQuery(query, tags)}` : null,
    fetcher,
  );
  const data = rawData?.items.map(parseRawGitHubRepo);

  return { data, error };
}
