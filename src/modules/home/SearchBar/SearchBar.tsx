import { SearchFilter, searchFilters } from '@/api/filters';
import { useSearch } from '@/contexts/SearchContext';
import { SearchField, useSearchField } from '@/modules/search';

import { GroupedResults } from './GroupedResults';

export function SearchBar() {
  const { addFilter } = useSearch();

  const searchField = useSearchField(searchFilters);

  const onFilterClick = (tag: SearchFilter) => {
    addFilter(tag);
    searchField.reset();
  };

  return (
    <>
      <SearchField autoFocused {...searchField} />
      <GroupedResults
        isOpen={searchField.hits.length > 0 && !searchField.isRequesting}
        hits={searchField.hits}
        onFilterClick={onFilterClick}
        onRequestClose={searchField.reset}
      />
    </>
  );
}
