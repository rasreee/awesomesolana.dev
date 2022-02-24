export interface GithubUser {
  id: number;
  /* Username */
  login: string;
  /* Profile picture URL */
  avatar_url: string;
  /* User Profile URL */
  html_url: string;
}

export interface GithubRepo {
  id: number;
  /* Handle for the repo */
  name: string;
  /* Description of the repo */
  description: string;
  /* Programming language the repo was written with */
  language: string;
  /* Repo Profile URL */
  html_url: string;
  /* When the repo was created */
  created_at: DateString;
  /* When the repo was pushed to */
  pushed_at: DateString;
  /* When the repo was updated */
  updated_at: DateString;
  /* Number of forks */
  forks_count: number;
  /* Number of stars */
  stargazers_count: number;
  /* Number of waters */
  watchers_count: number;
  /* Number of open issues */
  open_issues_count: number;
  /* Owner of the repo */
  owner: GithubUser;
}
