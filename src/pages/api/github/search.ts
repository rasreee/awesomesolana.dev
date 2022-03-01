import { NextApiRequest, NextApiResponse } from 'next';

import {
  githubApiUrl,
  githubReposJsonFetch,
  GithubReposResponse,
  GithubReposSearchParams,
} from '@/domains/github/api';
import { defaultPaginationParams } from '@/lib/utils';

export type GithubReposSearchRequest = NextApiRequest & {
  query: Partial<GithubReposSearchParams>;
};

export default async function githubApiHandler(
  req: GithubReposSearchRequest,
  res: NextApiResponse<GithubReposResponse>,
) {
  const {
    q = '',
    page = defaultPaginationParams.page,
    per_page = defaultPaginationParams.per_page,
    tags = [],
  } = req.query;

  const params = { q, page, per_page, tags };

  const data = await githubReposJsonFetch(githubApiUrl.searchRepos(params));

  return res.status(200).json(data);
}
