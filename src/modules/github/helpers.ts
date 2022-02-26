import { DEFAULT_PAGINATION_PARAMS, PaginationParams } from '@utils';

import { Tag } from '../tags';
import { GitHubRepo, RawGitHubRepo } from './types';

export function parseRawGitHubRepo(data: RawGitHubRepo): GitHubRepo {
  return {
    id: data.id,
    name: data.name,
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

export function formatGitHubTopic(name: string) {
  return name.replaceAll('.', '').replaceAll(' ', '-').toLowerCase();
}

function formatTagSearchParam(tag: Tag): string {
  if (tag.category === 'language') return `language:${tag.name}`;
  if (tag.category === 'topic') return `topic:${tag.name}`;
  if (tag.category === 'framework')
    return `topic:${formatGitHubTopic(tag.name)}`;
  return '';
}

export function formatGithubApiQuery({
  keywords = [],
  filters = [],
  per_page = DEFAULT_PAGINATION_PARAMS.per_page,
  page = DEFAULT_PAGINATION_PARAMS.page,
}: Partial<PaginationParams> &
  Partial<{ keywords: string[]; filters: Tag[] }>): string {
  const params = [
    ...keywords.map((keyword) => keyword.trim()),
    ...filters.map((tag) => formatTagSearchParam(tag)),
  ]
    .filter(Boolean)
    .join('+');

  const query = params.length ? `?q=${params}` : '';
  const pagination = `${query ? '&' : '?'}page=${page}&per_page=${per_page}`;

  return `${query}${pagination}`;
}
