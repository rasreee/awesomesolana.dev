import dynamic from 'next/dynamic';

import { useRootStore } from '@/stores/root-store';

import type { GithubReposProps } from './GithubReposFeed';

const GithubReposFeed = dynamic(() => import('./GithubReposFeed'));

function Results() {
  const store = useRootStore();
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

export default Results;
