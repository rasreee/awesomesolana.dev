import { GithubRepo } from './types';

export interface GetGithubReposParams {
  query: string;
  page?: number;
  perPage?: number;
}

const DEFAULT_PAGE_SIZE = 15;

export async function getGithubRepos(
  params: GetGithubReposParams,
): Promise<GithubRepo[]> {
  const { query, page = 0, perPage = DEFAULT_PAGE_SIZE } = params;

  if (!query.length) return [];

  const response = await fetch(
    `https://api.github.com/repos?page=${page}&per_page=${perPage}&sort=created`,
    {
      headers: {
        Authorization: `token ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    },
  );

  const data = await response.json();

  return data as GithubRepo[];
}
