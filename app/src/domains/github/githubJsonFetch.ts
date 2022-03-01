import environment from '@/environment';
import getEnvVar from '@/lib/getEnvVar';

import { githubSwrKey } from './api-url';
import { GithubReposSearchParams, RawGithubReposData } from './types';

function getHeaders(): HeadersInit {
  const headers: HeadersInit = new Headers();
  headers.set('Accept', 'application/vnd.github.v3+json');
  headers.set('Authorization', `token ${environment.github.accessToken}`);

  return headers;
}

async function githubAuthFetch(uri: string): Promise<Response> {
  const res = await fetch(uri, {
    headers: getHeaders(),
  });

  return res;
}

export async function githubJsonFetch(
  uri: string,
): Promise<RawGithubReposData> {
  const reposResponse = await githubAuthFetch(uri);

  const data = await reposResponse.json();

  return data as RawGithubReposData;
}

export async function searchGithubRepos(
  params: Partial<GithubReposSearchParams>,
): Promise<RawGithubReposData> {
  const res = await fetch(
    getEnvVar('BASE_URL') + githubSwrKey.route('/search', params),
  );

  return res.json();
}
