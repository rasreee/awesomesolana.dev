import { NextApiRequest, NextApiResponse } from 'next';

import {
  githubApiUrl,
  githubJsonFetch,
  GithubReposSearchParams,
  RawGithubReposData,
} from '@/domains/github';
import { ApiData, ErrorData } from '@/lib/api';
import { defaultPaginationParams } from '@/lib/pagination';

export type GithubReposSearchRequest = NextApiRequest & {
  query: Partial<GithubReposSearchParams>;
};

export default async function githubApiHandler(
  req: GithubReposSearchRequest,
  res: NextApiResponse<ApiData<RawGithubReposData>>,
) {
  const {
    q = '',
    page = defaultPaginationParams.page,
    per_page = defaultPaginationParams.per_page,
    tags = [],
  } = req.query;

  const params = { q, page, per_page, tags };
  try {
    const data = await githubJsonFetch(githubApiUrl.searchRepos(params));

    return res.status(200).json(data);
  } catch (err) {
    return res.status(401).json({ ...(err as ErrorData) });
  }
}
