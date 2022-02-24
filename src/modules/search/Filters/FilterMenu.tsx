import { useState } from 'react';

import {
  filtersByType,
  SEARCH_FILTERS,
  SearchFilter,
  searchFilters,
  sortFiltersByProjectCount,
  toPluralFilterType,
} from '@/api/filters';
import { useSearch } from '@/contexts/search';
import { TextInput } from '@/ui/components';
import { clsxm } from '@/ui/utils';

import { FilterMenuOption } from './FilterMenuOption';

export function FilterMenu({ type }: { type: SearchFilter['type'] }) {
  const {
    search,
    addFilter,
    removeFilter,
    getFilterChecked,
    clearFiltersByType,
  } = useSearch();

  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  const [query, setQuery] = useState('');

  const onClickItem = (filter: SearchFilter) => () => {
    if (!getFilterChecked(filter)) {
      addFilter(filter);
    } else {
      removeFilter(filter);
    }
    setQuery('');
  };

  const previewOptions = filtersByType(SEARCH_FILTERS, type).slice(
    0,
    expanded ? 10 : 5,
  );

  const tagsToShow = sortFiltersByProjectCount(
    query ? searchFilters(query, { type }) : previewOptions,
  );

  const selectedCount = filtersByType(search.tags ?? [], type).length;

  const canShowMore = tagsToShow.length > 0;

  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  return (
    <div className="flex flex-col">
      <div
        className={clsxm(
          'flex items-center gap-1 rounded-md pr-3',
          'border border-base-300',
          focused && 'border-2 border-indigo-400',
          'dark:bg-base-1100 dark:bg-opacity-60',
        )}
      >
        <TextInput
          type="search"
          name={`${type}-filter-search`}
          value={query}
          onChange={setQuery}
          placeholder={`Search ${toPluralFilterType(type).toLowerCase()}...`}
          className={clsxm(
            'bg-transparent',
            'rounded-md text-sm leading-none placeholder:text-sm placeholder:leading-none',
          )}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {selectedCount > 0 && (
          <button
            onClick={() => clearFiltersByType(type)}
            className={clsxm(
              'bg-surface-1',
              'rounded-md py-1.5 px-2.5 text-sm leading-none transition hover:font-medium',
            )}
          >
            Clear
          </button>
        )}
      </div>
      <ul>
        {tagsToShow.map((tag) => (
          <FilterMenuOption
            key={`${tag.type}_${tag.name}`}
            tag={tag}
            onClick={onClickItem(tag)}
            checked={getFilterChecked(tag)}
          />
        ))}
      </ul>
      {canShowMore && (
        <button
          className="text max-w-max py-2 text-left text-base font-normal leading-none text-opacity-80 hover:font-medium hover:text-opacity-100"
          onClick={toggleExpanded}
        >
          Show {expanded ? 'less' : 'more'}
        </button>
      )}
    </div>
  );
}
