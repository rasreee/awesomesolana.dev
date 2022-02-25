import { useAppSearchField } from '@/app/AppContext';

import {
  FilterCategoriesBar,
  FilterCategoriesControls,
  FilterCategoryMenu,
  Results,
  SearchField,
} from './components';

export function SearchPage() {
  const searchField = useAppSearchField();

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
