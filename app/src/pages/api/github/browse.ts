import { NextApiRequest, NextApiResponse } from 'next';

import {
  githubApiUrl,
  githubJsonFetch,
  GithubReposBrowseParams,
  RawGithubReposData,
} from '@/domains/github';
import { ApiData, ErrorData } from '@/lib/api';
import { defaultPaginationParams } from '@/lib/pagination';

export type GithubReposBrowseRequest = NextApiRequest & {
  query: Partial<GithubReposBrowseParams>;
};

export default async function githubReposBrowseApiHandler(
  req: GithubReposBrowseRequest,
  res: NextApiResponse<ApiData<RawGithubReposData>>,
) {
  const {
    page = defaultPaginationParams.page,
    per_page = defaultPaginationParams.per_page,
  } = req.query;

  const params = { page, per_page };

  try {
    const data = await githubJsonFetch(githubApiUrl.browseRepos(params));

    return res.status(200).json(data);
  } catch (err) {
    return res.status(401).json({ ...(err as ErrorData) });
  }
}
