import React, { useState } from 'react';

import {
  filtersByType,
  SEARCH_FILTERS,
  SearchFilter,
  searchFilters,
  sortFiltersByProjectCount,
  toPluralFilterType,
} from '@/api/filters';
import { useSearch } from '@/contexts/search';
import { useSearchField } from '@/modules/search/SearchField';
import { SolidButton, TextInput } from '@/ui/components';
import { clsxm } from '@/ui/utils';

import { FilterMenuOption } from './FilterMenuOption';

export function FilterMenu({ type }: { type: SearchFilter['type'] }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  const previewOptions = filtersByType(SEARCH_FILTERS, type).slice(
    0,
    expanded ? 10 : 5,
  );

  const runSearch = async (searchQuery: string): Promise<SearchFilter[]> => {
    if (!searchQuery) return previewOptions;

    const filters = await searchFilters(searchQuery, { type }).then(
      sortFiltersByProjectCount,
    );

    return filters;
  };

  const { query, setQuery, hits } = useSearchField(runSearch);

  const {
    search,
    addFilter,
    removeFilter,
    getFilterChecked,
    clearFiltersByType,
  } = useSearch();

  const onClickItem = (filter: SearchFilter) => () => {
    if (!getFilterChecked(filter)) {
      addFilter(filter);
    } else {
      removeFilter(filter);
    }
    setQuery('');
  };

  const selectedCount = filtersByType(search.tags ?? [], type).length;

  const canShowMore = hits.length > 0;

  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  return (
    <div className="flex flex-col">
      <div
        className={clsxm(
          'flex items-center gap-1 rounded-md pr-3',
          'input-border',
          focused && 'input-border-focused',
          'dark:bg-base-1100 dark:bg-opacity-60',
        )}
      >
        <TextInput
          type="search"
          name={`${type}-filter-search`}
          value={query}
          onChange={setQuery}
          placeholder={`Search ${toPluralFilterType(type).toLowerCase()}...`}
          className={clsxm('input-sm input-focus-unset')}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {selectedCount > 0 && (
          <SolidButton
            onClick={() => clearFiltersByType(type)}
            className="py-1.5 text-sm leading-none"
          >
            Clear
          </SolidButton>
        )}
      </div>
      <ul>
        {hits.map((tag) => (
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
