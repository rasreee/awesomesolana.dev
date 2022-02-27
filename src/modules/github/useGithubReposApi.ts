import useSWR from 'swr';

import {
  GithubReposBrowseParams,
  GithubReposSearchParams,
  githubSwrKey,
} from './api';
import { GithubReposResponse } from './types';

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
  const { data, error } = useSWR<GithubReposResponse, Error>(
    shouldFetch ? githubSwrKey.route(route, params) : null,
  );

  return { data, error };
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
