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

export type GithubReposBrowseRequest = NextApiRequest & {
  query: Partial<GithubReposApiParams>;
};

export default async function githubReposBrowseApiHandler(
  req: GithubReposBrowseRequest,
  res: NextApiResponse<ApiData<RawGithubReposResponseData>>,
) {
  const {
    page = defaultPagination.page,
    per_page = defaultPagination.per_page,
  } = req.query;

  const params = { page, per_page };

  try {
    const data = await githubReposFetcher(
      githubApiUrl.browseRepos(params),
      environment.github.accessToken,
    );

    return res.status(200).json(data);
  } catch (err) {
    return res.status(401).json({ ...(err as ErrorData) });
  }
}
