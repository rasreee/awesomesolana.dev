import {
  GithubReposApiParams,
  RawGithubReposResponseData,
} from '@awesomesolana/common';
import { useMemo } from 'react';
import useSWR from 'swr';

import { GithubReposData } from '@/domains/github';
import { ApiData, isApiError } from '@/lib/api';
import { githubSwrKey } from '@/lib/githubSwrKey';
import { parseRawGitHubRepo } from '@/lib/parseRawGithubRepo';

export type UseGithubReposApi = {
  data: ApiData<GithubReposData> | undefined;
  error: Error | undefined;
};

export function useGithubReposApi<Route extends '/search' | '/browse'>(
  route: Route,
  params?: GithubReposApiParams,
  shouldFetch = true,
): UseGithubReposApi {
  const { data: rawData, error } = useSWR<
    ApiData<RawGithubReposResponseData>,
    Error
  >(shouldFetch ? githubSwrKey.route(route, params) : null);

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
