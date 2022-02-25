import React from 'react';

import { useAppSearchField } from '@/app/AppContext';

import {
  BrowseResults,
  FilterCategoriesBar,
  FilterCategoriesControls,
  FilterCategoryMenu,
  SearchField,
  SearchResults,
} from './components';
import { useSearchState } from './hooks';

export function SearchPage() {
  const searchField = useAppSearchField();
  const { filters, query } = useSearchState();
  const shouldSearch = Boolean(filters.length || query.trim());

  return (
    <div className="flex-1 px-3 sm:px-6">
      <div className="flex flex-col gap-2">
        <SearchField autoFocused {...searchField} />
        <FilterCategories />
      </div>

      {shouldSearch ? (
        <div>
          SEARCH RESULTS
          <SearchResults />
        </div>
      ) : (
        <div>
          BROWSE RESULTS
          <BrowseResults />
        </div>
      )}
    </div>
  );
}

function FilterCategories() {
  return (
    <FilterCategoriesBar>
      <FilterCategoriesControls />
      <FilterCategoryMenu />
    </FilterCategoriesBar>
  );
}
