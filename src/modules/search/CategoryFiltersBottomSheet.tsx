import React from 'react';

import { getCategoryFilters, getTagSuggestions, Tag } from '@/api/tags';
import { capitalizeFirst } from '@/common/utils';
import {
  useGetIsFilterActive,
  useToggleFilter,
} from '@/contexts/SearchContext';
import clsxm from '@/lib/clsxm';
import pluralize from '@/lib/pluralize';
import { Popover } from '@/ui/components';
import { XIcon } from '@/ui/icons';

import { CategoryFiltersProps } from './CategoryFilters';
import {
  OptionCategoryItemButton,
  SearchField,
  useSearchField,
} from './components';

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

  const listToShow = searchField.hits.length
    ? searchField.hits
    : getCategoryFilters(category);

  return (
    <Popover
      className={clsxm(
        'bg-surface fixed bottom-0 left-0 !min-w-full',
        'h-[80%]',
        'rounded-none rounded-t-xl',
      )}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
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
      <div className="relative z-0 h-[80%] w-full">
        <ul className={clsxm('px-5 pt-3', 'h-full overflow-y-auto')}>
          {listToShow.map((tag) => (
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
