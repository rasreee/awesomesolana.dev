import { useMemo } from 'react';
import useSWR from 'swr';

import {
  GithubReposBrowseParams,
  GithubReposData,
  GithubReposSearchParams,
  githubSwrKey,
  parseRawGitHubRepo,
  RawGithubReposData,
} from '@/domains/github';
import { ApiData, isApiError } from '@/lib/api';

export type UseGithubReposApi = {
  data: ApiData<GithubReposData> | undefined;
  error: Error | undefined;
};

export function useGithubReposApi<Route extends '/search' | '/browse'>(
  route: Route,
  params?: Route extends '/search'
    ? Partial<GithubReposSearchParams>
    : Partial<GithubReposBrowseParams>,
  shouldFetch = true,
): UseGithubReposApi {
  const { data: rawData, error } = useSWR<ApiData<RawGithubReposData>, Error>(
    shouldFetch ? githubSwrKey.route(route, params) : null,
  );

  const data = useMemo(() => {
    if (!rawData || isApiError(rawData)) {
      return rawData;
    }

    return {
      totalCount: rawData.total_count,
      incompleteResults: rawData.incomplete_results,
      items: rawData.items.map(parseRawGitHubRepo),
    } as GithubReposData;
  }, [rawData]);

  return { data, error };
}
