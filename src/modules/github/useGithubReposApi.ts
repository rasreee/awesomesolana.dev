import useSWR from 'swr';

import {
  GithubReposBrowseParams,
  GithubReposSearchParams,
  githubSwrKey,
} from './api';
import { parseRawGitHubRepo } from './helpers';
import { GitHubApiResponse, GitHubRepo } from './types';

export function useGithubReposApi<Route extends '/search' | '/browse'>(
  route: Route,
  params?: Route extends '/search'
    ? Partial<GithubReposSearchParams>
    : Partial<GithubReposBrowseParams>,
  shouldFetch = true,
): {
  data: GitHubRepo[] | undefined;
  error: Error | undefined;
} {
  const { data: rawData, error } = useSWR<GitHubApiResponse, Error>(
    shouldFetch ? githubSwrKey.route(route, params) : null,
  );

  const repos = rawData?.items.map(parseRawGitHubRepo);

  return { data: repos, error };
}

export function useBrowseGithubRepos(
  params?: Partial<GithubReposBrowseParams>,
): {
  data: GitHubRepo[] | undefined;
  error: Error | undefined;
} {
  return useGithubReposApi('/browse', params);
}

export function useSearchGithubRepos(
  params?: Partial<GithubReposSearchParams>,
): {
  data: GitHubRepo[] | undefined;
  error: Error | undefined;
} {
  return useGithubReposApi('/search', params);
}
