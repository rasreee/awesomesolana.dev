import memoizeOne from 'memoize-one';

import { defaultPaginationParams, PaginationParams } from '@/lib/utils';
import { isEqualTag } from '@/modules/search/tags.utils';
import { Tag } from '@/modules/search/types';

import { GithubRepo, RawGitHubRepo } from './types';

export function parseRawGitHubRepo(data: RawGitHubRepo): GithubRepo {
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

function formatGitHubTopic(name: string) {
  return name.replaceAll('.', '').replaceAll(' ', '-').toLowerCase();
}

const memoizedFormatGithubTopic = memoizeOne(formatGitHubTopic);

function formatTagSearchParam(tag: Tag): string {
  if (tag.type === 'language') return `language:${tag.name}`;
  if (tag.type === 'topic') return `topic=${tag.name}`;
  if (tag.type === 'framework') {
    return `topic=${memoizedFormatGithubTopic(tag.name)}`;
  }
  return '';
}

const memoizedFormatTagParam = memoizeOne(formatTagSearchParam, ([a], [b]) =>
  isEqualTag(a, b),
);

export function formatGithubApiQuery({
  keywords = [],
  tags = [],
  per_page = defaultPaginationParams.per_page,
  page = defaultPaginationParams.page,
}: Partial<PaginationParams> &
  Partial<{ keywords: string[]; tags: Tag[] }>): string {
  const params = [
    ...keywords.map((keyword) => keyword.trim()),
    ...tags.map(memoizedFormatTagParam),
  ]
    .filter(Boolean)
    .join('+');

  const query = params.length ? `?q=${encodeURIComponent(params)}` : '';
  const pagination = `${query ? '&' : '?'}page=${page}&per_page=${per_page}`;

  return `${query}${pagination}`;
}
