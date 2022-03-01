import environment from '@/environment';

import { RawGithubReposResponse } from './types';

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

export async function githubReposJsonFetch(
  uri: string,
): Promise<RawGithubReposResponse> {
  const reposResponse = await githubAuthFetch(uri);

  const data = await reposResponse.json();

  console.log('URL:', uri);
  console.log('DATA:');
  console.log(data);

  return data as RawGithubReposResponse;
}
