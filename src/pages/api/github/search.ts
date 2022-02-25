import { NextApiRequest, NextApiResponse } from 'next';

import { authFetch, DEFAULT_PAGINATION_PARAMS } from '@/common/utils';
import { GitHubApiResponse } from '@/modules/github';
import { githubApi, GithubReposSearchParams } from '@/modules/github/api';

export type GitHubSearchReposRequest = NextApiRequest & {
  query: Partial<GithubReposSearchParams>;
};

export default async function githubApiHandler(
  req: GitHubSearchReposRequest,
  res: NextApiResponse<GitHubApiResponse>,
) {
  const {
    q = '',
    page = DEFAULT_PAGINATION_PARAMS.page,
    per_page = DEFAULT_PAGINATION_PARAMS.per_page,
    filters = [],
  } = req.query;

  const params = { q, page, per_page, filters };

  const reposResponse = await authFetch(githubApi.searchRepos(params));

  const data = (await reposResponse.json()) as GitHubApiResponse;

  return res.status(200).json(data);
}
