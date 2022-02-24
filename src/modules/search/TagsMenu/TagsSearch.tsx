import React, { useState } from 'react';

import {
  filtersByType,
  SEARCH_FILTERS,
  SearchFilter,
  searchFilters,
  sortFiltersByProjectCount,
  toPluralFilterType,
} from '@/api/filters';
import { getProjectsCountForTag } from '@/api/projects';
import { getIntersection } from '@/common/utils';
import { useSearch } from '@/contexts/search';
import {
  CheckBox,
  PrimaryButton,
  SolidButton,
  TextInput,
} from '@/ui/components';
import { clsxm } from '@/ui/utils';

export function TagsSearch({
  type,
  onRequestClose,
}: {
  type: SearchFilter['type'];
  onRequestClose: () => void;
}) {
  const {
    addFilter,
    removeFilter,
    getFilterChecked,
    clearFiltersByType,
    search,
  } = useSearch();

  const [query, setQuery] = useState('');

  const onClickTag = (tag: SearchFilter) => () => {
    if (!getFilterChecked(tag)) {
      addFilter(tag);
    } else {
      removeFilter(tag);
    }
    setQuery('');
  };

  const tagsToShow = sortFiltersByProjectCount(
    query
      ? searchFilters(query, { type })
      : filtersByType(SEARCH_FILTERS, type),
  );

  return (
    <div className="relative z-0 h-screen overflow-y-auto">
      <div className="bg-surface sticky top-0 left-0 z-50 max-h-min w-full px-4 py-2">
        <div className="flex items-center justify-between py-4 pb-7">
          <SolidButton
            disabled={
              getIntersection(
                search.tags ?? [],
                tagsToShow,
                (a, b) => a.name === b.name,
              ).length === 0
            }
            onClick={() => clearFiltersByType(type)}
          >
            Clear
          </SolidButton>
          <span className="text-lg font-semibold">
            {toPluralFilterType(type)}
          </span>
          <PrimaryButton onClick={onRequestClose}>Done</PrimaryButton>
        </div>
        <TextInput
          type="search"
          name={`${type}-filter-search`}
          value={query}
          onChange={setQuery}
          placeholder={`Search ${toPluralFilterType(type)}...`}
          className={clsxm('bg-surface-1 w-full py-3')}
        />
      </div>
      <div className="absolute z-0 flex-1 pb-10">
        <ul
          className={clsxm(
            'flex w-full flex-col items-center gap-3 overflow-y-auto pt-5',
          )}
        >
          {tagsToShow.map((tag) => (
            <li
              key={tag.name}
              className="flex w-full cursor-pointer items-center justify-between gap-2 px-1 py-1.5"
              onClick={onClickTag(tag)}
            >
              <div className="flex items-center gap-3">
                <CheckBox checked={getFilterChecked(tag)} readOnly />
                <span className="text-lg leading-none">{tag.name}</span>
                <span className="text-lg leading-none">
                  {`(${getProjectsCountForTag(tag)})`}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
