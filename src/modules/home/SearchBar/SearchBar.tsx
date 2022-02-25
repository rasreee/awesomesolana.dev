import { searchFilters, Tag } from '@/api/tags';
import { useSearch } from '@/contexts/SearchContext';
import { SearchField, useSearchField } from '@/ui/components';

import { GroupedResults } from './GroupedResults';

export function SearchBar() {
  const { addFilter } = useSearch();

  const searchField = useSearchField(searchFilters);

  const onFilterClick = (tag: Tag) => {
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
