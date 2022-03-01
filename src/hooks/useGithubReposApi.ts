import { useMemo } from 'react';
import useSWR from 'swr';

import {
  GithubReposBrowseParams,
  GithubReposResponse,
  GithubReposSearchParams,
  githubSwrKey,
  parseRawGitHubRepo,
  RawGithubReposResponse,
} from '@/domains/github';

export type UseGithubReposApi = {
  data: GithubReposResponse | undefined;
  error: Error | undefined;
};

export function useGithubReposApi<Route extends '/search' | '/browse'>(
  route: Route,
  params?: Route extends '/search'
    ? Partial<GithubReposSearchParams>
    : Partial<GithubReposBrowseParams>,
  shouldFetch = true,
): UseGithubReposApi {
  const { data: rawData, error } = useSWR<RawGithubReposResponse, Error>(
    shouldFetch ? githubSwrKey.route(route, params) : null,
  );

  const data = useMemo(() => {
    if (!rawData) {
      return undefined;
    }
    return {
      totalCount: rawData.total_count,
      incompleteResults: rawData.incomplete_results,
      items: rawData.items.map(parseRawGitHubRepo),
    };
  }, [rawData]);

  return { data, error };
}
