import { useSearchState } from '@core/search';

import { GithubReposFeed, GithubReposProps } from './GithubReposFeed';

export function Results() {
  const { tags, query } = useSearchState();
  const shouldSearch = Boolean(tags.length || query.trim());

  const args: GithubReposProps = shouldSearch
    ? { route: '/search', params: { tags, keywords: [query] } }
    : { route: '/browse' };

  return <GithubReposFeed {...args} />;
}
