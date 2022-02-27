import {
  githubApi,
  GithubReposBrowseParams,
  githubReposJsonFetch,
  RawGithubReposResponse,
} from '@core/github';
import { defaultPaginationParams } from '@utils/pagination';
import { NextApiRequest, NextApiResponse } from 'next';

export type GithubReposBrowseRequest = NextApiRequest & {
  query: Partial<GithubReposBrowseParams>;
};

export default async function githubReposBrowseApiHandler(
  req: GithubReposBrowseRequest,
  res: NextApiResponse<RawGithubReposResponse>,
) {
  const {
    page = defaultPaginationParams.page,
    per_page = defaultPaginationParams.per_page,
  } = req.query;

  const params = { page, per_page };

  const data = await githubReposJsonFetch(githubApi.browseRepos(params));

  return res.status(200).json(data);
}
