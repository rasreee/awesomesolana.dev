import { useRouter } from 'next/router';
import React from 'react';

import { reposSEO } from '@/app/seo';
import {
  SearchQueryContext,
  useSearchQuery,
} from '@/contexts/search-query-context';
import { searchQuery } from '@/lib/searchQuery';

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
          term: searchQuery.term,
          page: searchQuery.page,
          per_page: searchQuery.per_page,
        },
      }
    : {
        route: '/browse',
        params: { per_page: searchQuery.per_page, page: searchQuery.page },
      };

  return reposFetchProps;
};

const ReposPage = function ReposPage() {
  const router = useRouter();

  const search = useSearchQuery();
  const seo = reposSEO(search.term);

  const reposFetchProps = getReposFetchProps(search);

  const handleNext = () => {
    console.log('Next');
    router.push(router.pathname, {
      query: searchQuery({
        tags: search.tags,
        term: search.term,
        page: search.page + 1,
        per_page: search.per_page,
      }),
    });
  };

  const handlePrev = () => {
    console.log('Prev');
    router.push(router.pathname, {
      query: searchQuery({
        tags: search.tags,
        term: search.term,
        page: search.page - 1,
        per_page: search.per_page,
      }),
    });
  };

  const handleJumpTo = (index: number) => {
    console.log('JumpTo - index: ' + index);
    router.push(router.pathname, {
      query: searchQuery({
        tags: search.tags,
        term: search.term,
        page: index,
        per_page: search.per_page,
      }),
    });
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
              jumpTo={handleJumpTo}
            />
          </div>
          <ReposFetch {...reposFetchProps} />
        </div>
        <Pager
          page={reposFetchProps.params.page}
          onNext={handleNext}
          onPrev={handlePrev}
          jumpTo={handleJumpTo}
        />
      </div>
    </PageLayout>
  );
};

export default ReposPage;
