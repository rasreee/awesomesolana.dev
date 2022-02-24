import { NextApiRequest, NextApiResponse } from 'next';

import { configs } from '@/common/configs';
import { GithubRepo } from '@/modules/github/types';

interface GetGithubReposResult {
  repos: GithubRepo[];
}

function getHeaders(): HeadersInit {
  const headers: HeadersInit = new Headers();
  headers.set('Accept', 'application/vnd.github.v3+json');
  process.env.GITHUB_ACCESS_TOKEN &&
    headers.set('Authorization', `token ${process.env.GITHUB_ACCESS_TOKEN}`);

  return headers;
}

export default async function githubApiHandler(
  _: NextApiRequest,
  res: NextApiResponse<GetGithubReposResult>,
) {
  const headers = getHeaders();

  const reposResponse = await fetch(
    `${configs.github.apiUrl}/user/repos?per_page=100`,
    {
      headers,
    },
  );

  const repos = await reposResponse.json();

  return res.status(200).json({
    repos,
  });
}
