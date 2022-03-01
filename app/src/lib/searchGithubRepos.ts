import {
  GithubReposApiParams,
  RawGithubReposResponseData,
} from '@awesomesolana/common';

import getEnvVar from '@/lib/getEnvVar';

import { githubSwrKey } from './githubSwrKey';

export async function searchGithubRepos(
  params: Partial<GithubReposApiParams>,
): Promise<RawGithubReposResponseData> {
  const res = await fetch(
    getEnvVar('BASE_URL') + githubSwrKey.route('/search', params),
  );

  return res.json();
}
