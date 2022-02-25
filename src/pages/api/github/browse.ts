import { NextApiRequest, NextApiResponse } from 'next';

import { authFetch, DEFAULT_PAGINATION_PARAMS } from '@/common/utils';
import {
  githubApi,
  GitHubApiResponse,
  GithubReposBrowseParams,
} from '@/modules/github';

export type GitHubBrowseReposRequest = NextApiRequest & {
  query: Partial<GithubReposBrowseParams>;
};

export default async function githubApiHandler(
  req: GitHubBrowseReposRequest,
  res: NextApiResponse<GitHubApiResponse>,
) {
  const {
    page = DEFAULT_PAGINATION_PARAMS.page,
    per_page = DEFAULT_PAGINATION_PARAMS.per_page,
  } = req.query;

  const params = { page, per_page };

  const reposResponse = await authFetch(githubApi.browseRepos(params));

  const data = (await reposResponse.json()) as GitHubApiResponse;

  return res.status(200).json(data);
}
