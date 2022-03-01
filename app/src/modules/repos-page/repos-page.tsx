import { reposSEO } from '@/app/seo';
import { useSearchQuery } from '@/contexts/search-query-context';
import { toTag } from '@/domains/tags/tags.utils';
import { TagType } from '@/domains/tags/types';
import { SearchQuery } from '@/lib/searchQuery';

import PageLayout from '../common/page-layout';
import ReposFetch, { ReposFetchProps } from './repos-fetch';
import ReposSearchControls from './repos-search-controls';

const computeReposFetchProps = (searchQuery: SearchQuery): ReposFetchProps => {
  const shouldSearch = Boolean(
    Object.values(searchQuery).length || searchQuery.term.trim(),
  );

  const reposFetchProps: ReposFetchProps = shouldSearch
    ? {
        route: '/search',
        params: {
          tags: Object.entries(searchQuery)
            .filter(([key]) => key !== 'query')
            .map(([type, value]) =>
              toTag({ type: type as TagType, name: value }),
            ),
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
