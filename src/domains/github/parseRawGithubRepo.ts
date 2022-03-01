import { GithubRepo, RawGitHubRepo } from './types';

export function parseRawGitHubRepo(data: RawGitHubRepo): GithubRepo {
  return {
    id: data.id,
    name: data.name,
    fullName: data.full_name,
    description: data.description,
    language: data.language,
    htmlUrl: data.html_url,
    starsCount: data.stargazers_count,
    watchersCount: data.watchers_count,
    forksCount: data.forks_count,
    openIssuesCount: data.open_issues_count,
    pushedAt: data.pushed_at,
    updatedAt: data.updated_at,
    createdAt: data.created_at,
    topics: data.topics,
    license: data.license,
    owner: data.owner,
  };
}
