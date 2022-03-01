import environment from '@/environment';

import {
  GithubRepo,
  GithubReposResponse,
  RawGitHubRepo,
  RawGithubReposResponse,
} from './types';

export function parseRawGitHubRepo(data: RawGitHubRepo): GithubRepo {
  return {
    id: data.id,
    name: data.name,
    fullName: data.full_name,
    description: data.description,
    language: data.language,
    htmlUrl: data.html_url,
    starsCount: data.stargazers_count,
    watchersCount: data.watchers_count,
    forksCount: data.forks_count,
    openIssuesCount: data.open_issues_count,
    pushedAt: data.pushed_at,
    updatedAt: data.updated_at,
    createdAt: data.created_at,
    topics: data.topics,
    license: data.license,
    owner: data.owner,
  };
}

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
): Promise<GithubReposResponse> {
  const reposResponse = await githubAuthFetch(uri);

  const data = (await reposResponse.json()) as RawGithubReposResponse;

  console.log('URL:', uri);
  console.log('DATA:');
  console.log(data);

  const result: GithubReposResponse = {
    totalCount: data.total_count,
    incompleteResults: data.incomplete_results,
    items: data.items.map(parseRawGitHubRepo),
  };

  return result;
}
