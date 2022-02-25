import { NextApiRequest, NextApiResponse } from 'next';

import { authFetch, normalizeQueryParam } from '@/common/utils';
import { githubApi } from '@/modules/github/helpers';
import { GitHubApiResponse } from '@/modules/github/types';

export default async function githubApiHandler(
  req: NextApiRequest,
  res: NextApiResponse<GitHubApiResponse>,
) {
  const q = normalizeQueryParam(req.query.q);
  const reposResponse = await authFetch(githubApi.searchRepos(q));

  const data = (await reposResponse.json()) as GitHubApiResponse;

  return res.status(200).json(data);
}
