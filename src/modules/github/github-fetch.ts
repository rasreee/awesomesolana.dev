import { RawGithubReposResponse } from './types';

function getHeaders(): HeadersInit {
  const headers: HeadersInit = new Headers();
  headers.set('Accept', 'application/vnd.github.v3+json');
  process.env.GITHUB_ACCESS_TOKEN &&
    headers.set('Authorization', `token ${process.env.GITHUB_ACCESS_TOKEN}`);

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

  const data = (await reposResponse.json()) as RawGithubReposResponse;

  return data;
}
