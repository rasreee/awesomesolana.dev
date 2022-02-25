import useSWR from 'swr';

import { formatGithubApiQuery } from '.';
import { GithubReposBrowseParams, GithubReposSearchParams } from './api';
import { parseRawGitHubRepo } from './helpers';
import { GitHubApiResponse, GitHubRepo } from './types';

const swrKey = {
  githubReposApi: <Route extends '/search' | '/browse'>(
    route: '/search' | '/browse',
    params: Route extends '/search'
      ? Partial<GithubReposSearchParams>
      : Partial<GithubReposBrowseParams> = {},
  ) => [`/api/github` + route, formatGithubApiQuery(params)].join(''),
};

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
    shouldFetch ? swrKey.githubReposApi(route, params) : null,
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
  const { data: rawData, error } = useSWR<GitHubApiResponse, Error>(
    swrKey.githubReposApi('/browse', params),
  );

  const repos = rawData?.items.map(parseRawGitHubRepo);

  return { data: repos, error };
}

export function useSearchGithubRepos(
  params?: Partial<GithubReposSearchParams>,
): {
  data: GitHubRepo[] | undefined;
  error: Error | undefined;
} {
  const { data: rawData, error } = useSWR<GitHubApiResponse, Error>(
    swrKey.githubReposApi('/search', params),
  );

  const repos = rawData?.items.map(parseRawGitHubRepo);

  return { data: repos, error };
}
