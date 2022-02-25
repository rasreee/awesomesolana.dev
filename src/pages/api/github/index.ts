import { NextApiRequest, NextApiResponse } from 'next';

import { authFetch, normalizeQueryParam } from '@/common/utils';
import { githubApi, GitHubApiResponse } from '@/modules/github';

export default async function githubApiHandler(
  req: NextApiRequest,
  res: NextApiResponse<GitHubApiResponse>,
) {
  const q = normalizeQueryParam(req.query.q);
  const reposResponse = await authFetch(githubApi.searchRepos(q));

  const data = (await reposResponse.json()) as GitHubApiResponse;

  return res.status(200).json(data);
}
