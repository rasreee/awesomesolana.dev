import { githubApiQuery, GithubReposApiParams } from '@awesomesolana/common';

export const githubSwrKey = {
  route: <Route extends '/search' | '/browse'>(
    route: Route,
    params: Partial<GithubReposApiParams> = {},
  ) => [`/api/github` + route, githubApiQuery(params)].join(''),
};
