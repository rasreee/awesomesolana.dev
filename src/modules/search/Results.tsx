import { GithubReposFeed, GithubReposProps } from './components';
import { useSearchState } from './hooks';

export function Results() {
  const { filters, query } = useSearchState();
  const shouldSearch = Boolean(filters.length || query.trim());
  const args: GithubReposProps = shouldSearch
    ? { route: '/search', params: { filters, keywords: [query] } }
    : { route: '/browse' };

  return <GithubReposFeed {...args} />;
}
