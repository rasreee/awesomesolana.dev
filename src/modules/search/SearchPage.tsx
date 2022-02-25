import { useAppSearchField } from '@/app/AppContext';

import {
  FilterCategoriesBar,
  FilterCategoriesControls,
  FilterCategoryMenu,
  GithubReposFeed,
  GithubReposProps,
  SearchField,
} from './components';
import { useSearchState } from './hooks';

export function SearchPage() {
  const searchField = useAppSearchField();

  return (
    <div className="flex-1 px-3 sm:px-6">
      <div className="flex flex-col gap-2">
        <SearchField autoFocused {...searchField} />
        <Filters />
      </div>
      <Results />
    </div>
  );
}

function Results() {
  const { filters, query } = useSearchState();
  const shouldSearch = Boolean(filters.length || query.trim());
  const args: GithubReposProps = shouldSearch
    ? { route: '/search', params: { filters, keywords: [query] } }
    : { route: '/browse' };

  return <GithubReposFeed {...args} />;
}

function Filters() {
  return (
    <FilterCategoriesBar>
      <FilterCategoriesControls />
      <FilterCategoryMenu />
    </FilterCategoriesBar>
  );
}
