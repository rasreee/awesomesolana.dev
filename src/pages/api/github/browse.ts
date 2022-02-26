import {
  githubApi,
  GitHubApiResponse,
  githubFetch,
  GithubReposBrowseParams,
} from '@modules/github';
import { DEFAULT_PAGINATION_PARAMS } from '@utils';
import { NextApiRequest, NextApiResponse } from 'next';

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

  const reposResponse = await githubFetch(githubApi.browseRepos(params));

  const data = (await reposResponse.json()) as GitHubApiResponse;

  return res.status(200).json(data);
}
