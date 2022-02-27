import useSWR from 'swr';

import {
  GithubReposBrowseParams,
  GithubReposSearchParams,
  githubSwrKey,
} from './api';
import { parseRawGitHubRepo } from './helpers';
import { GithubRepo, RawGithubReposResponse } from './types';

export type UseGithubReposApi = {
  data: GithubRepo[] | undefined;
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

  const repos = rawData?.items.map(parseRawGitHubRepo);

  return { data: repos, error };
}

export function useBrowseGithubRepos(
  params?: Partial<GithubReposBrowseParams>,
): UseGithubReposApi {
  return useGithubReposApi('/browse', params);
}

export function useSearchGithubRepos(
  params?: Partial<GithubReposSearchParams>,
): UseGithubReposApi {
  return useGithubReposApi('/search', params);
}
