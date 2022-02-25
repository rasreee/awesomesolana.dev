import React from 'react';

import { useSubmitQuery } from '@/contexts/SearchContext';

import {
  FilterCategoriesBar,
  FilterCategoriesControls,
  FilterCategoryMenu,
  Results,
  SearchField,
  useSearchForm,
} from './components';

export function SearchPage() {
  const submitQuery = useSubmitQuery();

  const searchField = useSearchForm((query) => submitQuery(query));

  return (
    <div className="flex-1 px-3 sm:px-6">
      <div className="flex flex-col gap-2">
        <SearchField autoFocused {...searchField} />
        <FilterCategories />
      </div>
      <Results />
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
