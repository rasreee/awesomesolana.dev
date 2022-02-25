import React, { useState } from 'react';

import { getProjectsCountForTag } from '@/api/projects';
import {
  FilterCategory,
  getTagSuggestions,
  SEARCH_FILTERS,
  Tag,
} from '@/api/tags';
import {
  useCountFilters,
  useGetIsFilterActive,
  useToggleFilter,
} from '@/contexts/SearchContext';
import clsxm from '@/lib/clsxm';
import pluralize from '@/lib/pluralize';
import { SolidButton, TextInput } from '@/ui/components';

import { OptionCategoryItemButton } from './OptionCategoryCheckBox';
import { useSearchField } from './useSearchField';

function sortTagsByProjectsCount(list: Tag[]): Tag[] {
  return list.sort(
    (a, b) => getProjectsCountForTag(b) - getProjectsCountForTag(a),
  );
}

function getCategoryFilters(category: FilterCategory): Tag[] {
  return SEARCH_FILTERS.filter((filter) => filter.category === category);
}

const PREVIEW_SIZE = 5;
const PAGE_SIZE = 10;

export function OptionCategoryMenu({
  category,
  onClear,
}: {
  category: FilterCategory;
  onClear: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  const allCategoryFilters = getCategoryFilters(category);

  const previewOptions = allCategoryFilters.slice(
    0,
    expanded ? PAGE_SIZE : PREVIEW_SIZE,
  );

  const totalFilters = allCategoryFilters.length;

  const runSearch = async (searchQuery: string): Promise<Tag[]> => {
    if (!searchQuery) return [];

    const filters = await getTagSuggestions(searchQuery, { category }).then(
      sortTagsByProjectsCount,
    );

    return filters;
  };

  const { query, setQuery, hits } = useSearchField(runSearch);

  const selectedCount = useCountFilters()(category);
  const toggleFilter = useToggleFilter();
  const getIsFilterActive = useGetIsFilterActive();

  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const onClickOption = (tag: Tag) => () => {
    toggleFilter(tag);
    setQuery('');
  };

  const listToShow = hits.length ? hits : previewOptions;
  const canShowMore = totalFilters > PREVIEW_SIZE;

  return (
    <div className="flex flex-col gap-2">
      <div
        className={clsxm(
          'flex items-center gap-1 rounded-md pr-3',
          'input-border',
          focused && 'input-border-focused',
          'dark:bg-base-1100 dark:bg-opacity-60',
        )}
      >
        <TextInput
          name={`${category}-filter-search`}
          value={query}
          onChange={setQuery}
          placeholder={`Search ${pluralize(category)}...`}
          className={clsxm('input-sm input-focus-unset')}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {selectedCount > 0 && (
          <SolidButton
            onClick={onClear}
            className="py-1.5 text-sm leading-none"
          >
            Clear
          </SolidButton>
        )}
      </div>
      <ul>
        {listToShow.map((tag) => (
          <OptionCategoryItemButton
            key={`${tag.category}_${tag.name}`}
            tag={tag}
            onClick={onClickOption(tag)}
            checked={getIsFilterActive(tag)}
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
