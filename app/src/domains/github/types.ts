import { RawGithubUser } from '@awesomesolana/common';

export interface GithubRepo {
  id: number;
  /* Handle for the repo */
  name: string;
  fullName: string;
  /* Description of the repo */
  description: string;
  /* Programming language the repo was written with */
  language: string;
  /* Repo Profile URL */
  htmlUrl: string;
  /* When the repo was created */
  createdAt: DateString;
  /* When the repo was pushed to */
  pushedAt: DateString;
  /* When the repo was updated */
  updatedAt: DateString;
  /* Number of forks */
  forksCount: number;
  /* Number of stars */
  starsCount: number;
  /* Number of waters */
  watchersCount: number;
  /* Number of open issues */
  openIssuesCount: number;
  /* Owner of the repo */
  owner: RawGithubUser;
  topics: string[];
  license?: {
    key: string;
    name: string;
    node_id: string;
    url: string;
    spdx_id: string;
  };
}

export type GithubReposData = {
  totalCount: number;
  incompleteResults: boolean;
  items: GithubRepo[];
};
