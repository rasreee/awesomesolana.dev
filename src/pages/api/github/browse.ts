import {
  githubApi,
  GithubReposBrowseParams,
  githubReposJsonFetch,
  GithubReposResponse,
} from '@core/github';
import { DEFAULT_PAGINATION_PARAMS } from '@utils';
import { NextApiRequest, NextApiResponse } from 'next';

export type GithubReposBrowseRequest = NextApiRequest & {
  query: Partial<GithubReposBrowseParams>;
};

export default async function githubReposBrowseApiHandler(
  req: GithubReposBrowseRequest,
  res: NextApiResponse<GithubReposResponse>,
) {
  const {
    page = DEFAULT_PAGINATION_PARAMS.page,
    per_page = DEFAULT_PAGINATION_PARAMS.per_page,
  } = req.query;

  const params = { page, per_page };

  const data = await githubReposJsonFetch(githubApi.browseRepos(params));

  return res.status(200).json(data);
}
