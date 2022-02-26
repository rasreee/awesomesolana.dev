import { useSearchState } from '@/hooks/useSearchState';

import { GithubReposFeed, GithubReposProps } from './GithubReposFeed';

export function Results() {
  const { filters, query } = useSearchState();
  const shouldSearch = Boolean(filters.length || query.trim());

  const args: GithubReposProps = shouldSearch
    ? { route: '/search', params: { filters, keywords: [query] } }
    : { route: '/browse' };

  return <GithubReposFeed {...args} />;
}
