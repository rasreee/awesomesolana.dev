import { useSearchStore } from '../SearchStore';
import { GithubReposFeed, GithubReposProps } from './GithubReposFeed';

export function Results() {
  const store = useSearchStore();
  const shouldSearch = Boolean(
    store.tags.length || store.searchForm.query.trim(),
  );

  const args: GithubReposProps = shouldSearch
    ? {
        route: '/search',
        params: { tags: store.tags, keywords: [store.searchForm.query] },
      }
    : { route: '/browse' };

  return <GithubReposFeed {...args} />;
}
