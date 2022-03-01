import {
  ApiData,
  defaultPagination,
  ErrorData,
  githubApiUrl,
  GithubReposApiParams,
  githubReposFetcher,
  RawGithubReposResponseData,
} from '@awesomesolana/common';
import { NextApiRequest, NextApiResponse } from 'next';

import environment from '@/environment';

export type GithubReposSearchRequest = NextApiRequest & {
  query: Partial<GithubReposApiParams>;
};

export default async function githubApiHandler(
  req: GithubReposSearchRequest,
  res: NextApiResponse<ApiData<RawGithubReposResponseData>>,
) {
  const {
    q = '',
    page = defaultPagination.page,
    per_page = defaultPagination.per_page,
    tags = [],
  } = req.query;

  const params = { q, page, per_page, tags };
  try {
    const data = await githubReposFetcher(
      githubApiUrl.searchRepos(params),
      environment.github.accessToken,
    );

    return res.status(200).json(data);
  } catch (err) {
    return res.status(401).json({ ...(err as ErrorData) });
  }
}
