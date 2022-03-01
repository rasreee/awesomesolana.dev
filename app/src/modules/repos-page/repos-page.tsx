import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';

import { reposSEO } from '@/app/seo';
import { useGlobalStore } from '@/stores';

import PageLayout from '../common/page-layout';
import ReposFetch, { ReposFetchProps } from './repos-fetch';
import ReposSearchControls from './repos-search-controls';
import { ReposSearchStore } from './repos-search-store';

const computeReposFetchProps = (
  reposSearch: ReposSearchStore,
): ReposFetchProps =>
  computed(() => {
    const shouldSearch = Boolean(
      reposSearch.tags.length || reposSearch.query.trim(),
    );

    const reposFetchProps: ReposFetchProps = shouldSearch
      ? {
          route: '/search',
          params: {
            tags: reposSearch.tags,
            keywords: [reposSearch.query],
          },
        }
      : { route: '/browse' };

    return reposFetchProps;
  }).get();

const ReposPage = observer(function ReposPage() {
  const { reposSearch } = useGlobalStore();
  const seo = reposSEO(reposSearch.query);

  const reposFetchProps = computeReposFetchProps(reposSearch);

  return (
    <PageLayout seo={seo}>
      <div className="flex flex-col gap-5">
        <ReposSearchControls />
        <ReposFetch {...reposFetchProps} />
      </div>
    </PageLayout>
  );
});

export default ReposPage;
