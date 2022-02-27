import { NextApiRequest, NextApiResponse } from 'next';

import { defaultPaginationParams } from '@/lib/utils';
import {
  githubApi,
  githubReposJsonFetch,
  GithubReposSearchParams,
  RawGithubReposResponse,
} from '@/modules/github';

export type GithubReposSearchRequest = NextApiRequest & {
  query: Partial<GithubReposSearchParams>;
};

export default async function githubApiHandler(
  req: GithubReposSearchRequest,
  res: NextApiResponse<RawGithubReposResponse>,
) {
  const {
    q = '',
    page = defaultPaginationParams.page,
    per_page = defaultPaginationParams.per_page,
    tags = [],
  } = req.query;

  const params = { q, page, per_page, tags };

  const data = await githubReposJsonFetch(githubApi.searchRepos(params));

  return res.status(200).json(data);
}
