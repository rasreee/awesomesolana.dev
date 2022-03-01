import React from 'react';

import { reposSEO } from '@/app/seo';
import {
  SearchQueryContext,
  useSearchQuery,
} from '@/contexts/search-query-context';

import PageLayout from '../common/page-layout';
import ReposFetch, { ReposFetchProps } from './repos-fetch';
import ReposSearchControls from './repos-search-controls';

const computeReposFetchProps = (
  searchQuery: SearchQueryContext,
): ReposFetchProps => {
  const shouldSearch = Boolean(
    Object.values(searchQuery).length || searchQuery.term.trim(),
  );

  const reposFetchProps: ReposFetchProps = shouldSearch
    ? {
        route: '/search',
        params: {
          tags: searchQuery.tags,
          keywords: [searchQuery.term],
        },
      }
    : { route: '/browse' };

  return reposFetchProps;
};

const ReposPage = function ReposPage() {
  const searchQuery = useSearchQuery();
  const seo = reposSEO(searchQuery.term);

  const reposFetchProps = computeReposFetchProps(searchQuery);

  React.useEffect(() => {
    console.log({ reposFetchProps });
  }, [reposFetchProps]);

  return (
    <PageLayout seo={seo}>
      <div className="flex flex-col gap-5">
        <ReposSearchControls />
        <ReposFetch {...reposFetchProps} />
      </div>
    </PageLayout>
  );
};

export default ReposPage;
