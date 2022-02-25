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

import { CategoryFiltersProps } from './CategoryFilters';
import { OptionCategoryItemButton } from './OptionCategoryCheckBox';
import { SearchField } from './SearchField';
import { useSearchField } from './useSearchField';

export function CategoryFiltersBottomSheet({
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
      className={clsxm(
        'bg-surface fixed bottom-0 left-0 !min-w-full',
        'h-[56%]',
        'rounded-none rounded-t-xl',
      )}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      {/* <div className="flex w-full items-center justify-center pt-3">
        <div className="h-[2.75px] w-16 rounded-full bg-gray-900 opacity-40 dark:bg-white dark:opacity-60" />
      </div> */}
      <div
        className={clsxm(
          'py-3 px-5',
          'relative top-0 left-0 z-50 w-full',
          'flex flex-col gap-5',
          'bg-surface',
          'max-h-[20%]',
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
      <div className="relative top-5 z-0 h-[80%] w-full">
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
        <ul className={clsxm('px-5 pt-3', 'h-full overflow-y-auto')}>
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
