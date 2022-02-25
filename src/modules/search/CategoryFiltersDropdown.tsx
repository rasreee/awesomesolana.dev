import React from 'react';

import { getCategoryFilters, getTagSuggestions, Tag } from '@/api/tags';
import { capitalizeFirst, getIntersection } from '@/common/utils';
import {
  useGetIsFilterActive,
  useSearchFilters,
  useToggleFilter,
} from '@/contexts/SearchContext';
import clsxm from '@/lib/clsxm';
import pluralize from '@/lib/pluralize';
import { Divider, Popover } from '@/ui/components';
import { XIcon } from '@/ui/icons';
import { rem } from '@/ui/utils';

import { CategoryFiltersProps } from './CategoryFilters';
import {
  OptionCategoryItemButton,
  SearchField,
  useSearchField,
} from './components';

export function CategoryFiltersDropdown({
  category,
  isOpen,
  onRequestClose,
}: CategoryFiltersProps) {
  const searchField = useSearchField((q) => getTagSuggestions(q, { category }));
  const getIsFilterActive = useGetIsFilterActive();
  const toggleFilter = useToggleFilter();
  const onClickOption = (tag: Tag) => () => {
    toggleFilter(tag);
    searchField.setQuery('');
  };

  const listToShow = searchField.hits.length
    ? searchField.hits
    : getCategoryFilters(category);

  const allFilters = useSearchFilters();
  const categoryFilters = getCategoryFilters(category);

  const selectedList = getIntersection(
    categoryFilters,
    allFilters,
    (a, b) => a.name === b.name,
  );

  const availableOptions = categoryFilters.filter(
    (filter) => !selectedList.map((item) => item.name).includes(filter.name),
  );

  return (
    <Popover
      className={clsxm('bg-surface w-[28rem] max-w-xl pb-5', 'max-h-[60vh]')}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        maxHeight:
          rem(listToShow.slice(0, 10).length * 48 + 72) + ' !important',
      }}
    >
      <div
        className={clsxm(
          'py-3 px-5',
          'flex flex-col gap-5',
          'min-w-full',
          'bg-surface',
        )}
      >
        <div className="flex items-center justify-between pt-2">
          <h2 className="font-heading text-2xl font-semibold leading-none">
            {capitalizeFirst(pluralize(category))}
          </h2>
          <button onClick={onRequestClose}>
            <XIcon />
          </button>
        </div>
        <SearchField {...searchField} autoFocused />
      </div>

      <div
        className={clsxm(
          'overflow-y-auto',
          'max-h-min',
          'overscroll-none',
          'top-50 relativee z-0',
        )}
      >
        {selectedList.length ? (
          <div className="flex flex-col gap-2 py-2">
            <span className="px-5 text-lg font-medium">Selected</span>
            <ul className={clsxm('px-5 pb-2', 'min-w-full')}>
              {selectedList.map((tag) => (
                <OptionCategoryItemButton
                  key={`${tag.category}_${tag.name}`}
                  tag={tag}
                  onClick={onClickOption(tag)}
                  checked={getIsFilterActive(tag)}
                />
              ))}
            </ul>
            <Divider />
          </div>
        ) : null}
        <ul className={clsxm('px-5 pt-3', 'min-w-full')}>
          {availableOptions.map((tag) => (
            <OptionCategoryItemButton
              key={`${tag.category}_${tag.name}`}
              tag={tag}
              onClick={onClickOption(tag)}
              checked={getIsFilterActive(tag)}
            />
          ))}
        </ul>
      </div>
    </Popover>
  );
}
