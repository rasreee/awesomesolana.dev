import { SearchFilter, searchFilters } from '@/api/filters';
import { useSearch } from '@/contexts/search';
import { SearchField, useSearchField } from '@/modules/search';
import { Popover } from '@/ui/components';

import { GroupedSearchMenu } from './GroupedSearchMenu';

export function SearchBar() {
  const { addFilter } = useSearch();

  const searchField = useSearchField(searchFilters);
  const { hits, reset } = searchField;

  const onFilterClick = (tag: SearchFilter) => {
    addFilter(tag);
    reset();
  };

  return (
    <>
      <SearchField {...searchField} />
      <Popover
        className="bg-surface overflow-hidden py-5 px-3"
        isOpen={hits.length > 0 && !searchField.isRequesting}
        onRequestClose={reset}
      >
        <GroupedSearchMenu tags={hits} onFilterClick={onFilterClick} />
      </Popover>
    </>
  );
}
