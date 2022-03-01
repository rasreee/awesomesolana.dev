import { invariant } from '@awesomesolana/common';

import environment from '@/environment';

import { RawGithubReposData } from './types';

// function validateEnv(...envVars: string[]) {
//   const errors = envVars
//     .map((envVar) =>
//       process.env[envVar] ? '' : `env variable ${envVar} was undefined`,
//     )
//     .filter(Boolean);

//   invariant(errors.length === 0, errors.join('\n'));
// }

// validateEnv('GITHUB_ACCESS_TOKEN');

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
