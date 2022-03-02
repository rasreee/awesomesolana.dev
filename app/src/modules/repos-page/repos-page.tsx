import React from 'react';

import { reposSEO } from '@/app/seo';
import {
  SearchQueryContext,
  useSearchQuery,
} from '@/contexts/search-query-context';

import PageLayout from '../common/page-layout';
import { Pager } from './pager';
import ReposFetch, { ReposFetchProps } from './repos-fetch';
import { ReposResultsInfo } from './repos-results-info';
import ReposSearchControls from './repos-search-controls';

const getReposFetchProps = (
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
          page: 0,
          per_page: 10,
        },
      }
    : { route: '/browse', params: { page: 0, per_page: 10 } };

  return reposFetchProps;
};

const ReposPage = function ReposPage() {
  const searchQuery = useSearchQuery();
  const seo = reposSEO(searchQuery.term);

  const reposFetchProps = getReposFetchProps(searchQuery);

  const handleNext = () => {
    console.log('handleNext');
  };

  const handlePrev = () => {
    console.log('handlePrev');
  };

  return (
    <PageLayout seo={seo}>
      <div className="flex flex-col gap-5">
        <ReposSearchControls />
        <div>
          <div className="flex items-center justify-between">
            <ReposResultsInfo {...reposFetchProps} />
            <Pager
              page={reposFetchProps.params.page}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          </div>
          <ReposFetch {...reposFetchProps} />
        </div>
        <Pager
          page={reposFetchProps.params.page}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      </div>
    </PageLayout>
  );
};

export default ReposPage;
