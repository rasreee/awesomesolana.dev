import useSWR, { SWRResponse } from 'swr';

import { fetcher } from '@/common/utils';

import { Tag } from '../tags';
import { parseRawGitHubRepo } from './helpers';
import { GitHubApiResponse, GitHubRepo } from './types';

function frameworkTopic(name: string) {
  return name.replaceAll('.', '').replaceAll(' ', '-').toLowerCase();
}
function formatTagParam(tag: Tag): string {
  if (tag.category === 'language') return `language:${tag.name}`;
  if (tag.category === 'topic') return `topic:${tag.name}`;
  if (tag.category === 'framework') return `topic:${frameworkTopic(tag.name)}`;
  return '';
}
function formatQuery(query: string, tags: Tag[]): string {
  return ['solana', query, ...tags.map((tag) => formatTagParam(tag))]
    .filter(Boolean)
    .join('+');
}

export function useSearchGithubRepos(
  query: string,
  tags: Tag[],
): Pick<SWRResponse<GitHubRepo[], Error>, 'data' | 'error'> {
  const { data: rawData, error } = useSWR<GitHubApiResponse, Error>(
    tags.length ? `/api/github?q=${formatQuery(query, tags)}` : null,
    fetcher,
  );
  const data = rawData?.items.map(parseRawGitHubRepo);

  return { data, error };
}
