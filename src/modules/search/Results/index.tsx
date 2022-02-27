import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';

import { useGithubReposApi } from '@/core/github';
import { useRootStore } from '@/stores/root-store';
import { ErrorMessage } from '@/ui/components/ErrorMessage';

import type { GithubApiParams } from './GithubReposFeed';

const GithubReposFeed = dynamic(() => import('./GithubReposFeed'));

const Results = observer(function Results() {
  const store = useRootStore();
  const shouldSearch = Boolean(
    store.reposSearch.tags.length || store.reposSearch.query.trim(),
  );

  const config = shouldSearch
    ? {
        route: '/search' as const,
        params: {
          tags: store.reposSearch.tags,
          keywords: [store.reposSearch.query],
        } as GithubApiParams,
      }
    : { route: '/browse' as const, params: {} as GithubApiParams };

  const { data, error } = useGithubReposApi(config.route, config.params);

  if (error) return <ErrorMessage>{error?.message}</ErrorMessage>;

  if (!data) return <ul>...</ul>;

  return <GithubReposFeed data={data} tags={config.params.tags} />;
});

export default Results;
