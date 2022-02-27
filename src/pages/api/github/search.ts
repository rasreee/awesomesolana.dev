import {
  githubApi,
  githubReposJsonFetch,
  GithubReposSearchParams,
  RawGithubReposResponse,
} from '@core/github';
import { DEFAULT_PAGINATION_PARAMS } from '@utils';
import { NextApiRequest, NextApiResponse } from 'next';

export type GithubReposSearchRequest = NextApiRequest & {
  query: Partial<GithubReposSearchParams>;
};

export default async function githubApiHandler(
  req: GithubReposSearchRequest,
  res: NextApiResponse<RawGithubReposResponse>,
) {
  const {
    q = '',
    page = DEFAULT_PAGINATION_PARAMS.page,
    per_page = DEFAULT_PAGINATION_PARAMS.per_page,
    tags = [],
  } = req.query;

  const params = { q, page, per_page, tags };

  const data = await githubReposJsonFetch(githubApi.searchRepos(params));

  return res.status(200).json(data);
}
