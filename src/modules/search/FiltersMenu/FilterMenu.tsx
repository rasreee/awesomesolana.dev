import { useState } from 'react';

import { getProjectsCountForTag } from '@/api/projects';
import {
  FilterCategory,
  getTagSuggestions,
  SEARCH_FILTERS,
  Tag,
} from '@/api/tags';
import {
  useGetIsFilterActive,
  useSearch,
  useToggleFilter,
} from '@/contexts/SearchContext';
import clsxm from '@/lib/clsxm';
import pluralize from '@/lib/pluralize';
import { SolidButton, TextInput, useSearchField } from '@/ui/components';

import { FilterMenuOption } from './FilterMenuOption';

function sortTagsByProjectsCount(list: Tag[]): Tag[] {
  return list.sort(
    (a, b) => getProjectsCountForTag(b) - getProjectsCountForTag(a),
  );
}

function getTagsForCategory(category: FilterCategory): Tag[] {
  return SEARCH_FILTERS.filter((filter) => filter.category === category);
}

export function FilterMenu({
  category,
  onClear,
}: {
  category: FilterCategory;
  onClear: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  const previewOptions = getTagsForCategory(category).slice(
    0,
    expanded ? 10 : 5,
  );

  const runSearch = async (searchQuery: string): Promise<Tag[]> => {
    if (!searchQuery) return previewOptions;

    const filters = await getTagSuggestions(searchQuery, { category }).then(
      sortTagsByProjectsCount,
    );

    return filters;
  };

  const { query, setQuery, hits } = useSearchField(runSearch);

  const { search } = useSearch();
  const toggleFilter = useToggleFilter();
  const getIsFilterActive = useGetIsFilterActive();

  const onClickItem = (tag: Tag) => () => {
    toggleFilter(tag);
    setQuery('');
  };

  const selectedCount = (search.tags ?? []).filter(
    (item) => item.category === category,
  ).length;

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
        {(hits.length ? hits : previewOptions).map((tag) => (
          <FilterMenuOption
            key={`${tag.category}_${tag.name}`}
            tag={tag}
            onClick={onClickItem(tag)}
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
