import { useSearchStore } from '@/stores/root-store';

import { GithubReposFeed, GithubReposProps } from './GithubReposFeed';

export function Results() {
  const store = useSearchStore();
  const shouldSearch = Boolean(
    store.reposSearch.tags.length || store.reposSearch.query.trim(),
  );

  const args: GithubReposProps = shouldSearch
    ? {
        route: '/search',
        params: {
          tags: store.reposSearch.tags,
          keywords: [store.reposSearch.query],
        },
      }
    : { route: '/browse' };

  return <GithubReposFeed {...args} />;
}
