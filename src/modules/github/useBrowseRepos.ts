import useSWR from 'swr';

import { fetcher } from '@/common/utils';

import { parseRawGitHubRepo } from './helpers';
import { GitHubApiResponse, GitHubRepo } from './types';

export function useBrowseRepos(): {
  data: GitHubRepo[] | undefined;
  error: Error | undefined;
} {
  const { data: rawData, error } = useSWR<GitHubApiResponse, Error>(
    `/api/github/browse`,
    fetcher,
  );

  const repos = rawData?.items.map(parseRawGitHubRepo);

  return { data: repos, error };
}
